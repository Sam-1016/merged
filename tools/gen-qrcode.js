/**
 * ============================================================
 * 漫途 · AI 文旅攻略共创社区
 * 工具：小程序体验二维码生成脚本（零依赖，仅用 Node 内置模块）
 * ------------------------------------------------------------
 * 用途：
 *   调用微信官方接口 wxacode.getUnlimited 生成小程序码，
 *   供评委扫码直接进入小程序首页。
 * 用法：
 *   APPID=wx... APPSECRET=... node tools/gen-qrcode.js
 *   或 node tools/gen-qrcode.js --appid wx... --secret ...
 * 产物：
 *   docs/qrcode.png
 * 前置条件：
 *   1. AppID 与 AppSecret 需在微信公众平台 -> 开发管理 -> 开发设置 获取；
 *   2. 小程序已上传并发布（体验版 / 正式版）后，扫码方可正常打开；
 *   3. 服务器出口 IP 若配置了白名单，需先加入公众平台 IP 白名单。
 * ============================================================
 */

const https = require('https')
const fs = require('fs')
const path = require('path')

/* ---------------- 参数解析：支持环境变量与命令行两种方式 ---------------- */
function parseArgs() {
  const args = process.argv.slice(2)
  const out = { appid: process.env.APPID || '', secret: process.env.APPSECRET || '' }
  for (let i = 0; i < args.length; i += 1) {
    if (args[i] === '--appid') out.appid = args[i + 1]
    if (args[i] === '--secret') out.secret = args[i + 1]
  }
  return out
}

/* ---------------- 通用 HTTPS 请求：返回 { json } 或 { buffer } ---------------- */
function request(url, method, body) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, {
      method: method || 'GET',
      headers: body ? { 'Content-Type': 'application/json' } : {},
      timeout: 20000
    }, res => {
      const chunks = []
      res.on('data', c => chunks.push(c))
      res.on('end', () => {
        const buf = Buffer.concat(chunks)
        const type = res.headers['content-type'] || ''
        if (type.indexOf('image') >= 0 || buf[0] === 0x89) {
          resolve({ buffer: buf })
          return
        }
        try {
          resolve({ json: JSON.parse(buf.toString('utf8')) })
        } catch (e) {
          reject(new Error('接口返回无法解析：' + buf.toString('utf8').slice(0, 200)))
        }
      })
    })
    req.on('timeout', () => { req.destroy(); reject(new Error('请求超时')) })
    req.on('error', reject)
    if (body) req.write(JSON.stringify(body))
    req.end()
  })
}

/* ---------------- 主流程：取 access_token -> 生成小程序码 -> 落盘 ---------------- */
async function main() {
  const { appid, secret } = parseArgs()
  if (!appid || !secret) {
    console.error('缺少参数。用法：')
    console.error('  APPID=wx... APPSECRET=... node tools/gen-qrcode.js')
    console.error('  node tools/gen-qrcode.js --appid wx... --secret ...')
    process.exit(1)
  }

  // 1. 获取接口调用凭证（有效期 7200 秒）
  const tokenUrl = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential'
    + '&appid=' + encodeURIComponent(appid)
    + '&secret=' + encodeURIComponent(secret)
  const tokenRes = await request(tokenUrl, 'GET')
  const token = tokenRes.json && tokenRes.json.access_token
  if (!token) {
    console.error('获取 access_token 失败：' + JSON.stringify(tokenRes.json))
    console.error('常见原因：AppID/AppSecret 错误、IP 不在白名单。')
    process.exit(1)
  }

  // 2. 生成小程序码（check_path=false 允许页面尚未发布时也能生成）
  const codeUrl = 'https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=' + token
  const result = await request(codeUrl, 'POST', {
    scene: 'judge',
    page: 'pages/index/index',
    check_path: false,
    env_version: 'release',
    width: 430
  })

  if (!result.buffer) {
    console.error('生成小程序码失败：' + JSON.stringify(result.json))
    process.exit(1)
  }

  // 3. 写入 docs/qrcode.png
  const out = path.join(__dirname, '..', 'docs', 'qrcode.png')
  fs.writeFileSync(out, result.buffer)
  console.log('已生成：' + out + '（' + result.buffer.length + ' 字节）')
}

main().catch(err => {
  console.error('执行失败：' + err.message)
  process.exit(1)
})
