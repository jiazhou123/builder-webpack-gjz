
if (typeof window === 'undefined') {
    global.window = {}
}

const express = require('express')
const { renderToString } = require('react-dom/server')
const SSR = require('../dist/search-server')
const fs = require('fs');    // 负责文件读取
const path = require('path');
const template = fs.readFileSync(path.join(__dirname, '../dist/search.html'), 'utf-8');  // 引入后是二进制文件 需要转码
const data = require('./data');

const server = (port) => {
    const app = express();
    
    app.use(express.static('dist'));    // 设置静态目录

    app.get('/search', (req, res) => {
        const html = renderMarkup(renderToString(SSR));
        res.status(200).send(html);
    });

    app.listen(port, () => {
        console.log('Server is running on port:' + port);
    })
};

server(process.env.PORT || 3000);

const renderMarkup = (str) => {
    const dataStr = JSON.stringify(data);
    
    return template.replace('<!--HTML_PLACEHOLDER-->', str)
        .replace('<!--INITIAL_DATA_PLACEHOLDER-->', `<script>window.initialData=${dataStr}</script>`)
}