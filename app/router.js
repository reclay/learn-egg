module.exports = app => {
  const {router, controller} = app;
  router.get('/', controller.page.index);
  router.get('/hello', controller.page.hello);
  // router.resources('posts', '/api/posts', controller.api);
};
