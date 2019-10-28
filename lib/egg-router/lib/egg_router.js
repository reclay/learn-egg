const KoaRouter = require('koa-router');
const REST_MAP = {
    index: {
        suffix: '',
        method: 'GET'
    },
    new: {
        namePrefix: 'new_',
        member: true,
        suffix: 'new',
        method: 'GET'
    },
    create: {
        suffix: '',
        method: 'POST'
    },
    show: {
        member: true,
        suffix: ':id',
        method: 'GET'
    },
    edit: {
        member: true,
        namePrefix: 'edit_',
        suffix: ':id/edit',
        method: 'GET'
    },
    update: {
        member: true,
        namePrefix: '',
        suffix: ':id',
        method: ['PATCH', 'PUT']
    },
    destroy: {
        member: true,
        namePrefix: 'destroy_',
        suffix: ':id',
        method: 'DELETE'
    }
};
class Router extends KoaRouter {
    constructor(opts, app) {
        super(opts);
        this.app = app;
    }

    resources(...args) {
        let path = args[1];
        let controller = args[2];
        Object.keys(REST_MAP).forEach((key => {
            let controllerFn = controller[key];
            if (typeof controllerFn === 'function') {
                let item = REST_MAP[key];
                let innerPath = path;
                if (item.suffix) {
                    innerPath = `${path}/${item.suffix}`;
                }
                let methods = typeof item.method === 'string' ? [item.method] : item.method;
                this.register(innerPath, methods, controllerFn);
            }
        }));
    }
}

module.exports = Router;
