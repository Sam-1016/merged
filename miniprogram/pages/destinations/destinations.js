/**
 * ============================================================
 * 漫途 · AI 文旅攻略共创社区
 * 文件：pages/destinations/destinations.js
 * 目的地列表页（Tab）：
 *   - 按区域分组筛选目的地，展示数量、季节与预算概览。
 * ============================================================
 */
const source = require('../../utils/data.js')

function splitList(filter) {
  const list = filter === '全部'
    ? source.destinations
    : source.destinations.filter(function (item) { return item.group === filter })
  return {
    filter: filter,
    total: list.length,
    list: list
  }
}

Page({
  data: Object.assign({
    statusBarHeight: 20,
    filters: source.destFilters
  }, splitList('全部')),

  onLoad() {
    this.setData({
      statusBarHeight: getApp().globalData.statusBarHeight || 20
    })
  },

  onShow() {
    const app = getApp()
    const pending = app.globalData.destFilter
    if (pending) {
      app.globalData.destFilter = ''
      this.setData(splitList(pending))
    }
  },

  onFilter(e) {
    this.setData(splitList(e.currentTarget.dataset.filter))
  },

  onDest(e) {
    wx.navigateTo({
      url: '/pages/destination-detail/destination-detail?id=' + e.currentTarget.dataset.id
    })
  },

  goSearch() {
    wx.navigateTo({ url: '/pages/search/search' })
  }
})
