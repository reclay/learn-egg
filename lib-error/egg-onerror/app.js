const onerror = require('koa-onerror');
const ErrorView = require('./lib/error_view');

// app_worker_loader 中加载： this.loadCustomApp();
module.exports = app => {
    const config = app.config.onerror;
    // 监听错误事件，记日志，koa-router 抛的事件
    app.on('error', () => {
        ctx.logger.error(err);
    });
    const errorOptions = {
        accepts() {
            // 判断返回类型，分类型处理
            const fn = config.accepts || accepts;
            return fn(this);
        },
        json(err) {
        },
        html(err) {
            const errorPageUrl =
                typeof config.errorPageUrl === 'function'
                    ? config.errorPageUrl(err, this)
                    : config.errorPageUrl;
            if (isProd(app)) {
                if (status >= 500) {
                    if (errorPageUrl) {
                        return this.redirect(errorPageUrl);
                    }
                    this.status = 500;
                    this.body = `<h2>Internal Server Error, real status: ${status}</h2>`;
                    return;
                }
                // 4xx
                this.status = status;
                this.body = `<h2>${status} ${http.STATUS_CODES[status]}</h2>`;
                return;
            }
            if (app.config.env === 'unittest') {
                this.status = status;
                this.body = `${err.name}: ${err.message}\n${err.stack}`;
                return;
            }
            const errorView = new ErrorView(this, err, viewTemplate);
            // 修改 body
            this.body = errorView.toHTML();
        }
    };
    ['all', 'html', 'json', 'text', 'js'].forEach(type => {
        if (config[type]) errorOptions[type] = config[type];
    });
    onerror(app, errorOptions);
};
