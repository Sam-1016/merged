/**
 * ============================================================
 * 漫途 · AI 文旅攻略共创社区
 * 文件：pages/favorites/favorites.js
 * 收藏页：
 *   - 读取 favorite_ids 持久化集合，展示已收藏攻略，取消收藏即时生效。
 * ============================================================
 */
const source = require('../../utils/data.js')

Page({
  data: {
    list: []
  },

  onShow() {
    this.setData({ list: source.getFavorites() })
  },

  onGuide(e) {
    wx.navigateTo({
      url: '/pages/guide-detail/guide-detail?id=' + e.currentTarget.dataset.id
    })
  },

  onUnfav(e) {
    source.toggleFavorite(e.currentTarget.dataset.id)
    this.setData({ list: source.getFavorites() })
  },

  goGuides() {
    wx.switchTab({ url: '/pages/guides/guides' })
  }
})
