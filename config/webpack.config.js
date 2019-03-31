const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const pkg = require('../package.json')
const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const devMode = process.env.NODE_ENV !== 'production'
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const TerserJSPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')

const ROOT_PATH = path.resolve(__dirname, '..')

function resolve(dir) {
  return path.join(ROOT_PATH, dir)
}

let config =  {
  mode: process.env.NODE_ENV,
  target: 'web',
  entry: {
    main: resolve('src/main.js')
  },
  output: {
    path: resolve('public/'),
    filename: !devMode ? '[name].[chunkhash].js' : '[name].js',
    publicPath: 'public/',
  },
  resolve: {
    extensions: ['.js', '.json', '.vue'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  watchOptions: {
    ignored: ['node_modules'],
    aggregateTimeout: 600
  },
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        use: [
          {
            loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                autoprefixer({
                  browsers: pkg.browserslist
                })
              ]
            }
          },
          {
            loader: 'less-loader'
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: !devMode ? "[name].[contenthash].css" : "[name].css",
      allChunks: true,
    }),
    new HtmlWebpackPlugin({
      filename:　resolve('./index.html'),
      template: resolve('./base.html'),
      minify: false
    })
  ]
}

if(!devMode) {
  config.optimization = {
    minimizer: [
      new TerserJSPlugin({}),
      new OptimizeCSSAssetsPlugin({})
    ]
  }
}

module.exports = config
