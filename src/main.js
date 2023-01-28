// with polyfills
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import ProLayout, { PageHeaderWrapper } from '@ant-design-vue/pro-layout'

// mock
// WARNING: `mockjs` NOT SUPPORT `IE` PLEASE DO NOT USE IN `production` ENV.
// import '../mock'
import '@/style/index.less'
import './assets/iconfont/iconfont'
import bootstrap from '@/core/bootstrap'
import '@/core/lazy_use' // use lazy load components
import '@/core/echarts'
// import './permission'

Vue.config.productionTip = false

// use pro-layout components
Vue.component('ProLayout', ProLayout)
Vue.component('PageContainer', PageHeaderWrapper)
Vue.component('PageHeaderWrapper', PageHeaderWrapper)

new Vue({
  router,
  store,
  created: bootstrap,
  render: h => h(App),
}).$mount('#app')
