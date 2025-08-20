# Seer Info Summary / 赛尔信息汇总

<p align="center">
  <strong>A comprehensive information aggregation platform for Seer game resources</strong><br>
  <em>赛尔信息汇总平台，整合游戏登录器、资讯等信息</em>
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#demo">Demo</a> •
  <a href="#installation">Installation</a> •
  <a href="#usage">Usage</a> •
  <a href="#api">API</a> •
  <a href="#contributing">Contributing</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-Vue%203-4FC08D?style=flat-square&logo=vue.js" alt="Vue 3">
  <img src="https://img.shields.io/badge/Backend-Node.js-339933?style=flat-square&logo=node.js" alt="Node.js">
  <img src="https://img.shields.io/badge/Database-MongoDB-47A248?style=flat-square&logo=mongodb" alt="MongoDB">
  <img src="https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square" alt="License">
</p>

---

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Demo](#demo)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api)
- [Development](#development)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## 🎯 About

Seer Info Summary is a web-based platform that aggregates and displays Seer game-related information, including game client download links, news, and plugin resources. The platform provides a unified interface for users to access various Seer game resources and stay updated with the latest information.

**赛尔信息汇总**是一个基于Web的平台，用于聚合和展示赛尔号游戏相关信息，包括游戏客户端下载链接、资讯和插件资源。该平台为用户提供统一的界面来访问各种赛尔号游戏资源并及时获取最新信息。

> [!WARNING]
> **Important Notice / 重要提示**  
> This repository contains an early version of the project. The latest version has been moved to a private repository due to software reverse engineering components.  
> 本仓库为该项目的早期版本，新版本因为涉及到部分软件逆向，已转移至私有仓库。

### 🆕 Latest Updates

- **2025.4.12**: Added email subscription support / 支持邮件订阅功能

## ✨ Features

### Core Features / 核心功能
- 🔗 **Resource Aggregation** - Centralized access to game client downloads and resources
- 📰 **News Integration** - Latest Seer game news and updates
- 🔌 **Plugin Center** - Discover and download game plugins with search and filtering
- 👤 **User System** - Registration, login, and user profile management
- 📧 **Email Notifications** - Subscribe to updates and notifications
- 🔐 **Authentication** - Secure user authentication with JWT
- 📱 **Responsive Design** - Optimized for desktop and mobile devices

### Technical Features / 技术特性
- ⚡ **Fast Loading** - Built with Vite 6 for optimal performance
- 🎨 **Modern UI** - Styled with TailwindCSS 4 and shadcn-vue components
- 🔒 **Security** - CAPTCHA verification and secure API endpoints
- 🌐 **CORS Support** - Cross-origin resource sharing enabled
- 📊 **Data Management** - MongoDB with Mongoose ODM
- 🔄 **Real-time Updates** - Scheduled tasks for data synchronization

## 🌐 Demo

### Live Instances / 在线演示

- **Primary**: [https://seer.yuyuqaq.cn](https://seer.yuyuqaq.cn)
- **Mirror**: [https://seer.hurry.wang](https://seer.hurry.wang)

## 📸 Screenshots

### Main Interface / 主界面
![Homepage](img/zhuye.png)
*Homepage with resource categories and navigation*

### Plugin Center / 插件中心
![Plugin Center](img/plugin.png)
*Plugin discovery and management interface with filtering options*

### User Authentication / 用户认证
<div align="center">
  <img src="img/login.png" width="45%" alt="Login Page">
  <img src="img/register.png" width="45%" alt="Registration Page">
</div>

*Login and registration interfaces with form validation*

### User Dashboard / 用户中心
![User Center](img/usercenter.png)
*User profile and subscription management*

## 🛠 Tech Stack

### Frontend / 前端
- **Framework**: Vue 3 with Composition API
- **Build Tool**: Vite 6
- **Styling**: TailwindCSS 4
- **UI Components**: shadcn-vue, Reka UI
- **State Management**: Pinia
- **Routing**: Vue Router 4
- **Form Validation**: VeeValidate with Zod
- **HTTP Client**: Axios
- **Utilities**: VueUse, Lucide Icons

### Backend / 后端
- **Runtime**: Node.js
- **Framework**: Express 5
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (jsonwebtoken)
- **Email**: Nodemailer
- **CAPTCHA**: svg-captcha
- **Scheduling**: node-schedule
- **Security**: CORS, cookie-parser
- **Logging**: Morgan

### Development Tools / 开发工具
- **Package Manager**: npm
- **Code Formatting**: Prettier
- **Environment**: dotenv
- **Deployment**: Cloudflare Workers (frontend)

## 🚀 Installation

### Prerequisites / 前置要求

- Node.js (v16+ recommended)
- MongoDB (v4.4+ recommended)
- npm or yarn package manager

### Clone Repository / 克隆仓库

```bash
git clone https://github.com/WhY15w/seer-info-summary.git
cd seer-info-summary
```

### Backend Setup / 后端设置

```bash
cd backend
npm install

# Create environment file
cp .env.example .env
# Edit .env with your configuration
```

### Frontend Setup / 前端设置

```bash
cd frontend
npm install

# Create environment file
cp .env.development.example .env.development
# Edit .env.development with your configuration
```

### Database Setup / 数据库设置

1. Install and start MongoDB
2. Create a database named `seerInfo` (or your preferred name)
3. Update the database configuration in `backend/.env`

## 💻 Usage

### Development Mode / 开发模式

#### Start Backend / 启动后端
```bash
cd backend
npm start
```
Backend will run on `http://localhost:3003`

#### Start Frontend / 启动前端
```bash
cd frontend
npm run dev
```
Frontend will run on `http://localhost:5173`

### Production Build / 生产构建

#### Build Frontend / 构建前端
```bash
cd frontend
npm run build
```

#### Deploy to Cloudflare / 部署到 Cloudflare
```bash
cd frontend
npm run deploy
```

## 📚 API

### Base URL / 基础URL
```
http://localhost:3003/seer-api
```

### Endpoints / 接口端点

#### Authentication / 认证
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `GET /captcha` - Get CAPTCHA image

#### User Management / 用户管理
- `GET /user/profile` - Get user profile
- `PUT /user/profile` - Update user profile
- `POST /email/subscribe` - Email subscription

#### Resources / 资源
- `GET /` - Get logger information
- `GET /plugin-center` - Get plugin list
- `GET /bilibili` - Get Bilibili content
- `GET /server` - Get server information

For detailed API documentation, see [API.md](docs/API.md) (if available).

## 🔧 Development

### Project Structure / 项目结构

```
seer-info-summary/
├── backend/                 # Backend application
│   ├── app.js              # Express application
│   ├── bin/www             # Server entry point
│   ├── config/             # Configuration files
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   ├── utils/              # Utility functions
│   └── jobs/               # Scheduled tasks
├── frontend/               # Frontend application
│   ├── src/                # Source code
│   ├── public/             # Static assets
│   ├── components.json     # shadcn-vue config
│   └── vite.config.js      # Vite configuration
├── img/                    # Documentation images
└── README.md               # This file
```

### Environment Variables / 环境变量

#### Backend
```env
DB_HOST=127.0.0.1
DB_PORT=27017
DB_NAME=seerInfo
DB_USER=your_username
DB_PASSWORD=your_password
DB_AUTH_SOURCE=admin
```

#### Frontend
```env
VITE_API_BASE_URL=http://localhost:3003/seer-api
```

### Code Style / 代码风格

This project uses Prettier for code formatting:

```bash
# Format frontend code
cd frontend
npm run format
```

## 🚀 Deployment

### Backend Deployment / 后端部署

1. Set up MongoDB instance
2. Configure environment variables
3. Build and deploy to your preferred platform (PM2, Docker, etc.)

### Frontend Deployment / 前端部署

The frontend is configured for Cloudflare Workers deployment:

```bash
cd frontend
npm run deploy
```

For other platforms, build the project and serve the `dist` folder:

```bash
npm run build
# Serve the dist/ folder with your web server
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### How to Contribute / 如何贡献

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines / 开发指南

- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

- **Author**: yuyuqaq
- **GitHub**: [@WhY15w](https://github.com/WhY15w)
- **Project Link**: [https://github.com/WhY15w/seer-info-summary](https://github.com/WhY15w/seer-info-summary)

---

<p align="center">
  <strong>Made with ❤️ by yuyuqaq</strong><br>
  <em>如有问题请提交 Issue 或 Pull Request</em>
</p>
