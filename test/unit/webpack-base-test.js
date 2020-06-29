/* eslint-disable no-console */
/* eslint-disable global-require */
/* eslint-disable no-undef */
const assert = require('assert');

describe('webpack.base.js', () => {
  const baseConfig = require('../../lib/webpack.base.js');

  console.log(baseConfig);

  it('entry', () => {
    assert.equal(baseConfig.entry.index.indexOf('builder-webpack/test/smoke/template/src/index/index.js') > -1, true);

    assert.equal(baseConfig.entry.search.indexOf('builder-webpack/test/smoke/template/src/search/index.js')> -1, true);
  });
});
