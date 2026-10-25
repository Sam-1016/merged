/**
 * ============================================================
 * 漫途 · AI 文旅攻略共创社区
 * 文件：components/nav-bar/nav-bar.js
 * 自定义导航栏组件：
 *   - 提供统一的沉浸式导航栏，标题、主题、透明/实底状态可配；
 *   - 配合页面滚动切换实底，适配各机型状态栏高度。
 * ============================================================
 */
Component({
  properties: {
    title: {
      type: String,
      value: ''
    },
    solid: {
      type: Boolean,
      value: true
    },
    theme: {
      type: String,
      value: 'dark'
    },
    placeholder: {
      type: Boolean,
      value: true
    },
    align: {
      type: String,
      value: 'center'
    }
  },
  data: {
    statusBarHeight: 20
  },
  lifetimes: {
    attached() {
      const app = getApp()
      this.setData({
        statusBarHeight: app.globalData.statusBarHeight || 20
      })
    }
  },
  methods: {
    onBack() {
      const pages = getCurrentPages()
      if (pages.length > 1) {
        wx.navigateBack()
        return
      }
      wx.switchTab({
        url: '/pages/index/index'
      })
    }
  }
})
