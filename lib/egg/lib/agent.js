const EGG_LOADER = Symbol.for('egg#loader');
const AgentWorkerLoader = require('./loader').AgentWorkerLoader;

class Agent extends EggApplication {
    constructor(options = {}) {
        options.type = 'Agent';
        super(options);
        this.className = 'Agent';
        this.loader.load();
    }
    get [EGG_LOADER]() {
        return AgentWorkerLoader;
    }
}

module.exports = Agent;
