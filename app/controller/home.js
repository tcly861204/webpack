'use strict';

const Controller = require('egg').Controller;
class HomeController extends Controller {
  async index() {
    this.ctx.body = 'hi, egg';
  }
  async about() {
	  this.ctx.body = 'about';
  }
}
module.exports = HomeController;