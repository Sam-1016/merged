/**
 * ============================================================
 * 漫途 · AI 文旅攻略共创社区
 * 文件：pages/destination-detail/destination-detail.js
 * 目的地详情页：
 *   - 聚合目的地简介、最佳季节、交通建议、吃喝推荐与相关攻略；
 *   - 数据来自 utils/places.js 与 utils/extras.js。
 * ============================================================
 */
const source = require('../../utils/data.js')
const extras = require('../../utils/extras.js')

Page({
  data: {
    ready: false,
    dest: null,
    guides: [],
    notes: [],
    stations: [],
    spotFoods: [],
    navSolid: false,
    navBarHeight: 64
  },

  onLoad(query) {
    const dest = source.getDest(query.id)
    const app = getApp()
    if (dest) {
      const ext = extras[dest.id] || {}
      const meta = ext.spotMeta || {}
      // 把票价/开放时间/建议时长并到景点上
      dest.highlights = (dest.highlights || []).map(function (h) {
        return Object.assign({}, h, { meta: meta[h.name] || null })
      })
      // 展开景点附近美食为平铺列表
      const foodMap = ext.spotFoods || {}
      const spotFoods = []
      Object.keys(foodMap).forEach(function (spot) {
        foodMap[spot].forEach(function (f) {
          spotFoods.push({ spot: spot, name: f.name, desc: f.desc, image: f.image })
        })
      })
      this.setData({
        notes: ext.xhsNotes || [],
        stations: ext.stations || [],
        spotFoods: spotFoods
      })
    }
    this.setData({
      ready: true,
      dest: dest,
      guides: dest ? source.guidesForDest(dest.id) : [],
      navSolid: !dest,
      navBarHeight: app.globalData.navBarHeight || 64
    })
  },

  onPageScroll(e) {
    if (!this.data.dest) return
    const solid = e.scrollTop > 80
    if (solid !== this.data.navSolid) this.setData({ navSolid: solid })
  },

  onGuide(e) {
    wx.navigateTo({
      url: '/pages/guide-detail/guide-detail?id=' + e.currentTarget.dataset.id
    })
  },

  onStart() {
    const list = this.data.guides
    if (!list.length) {
      wx.showToast({ title: '攻略正在整理', icon: 'none' })
      return
    }
    wx.navigateTo({
      url: '/pages/guide-detail/guide-detail?id=' + list[0].id
    })
  },

  onAiGuide() {
    wx.navigateTo({
      url: '/pages/ai-guide/ai-guide?destId=' + this.data.dest.id
    })
  },

  goDests() {
    wx.switchTab({ url: '/pages/destinations/destinations' })
  }
})
