/* eslint-disable global-require */
const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const glob = require('glob');
// eslint-disable-next-line import/no-extraneous-dependencies
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 单独打包css文件，和style-loader冲突
// eslint-disable-next-line import/no-extraneous-dependencies
const HtmlWebpackPlugin = require('html-webpack-plugin');
// eslint-disable-next-line import/no-extraneous-dependencies
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// eslint-disable-next-line import/no-extraneous-dependencies
const FriendlyErrorsWebapckPlugin = require('friendly-errors-webpack-plugin');

const projectRoot = process.cwd(); // 当前node命令执行时所在的文件夹目录

const setMPA = () => {
  const entry = {};
  const htmlWebpackPlugins = [];

  const entryFiles = glob.sync(path.join(projectRoot, './src/*/index.js'));

  // eslint-disable-next-line array-callback-return
  Object.keys(entryFiles).map((index) => {
    const entryFile = entryFiles[index];

    const match = entryFile.match(/src\/(.*)\/index\.js/);

    const pageName = match && match[1];

    entry[pageName] = entryFile;

    htmlWebpackPlugins.push(
      new HtmlWebpackPlugin({
        template: path.join(projectRoot, `src/${pageName}/index.html`),
        filename: `${pageName}.html`,
        chunks: ['commons', 'vendors', pageName],
        inject: true,
        minify: {
          html5: true,
          collapseWhitespace: true,
          preserveLineBreaks: false,
          minifyCSS: true,
          minifyJS: true,
          removeComments: false,
        },
      }),
    );
  });

  return {
    entry,
    htmlWebpackPlugins,
  };
};

const { entry, htmlWebpackPlugins } = setMPA();

module.exports = {
  entry,
  output: {
    path: path.join(projectRoot, 'dist'),
    filename: '[name]_[chunkhash:8].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'babel-loader',
          // 'eslint-loader'
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                // eslint-disable-next-line import/no-extraneous-dependencies
                require('autoprefixer')({ // 自动补全个浏览器css前缀
                  Browserslist: ['last 2 version', '>1%', 'ios 7'],
                  // 主流浏览器最新两个版本  全球使用率大于1%使用率的浏览器  ios 7系统以上
                }),
              ],
            },
          },
          {
            loader: 'px2rem-loader',
            options: {
              remUnit: 75, // 1rem = 多少像素
              remPrecition: 8, // 转换为rem后，小数点保留几位
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name]_[hash:8].[ext]',
          },
        }],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name]_[hash:8].[ext]',
          },
        }],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({ // 将css提取成一个单独的文件
      filename: '[name]_[contenthash:8].css', // 和style-loader作用互斥（style-loader将样式插入到header中）
    }),
    new CleanWebpackPlugin(), // 自动清除dist目录
    new FriendlyErrorsWebapckPlugin(), // 友好提示
    function errorPlugin() { // 捕捉异常  作用：可以上报错误等等，方便调试
      this.hooks.done.tap('done', (stats) => { // this.hooks.done.tap webapck4 写法    this.plugin webpack3 写法
        if (stats.compilation.errors && stats.compilation.errors.length && process.argv.indexOf('--watch') === -1) {
          // eslint-disable-next-line no-console
          console.log('build error');
          process.exit(1);
        }
      });
    },
  ].concat(htmlWebpackPlugins),
  stats: 'errors-only',
};
