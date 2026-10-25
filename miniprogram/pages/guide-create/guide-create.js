/**
 * ============================================================
 * 漫途 · AI 文旅攻略共创社区
 * 文件：pages/guide-create/guide-create.js
 * 攻略创建 / 编辑页：
 *   - 表单录入标题、行程、预算、关键词等信息，支持 AI 辅助润色；
 *   - 保存后写入 my_guides 本地缓存，并支持查看模式复用同一页面。
 * ============================================================
 */
const STORAGE_KEY = 'my_guides'
const AI_API = 'http://127.0.0.1:3000/api/chat'

const TRANSPORTS = ['自驾', '高铁', '大巴']
const CROWDS = ['情侣', '学生', '朋友结伴']
const MONTHS = []
for (let i = 1; i <= 12; i++) MONTHS.push(i + '月')

Page({
  data: {
    isView: false, // 详情查看模式
    id: '',
    transports: TRANSPORTS,
    crowds: CROWDS,
    months: MONTHS,
    aiLoading: false,
    // 多选项用对象数组，WXML 不支持 indexOf 方法调用，选中态必须预计算
    crowdOptions: CROWDS.map(name => ({ name, on: false })),
    transportIdx: 0,
    monthIdx: 2,
    form: {
      title: '',
      destination: '',
      duration: '',
      budget: '',
      ticket: '',
      transport: '自驾',
      crowds: [],
      month: '3月',
      keywords: '',
      avoid: '',
      detail: ''
    },
    aiTips: ''
  },

  onLoad(options) {
    if (options && options.id) {
      const guides = wx.getStorageSync(STORAGE_KEY) || []
      const found = guides.find(g => g.id === options.id)
      if (found) {
        this.setData({ isView: true, id: found.id, form: found, aiTips: found.aiTips || '' })
        wx.setNavigationBarTitle({ title: '攻略详情' })
        // 详情页打开时若还没有 AI 建议，自动补拉一次
        if (!found.aiTips) {
          this.fetchAi(found)
        }
      }
    }
  },

  onInput(e) {
    const field = e.currentTarget.dataset.field
    this.setData({ ['form.' + field]: e.detail.value })
  },

  onTransport(e) {
    const i = Number(e.detail.value)
    this.setData({ transportIdx: i, 'form.transport': TRANSPORTS[i] })
  },

  onMonth(e) {
    const i = Number(e.detail.value)
    this.setData({ monthIdx: i, 'form.month': MONTHS[i] })
  },

  toggleCrowd(e) {
    const i = Number(e.currentTarget.dataset.index)
    const key = 'crowdOptions[' + i + '].on'
    this.setData({ [key]: !this.data.crowdOptions[i].on })
  },

  onSubmit() {
    const f = this.data.form

    if (!f.title.trim()) {
      wx.showToast({ title: '请填写攻略标题', icon: 'none' })
      return
    }
    if (!f.destination.trim()) {
      wx.showToast({ title: '请填写目的地', icon: 'none' })
      return
    }

    const crowds = this.data.crowdOptions.filter(c => c.on).map(c => c.name)
    const guide = Object.assign({}, f, {
      crowds: crowds,
      id: 'g' + Date.now(),
      createdAt: Date.now(),
      aiTips: ''
    })

    // 1. 存本地缓存
    const guides = wx.getStorageSync(STORAGE_KEY) || []
    guides.unshift(guide)
    wx.setStorageSync(STORAGE_KEY, guides)

    // 2. 把关键词发给本地 AI 后端，异步补充推荐（不阻塞返回）
    this.fetchAi(guide)

    // 3. 返回列表页
    wx.showToast({ title: '已保存', icon: 'success' })
    setTimeout(() => {
      wx.navigateBack({ delta: 1 })
    }, 600)
  },

  retryAi() {
    this.fetchAi(this.data.form)
  },

  // 解析各种可能的后端返回格式，并过滤 r1 的 <think> 思考段
  parseAiText(d) {
    if (!d) return ''
    let text = ''
    if (typeof d === 'string') text = d
    else if (typeof d.reply === 'string') text = d.reply
    else if (typeof d.response === 'string') text = d.response
    else if (typeof d.answer === 'string') text = d.answer
    else if (typeof d.text === 'string') text = d.text
    else if (typeof d.message === 'string') text = d.message
    else if (d.message && typeof d.message.content === 'string') text = d.message.content // Ollama 原生格式
    else if (d.data) return this.parseAiText(d.data) // 外层包 data 的情况
    return text.replace(/<think>[\s\S]*?<\/think>/g, '').trim()
  },

  fetchAi(guide) {
    const viewingThis = this.data.isView && this.data.id === guide.id
    if (viewingThis) this.setData({ aiLoading: true })

    const prompt =
      '你是一位文旅路线规划助手。请基于下面这条攻略信息，补充推荐并优化攻略，给出精简建议：\n' +
      '攻略标题：' + guide.title + '\n' +
      '目的地：' + guide.destination + '\n' +
      '路程时长：' + guide.duration + '\n' +
      '总预算/单人：' + guide.budget + '\n' +
      '门票价格：' + guide.ticket + '\n' +
      '出行方式：' + guide.transport + '\n' +
      '适合人群：' + (guide.crowds || []).join('、') + '\n' +
      '最佳出行月份：' + guide.month + '\n' +
      '亮点关键词：' + guide.keywords + '\n' +
      '避雷提醒：' + guide.avoid + '\n' +
      '详细行程：' + guide.detail

    wx.request({
      url: AI_API,
      method: 'POST',
      timeout: 120000, // deepseek-r1 推理较慢，给足 2 分钟
      header: { 'content-type': 'application/json' },
      data: {
        model: 'deepseek-r1:7b',
        message: prompt
      },
      success: res => {
        const tips = this.parseAiText(res.data)
        if (tips) {
          // 写回缓存
          const guides = wx.getStorageSync(STORAGE_KEY) || []
          const idx = guides.findIndex(g => g.id === guide.id)
          if (idx > -1) {
            guides[idx].aiTips = tips
            wx.setStorageSync(STORAGE_KEY, guides)
          }
          // 若当前详情页正在看这条，直接刷新显示
          if (viewingThis) this.setData({ aiTips: tips, aiLoading: false })
        } else if (viewingThis) {
          this.setData({ aiLoading: false })
        }
      },
      fail: () => {
        // AI 服务未响应等情况不影响攻略本身
        if (viewingThis) this.setData({ aiLoading: false })
      }
    })
  }
})
