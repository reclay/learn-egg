const EggApplication = require('./egg');
class Application extends EggApplication {
    constructor(options = {}) {
        options.type = 'application';
        super(options);
        this.className = 'Application';
        this.loader.load();
    }
}

module.exports = Application;