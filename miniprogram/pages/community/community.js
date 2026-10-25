/**
 * ============================================================
 * 页面：社区广场页（公共 UGC 社区）
 * 功能：展示全部用户发布的文旅攻略卡片，所有用户可见，
 *       底部居中悬浮圆形加号跳转发布页，点击卡片进详情页。
 * 说明：数据采用 wx.Storage 全局缓存模拟公共数据库，
 *       无需云数据库即可本地完整演示（适配参赛演示视频录制）。
 * ============================================================
 */

const STORAGE_KEY = 'community_guides' // 社区攻略列表的缓存 key（模拟公共数据库表）

/**
 * 首次进入时的演示数据（模拟社区里其他用户已发布的攻略）
 * 已抽取到 utils/seed-guides.js，便于参赛演示时广场不为空，
 * 并供攻略管理后台页「重置演示数据」功能复用同一份数据。
 */
const SEED_GUIDES = require('../../utils/seed-guides')

/** 本地后台服务地址（Node 本地服务，未启动时自动降级为纯本地缓存演示） */
const API = 'http://127.0.0.1:3000'

/**
 * 发布时间格式化（小程序原生能力：纯前端工具函数）
 * 1 小时内显示"x 分钟前"，1 天内"x 小时前"，1 周内"x 天前"，否则显示日期
 */
function fmtTime(ts) {
  const d = new Date(ts)
  const diff = Date.now() - ts
  if (diff < 3600000) return Math.max(1, Math.floor(diff / 60000)) + ' 分钟前'
  if (diff < 86400000) return Math.floor(diff / 3600000) + ' 小时前'
  if (diff < 86400000 * 7) return Math.floor(diff / 86400000) + ' 天前'
  return (d.getMonth() + 1) + '月' + d.getDate() + '日'
}

Page({
  data: {
    guides: [], // 攻略卡片列表
    total: 0
  },

  /** 每次进入/返回广场都重新读取缓存，保证发布的新攻略立刻刷新 */
  onShow() {
    this.render()
    this.syncFromServer()
  },

  /**
   * 从本地后台拉取最新攻略列表：
   * 后台在线 -> 以后台数据为准并同步进缓存（管理后台的删除/重置立刻生效）；
   * 后台未启动 -> 静默降级，继续用本地缓存演示，功能不受影响。
   */
  syncFromServer() {
    wx.request({
      url: API + '/api/guides?type=community',
      timeout: 3000,
      success: res => {
        const list = (res.data && res.data.list) || []
        if (list.length) {
          wx.setStorageSync(STORAGE_KEY, list)
          this.render()
        }
      },
      fail() { /* 后台未连接，保持本地缓存演示 */ }
    })
  },

  /**
   * 读取缓存并渲染列表（小程序原生能力：wx.getStorageSync）
   * 首次打开时写入演示数据，模拟公共社区已有内容
   */
  render() {
    let guides = wx.getStorageSync(STORAGE_KEY)
    if (!guides || !guides.length) {
      guides = SEED_GUIDES
      wx.setStorageSync(STORAGE_KEY, guides)
    }
    // 预处理展示字段：关键词字符串 -> 标签数组；行程 -> 45 字摘要；时间戳 -> 相对时间
    const list = guides.map(item => {
      const kw = (item.keywords || '')
        .split(/[,，]/)
        .map(s => s.trim())
        .filter(Boolean)
      const excerpt = (item.detail || '').replace(/\n/g, ' ').slice(0, 45)
      return Object.assign({}, item, {
        keywordList: kw,
        excerpt: excerpt + ((item.detail || '').length > 45 ? '…' : ''),
        timeLabel: fmtTime(item.createdAt)
      })
    })
    this.setData({ guides: list, total: list.length })
  },

  /** 悬浮加号：跳转发布攻略表单页 */
  goPublish() {
    wx.navigateTo({ url: '/pages/publish/publish' })
  },

  /** 点击卡片：跳转攻略详情页 */
  onCard(e) {
    wx.navigateTo({
      url: '/pages/community-detail/community-detail?id=' + e.currentTarget.dataset.id
    })
  }

  /* ==========================================================
   * 【扩展预留 · 后续版本规划】（已写入参赛文档落地规划）
   * 1. 点赞：onLike(e) —— 攻略数据增加 likes 字段，
   *    点赞记录存独立缓存 community_liked_ids 防重复点赞；
   * 2. 收藏：onFav(e) —— 收藏副本存 favorite_guides 缓存，
   *    配套"我的收藏"列表页；
   * 3. AI 景点讲解：详情页新增入口，调用 /api/chat 传入景点名，
   *    由 DeepSeek-R1 生成讲解文案；
   * 4. 景点 OCR 识别：调用 wx.chooseMedia 拍照/选图，
   *    上传至 OCR 服务识别景点文字信息。
   * ========================================================== */
})
