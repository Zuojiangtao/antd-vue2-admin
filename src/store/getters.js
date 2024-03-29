const getters = {
  // app
  device: state => state.app.device,
  theme: state => state.app.theme,
  color: state => state.app.color,
  isMobile: state => state.app.isMobile,
  lang: state => state.app.lang,
  multiTab: state => state.app.multiTab,
  // user
  token: state => state.user.token,
  refreshToken: state => state.user.refreshToken,
  userInfo: state => state.user.userInfo,
  userName: state => state.user.name,
  nickname: state => state.user.nickname,
  userId: state => state.user.userId,
  userAvatar: state => state.user.avatar,
  avatar: state => state.user.avatar,
  position: state => state.user.position,
  isInside: state => state.user.isInside,
  isCompany: state => state.user.isCompany,
  mobile: state => state.user.mobile,
  email: state => state.user.email,
  status: state => state.user.status,
  createTime: state => state.user.createTime,
  lastAuthTime: state => state.user.lastAuthTime,
  welcome: state => state.user.welcome,
  roles: state => state.user.roles,
  // multiTab
  activeTabList: state => state.multiTabs.activeTabList,
  activeFullPath: state => state.multiTabs.activeFullPath,
  currentTabActiveKey: state => state.multiTabs.currentTabActiveKey,
  // keepAlive
  keepAlive: state => state.keepAlive.keepAlive,
  // permission
  routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  permissions: state => state.permission.permissions,
  hasPermission: state => action => {
    // console.log(action, state.user.permissions.find(item => item === action))
    return !!state.permission.permissions.find(item => item === action)
  },
  // dictionary
  dictionary: state => state.dictionary.DICTIONARY_MAP,
  // 获取指定分类ID的字典数组
  getDictionaryByClassifyId: state => classifyId => {
    return state.dictionary.DICTIONARY_MAP[classifyId] || []
  },
  // 获取{key: value}形式的字典,可用于获取值对应文本信息
  getDictionaryMapData: state => (classifyId, key, value) => {
    const map = {}
    ;(state.dictionary.DICTIONARY_MAP[classifyId] || []).forEach(item => {
      map[item[key]] = item[value]
    })
    return map
  },
}

export default getters
