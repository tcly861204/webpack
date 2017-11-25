'use strict';

module.exports = appInfo => {
  const config = exports = {};
  config.keys = appInfo.name + '_1510657466486_2509';
  config.view  = {
    defaultViewEngine: 'nunjucks',
    defaultExtension: '.njk',
    mapping: {
      '.njk': 'nunjucks',
    }
  }
  // add your config here
  config.middleware = [];
  return config;
};
