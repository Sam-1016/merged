/**
 * ============================================================
 * 漫途 · AI 文旅攻略共创社区
 * 文件：utils/ai.js
 * AI 能力封装模块：
 *   - 统一请求后端 /api/chat 接口桥接本地 Ollama 模型；
 *   - 负责超时控制、返回内容解析、思维链过滤与失败降级到本地模板。
 * ============================================================
 */
const source = require('./data.js')
const extras = require('./extras.js')

const STORAGE_KEY = 'ai_plans_v1'

const TOPIC_META = {
  overview: { key: 'overview', name: '总览', mark: '览' },
  route: { key: 'route', name: '怎么走', mark: '路' },
  food: { key: 'food', name: '吃什么', mark: '味' },
  stay: { key: 'stay', name: '住哪里', mark: '住' },
  tips: { key: 'tips', name: '避坑', mark: '坑' }
}

const PREF_WORDS = {
  '美食': ['吃', '面', '茶', '餐', '鱼', '汤', '甜', '市场', ' cafe', '饵', '火锅'],
  '自然风光': ['海', '山', '湖', '田', '林', '河', '滩', '日', '瀑', '岛', '湾'],
  '文化': ['寺', '古', '院', '巷', '城', '馆', '庙', '宫', '居'],
  '海岛': ['海', '岛', '滩', '湾', '浮潜'],
  '城市漫步': ['街', '路', '巷', '桥', '市场', '公园']
}

const RHYTHM_PLACES = { '慢': 1, '适中': 2, '紧凑': 3 }
const BUDGET_LEVELS = [
  { key: 'tight', name: '经济', low: 0.7, high: 0.9 },
  { key: 'normal', name: '适中', low: 1.0, high: 1.25 },
  { key: 'loose', name: '宽裕', low: 1.45, high: 1.85 }
]

function pick(list, seed) {
  if (!list || !list.length) return ''
  return list[Math.abs(seed || 0) % list.length]
}

function pad2(n) {
  return n < 10 ? '0' + n : String(n)
}

function parseMoney(text) {
  const m = /(\d+)/.exec(text || '')
  return m ? parseInt(m[1], 10) : 0
}

function parseDays(text) {
  const m = /(\d+)/.exec(text || '')
  return m ? parseInt(m[1], 10) : 3
}

function spotMeta(destId, name) {
  const d = extras[destId]
  return d && d.spotMeta ? (d.spotMeta[name] || null) : null
}

function hashStr(s) {
  let h = 0
  for (let i = 0; i < s.length; i += 1) h = (h * 31 + s.charCodeAt(i)) & 0x7fffffff
  return h
}

/**
 * 生成两地之间的交通段（确定性伪随机，模拟地图软件的时长估算）。
 * return: { from, to, mode, minutes, costText }
 */
function legBetween(from, to, seed) {
  const h = (hashStr(from + '→' + to) + seed) & 0x7fffffff
  const r = h % 100
  if (r < 42) {
    return { from: from, to: to, mode: '步行', minutes: 6 + (h % 16), costText: '' }
  }
  if (r < 78) {
    return { from: from, to: to, mode: '公交', minutes: 12 + (h % 24), costText: '¥2–4' }
  }
  return { from: from, to: to, mode: '打车', minutes: 8 + (h % 18), costText: '¥' + (12 + (h % 20)) }
}

function buildLegs(places, seed) {
  const legs = []
  if (!places.length) return legs
  let prev = '住宿地'
  for (let i = 0; i < places.length; i += 1) {
    legs.push(legBetween(prev, places[i], seed + i * 13))
    prev = places[i]
  }
  return legs
}

/* ---------------- AI 讲解 ---------------- */

function overviewParas(dest, guide, seed) {
  const paras = []
  if (dest) {
    paras.push(pick([
      dest.name + '，' + dest.slogan + '。' + dest.intro,
      '先说结论：' + dest.name + '值得按「' + dest.slogan + '」这个方式打开。' + dest.intro
    ], seed))
    paras.push(
      '时间上，' + dest.season + '最舒服，尤其' + (dest.best || []).join('、') +
      '。预算参考人均 ' + dest.budgetText + '，建议安排 ' + dest.daysText + ' 左右。'
    )
  } else if (guide) {
    paras.push(guide.title + '。' + guide.excerpt)
  }
  if (guide) {
    paras.push(
      '这篇攻略的路线是「' + guide.route + '」，节奏偏' + guide.rhythm +
      '，适合' + guide.people + '。全程 ' + guide.days + ' 天，人均大约 ' + guide.budgetText + '。'
    )
  }
  return paras
}

function routeParas(dest, guide, seed) {
  const paras = []
  if (guide && guide.daysPlan && guide.daysPlan.length) {
    paras.push(pick([
      '我把这 ' + guide.days + ' 天拆开讲，一天一段，你跟着走就行。',
      '这条线的核心是把节奏放慢，下面按天说。'
    ], seed))
    guide.daysPlan.forEach(function (d) {
      paras.push(
        '第 ' + parseInt(d.day, 10) + ' 天，' + d.title + '。' + (d.time ? d.time + '，' : '') +
        d.desc + ' 会经过：' + d.places.join('、') + '。'
      )
    })
  } else if (dest && dest.plays) {
    paras.push('在' + dest.name + '，路线可以这样安排。')
    dest.plays.forEach(function (p) {
      paras.push(p.title + '。' + p.desc)
    })
  }
  if (guide && guide.spots && guide.spots.length) {
    const names = guide.spots.map(function (s) { return s.name }).join('、')
    paras.push('有几个地方值得你主动停下来：' + names + '。宁可少去一个点，也别在这几处赶路。')
  }
  if (dest && extras[dest.id] && extras[dest.id].spotMeta) {
    const meta = extras[dest.id].spotMeta
    const lines = Object.keys(meta).map(function (name) {
      return name + '：' + meta[name].ticket + '，建议留' + meta[name].suggest
    })
    paras.push('票价和时长帮你整理好了：' + lines.join('；') + '。票价为公开信息整理，出行前以官方为准。')
  }
  return paras
}

function foodParas(dest, guide, seed) {
  const paras = []
  if (dest && dest.foods && dest.foods.length) {
    paras.push(pick([
      '到了' + dest.name + '，吃这件事可以交给下面几样。',
      dest.name + '的胃口，靠这几样就能摸到。'
    ], seed))
    dest.foods.forEach(function (f) {
      paras.push(f.name + '：' + f.desc)
    })
    paras.push('一句话原则：跟着本地人排队，价先问清再落座，就不会错得太离谱。')
  } else {
    paras.push('这一站没有单独整理美食清单，参考攻略正文的吃法即可。正餐尽量离开景区门口那一条街。')
  }
  return paras
}

function stayParas(dest, guide) {
  const paras = []
  if (dest && dest.stay) {
    paras.push(dest.stay)
  }
  if (guide) {
    const stayTip = (guide.tips || []).filter(function (t) {
      return /住|宿|客栈|酒店/.test(t)
    })
    stayTip.forEach(function (t) { paras.push(t) })
    if (!stayTip.length) {
      paras.push('预算上，住宿大约占全程的四成上下（参考这篇攻略的花费拆分），订房时把位置排在装修前面。')
    }
  }
  if (!paras.length) paras.push('住宿建议优先选在你每天要走的路线附近，少折返就是省钱。')
  return paras
}

function tipsParas(dest, guide, seed) {
  const paras = []
  if (guide && guide.tips && guide.tips.length) {
    paras.push(pick([
      '这几条是原攻略里最容易被忽略的，帮你挑出来了。',
      '出发前，先把这几条看完再走。'
    ], seed))
    guide.tips.forEach(function (t, i) {
      paras.push('第' + ['一', '二', '三', '四', '五'][i] + '，' + t)
    })
  }
  if (guide && guide.notes && guide.notes.length) {
    const n = guide.notes[seed % guide.notes.length]
    paras.push('走过这条线的「' + n.name + '」补充过一句：' + n.text)
  }
  if (!paras.length) paras.push('这一站暂时没有更多避坑信息，建议出发前看一眼天气和预约规则。')
  return paras
}

/**
 * 生成一篇讲解稿。
 * param: { guideId?, destId? }
 * return: { title, sub, cover, topics: [{key,name,mark,paras:[..]}] }
 */
function buildNarration(param, seed) {
  const s = seed == null ? Date.now() : seed
  let guide = null
  let dest = null
  if (param.guideId) {
    guide = source.getGuide(param.guideId)
    if (guide) dest = source.getDest(guide.destId)
  }
  if (!dest && param.destId) dest = source.getDest(param.destId)
  if (!guide && dest) {
    const list = source.guidesForDest(dest.id)
    if (list.length) guide = list[0]
  }
  if (!guide && !dest) return null

  const builders = {
    overview: overviewParas,
    route: routeParas,
    food: foodParas,
    stay: stayParas,
    tips: tipsParas
  }
  const topics = []
  Object.keys(builders).forEach(function (key) {
    const paras = builders[key](dest, guide, s)
    if (paras && paras.length) {
      topics.push(Object.assign({}, TOPIC_META[key], { paras: paras }))
    }
  })

  const city = dest ? dest.name : (guide ? guide.city : '')
  return {
    title: guide ? guide.title : (dest ? dest.name : 'AI 讲解'),
    sub: city + (guide ? ' · ' + guide.days + '天' : ''),
    cover: guide ? guide.cover : (dest ? dest.cover : ''),
    topics: topics
  }
}

/* ---------------- AI 路线定制 ---------------- */

function scoreItem(item, prefs) {
  if (!prefs || !prefs.length) return 0
  const blob = (item.name || '') + (item.title || '') + (item.desc || '')
  let score = 0
  prefs.forEach(function (p) {
    const words = PREF_WORDS[p] || []
    words.forEach(function (w) {
      if (blob.indexOf(w) >= 0) score += 1
    })
  })
  return score
}

function shuffledByPref(highlights, prefs, seed) {
  const list = (highlights || []).slice()
  list.forEach(function (h, i) {
    h._w = scoreItem(h, prefs) * 10 + ((seed + i * 7) % 5)
  })
  list.sort(function (a, b) { return b._w - a._w })
  return list
}

/**
 * 生成一份定制行程。
 * opts: { destId, days, budgetKey(tight|normal|loose), prefs[], people, rhythm, seed? }
 */
function buildPlan(opts) {
  const dest = source.getDest(opts.destId)
  if (!dest) return null
  const seed = opts.seed == null ? Date.now() % 997 : opts.seed
  const days = Math.max(1, Math.min(7, parseInt(opts.days, 10) || 3))
  const rhythm = opts.rhythm || '适中'
  const people = opts.people || '朋友'
  const prefs = opts.prefs || []
  const level = BUDGET_LEVELS.filter(function (b) { return b.key === opts.budgetKey })[0] || BUDGET_LEVELS[1]

  const highlights = shuffledByPref(dest.highlights, prefs, seed)
  const plays = (dest.plays || []).slice()
  const foods = (dest.foods || []).slice()
  const ext = extras[dest.id] || {}
  const stations = ext.stations || []
  const notes = ext.xhsNotes || []

  // 均匀分配：景点按天摊开（round-robin），不够排的天数为留白，留白天也附美食建议
  const total = highlights.length
  const buckets = []
  for (let b = 0; b < days; b += 1) buckets.push([])
  highlights.forEach(function (h, i) {
    buckets[Math.min(days - 1, Math.floor(i * days / Math.max(1, total)))].push(h)
  })

  const daysPlan = []
  const usedPlaces = []
  // 从当天起挑一个还没排过的美食
  function pickFood(start) {
    for (let k = 0; k < foods.length; k += 1) {
      const cand = foods[(start + k) % foods.length]
      if (usedPlaces.indexOf(cand.name) < 0) return cand
    }
    return null
  }
  for (let d = 0; d < days; d += 1) {
    const isFirst = d === 0
    const isLast = d === days - 1 && days > 1
    // 已排过的景点不再重复出现
    const todays = buckets[d].filter(function (h) { return usedPlaces.indexOf(h.name) < 0 })

    const play = plays[d % Math.max(1, plays.length)]
    const parts = []
    let title
    let places
    if (todays.length) {
      const playTitle = play ? play.title.replace(/^(第[一二三四五六七两]+[天早]|前[一二两]+天|头[一二两]+天|最后[一二两]*天)/, '').trim() : ''
      title = isFirst && playTitle ? playTitle : todays.map(function (h) { return h.name }).join(' · ')
      todays.forEach(function (h) { parts.push(h.desc) })
      places = todays.map(function (h) { return h.name })
    } else {
      title = '留白，什么都不安排'
      parts.push('把这一天留给自己：睡到自然醒，找一家能坐很久的店，或者随便走走。空白往往是一趟旅行里最记得住的部分。')
      const f = pickFood(d)
      if (f) {
        parts.push('嘴馋了就去吃' + f.name + '：' + f.desc)
        places = [f.name]
      } else {
        // 美食也排完了，这天就彻底留白
        places = []
      }
    }

    if (isFirst) {
      parts.unshift('抵达后别急着排满。')
    }
    if (isLast) {
      parts.push('返程这天把路上的时间估长一点，别再临时加景点。')
    }
    if (prefs.indexOf('美食') >= 0 && foods.length) {
      const f = pickFood(d)
      if (f && places.indexOf(f.name) < 0) {
        places.push(f.name)
        parts.push('吃饭留意' + f.name + '：' + f.desc)
      }
    }
    places.forEach(function (p) { if (usedPlaces.indexOf(p) < 0) usedPlaces.push(p) })

    // 交通细分：按当天顺序写出每一段从哪出发、建议怎么去、多久
    const legs = buildLegs(places, seed + d * 31)
    if (legs.length && isFirst && stations.length) {
      legs[0].from = stations[0].name
      legs[0].mode = '打车'
      legs[0].minutes = 25 + (seed % 30)
      legs[0].costText = '¥' + (30 + (seed % 40))
    } else if (legs.length) {
      legs[0].from = '住宿地'
    }

    // 票价与建议时长（来自素材库）
    const foodMap = (extras[dest.id] && extras[dest.id].spotFoods) || {}
    const placeDetails = places.map(function (name) {
      const m = spotMeta(dest.id, name)
      const detail = m ? { name: name, ticket: m.ticket, openTime: m.openTime, suggest: m.suggest } : { name: name }
      if (foodMap[name]) detail.foods = foodMap[name]
      return detail
    })
    let ticketSum = 0
    let ticketKnown = false
    placeDetails.forEach(function (p) {
      if (!p.ticket) return
      const m = /¥(\d+)/.exec(p.ticket)
      if (m) { ticketSum += parseInt(m[1], 10); ticketKnown = true }
      else if (p.ticket.indexOf('免费') >= 0) ticketKnown = true
    })
    const ticketText = ticketKnown
      ? (ticketSum > 0 ? '当天门票合计约 ¥' + ticketSum + '/人' : '当天景点基本免费')
      : ''

    daysPlan.push({
      day: pad2(d + 1),
      title: title || ('第' + (d + 1) + '天'),
      time: isFirst ? '下午 — 傍晚' : (isLast ? '上午 — 下午' : '全天'),
      desc: parts.join(' '),
      places: places,
      placeDetails: placeDetails,
      legs: legs,
      ticketText: ticketText
    })
  }

  // 预算：优先用用户填写的区间；否则按目的地参考预算 × 天数比例 × 档位区间估算
  const baseTotal = parseMoney(dest.budgetText) || 1500
  const baseDays = parseDays(dest.daysText) || 3
  const scale = days / baseDays
  const userMin = parseInt(opts.budgetMin, 10)
  const userMax = parseInt(opts.budgetMax, 10)
  const hasUserRange = userMin > 0 && userMax > userMin
  const lowTotal = hasUserRange ? userMin : Math.round(baseTotal * scale * level.low / 10) * 10
  const highTotal = hasUserRange ? userMax : Math.round(baseTotal * scale * level.high / 10) * 10
  const ratio = [
    { name: '住宿', percent: 40 },
    { name: '餐饮', percent: 25 },
    { name: '交通', percent: 20 },
    { name: '门票体验', percent: 15 }
  ]
  const costs = ratio.map(function (r) {
    const lo = Math.round(lowTotal * r.percent / 100)
    const hi = Math.round(highTotal * r.percent / 100)
    return {
      name: r.name,
      percent: r.percent,
      value: '¥' + lo + '–' + hi
    }
  })

  const related = source.guidesForDest(dest.id)
  const tips = []
  if (related.length && related[0].tips) {
    related[0].tips.slice(0, 2).forEach(function (t) { tips.push(t) })
  }
  tips.push('最佳出行时间：' + dest.season + '（' + (dest.best || []).join('、') + '）。')

  // 经典美食（无图兜底，直接列名字和吃法）
  const classicFoods = (dest.foods || []).map(function (f) {
    return { name: f.name, desc: f.desc }
  })

  const summary =
    '按「' + rhythm + '」的节奏，为' + people + '排了 ' + days + ' 天。' +
    (prefs.length ? '偏好侧重' + prefs.join('、') + '，路线里相应做了取舍。' : '') +
    (hasUserRange
      ? '预算用你填的区间，人均 ¥' + lowTotal + '–' + highTotal + '。'
      : '预算按' + level.name + '档估算，人均约 ¥' + lowTotal + '–' + highTotal + '。')

  return {
    id: 'ai_' + Date.now(),
    ai: true,
    destId: dest.id,
    destName: dest.name,
    cover: dest.cover,
    title: dest.name + days + '日 · AI 定制路线',
    days: days,
    budgetText: '¥' + lowTotal + '–' + highTotal,
    rhythm: rhythm,
    people: people,
    prefs: prefs,
    summary: summary,
    daysPlan: daysPlan,
    costs: costs,
    tips: tips,
    stay: dest.stay || '',
    notes: notes,
    stations: stations,
    classicFoods: classicFoods,
    createdAt: new Date().toLocaleDateString(),
    stops: daysPlan.reduce(function (acc, d) {
      d.places.forEach(function (p) {
        if (acc.indexOf(p) < 0) acc.push(p)
      })
      return acc
    }, []).slice(0, 6)
  }
}

/* ---------------- 定制行程的本地存储 ---------------- */

function getSavedPlans() {
  try {
    return wx.getStorageSync(STORAGE_KEY) || []
  } catch (e) {
    return []
  }
}

function savePlan(plan) {
  const list = getSavedPlans()
  list.unshift(plan)
  try {
    wx.setStorageSync(STORAGE_KEY, list.slice(0, 20))
  } catch (e) {}
  return plan
}

function getSavedPlan(id) {
  const list = getSavedPlans()
  for (let i = 0; i < list.length; i += 1) {
    if (list[i].id === id) return list[i]
  }
  return null
}

function removeSavedPlan(id) {
  const list = getSavedPlans().filter(function (p) { return p.id !== id })
  try {
    wx.setStorageSync(STORAGE_KEY, list)
  } catch (e) {}
}

module.exports = {
  BUDGET_LEVELS,
  buildNarration,
  buildPlan,
  savePlan,
  getSavedPlans,
  getSavedPlan,
  removeSavedPlan
}
