const path = require('path');
const webpack = require('webpack');
const externals = require('./node-externals');
const globals = require('./globals');

module.exports = {
  name   : 'server',
  target : 'node',
  externals,
  entry  : './src/server/render.js',
  mode   : 'production',
  node   : {
    fs: 'empty'
  },
  output: {
    globalObject  : 'this',
    filename      : 'prod-server-bundle.js',
    path          : path.resolve(__dirname, '../../build'),
    libraryTarget : 'commonjs2'
  },
  module: {
    rules: [
      {
        test    : /\.js$/,
        exclude : /node_modules/,
        use     : [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test : /\.(css|scss|sass)$/,
        use  : [
          { loader: 'css-loader' },
          { loader: 'sass-loader' }
        ]
      },
      {
        test : /\.(jpg|png|gif)$/,
        use  : [
          {
            loader  : 'url-loader',
            options : {
              name     : 'images/[name].[ext]',
              emitFile : false
            }
          }
        ]
      },
      {
        test : /\.(mp4|webm)$/,
        use  : [
          {
            loader  : 'file-loader',
            options : {
              name: 'videos/[name].[ext]'
            }
          }
        ]
      },
      {
        test   : /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader : 'url-loader?limit=10000&minetype=application/font-woff'
      },
      {
        test   : /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader : 'file-loader?name=[name].[ext]'
      },
      {
        test : /\.md$/,
        use  : [
          {
            loader: 'markdown-with-front-matter-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    }),
    new webpack.DefinePlugin({
      'process.env': {
        ...globals
      }
    })
  ]
};
