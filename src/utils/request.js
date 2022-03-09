import axios from 'axios'
import store from '@/store'
import notification from 'ant-design-vue/es/notification'
import { VueAxios } from './axios'

// 创建 axios 实例
const request = axios.create({
  // API 请求的默认前缀
  baseURL: process.env.VUE_APP_API_BASE_URL,
  timeout: 6000, // 请求超时时间
})

const noNetworkKey = 'no-network'

// 当前是否刷新token
let ifRefreshing = false

// 刷新token时，延迟请求数组
let retryRequest = []

// 异常拦截处理器
const errorHandler = error => {
  if (error.response) {
    const { data, status, statusText } = error.response

    // token 错误
    if (status === 401) {
      store.dispatch('Clear').then(() => {
        setTimeout(() => {
          window.location.reload()
        }, 1500)
      })
    }

    // token 过期
    if (status === 450) {
      const config = error.config
      if (!ifRefreshing) {
        // 当前没有刷新token
        ifRefreshing = true
        return store
          .dispatch('RefreshToken')
          .then(newToken => {
            retryRequest.forEach(cb => cb(newToken)) // 换取token后将请求队列的请求依次执行
            retryRequest = [] // 执行完请求后清空队列
            return request(config)
          })
          .catch(e => {
            console.error(e)
            store.dispatch('Clear').then(() => {
              setTimeout(() => {
                window.location.reload()
              }, 1500)
            })
          })
          .finally(() => {
            ifRefreshing = false
          })
      } else {
        // 当前在刷新token,将现有请求放入队列，返回未执行resolve的promise
        return new Promise(resolve => {
          // resolve保存到队列中，等token刷新后直接执行
          retryRequest.push(token => {
            resolve(request(config))
          })
        })
      }
    }

    // token过期不给错误提示
    if (status !== 450) {
      notification.error({
        message: statusText,
        description: data,
      })
    }
  } else {
    notification.error({
      key: noNetworkKey,
      message: '网络异常',
      description: '请检查网络!',
    })
  }
  return Promise.reject(error)
}

// request interceptor
request.interceptors.request.use(config => {
  const token = store.getters.token
  if (token) {
    // 请求头token信息，请根据实际情况进行修改
    config.headers['Authorization'] = token
  }
  return config
}, errorHandler)

// response interceptor
request.interceptors.response.use(response => {
  const { message, success } = response.data
  if (success === false) {
    notification.error({ message: '错误', description: message })
    const error = new Error(message || 'Error')
    error.response = response
    return Promise.reject(error)
  }
  return Promise.resolve(response.data)
}, errorHandler)

const installer = {
  vm: {},
  install(Vue) {
    Vue.use(VueAxios, request)
  },
}

export default request

export { installer as VueAxios, request as axios }
