const EggLoader = require('../../../egg-core').EggLoader;

class AppWorkerLoader extends EggLoader {
    load() {
        this.loadController();
        this.loadRouter();
    }
}

module.exports = AppWorkerLoader;
