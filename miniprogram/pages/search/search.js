/**
 * ============================================================
 * 漫途 · AI 文旅攻略共创社区
 * 文件：pages/search/search.js
 * 搜索页：
 *   - 关键词同时匹配攻略与目的地，展示最近搜索与热门词。
 * ============================================================
 */
const source = require('../../utils/data.js')

Page({
  data: {
    keyword: '',
    recent: source.defaultRecent,
    hotWords: source.hotWords,
    guides: [],
    destinations: [],
    searched: false
  },

  onInput(e) {
    this.update(e.detail.value || '', false)
  },

  onWord(e) {
    this.update(e.currentTarget.dataset.word, true)
  },

  onClear() {
    this.update('', false)
  },

  update(keyword, save) {
    const text = (keyword || '').trim()
    let recent = this.data.recent
    if (save && text) {
      recent = [text].concat(recent.filter(function (item) { return item !== text })).slice(0, 8)
    }
    if (!text) {
      this.setData({
        keyword: '',
        searched: false,
        guides: [],
        destinations: [],
        recent: recent
      })
      return
    }
    this.setData({
      keyword: text,
      searched: true,
      guides: source.filterGuides(text),
      destinations: source.filterDestinations(text),
      recent: recent
    })
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
  }
})
