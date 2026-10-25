/**
 * ============================================================
 * 漫途 · AI 文旅攻略共创社区
 * 文件：pages/guide-detail/guide-detail.js
 * 攻略详情页：
 *   - 展示攻略正文、行程与贴士，进入时记录浏览痕迹；
 *   - 支持收藏、关注作者，并跳转 AI 主题讲解与行程规划。
 * ============================================================
 */
const source = require('../../utils/data.js')

Page({
  data: {
    ready: false,
    guide: null,
    related: [],
    fav: false,
    followed: false,
    navSolid: false,
    navBarHeight: 64
  },

  onLoad(query) {
    const guide = source.getGuide(query.id)
    if (guide) source.addHistory(guide.id) // 记录浏览足迹，重开小程序仍可追溯
    const app = getApp()
    this.setData({
      ready: true,
      guide: guide,
      related: guide ? source.relatedGuides(guide, 3) : [],
      fav: guide ? source.isFavorite(guide.id) : false,
      navSolid: !guide,
      navBarHeight: app.globalData.navBarHeight || 64
    })
  },

  onShow() {
    if (this.data.guide) {
      this.setData({ fav: source.isFavorite(this.data.guide.id) })
    }
  },

  onPageScroll(e) {
    if (!this.data.guide) return
    const solid = e.scrollTop > 80
    if (solid !== this.data.navSolid) {
      this.setData({ navSolid: solid })
    }
  },

  onAnchor(e) {
    wx.pageScrollTo({
      selector: '#' + e.currentTarget.dataset.target,
      duration: 280,
      offsetTop: -((getApp().globalData.navBarHeight || 88) + 8)
    })
  },

  onFav() {
    if (!this.data.guide) return
    const fav = source.toggleFavorite(this.data.guide.id)
    this.setData({ fav: fav })
  },

  onFollow() {
    this.setData({ followed: !this.data.followed })
  },

  onPlan() {
    wx.navigateTo({
      url: '/pages/itinerary/itinerary?id=' + this.data.guide.id
    })
  },

  onAiGuide() {
    wx.navigateTo({
      url: '/pages/ai-guide/ai-guide?guideId=' + this.data.guide.id
    })
  },

  onGuide(e) {
    wx.navigateTo({
      url: '/pages/guide-detail/guide-detail?id=' + e.currentTarget.dataset.id
    })
  },

  onDest() {
    wx.navigateTo({
      url: '/pages/destination-detail/destination-detail?id=' + this.data.guide.destId
    })
  },

  goGuides() {
    wx.switchTab({ url: '/pages/guides/guides' })
  },

  onShareAppMessage() {
    const guide = this.data.guide
    return {
      title: guide ? guide.title : '漫途旅行攻略',
      path: '/pages/guide-detail/guide-detail?id=' + (guide ? guide.id : '')
    }
  }
})
