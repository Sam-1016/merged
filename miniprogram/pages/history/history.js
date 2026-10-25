/**
 * ============================================================
 * 漫途 · AI 文旅攻略共创社区
 * 文件：pages/history/history.js
 * 浏览足迹页：
 *   - 每次进入实时读取 view_history，保证新产生的浏览痕迹立刻出现。
 * ============================================================
 */
const source = require('../../utils/data.js')

Page({
  data: {
    list: []
  },

  /** 每次进入都重新读取，保证新产生的浏览痕迹立刻出现 */
  onShow() {
    this.setData({ list: source.getHistory() })
  },

  onGuide(e) {
    wx.navigateTo({
      url: '/pages/guide-detail/guide-detail?id=' + e.currentTarget.dataset.id
    })
  }
})
