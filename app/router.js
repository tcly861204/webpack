'use strict';
module.exports = app => {
  app.get('/', app.controller.home.index);
  app.get('/about', app.controller.home.about);
  app.get('/news',app.controller.news.list);
};
