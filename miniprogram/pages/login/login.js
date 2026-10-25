/**
 * ============================================================
 * 页面：账号登录页
 * 功能：微信原生「头像昵称填写」能力（chooseAvatar + nickname 输入框），
 *       点击「一键登录」后资料写入全局缓存（user_profile），
 *       重新打开小程序登录态与资料仍然保留，不会重置。
 * 说明：wx.login 仅获取临时 code 作演示；正式环境需把 code
 *       发送到自有后台换取 openid/session_key。
 * ============================================================
 */

const DEFAULT_AVATAR = '/images/avatar-1.jpg'
const STORAGE_KEY = 'user_profile'

Page({
  data: {
    avatar: DEFAULT_AVATAR,
    name: '',
    bio: '',
    city: ''
  },

  onLoad() {
    // 已登录过则回显原资料，便于直接修改
    const p = getApp().globalData.profile || {}
    this.setData({
      avatar: p.avatar || DEFAULT_AVATAR,
      name: p.loggedIn ? p.name : '',
      bio: p.loggedIn ? p.bio : '',
      city: p.loggedIn ? p.city : ''
    })
  },

  /** 微信原生头像选择能力：返回临时路径，转存为本地持久文件防重启丢失 */
  onChooseAvatar(e) {
    const temp = e.detail.avatarUrl
    let saved = temp
    try {
      saved = wx.getFileSystemManager().saveFileSync(temp)
    } catch (err) {
      // 开发工具偶发不支持时退回临时路径
    }
    this.setData({ avatar: saved || temp })
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

  /** 一键登录：校验昵称 -> 调起微信登录 -> 资料持久化到缓存 */
  onLogin() {
    const name = (this.data.name || '').trim()
    if (!name) {
      wx.showToast({ title: '请先填写昵称', icon: 'none' })
      return
    }
    wx.login({ success() {}, fail() {} }) // 演示环境不校验 code

    const profile = {
      name: name,
      bio: (this.data.bio || '').trim() || '这个人很懒，什么都没留下',
      city: (this.data.city || '').trim() || '未知城市',
      avatar: this.data.avatar || DEFAULT_AVATAR,
      loggedIn: true
    }
    getApp().globalData.profile = profile
    try {
      wx.setStorageSync(STORAGE_KEY, profile) // 关键：写入缓存，重开小程序不重置
    } catch (e) {}

    wx.showToast({ title: '登录成功', icon: 'success' })
    setTimeout(() => {
      wx.navigateBack()
    }, 600)
  }
})
