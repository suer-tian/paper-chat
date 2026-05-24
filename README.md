# 纸片传话 📩

一个基于 Node.js + WebSocket 的局域网传纸条网页应用。和你朋友在同一网络下，就能互相发纸条——纸条会以动画弹出在屏幕上，还有四季主题背景和飘落粒子装饰。

## 功能特色

- 实时传纸条，纸条随机位置弹出 + 随机微旋转
- 自己发的和收到的纸条颜色不同
- 多条纸条同时显示，互不顶替
- 纸条渐隐消失
- 四季主题背景（春🌸/夏🌿/秋🍂/冬❄️）+ 飘落粒子装饰
- 默认莫兰迪渐变背景
- 手写字体 + 毛玻璃输入框
- 回车发送，Shift+回车换行
- 后台收消息：标题闪烁 + 顶部提醒条 + 自动聚焦窗口
- 全屏模式

## 快速开始

### 1. 安装 Node.js

前往 [Node.js 官网](https://nodejs.org) 下载 LTS 版本并安装。

### 2. 克隆项目

```bash
git clone https://github.com/suer-tian/paper-chat.git
cd paper-chat
```

### 3. 安装依赖

```bash
npm install
```

### 4. 放入四季背景图片

在项目根目录的 `images/` 文件夹中放入四张图片：

```
images/
├── spring.jpg   # 春天：粉色花朵
├── summer.jpg   # 夏天：绿色山林
├── autumn.jpg   # 秋天：红色枫叶
└── winter.jpg   # 冬天：蓝色雪花
```

不放图片也能用，默认显示莫兰迪渐变背景。

### 5. 放入手写字体（可选）

如果想用自己的手写字体，将 `.ttf` 文件放入 `fonts/` 文件夹，并在 `index.html` 中修改 `@font-face` 的路径和 `font-family` 名称。

### 6. 启动服务器

```bash
node server.js
```

看到 `纸条中转站已开启，端口：3000` 说明启动成功。

### 7. 访问页面

- **你自己**：浏览器打开 `http://localhost:3000`
- **朋友**：浏览器打开 `http://你的局域网IP:3000`

查看局域网 IP：
- Windows：命令提示符输入 `ipconfig`，找到 IPv4 地址
- Mac：终端输入 `ifconfig | grep "inet "`

## 使用说明

- 在输入框写悄悄话，点"传过去"或按回车发送
- 点顶部季节按钮切换背景主题
- 右上角 ⛶ 按钮进入全屏，ESC 退出
- 所有打开该页面的设备都能互相收发纸条

## 网络要求

你和朋友的设备需要：

- 连在**同一个局域网**下（手机热点、家庭WiFi 均可）
- 网络**允许设备间互访**（校园网/公司网可能有 AP 隔离，会连不上）
- 首次运行时防火墙弹窗请**允许访问**

## 技术栈

- **后端**：Node.js + ws（WebSocket）
- **前端**：原生 HTML/CSS/JS + Canvas 粒子动画
- **字体**：自定义手写字体 + ZCOOL XiaoWei

## 项目结构

```
paper-chat/
├── server.js          # WebSocket + HTTP 服务器
├── index.html         # 前端页面（单文件）
├── package.json       # 依赖配置
├── images/            # 四季背景图片
│   ├── spring.jpg
│   ├── summer.jpg
│   ├── autumn.jpg
│   └── winter.jpg
├── fonts/             # 自定义字体
└── node_modules/      # 依赖（自动生成）
```

## License

MIT
