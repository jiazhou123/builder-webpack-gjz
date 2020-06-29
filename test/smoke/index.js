const path = require('path');
const webpack = require('webpack');
// eslint-disable-next-line import/no-extraneous-dependencies
const rimraf = require('rimraf');
// eslint-disable-next-line import/no-unresolved
// eslint-disable-next-line import/no-extraneous-dependencies
const Mocha = require('mocha');

const mocha = new Mocha({
  timeout: '1000ms',
});

process.chdir(path.join(__dirname, 'template')); // 设置检索的目录

rimraf('./dist', () => {
  // eslint-disable-next-line global-require
  const prodConfig = require('../../lib/webpack.prod.js');

  webpack(prodConfig, (err, stats) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      process.exit(2);
    }
    // eslint-disable-next-line no-console
    console.log(stats.toString({
      color: true,
      modules: false,
      children: false,
    }));

    // eslint-disable-next-line no-console
    console.log('Webapc build success, begin run test');

    mocha.addFile(path.join(__dirname, 'html-test.js'));
    mocha.addFile(path.join(__dirname, 'css-js-test.js'));

    mocha.run();
  });
});
