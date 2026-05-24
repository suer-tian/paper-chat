const WebSocket = require('ws');
const http = require('http');
const fs = require('fs');
const path = require('path');

const HTML_PATH = path.join(__dirname, 'index.html');
let htmlCache = fs.readFileSync(HTML_PATH, 'utf-8');
let lastMtime = fs.statSync(HTML_PATH).mtimeMs;

const MIME_TYPES = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.ttf': 'font/ttf',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.otf': 'font/otf'
};

const server = http.createServer((req, res) => {
    if (req.url === '/' || req.url === '/index.html') {
        const stat = fs.statSync(HTML_PATH);
        if (stat.mtimeMs !== lastMtime) {
            htmlCache = fs.readFileSync(HTML_PATH, 'utf-8');
            lastMtime = stat.mtimeMs;
            console.log('index.html 已更新，重新加载');
        }
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(htmlCache);
    } else if (req.url.startsWith('/images/') || req.url.startsWith('/fonts/')) {
        const filePath = path.join(__dirname, req.url);
        const ext = path.extname(filePath).toLowerCase();
        if (!MIME_TYPES[ext]) {
            res.writeHead(403);
            res.end('Forbidden');
            return;
        }
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(404);
                res.end('Not Found');
            } else {
                res.writeHead(200, { 'Content-Type': MIME_TYPES[ext], 'Cache-Control': 'public, max-age=3600' });
                res.end(data);
            }
        });
    } else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

const wss = new WebSocket.Server({ server });

const clients = new Set();

wss.on('connection', (ws) => {
    clients.add(ws);
    console.log('有小伙伴上线了，当前在线：' + clients.size);

    ws.on('message', (message) => {
        const msgStr = message.toString();
        console.log('收到纸条：', msgStr);
        clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                const type = client === ws ? 'self' : 'other';
                client.send(JSON.stringify({ text: msgStr, type: type }));
            }
        });
    });

    ws.on('close', () => {
        clients.delete(ws);
        console.log('有人走了，当前在线：' + clients.size);
    });
});

server.listen(3000, () => {
    console.log('纸条中转站已开启，端口：3000');
    console.log('请用浏览器访问 http://localhost:3000');
});
