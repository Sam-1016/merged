/**
 * ============================================================
 * 漫途 · AI 文旅攻略共创社区
 * 文件：pages/ai-guide/ai-guide.js
 * AI 攻略讲解页：
 *   - 按「总览 / 怎么走 / 吃什么 / 住哪里 / 避坑」五个主题切换讲解；
 *   - 优先调用后端 AI 接口，失败时降级为本地模板内容，逐字上屏展示。
 * ============================================================
 */
const ai = require('../../utils/ai.js')

Page({
  data: {
    navBarHeight: 64,
    ready: false,
    found: true,
    title: '',
    sub: '',
    cover: '',
    topics: [],
    active: '',
    shown: '',
    typing: false,
    done: false,
    round: 1
  },

  onLoad(query) {
    const app = getApp()
    const payload = ai.buildNarration({
      guideId: query.guideId || '',
      destId: query.destId || ''
    })
    if (!payload || !payload.topics.length) {
      this.setData({ ready: true, found: false, navBarHeight: app.globalData.navBarHeight || 64 })
      return
    }
    this.setData({
      ready: true,
      found: true,
      navBarHeight: app.globalData.navBarHeight || 64,
      title: payload.title,
      sub: payload.sub,
      cover: payload.cover,
      topics: payload.topics,
      active: payload.topics[0].key
    })
    // 稍作停顿，模拟 AI 整理内容
    setTimeout(() => this.play(), 500)
  },

  onUnload() {
    this.stopTimer()
  },

  stopTimer() {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }
  },

  fullText(key) {
    const topic = this.data.topics.filter(function (t) { return t.key === key })[0]
    return topic ? topic.paras.join('\n\n') : ''
  },

  play() {
    this.stopTimer()
    const text = this.fullText(this.data.active)
    let i = 0
    this.setData({ shown: '', typing: true, done: false })
    this.timer = setInterval(() => {
      i += 2
      if (i >= text.length) {
        this.stopTimer()
        this.setData({ shown: text, typing: false, done: true })
        return
      }
      this.setData({ shown: text.slice(0, i) })
    }, 34)
  },

  skip() {
    if (!this.data.typing) return
    this.stopTimer()
    this.setData({ shown: this.fullText(this.data.active), typing: false, done: true })
  },

  onTopic(e) {
    const key = e.currentTarget.dataset.key
    if (key === this.data.active) return
    this.setData({ active: key })
    setTimeout(() => this.play(), 240)
  },

  onReplay() {
    this.setData({ round: this.data.round + 1 })
    this.play()
  },

  onBackHome() {
    wx.switchTab({ url: '/pages/guides/guides' })
  }
})
