/**
 * ============================================================
 * 页面：发布攻略表单页（用户 UGC 发帖）
 * 功能：12 项表单字段填写 -> 提交后：
 *   1.【小程序原生能力】攻略存入 wx.Storage 全局缓存，
 *     模拟公共社区数据库，广场页 onShow 立刻刷新；
 *   2.【AI 能力】自动拼接「亮点关键词 + 行程描述」发送至
 *     本地后端接口（Ollama 部署 DeepSeek-R1:7B），
 *     AI 对攻略润色、补充游玩建议、优化路线、补充避坑提示；
 *   3. AI 生成内容回写进这条攻略数据（aiTips 字段），
 *     与用户原始攻略一起保存，在详情页分区展示。
 * ============================================================
 */

const STORAGE_KEY = 'community_guides' // 社区攻略列表缓存 key

/** AI 能力边界：小程序端只负责组装 prompt 并发起请求，
 *  大模型推理全部在本地后端完成（Ollama + DeepSeek-R1:7B） */
const AI_API = 'http://127.0.0.1:3000/api/chat'

/** 本地后台攻略接口（Node 服务，未启动时自动降级为仅本地缓存存储） */
const GUIDES_API = 'http://127.0.0.1:3000/api/guides?type=community'

// 表单选项常量
const TRANSPORTS = ['自驾', '高铁', '大巴']
const CROWDS = ['情侣', '学生', '结伴好友', '家庭']
const MONTHS = []
for (let i = 1; i <= 12; i++) MONTHS.push(i + '月')

Page({
  data: {
    transports: TRANSPORTS,
    // 多选项使用对象数组预计算选中态：
    // 注意 WXML 模板表达式不支持 indexOf() 等方法调用，选中态必须维护在 data 里
    crowdOptions: CROWDS.map(name => ({ name, on: false })),
    months: MONTHS,
    transportIdx: 0, // 出行方式 picker 当前下标
    monthIdx: 4,     // 月份 picker 当前下标
    submitting: false,
    form: {
      title: '',       // ① 攻略标题
      destination: '', // ② 目的地
      duration: '',    // ③ 路程时长
      budget: '',      // ④ 单人预算
      ticket: '',      // ⑤ 门票价格
      transport: '自驾', // ⑥ 出行方式（下拉）
      month: '5月',    // ⑧ 最佳出行月份（下拉）
      keywords: '',    // ⑨ 亮点关键词（逗号分隔）
      avoid: '',       // ⑩ 避雷提醒（多行）
      detail: '',      // ⑪ 详细行程描述（多行）
      author: ''       // ⑫ 发布昵称
      // ⑦ 适合人群由 crowdOptions 收集
    }
  },

  /** 文本类字段统一输入回调（小程序原生能力：bindinput + dataset） */
  onInput(e) {
    const field = e.currentTarget.dataset.field
    this.setData({ ['form.' + field]: e.detail.value })
  },

  /** 出行方式下拉选择 */
  onTransport(e) {
    const i = Number(e.detail.value)
    this.setData({ transportIdx: i, 'form.transport': TRANSPORTS[i] })
  },

  /** 最佳出行月份下拉选择 */
  onMonth(e) {
    const i = Number(e.detail.value)
    this.setData({ monthIdx: i, 'form.month': MONTHS[i] })
  },

  /** 适合人群多选切换 */
  toggleCrowd(e) {
    const i = Number(e.currentTarget.dataset.index)
    const key = 'crowdOptions[' + i + '].on'
    this.setData({ [key]: !this.data.crowdOptions[i].on })
  },

  /**
   * 提交保存：
   * 必填校验 -> 存全局缓存 -> 异步调用 AI 优化 -> 返回广场
   */
  onSubmit() {
    if (this.data.submitting) return
    const f = this.data.form

    // ---- 基础校验（标题 / 目的地 / 昵称必填）----
    if (!f.title.trim()) {
      wx.showToast({ title: '请填写攻略标题', icon: 'none' })
      return
    }
    if (!f.destination.trim()) {
      wx.showToast({ title: '请填写目的地', icon: 'none' })
      return
    }
    if (!f.author.trim()) {
      wx.showToast({ title: '请填写发布昵称', icon: 'none' })
      return
    }

    // 收集多选的适合人群
    const crowds = this.data.crowdOptions.filter(c => c.on).map(c => c.name)

    // ---- 组装攻略数据对象 ----
    const guide = Object.assign({}, f, {
      crowds: crowds,
      id: 'g' + Date.now(), // 时间戳生成唯一 id
      createdAt: Date.now(),
      aiTips: ''            // AI 优化版本内容，由 fetchAi 异步回写
    })

    // ---- 第 1 步【小程序原生能力】：存入全局缓存，模拟公共数据库 ----
    const guides = wx.getStorageSync(STORAGE_KEY) || []
    guides.unshift(guide) // 新攻略插入最前，广场立刻置顶刷新
    wx.setStorageSync(STORAGE_KEY, guides)

    // ---- 第 2 步【AI 能力】：异步调用大模型优化攻略，不阻塞发帖流程 ----
    this.fetchAi(guide)

    // ---- 同步到本地后台服务（可选）：后台未启动时降级为仅本地缓存 ----
    wx.request({
      url: GUIDES_API,
      method: 'POST',
      timeout: 5000,
      header: { 'content-type': 'application/json' },
      data: guide,
      fail() {
        wx.showToast({ title: '后台未连接，已存本地', icon: 'none' })
      }
    })

    // ---- 第 3 步：提示并自动返回社区广场 ----
    wx.showToast({ title: '发布成功', icon: 'success' })
    this.setData({ submitting: true })
    setTimeout(() => {
      wx.navigateBack({ delta: 1 })
    }, 600)
  },

  /**
   * 【AI 能力】调用本地 DeepSeek-R1:7B 大模型优化攻略
   * 发送内容：亮点关键词 + 行程描述（附标题/目的地/避雷作上下文）
   * 请求格式兼容常见封装层：{ model, message }
   */
  fetchAi(guide) {
    const prompt =
      '你是一位文旅路线规划助手。请基于下面这条攻略的亮点关键词和详细行程，对攻略进行润色，' +
      '补充游玩建议、优化路线安排、补充避坑提示，输出精简的中文建议：\n' +
      '攻略标题：' + guide.title + '\n' +
      '目的地：' + guide.destination + '\n' +
      '亮点关键词：' + guide.keywords + '\n' +
      '详细行程：' + guide.detail + '\n' +
      '避雷提醒：' + guide.avoid

    wx.request({
      url: AI_API,
      method: 'POST',
      timeout: 120000, // DeepSeek-R1 带思维链推理较慢，超时放宽到 2 分钟
      header: { 'content-type': 'application/json' },
      data: {
        model: 'deepseek-r1:7b',
        message: prompt
      },
      success: res => {
        const tips = this.parseAiText(res.data)
        if (tips) {
          // AI 内容回写进这条攻略，与原始攻略一起保存
          const guides = wx.getStorageSync(STORAGE_KEY) || []
          const idx = guides.findIndex(g => g.id === guide.id)
          if (idx > -1) {
            guides[idx].aiTips = tips
            wx.setStorageSync(STORAGE_KEY, guides)
          }
        }
      },
      fail() {
        // AI 服务未启动不影响发帖：攻略已保存，详情页会提供重试入口
      }
    })
  },

  /**
   * 解析 AI 响应文本：兼容多种后端返回格式
   * （reply / response / answer / text / message / Ollama 原生 message.content / 嵌套 data）
   * 并过滤 DeepSeek-R1 的 <think> 思维链标签，只保留正式回答
   */
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
  }

  /* ==========================================================
   * 【扩展预留 · 后续版本规划】
   * - 发布前 AI 预检：提交前先调 /api/chat 做敏感词/违规内容审核；
   * - 图片上传：wx.chooseMedia 选择攻略配图，存本地临时路径。
   * ========================================================== */
})
