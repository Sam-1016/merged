/**
 * ============================================================
 * 漫途 · AI 文旅攻略共创社区
 * 文件：pages/itinerary/itinerary.js
 * 行程规划页：
 *   - 展示行程草稿列表、AI 生成方案与单篇攻略的分日行程。
 * ============================================================
 */
const source = require('../../utils/data.js')
const ai = require('../../utils/ai.js')

Page({
  data: {
    mode: 'list',
    drafts: [],
    aiPlans: [],
    guide: null,
    stops: [],
    isAi: false
  },

  onLoad(query) {
    if (query.ai && query.id) {
      const plan = ai.getSavedPlan(query.id)
      this.setData({
        mode: 'plan',
        isAi: true,
        guide: plan,
        stops: plan ? plan.stops : []
      })
      return
    }
    if (query.id) {
      const guide = source.getGuide(query.id)
      this.setData({
        mode: 'plan',
        isAi: false,
        guide: guide,
        stops: guide ? guide.route.split(' → ') : []
      })
      return
    }
    this.loadList()
  },

  onShow() {
    if (this.data.mode === 'list') this.loadList()
  },

  loadList() {
    this.setData({
      mode: 'list',
      drafts: source.getDrafts(),
      aiPlans: ai.getSavedPlans()
    })
  },

  onOpen(e) {
    wx.navigateTo({
      url: '/pages/itinerary/itinerary?id=' + e.currentTarget.dataset.id
    })
  },

  onOpenAi(e) {
    wx.navigateTo({
      url: '/pages/itinerary/itinerary?ai=1&id=' + e.currentTarget.dataset.id
    })
  },

  onRemoveAi() {
    const guide = this.data.guide
    if (!guide) return
    wx.showModal({
      title: '删除这条 AI 行程？',
      content: guide.title,
      confirmText: '删除',
      confirmColor: '#c4622d',
      success: (res) => {
        if (!res.confirm) return
        ai.removeSavedPlan(guide.id)
        wx.navigateBack()
      }
    })
  },

  onGuide() {
    wx.navigateTo({
      url: '/pages/guide-detail/guide-detail?id=' + this.data.guide.id
    })
  },

  goAiPlan() {
    wx.navigateTo({ url: '/pages/ai-plan/ai-plan' })
  }
})
