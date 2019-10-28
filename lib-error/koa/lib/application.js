const http = require('http');
const compose = require('koa-compose');

module.exports = class Application extends Emitter {
    constructor(options) {
        super();
        options = options || {};
        this.middleware = [];
    }
    listen(...args) {
        const server = http.createServer(this.callback());
        return server.listen(...args);
    }
    callback() {
        const fn = compose(this.middleware);
        if (!this.listenerCount('error')) this.on('error', this.onerror);
        const handleRequest = (req, res) => {
            const ctx = this.createContext(req, res);
            return this.handleRequest(ctx, fn);
        };
        return handleRequest;
    }
    handleRequest(ctx, fnMiddleware) {
        const res = ctx.res;
        res.statusCode = 404;
        const onerror = err => {
            ctx.onerror(err);
        };
        const handleResponse = () => respond(ctx);
        // 结束错误回调，onerror 参数 err 是 null
        onFinished(res, onerror);
        // promise 化 catch 错误
        return fnMiddleware(ctx).then(handleResponse).catch(onerror);
    }
};
