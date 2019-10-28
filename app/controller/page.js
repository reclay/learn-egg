class PageController {
  async index(ctx) {
    ctx.body = 'This is index page!';
  }

  async hello(ctx) {
    ctx.body = 'This is hello 4 page!';
  }
}
module.exports = PageController;
