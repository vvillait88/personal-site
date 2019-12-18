const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const globals = require('./globals');

module.exports = {
  name : 'client',
  mode : 'development',
  node : {
    fs: 'empty'
  },
  entry: {
    vendor : ['react', 'react-dom'],
    main   : [
      'react-hot-loader/patch',
      'babel-runtime/regenerator',
      'webpack-hot-middleware/client?reload=true',
      './src/main.js'
    ]
  },
  output: {
    filename      : '[name]-bundle.js',
    chunkFilename : '[name].js',
    path          : path.resolve(__dirname, '../dist'),
    publicPath    : '/'
  },
  devServer: {
    contentBase : 'dist',
    overlay     : true,
    hot         : true,
    stats       : {
      colors: true
    }
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
  devtool : 'source-map',
  module  : {
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
          {
            loader  : MiniCssExtractPlugin.loader,
            options : {
              hmr: true
            }
          },
          { loader: 'css-loader' },
          { loader: 'sass-loader' }
        ]
      },
      {
        test : /\.(jpg|png|gif)$/,
        use  : [
          {
            loader  : 'file-loader',
            options : {
              name: 'images/[name].[ext]'
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
    new MiniCssExtractPlugin({}),
    new webpack.DefinePlugin({
      'process.env': {
        ...globals
      }
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};
