/**
 * ============================================================
 * 漫途 · AI 文旅攻略共创社区
 * 文件：app.js
 * 小程序入口：
 *   - 初始化导航栏尺寸与全局数据；
 *   - 启动时从本地缓存回填用户资料、收藏与足迹，保证重开小程序不重置。
 * ============================================================
 */
App({
  onLaunch() {
    let info = {}
    try {
      info = wx.getWindowInfo ? wx.getWindowInfo() : wx.getSystemInfoSync()
    } catch (err) {
      info = wx.getSystemInfoSync()
    }
    const statusBarHeight = info.statusBarHeight || 20
    this.globalData.statusBarHeight = statusBarHeight
    this.globalData.navBarHeight = statusBarHeight + 44

    // 启动时从缓存恢复登录资料与收藏，保证重开小程序不重置
    try {
      const saved = wx.getStorageSync('user_profile')
      if (saved && saved.loggedIn) {
        this.globalData.profile = Object.assign({}, this.globalData.profile, saved)
      }
      const favIds = wx.getStorageSync('favorite_ids')
      if (Array.isArray(favIds)) {
        this.globalData.favoriteIds = favIds
      }
    } catch (e) {}
  },
  globalData: {
    statusBarHeight: 20,
    navBarHeight: 64,
    guideFilter: '',
    destFilter: '',
    favoriteIds: ['dali-3d', 'kyoto-day', 'chengdu-48h', 'bali-5'],
    profile: {
      name: '林间客',
      bio: '住在上海，偏爱慢一点的路线',
      city: '上海',
      avatar: '/images/avatar-1.jpg'
    }
  }
})
