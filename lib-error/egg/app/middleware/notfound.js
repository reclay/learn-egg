// 由 egg-loader 加载，egg-core/lib/loader/mixin/middleware
module.exports = options => {
    return async function notfound(ctx, next) {
        await next();
        if (ctx.status !== 404 || ctx.body) {
            return;
        }
        if (ctx.acceptJSON) {
            ctx.body = {
                message: 'Not Found'
            };
            return;
        }
        const notFoundHtml = '<h1>404 Not Found</h1>';
        if (options.pageUrl && ctx.path === options.pageUrl) {
            ctx.body = `${notFoundHtml}<p><pre><code>config.notfound.pageUrl(${options.pageUrl})</code></pre> is unimplemented</p>`;
            return;
        }
        if (options.pageUrl) {
            ctx.realStatus = 404;
            ctx.redirect(options.pageUrl);
            return;
        }
        ctx.body = notFoundHtml;
    };
};
