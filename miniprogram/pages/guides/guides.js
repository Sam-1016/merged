/**
 * ============================================================
 * 漫途 · AI 文旅攻略共创社区
 * 文件：pages/guides/guides.js
 * 攻略列表页（Tab）：
 *   - 按分类筛选攻略，首条作为精选大卡片展示，其余进入瀑布列表。
 * ============================================================
 */
const source = require('../../utils/data.js')

function splitList(filter) {
  const sourceList = filter === '全部'
    ? source.guides
    : source.guides.filter(function (item) { return item.category === filter })
  return {
    filter: filter,
    total: sourceList.length,
    featured: filter === '全部' ? sourceList[0] : null,
    list: filter === '全部' ? sourceList.slice(1) : sourceList
  }
}

Page({
  data: Object.assign({
    statusBarHeight: 20,
    filters: source.guideFilters
  }, splitList('全部')),

  onLoad() {
    this.setData({
      statusBarHeight: getApp().globalData.statusBarHeight || 20
    })
  },

  onShow() {
    const app = getApp()
    const pending = app.globalData.guideFilter
    if (pending) {
      app.globalData.guideFilter = ''
      this.setData(splitList(pending))
    }
  },

  onFilter(e) {
    this.setData(splitList(e.currentTarget.dataset.filter))
  },

  onGuide(e) {
    wx.navigateTo({
      url: '/pages/guide-detail/guide-detail?id=' + e.currentTarget.dataset.id
    })
  },

  goSearch() {
    wx.navigateTo({ url: '/pages/search/search' })
  }
})
