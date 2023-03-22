import storage from 'store'
import { KEEP_ALIVE, ADD_KEEP_ALIVE_VIEW, DEL_KEEP_ALIVE_VIEW } from '../storage-types'
import defaultSettings from '@/config/defaultSettings'

const keepAlive = {
  state: {
    keepAlive: [], // 需要缓存的页面 - name
  },
  mutations: {
    [ADD_KEEP_ALIVE_VIEW]: (state, routeName) => {
      const isExist = state.keepAlive.includes(routeName)
      if (isExist) return
      state.keepAlive.push(routeName)
      storage.set(KEEP_ALIVE, state.keepAlive)
    },
    [DEL_KEEP_ALIVE_VIEW]: (state, routeName) => {
      const index = state.keepAlive.indexOf(routeName)
      index > -1 && state.keepAlive.splice(index, 1)
      storage.set(KEEP_ALIVE, state.keepAlive)
    },
  },
  actions: {
    // 获取keepAlive
    GenerateKeepAlive({ commit }, { to, from }) {
      return new Promise(resolve => {
        const toMeta = to.meta || {}
        const fromMeta = from.meta || {}
        // TODO: 对于父级多层嵌套后续优化
        if (defaultSettings.multiTab) {
          // 开启多页签
        } else {
          // 未开启多页签
          if (fromMeta.keepAlive && !storage.get(KEEP_ALIVE).includes(to.name)) {
            // from页面为缓存页面时，如果to页不需要缓存from页时，删除from页面及其父组件的缓存
            from.matched.forEach(item => {
              if (item.meta.keepAlive) {
                commit(DEL_KEEP_ALIVE_VIEW, item.name)
              }
            })
          }
        }
        if (toMeta.keepAlive) {
          // to页面需要缓存, 多级router-view keep-alive会失效，所以需要缓存父组件
          to.matched.forEach(item => {
            if (item.meta.keepAlive) {
              commit(ADD_KEEP_ALIVE_VIEW, item.name)
            }
          })
        }
        resolve()
      })
    },
  },
}
export default keepAlive
