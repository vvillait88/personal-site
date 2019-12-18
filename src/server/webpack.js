import webpack from 'webpack';
import webpackHotServerMiddleware from 'webpack-hot-server-middleware';

import server from './express';

const secure = require('express-force-https');
const expressStaticGzip = require('express-static-gzip');

const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;

if (isDev) {
  const configDevClient = require('../config/webpack.dev-client');
  const configDevServer = require('../config/webpack.dev-server');

  const compiler = webpack([configDevClient, configDevServer]);

  const clientCompiler = compiler.compilers[0];
  const serverCompiler = compiler.compilers[1];

  const webpackDevMiddleware = require('webpack-dev-middleware')(
    compiler,
    configDevClient.devServer
  );

  const webpackHotMiddlware = require('webpack-hot-middleware')(
    clientCompiler,
    configDevClient.devServer
  );

  server.use(webpackDevMiddleware);
  server.use(webpackHotMiddlware);
  server.use(webpackHotServerMiddleware(compiler));
} else {
  const configProdClient = require('../config/webpack.prod-client');
  const configProdServer = require('../config/webpack.prod-server');

  webpack([configProdClient, configProdServer]).run((err, stats) => {
    const clientStats = stats.toJson().children[0];
    const render = require('../../build/prod-server-bundle.js').default;
    server.use(secure);
    server.use(
      expressStaticGzip('dist', {
        enableBrotli: true
      })
    );
    server.use(render({ clientStats }));
  });
}
