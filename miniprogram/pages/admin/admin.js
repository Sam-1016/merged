/**
 * ============================================================
 * 页面：攻略管理后台页（社区内容管理）
 * 功能：
 *   1. 读取社区攻略列表 —— 优先请求本地后台服务（Node 服务），
 *      后台未启动时自动降级读取小程序本地缓存，演示不受影响；
 *   2. 删除攻略 —— 在线时同步删除后台数据，离线时删除本地缓存；
 *   3. 重置演示数据 —— 一键恢复 8 条内置演示攻略
 *      （与社区广场页共用 utils/seed-guides.js 同一份数据）；
 *   4. 顶部状态条实时显示后台连接状态，可手动刷新。
 * 入口：「我的」页菜单 -> 攻略管理后台。
 * ============================================================
 */

const STORAGE_KEY = 'community_guides' // 社区攻略列表缓存 key（与社区广场页一致）
const SEED_GUIDES = require('../../utils/seed-guides')
const API = 'http://127.0.0.1:3000' // 本地后台服务地址

/**
 * 发布时间格式化（与社区广场页同一套展示规则）
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
    guides: [],   // 攻略列表
    total: 0,
    online: false, // 本地后台是否已连接
    loading: true
  },

  onShow() {
    this.load()
  },

  /**
   * 加载列表：先探测后台，在线则以后台数据为准（并回写缓存），
   * 离线则读取本地缓存，保证参赛演示时后台未启动页面也可用
   */
  load() {
    this.setData({ loading: true })
    wx.request({
      url: API + '/api/guides?type=community',
      timeout: 3000,
      success: res => {
        const list = (res.data && res.data.list) || []
        wx.setStorageSync(STORAGE_KEY, list) // 同步进缓存，广场页保持一致
        this.renderList(list, true)
      },
      fail: () => {
        const list = wx.getStorageSync(STORAGE_KEY) || []
        this.renderList(list, false)
      }
    })
  },

  /** 预处理展示字段并渲染 */
  renderList(list, online) {
    const guides = list.map(item => {
      const kw = (item.keywords || '')
        .split(/[,，]/)
        .map(s => s.trim())
        .filter(Boolean)
      return Object.assign({}, item, {
        keywordList: kw,
        timeLabel: fmtTime(item.createdAt || Date.now())
      })
    })
    this.setData({ guides: guides, total: guides.length, online: online, loading: false })
  },

  /** 手动刷新 */
  onRefresh() {
    this.load()
  },

  /** 删除单条攻略（在线删后台 + 本地，离线删本地） */
  onDelete(e) {
    const id = e.currentTarget.dataset.id
    wx.showModal({
      title: '删除攻略',
      content: '删除后不可恢复，确定删除该攻略吗？',
      confirmText: '删除',
      confirmColor: '#b3402a',
      success: res => {
        if (!res.confirm) return
        const removeLocal = () => {
          const list = (wx.getStorageSync(STORAGE_KEY) || []).filter(g => g.id !== id)
          wx.setStorageSync(STORAGE_KEY, list)
        }
        if (this.data.online) {
          wx.request({
            url: API + '/api/guides?type=community&id=' + id,
            method: 'DELETE',
            timeout: 5000,
            success: () => {
              removeLocal()
              this.load()
              wx.showToast({ title: '已删除', icon: 'success' })
            },
            fail: () => {
              removeLocal()
              this.load()
              wx.showToast({ title: '后台请求失败，已删本地', icon: 'none' })
            }
          })
        } else {
          removeLocal()
          this.load()
          wx.showToast({ title: '已删除（本地）', icon: 'success' })
        }
      }
    })
  },

  /** 一键重置为内置演示数据（在线同步后台，离线写本地缓存） */
  onReset() {
    wx.showModal({
      title: '重置演示数据',
      content: '将清空当前全部攻略，恢复为 8 条内置演示攻略，确定吗？',
      confirmText: '重置',
      success: res => {
        if (!res.confirm) return
        const seed = SEED_GUIDES.slice()
        if (this.data.online) {
          wx.request({
            url: API + '/api/guides?type=community',
            method: 'PUT',
            timeout: 5000,
            header: { 'content-type': 'application/json' },
            data: { list: seed },
            success: () => {
              wx.setStorageSync(STORAGE_KEY, seed)
              this.load()
              wx.showToast({ title: '已重置', icon: 'success' })
            },
            fail: () => {
              wx.setStorageSync(STORAGE_KEY, seed)
              this.load()
              wx.showToast({ title: '后台请求失败，已重置本地', icon: 'none' })
            }
          })
        } else {
          wx.setStorageSync(STORAGE_KEY, seed)
          this.load()
          wx.showToast({ title: '已重置（本地）', icon: 'success' })
        }
      }
    })
  },

  /** 点击攻略卡片：跳转攻略详情页 */
  onCard(e) {
    wx.navigateTo({
      url: '/pages/community-detail/community-detail?id=' + e.currentTarget.dataset.id
    })
  }
})
