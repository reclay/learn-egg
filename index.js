const {Application} = require('./lib/egg/index');

let app = new Application();
console.log(app);

const server = require('http').createServer(app.callback());
server.once('error', err => {
  console.log('[app_worker] server got error: %s, code: %s', err.message, err.code);
  process.exit(1);
});
server.listen(7001, () => {
  console.log('server started at 7001');
});
