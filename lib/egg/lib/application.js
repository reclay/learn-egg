const EGG_LOADER = Symbol.for('egg#loader');
const EggApplication = require('./egg');
const AppWorkerLoader = require('./loader').AppWorkerLoader;

class Application extends EggApplication {
    constructor(options = {}) {
        options.type = 'application';
        super(options);
        this.className = 'Application';
        this.loader.load();
    }
    get [EGG_LOADER]() {
        return AppWorkerLoader;
    }
}

module.exports = Application;