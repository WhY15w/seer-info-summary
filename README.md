# 🌀 赛尔号信息聚合页 (seer-info-summary)

> [!WARNING]
> 本仓库为该项目的早期版本，新版本因涉及部分软件逆向，已转移至私有仓库

一个整合赛尔号相关信息、下载链接和资讯的现代化 Web 平台，提供便捷的信息查询与订阅服务。

[![Vue](https://img.shields.io/badge/Vue-3.5.13-4FC08D?style=flat-square&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2.6-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.3-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)

## 📝 项目介绍

赛尔号信息聚合页致力于整合各类赛尔号相关资源，包括登录器下载链接、官方资讯动态等内容，为玩家提供一站式信息查询服务。

### ✨ 核心功能

- 🔗 **登录器下载** - 提供最新版本登录器下载链接
- 🔌 **重聚插件中心** - 发现优质软件，提升游戏效率
- 📺 **B站官方动态** - 实时获取赛尔号官方B站动态信息
- 📢 **游戏公告** - 获取赛尔号Unity公告信息
- 🔮 **下周预告** - 查看赛尔号下周预告内容图片
- 🖥️ **服务器状态** - H5服务器状态和玩家米米号信息查询
- 📚 **资源下载** - XM/TO系列资源下载
- 📖 **MW手册** - MW手册下载链接
- 👥 **战队查询** - 战队信息查询功能


🔄 最近更新：25.4.12 - 新增邮件订阅功能

## 🌐 预览地址

| 镜像站点 | 链接 |
|---------|------|
| 主站 | https://seer.yuyuqaq.cn |
| 镜像1 | https://seerinfo.yuyuqaq.cn |
| 镜像2 | https://seerinfo.cn |
| 镜像3 | https://seer.hurry.wang |

## 🛠️ 技术架构

### 前端技术栈

*   **框架**：Vue 3.5.13

*   **构建工具**：Vite 6.2.6

*   **样式框架**：Tailwind CSS 4.1.3

*   **UI 组件**：shadcn-vue

*   **路由**：vue-router 4.5.0

*   **状态管理**：Pinia 3.0.2

*   **HTTP 客户端**：Axios 1.8.4

*   **表单验证**：vee-validate 4.15.0 + zod 3.24.2

### 后端技术栈

*   **运行环境**：Node.js

*   **Web 框架**：Express

*   **数据库**：MongoDB

*   **ODM**：Mongoose

*   **验证码**：svg-captcha 1.4.0

## 📁 项目结构

```
seer-info-summary/
├── frontend/           # Vue 3 前端应用
│   ├── src/
│   │   ├── components/ # 组件
│   │   ├── views/      # 页面
│   │   ├── utils/      # 工具函数
│   │   └── assets/     # 静态资源
│   └── package.json
├── backend/            # Node.js 后端应用
│   ├── routes/         # 路由
│   ├── models/         # 数据模型
│   ├── utils/          # 工具函数
│   └── package.json
├── img/                # 项目截图
└── README.md
```

## 📸 功能截图

### 主界面

![主页界面展示](img/zhuye.png)

### 功能页面

![插件中心页面](img/plugin.png)

### 用户中心

![用户登录页面](img/login.png)

![用户注册页面](img/register.png)

![用户中心页面](img/usercenter.png)

## 🚀 快速开始

### 环境要求

*   Node.js 14.x 或更高版本

*   npm 6.x 或更高版本

*   MongoDB 4.x 或更高版本

### 前端部署

```
\# 进入前端目录
cd frontend
\# 安装依赖
npm install
\# 开发环境运行
npm run dev
\# 生产环境构建
npm run build
\# 部署到Cloudflare Pages
npm run deploy
```

### 后端部署

```
\# 进入后端目录
cd backend
\# 安装依赖
npm install
\# 启动服务
npm start
```

## ⚙️ 配置说明

前端配置文件位于 `frontend/vite.config.js`，可根据需要修改端口、代理等配置。

后端配置需自行创建环境变量文件，包含数据库连接信息、邮件服务配置等敏感信息。

## 🔗 开源地址

*   GitHub: [https://github.com/WhY15w/seer-info-summary](https://github.com/WhY15w/seer-info-summary)

*   Gitee: [https://gitee.com/yuyuqaq/seer-info-summary](https://gitee.com/yuyuqaq/seer-info-summary)
