// 配置
const config = require("./community");
// 服务器
const express = require('express');
const app = express();
// 根目录
const root = __dirname;
console.log("root", root);
// 文件操作
const fs = require('fs');
// body-parser是非常常用的一个express中间件, 作用是对post请求的请求体进行解析
const bodyParser = require('body-parser');
// cookie-parser是Express的中间件, 用来实现cookie的解析, 是官方脚手架内置的中间件之一
const cookieParser = require('cookie-parser');
// 中间件, 压缩和处理静态内容
const compression = require('compression');

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}));

if (config.env === 'dev') {
  // webpack打包
  const webpack = require('webpack');
  // 实现热加载
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpackConfig = require('./resources/webpack.dev.js');
  const webpackCompiler = webpack(webpackConfig);

  app.use(webpackDevMiddleware(webpackCompiler, {
    publicPath: webpackConfig.output.publicPath,
    watchOptions: {
      aggregateTimeout: 500,
      ignored: /node_modules/,
      poll: 1000
    }
  }));
  app.use(webpackHotMiddleware(webpackCompiler));
}

// js模板引擎
const template = require('art-template');
template.config('extname', '.html');
template.config('cache', false);
template.helper('stringify', function (obj) {
  return JSON.stringify(obj);
});
app.set('view engine', 'html');
app.set('views', root + '/views');
app.engine('.html', template.__express);

// 静态文件
app.use('/static', express.static(root + "/static", {maxAge: 0}));

// controller
fs.readdirSync(root + '/server/controller').forEach(function (name) {
  if (/Controller\.js$/.test(name)) {
    require(root + '/server/controller/' + name)(app);
  }
});

// port
app.listen(config.port);
