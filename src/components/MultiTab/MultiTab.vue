<script>
import events from './events'
import { mapActions, mapGetters } from 'vuex'
import store from '@/store'
import { DEL_KEEP_ALIVE_VIEW } from '@/store/storage-types'

export default {
  name: 'MultiTab',
  data() {
    return {
      fullPathList: [], // 激活的multiTab路由path列表
      pages: [], // 激活的multiTab页面路由列表
      activeKey: '', // 当前激活的tab
      newTabIndex: 0,
    }
  },
  computed: {
    ...mapGetters(['activeTabList', 'activeFullPath', 'currentTabActiveKey']),
  },
  created() {
    // bind event
    events
      .$on('open', val => {
        if (!val) {
          throw new Error(`multi-tab: open tab ${val} err`)
        }
        if (this.currentTabActiveKey) {
          this.activeKey = this.currentTabActiveKey
        } else {
          this.activeKey = val
        }
      })
      .$on('close', val => {
        if (!val) {
          this.closeThat(this.activeKey)
          return
        }
        this.closeThat(val)
      })
      .$on('rename', ({ key, name }) => {
        console.log('rename', key, name)
        try {
          const item = this.pages.find(item => item.path === key)
          item.meta.customTitle = name
          this.$forceUpdate()
        } catch (e) {}
      })
    if (this.$route.fullPath === '/dashboard/Index') {
      const { name, fullPath, path, meta } = this.$route
      const tabRoute = { name, fullPath, path, meta }
      this.addKeepAliveTab(tabRoute).then(r => {
        this.pages = [...this.activeTabList]
      })
      this.addKeepAliveFullPath(fullPath).then(r => {
        this.fullPathList = this.activeFullPath
      })
    }
    this.pages = [...this.activeTabList]
    this.fullPathList = [...this.activeFullPath]
    // 如果缓存池有激活tab就直接打开,否则打开最新tab
    if (this.currentTabActiveKey) {
      this.activeKey = this.currentTabActiveKey
    } else {
      this.selectedLastPath()
    }
  },
  methods: {
    ...mapActions([
      'addKeepAliveTab',
      'deleteKeepAliveTab',
      'addKeepAliveFullPath',
      'deleteKeepAliveFullPath',
      'setActiveKey',
    ]),
    onEdit(targetKey, action) {
      this[action](targetKey)
    },
    add(route) {
      let routeMeta = null
      const { meta } = route
      routeMeta = meta
      const { name, fullPath, path } = route
      const tabRoute = { name, fullPath, path, meta: routeMeta }
      this.addKeepAliveTab(tabRoute).then(r => {
        this.pages = [...this.activeTabList]
      })
      this.addKeepAliveFullPath(route.fullPath).then(r => {
        this.fullPathList = this.activeFullPath
      })
    },
    async remove(targetKey) {
      if (targetKey === '/dashboard/Index') {
        this.$message.info('首页无法被关闭')
        return
      }
      await this.deleteKeepAliveTab(targetKey) // 删除缓存tab
      await this.deleteKeepAliveFullPath(targetKey) // 删除tab路径
      // 如果开启多页签，在关闭页签时也要把keepAlive删除
      const { name } = this.pages.find(page => page.fullPath === targetKey)
      name && store.commit(DEL_KEEP_ALIVE_VIEW, name)
      this.pages = this.pages.filter(page => page.fullPath !== targetKey)
      this.fullPathList = this.fullPathList.filter(path => path !== targetKey)
      // 判断当前标签是否关闭，若关闭则跳转到最后一个还存在的标签页
      if (!this.fullPathList.includes(this.activeKey)) {
        this.selectedLastPath()
      }
    },
    selectedLastPath() {
      this.activeKey = this.fullPathList[this.fullPathList.length - 1]
    },
    // content menu
    fullscreen(e) {
      const elm = document.getElementById('contentWrapperRef')
      if (elm) {
        elm.requestFullscreen()
      }
    },
    closeThat(e) {
      // 判断是否为最后一个标签页，如果是最后一个，则无法被关闭
      if (this.fullPathList.length > 1) {
        this.remove(e)
      } else {
        this.$message.info('这是最后一个标签了, 无法被关闭')
      }
    },
    closeLeft(e) {
      const currentIndex = this.fullPathList.indexOf(e)
      if (currentIndex > 0) {
        this.fullPathList.forEach((item, index) => {
          if (index < currentIndex) {
            this.remove(item)
          }
        })
      } else {
        this.$message.info('左侧没有标签')
      }
    },
    closeRight(e) {
      const currentIndex = this.fullPathList.indexOf(e)
      if (currentIndex < this.fullPathList.length - 1) {
        this.fullPathList.forEach((item, index) => {
          if (index > currentIndex) {
            this.remove(item)
          }
        })
      } else {
        this.$message.info('右侧没有标签')
      }
    },
    closeAll(e) {
      const currentIndex = this.fullPathList.indexOf(e)
      this.fullPathList.forEach((item, index) => {
        if (index !== currentIndex) {
          this.remove(item)
        }
      })
    },
    closeOther(e) {
      const currentIndex = this.fullPathList.indexOf(e)
      this.fullPathList.forEach((item, index) => {
        if (index !== currentIndex) {
          this.remove(item)
        }
      })
    },
    closeMenuClick(key, route) {
      this[key](route)
    },
    renderTabPaneMenu(e) {
      const currentIndex = this.fullPathList.indexOf(e)
      const fullPathLength = this.fullPathList.length
      return (
        <a-menu
          {...{
            on: {
              click: ({ key, item, domEvent }) => {
                this.closeMenuClick(key, e)
              },
            },
          }}
        >
          <a-menu-item key="fullscreen">
            <a-icon type="fullscreen" />
            内容全屏
          </a-menu-item>
          <a-menu-item key="closeThat">
            <a-icon type="minus" />
            关闭当前
          </a-menu-item>
          <a-menu-item key="closeOther" disabled={fullPathLength === 1}>
            <a-icon type="swap" />
            关闭其他
          </a-menu-item>
          <a-menu-item key="closeRight" disabled={currentIndex === fullPathLength - 1}>
            <a-icon type="double-right" />
            关闭右侧
          </a-menu-item>
          <a-menu-item key="closeLeft" disabled={currentIndex === 0}>
            <a-icon type="double-left" />
            关闭左侧
          </a-menu-item>
          <a-menu-item key="closeAll" disabled={fullPathLength === 1}>
            <a-icon type="close" />
            关闭全部
          </a-menu-item>
        </a-menu>
      )
    },
    // render
    renderTabPane(title, keyPath, trigger = ['hover']) {
      const menu = this.renderTabPaneMenu(keyPath)
      return (
        <a-dropdown overlay={menu} trigger={trigger}>
          <span style={{ userSelect: 'none' }}>{title}</span>
        </a-dropdown>
      )
    },
  },
  watch: {
    $route: function (newVal) {
      this.activeKey = newVal.fullPath
      this.setActiveKey(newVal.fullPath)
      if (!this.activeFullPath.includes(newVal.fullPath)) {
        this.add(newVal, 0)
      }
    },
    activeKey: function (newPathKey) {
      this.$router.push({ path: newPathKey })
    },
  },
  render() {
    const {
      onEdit,
      $data: { pages },
    } = this
    const panes = pages.map((page, tabsKeyIdx) => {
      return (
        <a-tab-pane
          style={{ height: 0 }}
          tab={this.renderTabPane(page.meta.customTitle || page.meta.title, page.fullPath, ['contextmenu'])}
          key={page.fullPath}
          closable={pages.length > 1 && page.name !== 'Index'}
        ></a-tab-pane>
      )
    })
    const rightMenuDropdownProps = {
      props: {
        getPopupContainer: triggerNode => triggerNode.parentNode,
        overlay: this.renderTabPaneMenu(this.$route.fullPath),
      },
    }
    return (
      <div class="ant-pro-multi-tab">
        <div class="ant-pro-multi-tab-wrapper">
          <a-tabs
            hideAdd
            type={'editable-card'}
            v-model={this.activeKey}
            tabBarStyle={{ background: '#FFF', margin: 0, paddingLeft: '16px', paddingTop: '1px' }}
            {...{ on: { edit: onEdit } }}
          >
            {panes}
          </a-tabs>
          <a-dropdown {...rightMenuDropdownProps}>
            <a-button>
              <a-icon type="down" style={{ fontSize: '18px' }} />
            </a-button>
          </a-dropdown>
        </div>
      </div>
    )
  },
}
</script>
