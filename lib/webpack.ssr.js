/* eslint-disable global-require */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line import/no-extraneous-dependencies
const merge = require('webpack-merge');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // 压缩css 借助于cssnano处理器
const HtmlWebpackExternalsPulgin = require('html-webpack-externals-Plugin');
const cssnano = require('cssnano');
const baseConfig = require('./webpack.base');

const prodConfig = {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: 'ignore-loader',
      },
      {
        test: /\.less$/,
        use: 'ignore-loader',
      },
    ],
  },
  plugins: [
    new OptimizeCssAssetsPlugin({ // css压缩插件
      assetNameRegExp: /\.css$/g, // 匹配文件
      cssProcessor: cssnano, // cssnano用于压缩和优化CSS 的处理器
    }),
    new HtmlWebpackExternalsPulgin({ // 作用：基础库分离 公共资源分包
      externals: [
        {
          module: 'react', // 供应商提供模块名称
          entry: 'https://unpkg.com/react@16/umd/react.production.min.js', // 公共资源cdn地址
          global: 'React', // 供应商提供导出全局对象的名称
        },
        {
          module: 'react-dom',
          entry: 'https://unpkg.com/react-dom@16/umd/react-dom.production.min.js',
          global: 'ReactDOM',
        },
      ],
    }),
  ],
  optimization: {
    splitChunks: { // 两个作用 分离基础包例 react|react-dom    分离页面引用中公共文件
      minSize: 0,
      maxAsyncRequests: 5, // 按需加载的最大并行请求数 (最大的异步请求数量,也就是同时加载的模块最大模块数量)
      maxInitialRequests: 3, // 一个入口最大并行请求数 (入口文件做代码分割最多分成 3个 js 文件)
      cacheGroups: {
        // vendors: {
        //     test: /(react|react-dom)/,
        //     name: 'vendors',
        //     chunks: 'all',
        //     priority: -10    // 根据优先级决定打包到哪个组里 既满足vendors，又满足commons根据优先级会打包
        // },
        commons: {
          name: 'commons',
          chunks: 'all',
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true, // 如果一个模块已经被打包过了,那么再打包时就忽略这个上模块
        },
      },
    },
  },
};

module.exports = merge(baseConfig, prodConfig);
