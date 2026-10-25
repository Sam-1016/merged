/**
 * ============================================================
 * 漫途 · AI 文旅攻略共创社区
 * 文件：pages/index/index.js
 * 首页：
 *   - 聚合推荐目的地、专题入口、攻略目录与 AI 快捷入口；
 *   - 作为五个 Tab 的首屏门面页。
 * ============================================================
 */
const source = require('../../utils/data.js')

Page({
  data: {
    statusBarHeight: 20,
    monthLabel: source.monthNames[new Date().getMonth()],
    heroes: source.guides.slice(0, 3),
    heroLabel: '01',
    heroTotal: '03',
    entries: source.homeEntries,
    destinations: source.destinations,
    toc: source.guides.slice(3, 8),
    bentoMain: source.guides[8],
    bentoSide: source.guides.slice(9, 11),
    guideTotal: source.guides.length
  },

  onLoad() {
    this.setData({
      statusBarHeight: getApp().globalData.statusBarHeight || 20
    })
  },

  onHeroChange(e) {
    const current = e.detail.current
    this.setData({
      heroLabel: current < 9 ? '0' + (current + 1) : String(current + 1)
    })
  },

  goSearch() {
    wx.navigateTo({ url: '/pages/search/search' })
  },

  onGuide(e) {
    wx.navigateTo({
      url: '/pages/guide-detail/guide-detail?id=' + e.currentTarget.dataset.id
    })
  },

  onDest(e) {
    wx.navigateTo({
      url: '/pages/destination-detail/destination-detail?id=' + e.currentTarget.dataset.id
    })
  },

  onEntry(e) {
    const app = getApp()
    const type = e.currentTarget.dataset.type
    const value = e.currentTarget.dataset.value
    if (type === 'guide') {
      app.globalData.guideFilter = value
      wx.switchTab({ url: '/pages/guides/guides' })
      return
    }
    app.globalData.destFilter = value
    wx.switchTab({ url: '/pages/destinations/destinations' })
  },

  goGuides() {
    wx.switchTab({ url: '/pages/guides/guides' })
  },

  goAiPlan() {
    wx.navigateTo({ url: '/pages/ai-plan/ai-plan' })
  },

  goMyGuides() {
    wx.navigateTo({ url: '/pages/guide-list/guide-list' })
  },

  // 跳转攻略社区（社区页是 tabBar 页，必须用 switchTab）
  goCommunity() {
    wx.switchTab({ url: '/pages/community/community' })
  },

  goDests() {
    wx.switchTab({ url: '/pages/destinations/destinations' })
  }
})
