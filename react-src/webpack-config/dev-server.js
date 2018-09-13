var path = require('path');
var webpack = require('webpack');
var express = require('express');
var devMiddleware = require('webpack-dev-middleware');
var hotMiddleware = require('webpack-hot-middleware');
var fs = require('fs');
var config = require('./webpack.dev.js');
var proxyMiddleware = require('http-proxy-middleware');

var app = express();
var compiler = webpack(config);

var bodyParser = require('body-parser');

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index-dev.html'));
});

app.use(devMiddleware(compiler, {
    publicPath: config.output.publicPath,
    historyApiFallback: true
}));

app.use(hotMiddleware(compiler));

app.use(express.static(path.join(__dirname, '../../app/')));

//antes do bodyparser p/ não bugar o POST
if (config.devServer.proxy) {
    const {proxy} = config.devServer;
    Object.keys(proxy).forEach(function (context) {
        app.use(proxyMiddleware(context, proxy[context]));
    })
}

app.use(bodyParser.json({limit: '5mb'}));  //json
app.use(bodyParser.urlencoded({extended: false, limit: '5mb'})); //POST

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'index-dev.html'));
});

let server = app.listen(3000, (server) => {
    console.log('Dev server listening at http://localhost:3000/');
});

server.timeout = 0;
