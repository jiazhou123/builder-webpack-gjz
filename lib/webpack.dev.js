const webpack = require('webpack');
// eslint-disable-next-line import/no-extraneous-dependencies
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');

const devConfig = {
  mode: 'development',
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // 热更新的插件
  ],
  devServer: { // 热更新配置
    contentBase: './dist', // 服务的目录
    hot: true, // 开启热更新
    stats: 'errors-only', // 日志状态
  },
  devtool: 'cheap-source-map',
};

module.exports = merge(baseConfig, devConfig);
