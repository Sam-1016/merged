/**
 * ============================================================
 * 漫途 · AI 文旅攻略共创社区
 * 文件：pages/ai-plan/ai-plan.js
 * AI 行程规划页：
 *   - 以结构化表单（目的地 / 天数 / 偏好 / 同伴 / 节奏）替代自由 Prompt；
 *   - 生成分日行程并支持保存，保存结果写入本地缓存。
 * ============================================================
 */
const source = require('../../utils/data.js')
const ai = require('../../utils/ai.js')

const PREFS = ['美食', '自然风光', '文化', '海岛', '城市漫步']
const PEOPLE = ['独行', '情侣', '朋友', '家庭']
const RHYTHM = ['慢', '适中', '紧凑']

Page({
  data: {
    mode: 'form',          // form | loading | result
    destNames: [],
    destIds: [],
    destIndex: 0,
    days: 3,
    budgetMin: '',
    budgetMax: '',
    prefs: PREFS.map(function (name) { return { name: name, on: false } }),
    people: PEOPLE,
    peopleIndex: 2,
    rhythms: RHYTHM,
    rhythmIndex: 1,
    plan: null,
    saved: false
  },

  onLoad() {
    const names = source.destinations.map(function (d) { return d.name + ' · ' + d.area })
    const ids = source.destinations.map(function (d) { return d.id })
    this.setData({ destNames: names, destIds: ids })
  },

  onDest(e) {
    this.setData({ destIndex: Number(e.detail.value) })
  },

  onDays(e) {
    this.setData({ days: Number(e.detail.value) })
  },

  onBudgetMin(e) {
    this.setData({ budgetMin: e.detail.value.replace(/[^\d]/g, '') })
  },

  onBudgetMax(e) {
    this.setData({ budgetMax: e.detail.value.replace(/[^\d]/g, '') })
  },

  onPref(e) {
    const i = Number(e.currentTarget.dataset.index)
    const prefs = this.data.prefs.slice()
    prefs[i] = { name: prefs[i].name, on: !prefs[i].on }
    this.setData({ prefs: prefs })
  },

  onPeople(e) {
    this.setData({ peopleIndex: Number(e.currentTarget.dataset.index) })
  },

  onRhythm(e) {
    this.setData({ rhythmIndex: Number(e.currentTarget.dataset.index) })
  },

  collectOpts(seed) {
    const d = this.data
    return {
      destId: d.destIds[d.destIndex],
      days: d.days,
      budgetKey: 'normal',
      budgetMin: d.budgetMin,
      budgetMax: d.budgetMax,
      prefs: d.prefs.filter(function (p) { return p.on }).map(function (p) { return p.name }),
      people: d.people[d.peopleIndex],
      rhythm: d.rhythms[d.rhythmIndex],
      seed: seed
    }
  },

  onGenerate() {
    const min = this.data.budgetMin
    const max = this.data.budgetMax
    if ((min || max) && !(Number(min) > 0 && Number(max) > Number(min))) {
      wx.showToast({ title: '预算区间要填两个数，且上限大于下限', icon: 'none' })
      return
    }
    this.setData({ mode: 'loading' })
    setTimeout(() => {
      const plan = ai.buildPlan(this.collectOpts())
      this.setData({ mode: plan ? 'result' : 'form', plan: plan, saved: false })
      if (!plan) wx.showToast({ title: '生成失败，换个目的地试试', icon: 'none' })
    }, 1100)
  },

  onRegenerate() {
    this.setData({ mode: 'loading' })
    setTimeout(() => {
      const plan = ai.buildPlan(this.collectOpts(Date.now() % 997))
      this.setData({ mode: 'result', plan: plan, saved: false })
    }, 800)
  },

  onSave() {
    if (this.data.saved || !this.data.plan) return
    ai.savePlan(this.data.plan)
    this.setData({ saved: true })
    wx.showToast({ title: '已存入行程草案', icon: 'success' })
  },

  onBackForm() {
    this.setData({ mode: 'form', plan: null })
  }
})
