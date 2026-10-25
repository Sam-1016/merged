/**
 * ============================================================
 * 漫途 · 本地后台服务（零第三方依赖，Node.js 原生模块实现）
 * ------------------------------------------------------------
 * 功能：
 *  1. POST   /api/chat    桥接本地 Ollama 大模型（默认 deepseek-r1:7b）
 *                         入参 { model, message }，统一返回 { reply }
 *  2. GET    /api/guides?type=my|community      读取攻略列表
 *  3. POST   /api/guides?type=my|community      新增攻略（置顶插入）
 *  4. PUT    /api/guides?type=my|community      整体替换列表（重置用）
 *  5. DELETE /api/guides?type=my|community&id=x 删除单条攻略
 *  6. GET    / 或 /api/health                   健康检查
 * 数据持久化：同目录 data.json（首次运行自动创建）
 *
 * 启动方式：
 *   双击 start.bat，或在本目录执行  node server.js
 * 前置条件：
 *   安装 Node.js；如需 AI 能力，另需启动 Ollama（默认 127.0.0.1:11434）
 * 小程序端：
 *   微信开发者工具需勾选「详情 -> 本地设置 -> 不校验合法域名」
 * ============================================================
 */

const http = require('http')
const fs = require('fs')
const path = require('path')
const url = require('url')

const PORT = 3000
const OLLAMA = 'http://127.0.0.1:11434'
const DATA_FILE = path.join(__dirname, 'data.json')

/* ---------------- 数据持久化（data.json 文件存储） ---------------- */
function readData() {
  try {
    const d = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'))
    if (!Array.isArray(d.my)) d.my = []
    if (!Array.isArray(d.community)) d.community = []
    return d
  } catch (e) {
    return { my: [], community: [] }
  }
}

function writeData(d) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(d, null, 2), 'utf8')
  } catch (e) {
    console.log('写入 data.json 失败：' + e.message)
  }
}

/* ---------------- 通用工具 ---------------- */
function send(res, code, obj) {
  res.writeHead(code, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  })
  res.end(JSON.stringify(obj))
}

function readBody(req) {
  return new Promise(resolve => {
    let raw = ''
    req.on('data', c => { raw += c })
    req.on('end', () => {
      try { resolve(JSON.parse(raw || '{}')) } catch (e) { resolve({}) }
    })
    req.on('error', () => resolve({}))
  })
}

/* ---------------- AI 桥接：转发到 Ollama /api/generate ----------------
 * 小程序端只认统一格式 { reply }，屏蔽 Ollama 原生响应结构差异 */
function handleChat(req, res) {
  readBody(req).then(body => {
    const payload = JSON.stringify({
      model: body.model || 'deepseek-r1:7b',
      prompt: body.message || '',
      stream: false
    })
    const r = http.request(OLLAMA + '/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      },
      timeout: 180000 // DeepSeek-R1 思维链推理较慢，放宽到 3 分钟
    }, or => {
      let raw = ''
      or.on('data', c => { raw += c })
      or.on('end', () => {
        try {
          const d = JSON.parse(raw)
          send(res, 200, { reply: d.response || '' })
        } catch (e) {
          send(res, 502, { reply: '', error: 'Ollama 返回格式异常' })
        }
      })
    })
    r.on('timeout', () => {
      r.destroy()
      send(res, 504, { reply: '', error: 'Ollama 推理超时' })
    })
    r.on('error', () => {
      send(res, 502, { reply: '', error: 'Ollama 未启动（127.0.0.1:11434）' })
    })
    r.write(payload)
    r.end()
  })
}

/* ---------------- 攻略 CRUD ---------------- */
function handleGuides(req, res, query) {
  const type = query.type === 'my' ? 'my' : 'community'
  const data = readData()

  if (req.method === 'GET') {
    send(res, 200, { list: data[type] })
    return
  }

  if (req.method === 'POST') {
    readBody(req).then(g => {
      if (!g || typeof g !== 'object') g = {}
      if (!g.id) g.id = 'g' + Date.now()
      if (!g.createdAt) g.createdAt = Date.now()
      // 同 id 去重后置顶插入
      data[type] = [g].concat(data[type].filter(x => x.id !== g.id))
      writeData(data)
      send(res, 200, { ok: true, id: g.id })
    })
    return
  }

  if (req.method === 'PUT') {
    readBody(req).then(b => {
      data[type] = b && Array.isArray(b.list) ? b.list : []
      writeData(data)
      send(res, 200, { ok: true, total: data[type].length })
    })
    return
  }

  if (req.method === 'DELETE') {
    const id = query.id
    data[type] = data[type].filter(g => g.id !== id)
    writeData(data)
    send(res, 200, { ok: true })
    return
  }

  send(res, 405, { error: 'method not allowed' })
}

/* ---------------- 路由入口 ---------------- */
const server = http.createServer((req, res) => {
  const u = url.parse(req.url, true)

  if (req.method === 'OPTIONS') { send(res, 200, {}); return }
  if (u.pathname === '/api/chat' && req.method === 'POST') { handleChat(req, res); return }
  if (u.pathname === '/api/guides') { handleGuides(req, res, u.query); return }
  if (u.pathname === '/' || u.pathname === '/api/health') {
    send(res, 200, { ok: true, name: '漫途本地后台', time: Date.now() })
    return
  }
  send(res, 404, { error: 'not found' })
})

server.on('error', e => {
  if (e.code === 'EADDRINUSE') {
    console.log('端口 ' + PORT + ' 被占用：请先关闭占用该端口的旧后台进程，再重新启动')
    return
  }
  throw e
})

server.listen(PORT, () => {
  console.log('===========================================')
  console.log(' 漫途本地后台已启动')
  console.log(' 接口地址: http://127.0.0.1:' + PORT)
  console.log(' AI 桥接:  POST /api/chat -> Ollama(11434)')
  console.log(' 攻略接口: GET/POST/PUT/DELETE /api/guides')
  console.log(' 提示: 微信开发者工具需勾选「不校验合法域名」')
  console.log('===========================================')
})
