/* eslint-disable global-require */
/* eslint-disable no-undef */
const path = require('path');

process.chdir(path.join(__dirname, 'smoke/template')); // 设置检索的目录

describe('build-webpack test case', () => {
  require('./unit/webpack-base-test');
});
