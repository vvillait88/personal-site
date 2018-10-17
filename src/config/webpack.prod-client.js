const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');

module.exports = {
  name  : 'client',
  entry : {
    vendor : ['react', 'react-dom'],
    main   : ['./src/main.js']
  },
  mode   : 'production',
  output : {
    filename      : '[name]-bundle.[contenthash].js',
    chunkFilename : '[name].[contenthash].js',
    path          : path.resolve(__dirname, '../../dist'),
    publicPath    : '/'
  },
  optimization: {
    runtimeChunk: {
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
        test : /\.css$/,
        use  : [
          { loader: ExtractCssChunks.loader },
          {
            loader: 'css-loader'
          }
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
    new CleanWebpackPlugin(['dist', 'build'], { root: path.resolve(__dirname, '../../') }),
    new ExtractCssChunks({
      filename      : '[name]-bundle.[contenthash].css',
      chunkFilename : '[name].[contenthash].css',
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp     : /\.css$/g,
      cssProcessor        : require('cssnano'),
      cssProcessorOptions : { discardComments: { removeAll: true } },
      canPrint            : true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV : JSON.stringify('production'),
        WEBPACK  : true
      }
    }),
    new UglifyJSPlugin(),
    new CompressionPlugin({
      algorithm: 'gzip'
    }),
    new BrotliPlugin()
  ]
};
