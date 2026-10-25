/**
 * ============================================================
 * 漫途 · AI 文旅攻略共创社区
 * 文件：pages/settings/settings.js
 * 设置页：
 *   - 本地开关项（推送、高清图、当季推荐等），不涉及服务端。
 * ============================================================
 */
Page({
  data: {
    push: true,
    hd: true,
    season: true,
    recommend: false
  },

  onToggle(e) {
    const next = {}
    next[e.currentTarget.dataset.field] = e.detail.value
    this.setData(next)
  }
})
