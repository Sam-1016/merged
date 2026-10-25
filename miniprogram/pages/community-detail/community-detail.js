/**
 * ============================================================
 * 页面：攻略详情页
 * 功能：分区展示——
 *   ① 用户原创提交的完整攻略信息（小程序原生能力：缓存读取渲染）；
 *   ② AI 智能优化后的推荐方案（AI 能力：DeepSeek-R1:7B 生成，
 *      发布时已随攻略存入 aiTips 字段；若发布时 AI 服务未响应，
 *      打开本页会自动补拉一次，也支持手动重试）；
 *   ③ 支持返回社区广场。
 * ============================================================
 */

const STORAGE_KEY = 'community_guides'

/** AI 能力边界：小程序端只组装 prompt 发请求，推理在本地 Ollama 服务完成 */
const AI_API = 'http://127.0.0.1:3000/api/chat'

/** 发布时间格式化：M月D日 HH:mm（小程序原生能力） */
function fmtTime(ts) {
  const d = new Date(ts)
  const hh = d.getHours() < 10 ? '0' + d.getHours() : '' + d.getHours()
  const mm = d.getMinutes() < 10 ? '0' + d.getMinutes() : '' + d.getMinutes()
  return (d.getMonth() + 1) + '月' + d.getDate() + '日 ' + hh + ':' + mm
}

Page({
  data: {
    id: '',
    guide: null,   // 用户原创攻略完整数据
    aiTips: '',    // AI 优化后的推荐方案
    aiLoading: false
  },

  onLoad(options) {
    if (!options || !options.id) return
    const guides = wx.getStorageSync(STORAGE_KEY) || []
    const found = guides.find(g => g.id === options.id)
    if (!found) return

    // 预处理展示字段（WXML 不支持 split 等方法调用，必须在 JS 侧处理）
    found.timeLabel = fmtTime(found.createdAt)
    found.keywordList = (found.keywords || '')
      .split(/[,，]/)
      .map(s => s.trim())
      .filter(Boolean)
    this.setData({ id: found.id, guide: found, aiTips: found.aiTips || '' })

    // 发布时若 AI 未响应（本地服务未开），打开详情页自动补拉一次
    if (!found.aiTips) {
      this.fetchAi(found)
    }
  },

  /** 返回社区广场（页面栈只有一层时用 switchTab 兜底） */
  goBack() {
    if (getCurrentPages().length > 1) {
      wx.navigateBack({ delta: 1 })
    } else {
      wx.switchTab({ url: '/pages/community/community' })
    }
  },

  /** 手动重试获取 AI 优化建议 */
  retryAi() {
    if (this.data.guide) this.fetchAi(this.data.guide)
  },

  /**
   * 【AI 能力】调用本地 DeepSeek-R1:7B 生成优化推荐方案
   * 成功后回写缓存，同一份数据在广场/详情保持一致
   */
  fetchAi(guide) {
    this.setData({ aiLoading: true })
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
      timeout: 120000, // R1 思维链推理较慢，放宽到 2 分钟
      header: { 'content-type': 'application/json' },
      data: {
        model: 'deepseek-r1:7b',
        message: prompt
      },
      success: res => {
        const tips = this.parseAiText(res.data)
        if (tips) {
          const guides = wx.getStorageSync(STORAGE_KEY) || []
          const idx = guides.findIndex(g => g.id === guide.id)
          if (idx > -1) {
            guides[idx].aiTips = tips
            wx.setStorageSync(STORAGE_KEY, guides)
          }
          this.setData({ aiTips: tips, aiLoading: false })
        } else {
          this.setData({ aiLoading: false })
        }
      },
      fail: () => {
        this.setData({ aiLoading: false })
      }
    })
  },

  /**
   * 解析 AI 响应：兼容 reply/response/answer/text/message/
   * Ollama 原生 message.content/嵌套 data 等格式，
   * 并过滤 <think> 思维链标签
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
    else if (d.message && typeof d.message.content === 'string') text = d.message.content
    else if (d.data) return this.parseAiText(d.data)
    return text.replace(/<think>[\s\S]*?<\/think>/g, '').trim()
  }

  /* ==========================================================
   * 【扩展预留 · 后续版本规划】（已写入参赛文档落地规划）
   * 1. 点赞：onLike() —— 攻略增加 likes 字段，
   *    点赞记录存 community_liked_ids 缓存防重复；
   * 2. 收藏：onFav() —— 收藏副本存 favorite_guides 缓存，
   *    配套"我的收藏"列表页；
   * 3. AI 景点讲解：新增入口调 /api/chat 传入景点名，
   *    由 DeepSeek-R1 生成讲解文案；
   * 4. 景点 OCR 识别：wx.chooseMedia 拍照后上传 OCR 服务，
   *    识别景点介绍牌文字并接入 AI 讲解。
   * ========================================================== */
})
