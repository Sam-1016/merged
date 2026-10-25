/**
 * ============================================================
 * 漫途 · AI 文旅攻略共创社区
 * 文件：pages/profile/profile.js
 * 个人资料编辑页：
 *   - 编辑昵称、头像、简介与城市，保存后写入本地缓存并同步全局数据。
 * ============================================================
 */
Page({
  data: {
    name: '',
    bio: '',
    city: '',
    avatar: '/images/avatar-1.jpg'
  },

  onLoad() {
    const profile = getApp().globalData.profile
    this.setData({
      name: profile.name,
      bio: profile.bio,
      city: profile.city,
      avatar: profile.avatar
    })
  },

  onName(e) {
    this.setData({ name: e.detail.value })
  },

  onBio(e) {
    this.setData({ bio: e.detail.value })
  },

  onCity(e) {
    this.setData({ city: e.detail.value })
  },

  onSave() {
    const app = getApp()
    app.globalData.profile = {
      name: this.data.name || '林间客',
      bio: this.data.bio,
      city: this.data.city || '上海',
      avatar: app.globalData.profile.avatar,
      loggedIn: app.globalData.profile.loggedIn !== false // 保留登录态
    }
    // 关键：写入缓存，重新打开小程序资料仍保留，不会重置
    try {
      wx.setStorageSync('user_profile', app.globalData.profile)
    } catch (e) {}
    wx.showToast({ title: '资料已更新', icon: 'none' })
    setTimeout(function () {
      wx.navigateBack()
    }, 400)
  }
})
