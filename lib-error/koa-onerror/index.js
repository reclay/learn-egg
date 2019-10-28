const templatePath = isDev
    ? path.join(__dirname, 'templates/dev_error.html')
    : path.join(__dirname, 'templates/prod_error.html');
const defaultTemplate = fs.readFileSync(templatePath, 'utf8');
const defaultOptions = {
    text,
    json,
    html,
    redirect: null,
    template: path.join(__dirname, 'error.html'),
    accepts: null
};
module.exports = function onerror(app, options) {
    options = Object.assign({}, defaultOptions, options);
    app.context.onerror = function(err) {
        // finish 回掉 error 是 null
        if (err == null) return;
        // 抛事件，egg 监听做错误日志
        this.app.emit('error', err, this);
        // 根据 accepts 类型决定返回值
        if (options.accepts) {
            type = options.accepts.call(this, 'html', 'text', 'json');
        } else {
            type = this.accepts('html', 'text', 'json');
        }
        options[type].call(this, err, this);
        if (type === 'json') {
            this.body = JSON.stringify(this.body);
        }
        this.res.end(this.body);
    };
};
