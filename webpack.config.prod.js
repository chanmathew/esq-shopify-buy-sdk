const cssnano = require('cssnano')
const merge = require('webpack-merge')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WebpackAutoInject = require('webpack-auto-inject-version')

const common = require('./webpack.config.common.js')

module.exports = merge(common, {
  mode: 'production',
  optimization: {
    minimize: true,
  },
  output: {
    filename: 'app.bundle.min.js',
  },
  module: {
    rules: [
      {
        test: /\.(sass|scss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new WebpackAutoInject({
      PACKAGE_JSON_PATH: './package.json',
      SHORT: '© ESQIDO LTD. Author: Mathew Chan.',
      components: {
        AutoIncreaseVersion: true,
        InjectAsComment: true,
      },
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].min.css',
      chunkFilename: '[id].css',
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: cssnano,
      cssProcessorOptions: { discardComments: { removeAll: true } },
      canPrint: true,
    }),
  ],
})
