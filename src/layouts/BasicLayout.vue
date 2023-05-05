<template>
  <pro-layout
    :menus="menus"
    :collapsed="collapsed"
    :mediaQuery="query"
    :isMobile="isMobile"
    :siderWidth="240"
    :collapsedWidth="60"
    :contentWidth="defaultSettings.contentWidth"
    :footerRender="false"
    :handleMediaQuery="handleMediaQuery"
    :handleCollapse="handleCollapse"
    v-bind="settings"
  >
    <!-- 设置-->
    <!-- <setting-drawer :settings="settings" @change="handleSettingChange" /> -->
    <!-- 菜单logo -->
    <template #menuHeaderRender>
      <div>
        <img src="@/assets/logo.svg" />
        <h1>{{ title }}</h1>
      </div>
    </template>
    <!-- 面包屑导航-->
    <template #headerContentRender>
      <breadcrumb></breadcrumb>
    </template>
    <!-- 页面头-->
    <template #rightContentRender>
      <right-content :top-menu="settings.layout === 'topmenu'" :is-mobile="isMobile" :theme="settings.theme" />
      <multi-tab v-if="multiTab"></multi-tab>
    </template>
    <!-- 页面脚-->
    <!--    <template #footerRender>-->
    <!--      <global-footer style="display: none" />-->
    <!--    </template>-->
    <keep-alive :include="keepAlive">
      <router-view :key="$route.fullPath" :style="{ paddingTop: multiTab ? '40px' : '0' }" />
    </keep-alive>
  </pro-layout>
</template>

<script>
// import { SettingDrawer } from '@ant-design-vue/pro-layout'
import { mapGetters, mapState } from 'vuex'

import RightContent from '@/components/GlobalHeader/RightContent'
// import GlobalFooter from '@/components/GlobalFooter'
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb'
import MultiTab from '@/components/MultiTab/index'

import defaultSettings from '@/config/defaultSettings'
import { asyncRouterMap } from '@/config/router.config.js'

export default {
  name: 'BasicLayout',
  components: {
    // SettingDrawer,
    RightContent,
    // GlobalFooter,
    Breadcrumb,
    MultiTab,
  },
  data() {
    return {
      defaultSettings,
      // preview.pro.antdv.com only use.
      isProPreviewSite: process.env.VUE_APP_PREVIEW === 'true' && process.env.NODE_ENV !== 'development',
      // end
      multiTab: defaultSettings.multiTab,
      fixedHeader: defaultSettings.fixedHeader, // sticky header
      // base
      menus: [],
      // 侧栏收起状态
      collapsed: false,
      title: defaultSettings.title,
      // 媒体查询
      query: {},
      // 是否手机模式
      isMobile: false,
      asyncRouterMap,
    }
  },
  computed: {
    ...mapState({
      // 动态主路由
      mainMenu: state => state.permission.addRouters,
    }),
    ...mapGetters(['keepAlive']),
    settings() {
      return {
        // 布局类型
        layout: defaultSettings.layout, // 'sidemenu', 'topmenu'
        // 定宽: true / 流式: false
        contentWidth: defaultSettings.layout === 'sidemenu' ? 'Fluid' : defaultSettings.contentWidth === 'Fixed',
        // 主题 'dark' | 'light'
        theme: defaultSettings.navTheme,
        // 主色调
        primaryColor: defaultSettings.primaryColor,
        fixedHeader: defaultSettings.fixedHeader,
        fixSiderbar: defaultSettings.fixSiderbar,
        colorWeak: defaultSettings.colorWeak,
        hideHintAlert: false,
        hideCopyButton: false,
      }
    },
  },
  // created () {
  //   const routes = this.mainMenu.find(item => item.path === '/')
  //   this.menus = (routes && routes.children) || []
  //   // 处理侧栏收起状态
  //   this.$watch('collapsed', () => {
  //     this.$store.commit(SIDEBAR_TYPE, this.collapsed)
  //   })
  //   this.$watch('isMobile', () => {
  //     this.$store.commit(TOGGLE_MOBILE_TYPE, this.isMobile)
  //   })
  // },
  created() {
    this.menus = asyncRouterMap.find(item => item.path === '/').children
    this.collapsed = false
  },
  mounted() {
    const userAgent = navigator.userAgent
    if (userAgent.indexOf('Edge') > -1) {
      this.$nextTick(() => {
        this.collapsed = !this.collapsed
        setTimeout(() => {
          this.collapsed = !this.collapsed
        }, 16)
      })
    }
    // first update color
    // updateTheme(this.settings.primaryColor)
  },
  methods: {
    handleMediaQuery(val) {
      this.query = val
      var html = document.querySelectorAll('section')[1]
      if (this.isMobile && !val['screen-xs']) {
        this.isMobile = false
        return
      }
      if (!this.isMobile && val['screen-xs']) {
        this.isMobile = false // 不会变成手机模式
        this.collapsed = false
        this.settings.contentWidth = true
        // this.settings.fixSiderbar = false
      }
      if (!(html && html.classList)) return
      if (val['screen-md'] || val['screen-sm']) {
        html.classList.add('active-sidemenu')
      } else {
        html.classList.remove('active-sidemenu')
      }
    },
    handleCollapse(val) {
      this.collapsed = val
    },
  },
}
</script>
