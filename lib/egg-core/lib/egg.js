const KoaApplication = require('koa');
const Router = require('../../egg-router/index').EggRouter;
const EGG_LOADER = Symbol.for('egg#loader');
const ROUTER = Symbol('EggCore#router');

class EggCore extends KoaApplication {
    constructor(options = {}) {
        options.baseDir = options.baseDir || process.cwd();
        options.type = options.type || 'application';
        super();
        this._options = this.options = options;
        this.className = 'EggCore';
        const Loader = this[EGG_LOADER];
        this.loader = new Loader({
            baseDir: options.baseDir,
            app: this
        });
    }
    // 实际会用 agent_worker_loader 的 EGG_LOADER
    get [EGG_LOADER]() {
        return require('./loader/egg_loader');
    }
    get router() {
        if (this[ROUTER]) {
            return this[ROUTER];
        }
        const router = this[ROUTER] = new Router({
            sensitive: true
        }, this);
        this.use(router.routes());
        return router;
    }
}

module.exports = EggCore;