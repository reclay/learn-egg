const {EggCore} = require('../../egg-core/index');

class EggApplication extends EggCore {
    constructor(options = {}) {
        options.mode = options.mode || 'cluster';
        super(options);
        this.className = 'EggApplication';
    }
}

module.exports = EggApplication;
