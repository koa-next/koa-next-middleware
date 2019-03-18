"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const url_1 = require("url");
function nextsender(ctx, app, args) {
    return __awaiter(this, void 0, void 0, function* () {
        const { req, res, path } = ctx;
        const parsedUrl = url_1.parse(`${req.url}`, true);
        const { pathname, query } = parsedUrl;
        const ssrCache = args.cache;
        const key = `${req.url}`;
        if (!app.prepared) {
            yield app.prepare();
            app.prepared = true;
        }
        if (ssrCache && !/\/_next\//.test(path)) {
            if (ssrCache.has(key)) {
                ctx.body = ssrCache.get(key);
                return;
            }
            yield app
                .renderToHTML(req, res, pathname, query)
                .then((html) => {
                ssrCache.set(key, html);
                ctx.body = html;
            })
                .catch((err) => {
                app.renderError(err, req, res, pathname, query);
            });
            return;
        }
        const requestHandler = app.getRequestHandler();
        yield requestHandler(req, res, parsedUrl);
    });
}
exports.nextsender = nextsender;
exports.default = (app, args = {}) => (ctx, next) => __awaiter(this, void 0, void 0, function* () {
    const path = ctx.path;
    if (/\/_next\//.test(path)) {
        yield nextsender(ctx, app, args);
        return;
    }
    else {
        yield next();
        if (ctx.status !== 404 || ctx.method !== 'GET') {
            return;
        }
        yield nextsender(ctx, app, args);
    }
});
//# sourceMappingURL=index.js.map