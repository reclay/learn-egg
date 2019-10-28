const is = require('is-type-of');
const FileLoader = require('./file_loader');

class EggLoader {
    constructor(options) {
        this.options = options;
        this.app = this.options.app;
    }
    // 在 agent_worker_loader 中
    load() {
        this.loadController();
        this.loadRouter();
    }
    loadFile(filePath, ...inject) {
        if (inject.length === 0) inject = [ this.app ];
        let ret = require(filePath);
        if (is.function(ret) && !is.class(ret)) {
            ret = ret(...inject);
        }
        return ret;
    }
    loadToApp(directory, property, opt) {
        const target = this.app[property] = {};
        opt = Object.assign({}, {
          directory,
          target,
          inject: this.app,
        }, opt);
        new FileLoader(opt).load();
    }
}
const loaders = [
    require('./mixin/controller'),
    require('./mixin/router')
];

for (const loader of loaders) {
    Object.assign(EggLoader.prototype, loader);
}
module.exports = EggLoader;
