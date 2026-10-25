/**
 * ============================================================
 * 漫途 · AI 文旅攻略共创社区
 * 文件：utils/data.js
 * 本地数据访问层：
 *   - 统一维护本地缓存键（收藏 / 足迹 / 我的攻略 / 社区攻略）；
 *   - 对外暴露攻略、目的地查询与读写方法，页面不直接操作 Storage。
 * ============================================================
 */
const guides = require('./guides.js')
const destinations = require('./places.js')

const monthNames = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']

const homeEntries = [
  { name: '城市', mark: '城', value: '城市漫步', type: 'guide' },
  { name: '山野', mark: '野', value: '自然风光', type: 'guide' },
  { name: '海岛', mark: '岛', value: '海岛', type: 'guide' },
  { name: '美食', mark: '味', value: '美食', type: 'guide' },
  { name: '西南', mark: '南', value: '西南', type: 'dest' },
  { name: '海外', mark: '远', value: '海外', type: 'dest' },
  { name: '文化', mark: '文', value: '文化', type: 'guide' },
  { name: '华东', mark: '东', value: '华东', type: 'dest' }
]

const guideFilters = ['全部', '城市漫步', '自然风光', '美食', '海岛', '文化']
const destFilters = ['全部', '西南', '华东', '华北', '西北', '华中', '海岛', '海外']
const hotWords = ['大理', '京都', '极光', '火锅', '鼓浪屿', '三亚', '胡同', '阳朔']
const defaultRecent = ['阳朔', '武康路', '环海西路']

const historySeed = [
  { id: 'iceland-7', time: '今天 09:24' },
  { id: 'shanghai-night', time: '昨天 21:06' },
  { id: 'guilin-4', time: '昨天 14:18' },
  { id: 'beijing-hutong', time: '10月17日' },
  { id: 'sanya-winter', time: '10月12日' },
  { id: 'xiamen-walk', time: '10月8日' }
]

const draftSeed = [
  { id: 'dali-3d', date: '10.24 – 10.26', status: '编排中' },
  { id: 'kyoto-day', date: '11.08', status: '待出发' }
]

const initialFavoriteIds = ['dali-3d', 'kyoto-day', 'chengdu-48h', 'bali-5']

destinations.forEach(function (dest) {
  dest.guideCount = guides.filter(function (item) {
    return item.destId === dest.id
  }).length
})

guides.forEach(function (guide) {
  guide.infos = [
    { label: '最佳季节', value: guide.season },
    { label: '人均预算', value: guide.budgetText },
    { label: '适合', value: guide.people },
    { label: '节奏', value: guide.rhythm }
  ]
})

function getGuide(id) {
  for (let i = 0; i < guides.length; i += 1) {
    if (guides[i].id === id) return guides[i]
  }
  return null
}

function getDest(id) {
  for (let i = 0; i < destinations.length; i += 1) {
    if (destinations[i].id === id) return destinations[i]
  }
  return null
}

function guidesForDest(destId) {
  return guides.filter(function (item) {
    return item.destId === destId
  })
}

function relatedGuides(guide, limit) {
  const sameDest = []
  const sameCat = []
  guides.forEach(function (item) {
    if (!guide || item.id === guide.id) return
    if (item.destId === guide.destId) sameDest.push(item)
    else if (item.category === guide.category) sameCat.push(item)
  })
  return sameDest.concat(sameCat).slice(0, limit || 3)
}

function favoriteIds() {
  try {
    const app = getApp()
    if (app && app.globalData && app.globalData.favoriteIds) {
      return app.globalData.favoriteIds
    }
  } catch (err) {
    return initialFavoriteIds
  }
  return initialFavoriteIds
}

function isFavorite(id) {
  return favoriteIds().indexOf(id) >= 0
}

function toggleFavorite(id) {
  const app = getApp()
  const ids = favoriteIds().slice()
  const index = ids.indexOf(id)
  if (index >= 0) ids.splice(index, 1)
  else ids.unshift(id)
  app.globalData.favoriteIds = ids
  // 写入缓存，重开小程序收藏不丢
  try {
    wx.setStorageSync('favorite_ids', ids)
  } catch (e) {}
  return index < 0
}

function getFavorites() {
  const list = []
  favoriteIds().forEach(function (id) {
    const guide = getGuide(id)
    if (guide) list.push(guide)
  })
  return list
}

/**
 * 浏览足迹：真实记录用户浏览过的攻略详情
 * 存储于全局缓存 view_history（重开小程序不丢），
 * 无记录时回退到内置演示数据，保证参赛演示页面不为空。
 */
const HISTORY_KEY = 'view_history'
const HISTORY_MAX = 50

function pad2(n) {
  return n < 10 ? '0' + n : '' + n
}

/** 时间戳 -> 展示文案：今天 HH:mm / 昨天 HH:mm / M月D日 */
function fmtHistoryTime(ts) {
  const d = new Date(ts)
  const hm = pad2(d.getHours()) + ':' + pad2(d.getMinutes())
  const today = new Date()
  if (d.toDateString() === today.toDateString()) return '今天 ' + hm
  const yesterday = new Date(today.getTime() - 86400000)
  if (d.toDateString() === yesterday.toDateString()) return '昨天 ' + hm
  return (d.getMonth() + 1) + '月' + d.getDate() + '日'
}

/** 记录一次浏览（按 id 去重置顶，最多保留 50 条） */
function addHistory(id) {
  if (!getGuide(id)) return
  let list = []
  try {
    list = wx.getStorageSync(HISTORY_KEY) || []
  } catch (e) {}
  list = list.filter(function (item) { return item.id !== id })
  list.unshift({ id: id, ts: Date.now() })
  if (list.length > HISTORY_MAX) list = list.slice(0, HISTORY_MAX)
  try {
    wx.setStorageSync(HISTORY_KEY, list)
  } catch (e) {}
}

function getHistory() {
  let stored = []
  try {
    stored = wx.getStorageSync(HISTORY_KEY) || []
  } catch (e) {}
  const src = stored.length ? stored : historySeed
  return src.map(function (item) {
    const time = item.ts ? fmtHistoryTime(item.ts) : item.time
    return Object.assign({}, getGuide(item.id), { time: time })
  }).filter(function (item) {
    return !!item.title
  })
}

function getDrafts() {
  return draftSeed.map(function (item) {
    return Object.assign({}, getGuide(item.id), {
      date: item.date,
      status: item.status
    })
  })
}

function filterGuides(keyword) {
  const text = (keyword || '').trim()
  if (!text) return []
  return guides.filter(function (item) {
    const blob = [
      item.title,
      item.city,
      item.category,
      item.excerpt,
      item.route,
      item.tags.join(' ')
    ].join(' ')
    return blob.indexOf(text) >= 0
  })
}

function filterDestinations(keyword) {
  const text = (keyword || '').trim()
  if (!text) return []
  return destinations.filter(function (item) {
    const blob = [item.name, item.area, item.group, item.slogan, item.intro].join(' ')
    return blob.indexOf(text) >= 0
  })
}

module.exports = {
  monthNames,
  homeEntries,
  guideFilters,
  destFilters,
  hotWords,
  defaultRecent,
  guides,
  destinations,
  getGuide,
  getDest,
  guidesForDest,
  relatedGuides,
  isFavorite,
  toggleFavorite,
  getFavorites,
  addHistory,
  getHistory,
  getDrafts,
  filterGuides,
  filterDestinations
}
