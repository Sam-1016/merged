# 漫途 · AI 文旅攻略共创社区

> 一个用 AI 把「旅行攻略」从单向阅读变成共创体验的原生微信小程序
>
> 参赛赛道：**传智杯 · AI 小程序赛道**

[![Platform](https://img.shields.io/badge/Platform-微信小程序-07C160)](https://developers.weixin.qq.com/miniprogram/dev/framework/)
[![Frontend](https://img.shields.io/badge/Frontend-原生小程序-1F4D3A)](#技术栈)
[![Backend](https://img.shields.io/badge/Backend-Node.js-339933)](#技术栈)
[![AI](https://img.shields.io/badge/AI-Ollama%20%2B%20DeepSeek--R1%3A7B-4B5563)](#ai-技术方案)
[![Deps](https://img.shields.io/badge/Dependencies-0-success)](#依赖清单)
[![License](https://img.shields.io/badge/License-MIT-blue)](LICENSE)

---

## 一、项目简介

**漫途** 是一款面向自由行用户的 AI 文旅攻略小程序。它把「查攻略」拆成三步：**看懂路线 → 按主题听讲解 → 生成自己的行程**，并把这些内容沉淀成可被他人复用的社区攻略。

项目完全基于微信原生能力开发（WXML / WXSS / JS），不依赖任何第三方 UI 组件库；后端为一个零依赖的 Node.js 本地服务，负责桥接本地部署的 **Ollama + DeepSeek-R1:7B** 模型并提供攻略数据接口。

### 核心特点

| 特点 | 说明 |
|---|---|
| **主题化 AI 讲解** | 同一篇攻略可按「总览 / 怎么走 / 吃什么 / 住哪里 / 避坑」切换讲解视角，而不是只给一段长文本 |
| **结构化输入替代自由 Prompt** | 行程规划用表单（目的地、天数、偏好、同伴、节奏）收集约束，用户无需会写提示词 |
| **AI 可缺席** | 后端或模型不可用时自动降级到内置模板引擎，全流程仍可完成演示 |
| **本地优先** | 收藏、足迹、资料、我的攻略全部落本地缓存，重开小程序不丢失 |
| **真实内容支撑** | 17 条攻略、17 个目的地为可核验的真实旅行信息，而非空壳占位 |

---

## 二、扫码体验

> 体验二维码：`docs/qrcode.png`
>
> 该文件由 `tools/gen-qrcode.js` 调用微信官方接口生成，需要项目方提供 AppID 与 AppSecret；**生成后请将其提交到仓库**，供评委直接扫码。

### 2.1 生成步骤

小程序码必须通过微信官方接口获取，且**小程序需先上传版本**，否则扫码无法正常打开。完整流程：

| 步骤 | 操作 | 位置 |
|---|---|---|
| 1 | 确认 `miniprogram/project.config.json` 中 AppID 为本项目 AppID | 本地 |
| 2 | 用微信开发者工具打开 `miniprogram/`，点击「上传」，填写版本号与备注 | 开发者工具 |
| 3 | 版本管理 → 将刚上传的版本设为「体验版」，并按需提交审核发布为正式版 | 微信公众平台 |
| 4 | 体验版需在「成员管理 → 体验成员」中添加评委微信 | 微信公众平台 |
| 5 | 执行下方命令生成小程序码 | 本地命令行 |

```bash
# 方式一：使用体验版环境（推荐，用于评委内测）
node tools/gen-qrcode.js --appid wx你的AppID --secret 你的AppSecret --env trial

# 方式二：正式版发布后生成（任何微信用户可扫）
node tools/gen-qrcode.js --appid wx你的AppID --secret 你的AppSecret --env release
```

生成结果保存在 `docs/qrcode.png`。若接口返回 `40164`，说明本机出口 IP 不在公众平台的 IP 白名单中；返回 `40013` 则多为 AppID 与密钥不匹配。

### 2.2 无法扫码时的体验方式

1. **真机预览**：开发者工具点击「预览」，用已登录的开发者微信扫码（二维码有效期较短）；
2. **体验版**：按上表第 3、4 步配置后，在公众平台下载体验版二维码；
3. **模拟器**：直接在开发者工具中运行，功能完整（AI 能力需按第五节启动本地服务）。

体验建议路径：**首页 → 攻略 → 打开任一篇 → 「AI 讲解」切换主题 → 「生成我的行程」→ 社区 → 发布攻略**。

---

## 三、功能特性

### 3.1 五个主 Tab

| Tab | 页面 | 核心能力 |
|---|---|---|
| 首页 | `pages/index` | 当季推荐、专题入口、攻略目录、AI 快捷入口 |
| 社区 | `pages/community` | 攻略广场、点赞收藏、AI 景点讲解、发布入口 |
| 攻略 | `pages/guides` | 分类筛选、精选大卡、攻略详情 |
| 目的地 | `pages/destinations` | 按区域筛选、季节与预算概览 |
| 我的 | `pages/mine` | 登录态、收藏 / 足迹统计、资料与设置 |

### 3.2 功能清单

- **攻略浏览**：攻略详情、行程分日展开、贴士、相关推荐、浏览痕迹自动记录
- **AI 讲解**：五主题切换 + 逐字上屏，支持后端模型与本地模板两种来源
- **AI 行程规划**：结构化表单 → 分日行程 → 保存 / 复用
- **攻略创作**：表单录入 + AI 辅助润色，保存到「我的攻略」
- **社区共创**：发布到社区、点赞、收藏、评论入口、AI 发布前预检
- **账号与资料**：微信头像昵称获取、资料编辑、头像本地持久化
- **内容管理**：攻略管理后台页，可在线同步也可离线降级

---

## 四、系统架构

```
┌──────────────────────────── 微信小程序（原生） ────────────────────────────┐
│  pages（22 个页面）                                                        │
│    index / community / guides / destinations / mine  ← 5 个 Tab            │
│    guide-detail / community-detail / destination-detail / search / ...      │
│  components：nav-bar（自定义沉浸式导航栏）                                  │
│  utils：data.js（本地数据层） · ai.js（模板引擎） · guides.js / places.js   │
└───────────────┬───────────────────────────────────────────┬────────────────┘
                │ wx.request（120s 超时）                    │ 本地 Storage
                ▼                                           ▼
┌──────────────────────── Node 本地服务 :3000 ───────────────────────┐   ┌──────────────┐
│  server.js（仅用 http / fs / path / url，零依赖）                   │   │ favorite_ids │
│    POST /api/chat      → 桥接 Ollama，统一返回 { reply }            │   │ view_history │
│    /api/guides         → 攻略 CRUD，持久化 data.json               │   │ my_guides    │
│    失败 / 超时 / 未启动 → 静默降级，不阻塞主流程                     │   │ user_profile │
└───────────────────────────────┬───────────────────────────────────┘   └──────────────┘
                                │ HTTP 127.0.0.1:11434
                                ▼
                    ┌───────────────────────┐
                    │ Ollama · deepseek-r1:7b│
                    └───────────────────────┘
```

### 目录结构

```
ai-travel-guide-community/
├── miniprogram/                  # 小程序前端（微信开发者工具导入此目录）
│   ├── app.js / app.json / app.wxss
│   ├── project.config.json       # 项目配置（AppID、基础库版本）
│   ├── sitemap.json
│   ├── components/nav-bar/       # 自定义导航栏组件
│   ├── images/                   # 封面、头像、TabBar 图标
│   ├── pages/                    # 22 个页面，每页 4 文件
│   └── utils/
│       ├── data.js               # 本地数据访问层（收藏 / 足迹 / 攻略）
│       ├── ai.js                 # 离线模板引擎（讲解与行程生成）
│       ├── guides.js             # 17 条攻略静态数据
│       ├── places.js             # 17 个目的地静态数据
│       ├── extras.js             # 目的地扩展信息（交通 / 吃喝 / 贴士）
│       └── seed-guides.js        # 社区演示数据（8 条）
├── server/                       # Node 本地后端
│   ├── server.js                 # 零依赖 HTTP 服务
│   ├── package.json              # npm start 脚本（无依赖）
│   └── start.bat                 # Windows 一键启动
├── docs/
│   ├── 漫途-AI文旅攻略共创社区-技术文档.pdf
│   └── qrcode.png                # 体验二维码
├── tools/
│   └── gen-qrcode.js             # 小程序码生成脚本（需 AppID + AppSecret）
├── README.md
├── DEPENDENCIES.md               # 依赖清单
├── LICENSE
└── .gitignore / .gitattributes / .editorconfig
```

---

## 五、快速开始

### 5.1 环境要求

| 项目 | 要求 |
|---|---|
| 微信开发者工具 | 稳定版（基础库 3.6.5） |
| Node.js | ≥ 16（后端） |
| Ollama | 可选，需 `ollama pull deepseek-r1:7b` |

细化版本见 [DEPENDENCIES.md](DEPENDENCIES.md)。

### 5.2 启动前端

1. 打开微信开发者工具 → 导入项目 → 选择 `miniprogram/`；
2. AppID 使用 `project.config.json` 中的配置（或替换为你自己的 AppID）；
3. 本地设置中勾选 **「不校验合法域名、web-view（业务域名）、TLS 版本以及 HTTPS 证书」**；
4. 编译即可运行。**后端未启动时功能正常，AI 走本地模板。**

### 5.3 启动后端（可选，开启真实模型能力）

```bash
# 方式一：Windows 双击
server/start.bat

# 方式二：命令行
cd server
npm start
```

启动成功后访问 <http://127.0.0.1:3000/api/health> 应返回：

```json
{ "ok": true, "name": "漫途本地后台", "time": 1761000000000 }
```

### 5.4 启动 Ollama（可选）

```bash
ollama serve
ollama pull deepseek-r1:7b
```

Ollama 默认监听 `127.0.0.1:11434`，后端会自动转发请求。

---

## 六、AI 技术方案

### 6.1 双通道设计

| 通道 | 触发条件 | 实现位置 | 特点 |
|---|---|---|---|
| **模型通道** | 后端与 Ollama 均可用 | `server.js` → `POST /api/chat` | 真实大模型生成，内容更灵活 |
| **模板通道** | 后端不可用 / 超时 / 返回异常 | `miniprogram/utils/ai.js` | 确定性生成，离线可用，秒级返回 |

两条通道输出**同构的数据结构**，页面无需关心内容来源，保证演示不中断。

### 6.2 模型与调用参数

| 项 | 取值 |
|---|---|
| 模型 | `deepseek-r1:7b` |
| 推理方式 | Ollama `/api/generate`，`stream: false` |
| 端侧超时 | 120 s（`app.json` → `networkTimeout.request`） |
| 服务端转发超时 | 180 s |
| 输出解析 | 兼容 `response` / `reply` / `answer` / `text`，并过滤 ` thinking` 思维链 |
| 失败策略 | 返回 `{ reply: "" }` + 错误码，端侧静默降级 |

### 6.3 结构化输入替代自由 Prompt

行程规划页把用户意图拆成 5 个约束维度，再由模板组装成稳定 Prompt：

```
目的地：大理 | 天数：3 天 | 偏好：自然风光、美食 | 同伴：情侣 | 节奏：慢
```

相比让用户自己写一段话，结构化输入显著降低了使用门槛，也让输出更可控。

### 6.4 AI 能力落点

| 场景 | 页面 | 输入 | 输出 |
|---|---|---|---|
| 攻略主题讲解 | `pages/ai-guide` | 攻略 + 主题 | 分段讲解文本，逐字上屏 |
| 行程生成 | `pages/ai-plan` | 5 维表单 | 分日行程 + 预算 + 交通段 |
| 景点讲解 | `pages/community-detail` | 景点名 + 上下文 | 一段介绍 |
| 攻略润色 | `pages/guide-create` | 表单内容 | 更完整的攻略表述 |
| 发布前预检 | `pages/publish` | 待发布内容 | 合规提示 / 修改建议 |

---

## 七、接口文档

Base URL：`http://127.0.0.1:3000`

### 7.1 健康检查

```
GET /
GET /api/health
```

### 7.2 AI 对话

```
POST /api/chat
Content-Type: application/json
```

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `model` | string | 否 | 默认 `deepseek-r1:7b` |
| `message` | string | 是 | 提示词 |

响应：

```json
{ "reply": "模型返回的文本" }
```

错误码：`502` Ollama 未启动 / 返回异常，`504` 推理超时。

### 7.3 攻略数据

```
GET    /api/guides?type=my|community
POST   /api/guides?type=my|community      # body 为攻略对象，同 id 去重后置顶
PUT    /api/guides?type=my|community      # body: { list: [...] } 整体替换
DELETE /api/guides?type=my|community&id=xxx
```

`type` 缺省为 `community`；数据持久化在 `server/data.json`（首次启动自动创建）。

---

## 八、本地数据设计

| Storage Key | 内容 | 写入位置 | 读取位置 |
|---|---|---|---|
| `user_profile` | 昵称、头像、简介、城市 | 登录页 / 资料页 | `app.js` 启动回填 |
| `favorite_ids` | 收藏的攻略 id 列表 | 详情页 / 收藏页 | 收藏页、我的页 |
| `view_history` | 浏览痕迹（上限 50 条） | 攻略详情页 | 足迹页 `onShow` |
| `my_guides` | 我创建的攻略 | 创作页 / 我的攻略页 | 我的攻略页 |
| `community_guides` | 社区攻略缓存 | 社区页 / 发布页 | 社区页、管理页 |
| `ai_plans_v1` | AI 生成的行程方案 | 行程页 | 行程页 |

设计原则：**先写本地，再异步同步**。任何网络失败都不会造成数据丢失。

---

## 九、测试

### 9.1 功能自测用例

| 编号 | 用例 | 预期 |
|---|---|---|
| TC-01 | 冷启动进入首页 | 3 秒内首屏可交互，无报错 |
| TC-02 | 打开攻略详情后返回足迹页 | 出现该条浏览记录 |
| TC-03 | 收藏攻略后重进小程序 | 收藏状态保持 |
| TC-04 | 修改资料后杀进程重进 | 昵称 / 头像 / 简介保持 |
| TC-05 | 关闭后端后走 AI 讲解 | 正常出内容（模板通道），无报错弹窗 |
| TC-06 | 后端开启后走 AI 讲解 | 返回模型内容，超时不阻塞页面 |
| TC-07 | 发布攻略后关闭后端 | 提示「已存本地」，社区列表可见 |
| TC-08 | 管理页删除攻略 | 列表减少，后台数据同步 |
| TC-09 | 搜索关键词 | 攻略与目的地同时命中 |
| TC-10 | 小屏机型（iPhone SE） | 布局不溢出、不遮挡 |

### 9.2 接口冒烟

```bash
curl http://127.0.0.1:3000/api/health
curl -X POST http://127.0.0.1:3000/api/chat -H "Content-Type: application/json" \
     -d "{\"model\":\"deepseek-r1:7b\",\"message\":\"用一句话介绍大理\"}"
```

### 9.3 代码检查

```bash
# 全部 JS 语法检查
node --check miniprogram/app.js
node --check server/server.js
```

---

## 十、代码规范

- **命名**：页面目录小写下划线（`guide-detail`）；JS 变量 `camelCase`；常量 `UPPER_SNAKE_CASE`；Storage Key 统一带业务前缀
- **注释**：每个 JS 文件头部标注文件职责与关键逻辑；函数上方说明入参与副作用
- **分层**：页面不直接操作 Storage，统一走 `utils/data.js`；AI 调用统一走 `utils/ai.js` 或 `/api/chat`
- **模板**：WXML 内不写复杂表达式（不支持方法调用），选中态、数组切分等均在 JS 侧预计算
- **样式**：WXSS 使用 rpx；公共色板集中在 `app.wxss`；不使用第三方 UI 库
- **提交**：遵循 Conventional Commits，详见 [提交规范](#十一提交规范)

---

## 十一、提交规范

提交信息格式：

```
<type>(<scope>): <subject>
```

| type | 含义 |
|---|---|
| `feat` | 新功能 |
| `fix` | 缺陷修复 |
| `docs` | 文档 |
| `style` | 样式与格式（不影响逻辑） |
| `refactor` | 重构 |
| `perf` | 性能优化 |
| `test` | 测试 |
| `chore` | 构建 / 工具 / 依赖 |

示例：

```
feat(community): 新增攻略发布与后台同步能力
fix(ai): 修复 Ollama 未启动时的页面白屏
docs(readme): 补充接口文档与体验方式
```

提交历史按「骨架 → 数据 → 页面 → AI → 社区 → 账号 → 后端 → 文档」顺序组织，便于评委查看演进过程。

---

## 十二、已知限制与展望

| 限制 | 说明 | 后续方向 |
|---|---|---|
| 后端仅本地 | `127.0.0.1:3000`，真机需同网段 | 上云 + HTTPS 域名 |
| 社区为单机存储 | 数据存在本地缓存 / `data.json` | 接入云开发或自建服务 |
| 模型为 7B 量化 | 逻辑能力有限，长文偶有重复 | 升级 14B / 32B 或接入云端模型 |
| 无用户体系鉴权 | 仅微信登录态，无服务端会话 | JWT + 用户表 |
| 无自动化测试 | 目前为手工用例 | 补充 miniprogram-automator |

---

## 十三、致谢

- 模型与运行时：[Ollama](https://ollama.com/) · [DeepSeek-R1](https://github.com/deepseek-ai/DeepSeek-R1)
- 平台能力：微信小程序原生框架
- 数据来源：公开旅行资讯整理，用于赛事演示

---

## 十四、许可证

[MIT License](LICENSE) © 2026 漫途项目组
