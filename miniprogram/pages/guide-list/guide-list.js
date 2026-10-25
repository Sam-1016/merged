/**
 * ============================================================
 * 漫途 · AI 文旅攻略共创社区
 * 文件：pages/guide-list/guide-list.js
 * 我的攻略列表页：
 *   - 读取 my_guides，展示已创建攻略，支持编辑、删除与发布到社区。
 * ============================================================
 */
const STORAGE_KEY = 'my_guides'

Page({
  data: {
    guides: [],
    total: 0
  },

  onShow() {
    const guides = wx.getStorageSync(STORAGE_KEY) || []
    // 关键词字符串转数组，方便卡片展示
    const list = guides.map(item => {
      const kw = (item.keywords || '')
        .split(/[,，]/)
        .map(s => s.trim())
        .filter(Boolean)
      return Object.assign({}, item, { keywordList: kw })
    })
    this.setData({ guides: list, total: list.length })
  },

  goCreate() {
    wx.navigateTo({ url: '/pages/guide-create/guide-create' })
  },

  onCard(e) {
    wx.navigateTo({
      url: '/pages/guide-create/guide-create?id=' + e.currentTarget.dataset.id
    })
  },

  // 一键把我的攻略发布到社区（复制一份，免重填）
  publishToCommunity(e) {
    const id = e.currentTarget.dataset.id
    const guides = wx.getStorageSync(STORAGE_KEY) || []
    const idx = guides.findIndex(g => g.id === id)
    if (idx < 0) return
    if (guides[idx].publishedToCommunity) {
      wx.showToast({ title: '已经发布过了', icon: 'none' })
      return
    }
    wx.showModal({
      title: '发布到攻略社区',
      editable: true,
      placeholderText: '输入展示用的昵称',
      confirmText: '发布',
      success: res => {
        if (!res.confirm) return
        const author = (res.content || '').trim() || '匿名驴友'
        const community = wx.getStorageSync('community_guides') || []
        const copy = Object.assign({}, guides[idx], {
          id: 'g' + Date.now(),
          author: author,
          createdAt: Date.now(),
          likes: 0
        })
        delete copy.publishedToCommunity
        community.unshift(copy)
        wx.setStorageSync('community_guides', community)
        // 同步到本地后台服务（可选）：后台未启动时降级为仅本地缓存
        wx.request({
          url: 'http://127.0.0.1:3000/api/guides?type=community',
          method: 'POST',
          timeout: 5000,
          header: { 'content-type': 'application/json' },
          data: copy,
          fail() {
            wx.showToast({ title: '后台未连接，已存本地', icon: 'none' })
          }
        })
        guides[idx].publishedToCommunity = true
        wx.setStorageSync(STORAGE_KEY, guides)
        this.onShow()
        wx.showToast({ title: '已发布到社区', icon: 'success' })
      }
    })
  }
})
