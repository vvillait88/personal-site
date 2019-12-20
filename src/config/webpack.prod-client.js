const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const globals = require('./globals');

module.exports = {
  name  : 'client',
  entry : {
    vendor : ['react', 'react-dom'],
    main   : ['./src/main.js']
  },
  mode : 'production',
  node : {
    fs: 'empty'
  },
  output: {
    filename      : '[name]-bundle.[contenthash].js',
    chunkFilename : '[name].[contenthash].js',
    path          : path.resolve(__dirname, '../../dist'),
    publicPath    : '/'
  },
  optimization: {
    minimizer    : [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    runtimeChunk : {
      name: 'bootstrap'
    },
    splitChunks: {
      chunks      : 'initial',
      cacheGroups : {
        vendors: {
          test : /[\\/]node_modules[\\/]/,
          name : 'vendor'
        }
      }
    }
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
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader' },
          { loader: 'sass-loader' }
        ]
      },
      {
        test : /\.(jpg|gif|png)$/,
        use  : [
          {
            loader  : 'url-loader',
            options : {
              name: 'images/[name].[contenthash].[ext]'
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
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&minetype=application/font-woff' },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader?name=[name].[ext]' },
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
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename      : '[name]-bundle.[contenthash].css',
      chunkFilename : '[name].[contenthash].css',
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp     : /\.(css|scss|sass)$/g,
      cssProcessor        : require('cssnano'),
      cssProcessorOptions : { discardComments: { removeAll: true } },
      canPrint            : true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        ...globals
      }
    }),
    new UglifyJSPlugin(),
    new CompressionPlugin({
      algorithm: 'gzip'
    }),
    new CopyPlugin([{
      from : './src/client/public/',
      to   : path.resolve(__dirname, '../../dist')
    }]),
    new BrotliPlugin()
  ]
};
