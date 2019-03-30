const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const pkg = require('../package.json')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const ROOT_PATH = path.resolve(__dirname, '..')
function resolve(dir) {
  return path.join(ROOT_PATH, dir)
}

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  target: 'web',
  entry: {
    main: resolve('src/main.js')
  },
  output: {
    path: resolve('public/'),
    filename: '[name].js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.json', '.vue'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  watchOptions: {
    ignored: ['node_modules']
  },
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
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
        })
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
         test:/\.vue$/,
         loader:'vue-loader'
      },
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new ExtractTextPlugin({
      filename: "[name].css",
      allChunks: true,
    }),

  ]
}
