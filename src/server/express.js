import express from 'express';
import path from 'path';
import webpack from 'webpack';
import webpackHotServerMiddleware from 'webpack-hot-server-middleware';

import configDevClient from '../config/webpack.dev-client';
import configDevServer from '../config/webpack.dev-server';
import configProdClient from '../config/webpack.prod-client';
import configProdServer from '../config/webpack.prod-server';

const server = express();
const expressStaticGzip = require('express-static-gzip');

const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;
const PORT = process.env.PORT || 3000;
let isBuilt = false;

const done = () => {
  !isBuilt
    && server.listen(PORT, () => {
      isBuilt = true;
      console.log(
        `Server listening on http://localhost:${PORT} in ${
          process.env.NODE_ENV
        }`
      );
    });
};

if (isDev) {
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
  console.log('Middleware enabled');
  done();
} else {
  webpack([configProdClient, configProdServer]).run((err, stats) => {
    const clientStats = stats.toJson().children[0];
    const render = require('../../build/prod-server-bundle.js').default;
    server.use(
      expressStaticGzip('dist', {
        enableBrotli: true
      })
    );
    server.use(render({ clientStats }));
    done();
  });
}
