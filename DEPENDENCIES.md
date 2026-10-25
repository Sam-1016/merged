# 依赖清单

本项目遵循「能用原生就不引三方」的原则：小程序端与 Node 后端均为 **0 个 npm 依赖**，无需 `npm install` 即可运行。

## 一、运行时依赖（必需）

| 依赖 | 版本 / 规格 | 用途 | 安装方式 |
|---|---|---|---|
| 微信客户端 | iOS / Android 最新版 | 运行小程序的宿主环境 | 应用商店 |
| 微信开发者工具 | 稳定版 Stable（≥ 1.06） | 代码编辑、真机预览、上传版本 | [官方下载](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html) |
| 小程序基础库 | **3.6.5**（见 `miniprogram/project.config.json` 的 `libVersion`） | 小程序运行框架 | 开发者工具内置 |
| Node.js | **≥ 16.0.0**（开发实测 v24） | 运行后端服务 `server/server.js` | [nodejs.org](https://nodejs.org/) |
| npm | 随 Node.js 附带 | 仅用于执行 `npm start` 脚本，无需联网安装包 | 随 Node.js 安装 |

## 二、AI 能力依赖（可选，缺失时自动降级）

| 依赖 | 版本 / 规格 | 用途 | 安装方式 |
|---|---|---|---|
| Ollama | ≥ 0.1.x | 本地大模型推理运行时，默认监听 `127.0.0.1:11434` | [ollama.com](https://ollama.com/download) |
| deepseek-r1:7b | 7B 量化版（约 4.7 GB） | 生成攻略讲解、行程建议、发布前预检 | `ollama pull deepseek-r1:7b` |

> 未安装 Ollama 或未拉取模型时，小程序的 AI 讲解、行程生成会使用内置模板引擎（`miniprogram/utils/ai.js`）输出内容，其余功能完全不受影响。

## 三、开发与构建工具（仅开发者需要）

| 工具 | 用途 | 是否必需 |
|---|---|---|
| Git | 版本管理，提交记录规范 | 建议 |
| Chrome / Edge | 将技术文档 HTML 打印为 PDF | 仅重新生成文档时需要 |
| PowerShell / CMD | 执行 `start.bat` 启动后端 | Windows 下可选 |

## 四、npm 依赖明细

### 小程序端

| 依赖 | 数量 | 说明 |
|---|---|---|
| dependencies | **0** | 全部使用微信原生 API 与原生组件 |
| devDependencies | **0** | 不引入构建链（无 webpack / gulp） |

### 后端

| 依赖 | 数量 | 说明 |
|---|---|---|
| dependencies | **0** | 仅使用 Node 内置模块 `http`、`fs`、`path`、`url` |
| devDependencies | **0** | — |

详见 [`server/package.json`](server/package.json)（`dependencies` 与 `devDependencies` 均为空对象）。

## 五、数据与资源

| 资源 | 位置 | 说明 |
|---|---|---|
| 攻略示例数据 | `miniprogram/utils/guides.js` | 17 条，纯前端静态数据 |
| 目的地示例数据 | `miniprogram/utils/places.js` | 17 个，纯前端静态数据 |
| 社区演示数据 | `miniprogram/utils/seed-guides.js` | 8 条，可一键重置 |
| 图片资源 | `miniprogram/images/` | 封面图、头像、TabBar 图标，本地内置 |
| 后端持久化 | `server/data.json` | 首次启动自动生成，已加入 `.gitignore` |
