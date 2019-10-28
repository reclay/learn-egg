const KoaApplication = require('koa');
const KoaRouter = require('koa-router');
const PageController = require('../app/controller/page');
const routerRegister = require('../app/router');

class Application extends KoaApplication {
    constructor() {
        super();
        this.controller = {};
        this.controller.page = new PageController();
        this.router = new KoaRouter();
    }

    init() {
        routerRegister.call(this, this);
    }
}

let app = new Application();
app.init();
app.use(app.router.routes());

const server = require('http').createServer(app.callback());
server.listen(7002, () => {
  console.log('server started at 7002');
});
