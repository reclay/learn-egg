exports.accepts = function(ctx) {
    if (ctx.acceptJSON) return 'json';
    if (ctx.acceptJSONP) return 'js';
    return 'html';
};
