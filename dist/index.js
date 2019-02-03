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
function nextsender(ctx, app) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!app.prepared) {
            yield app.prepare();
            app.prepared = true;
        }
        const requestHandler = app.getRequestHandler();
        yield requestHandler(ctx.req, ctx.res);
    });
}
exports.nextsender = nextsender;
exports.default = (app) => (ctx, next) => __awaiter(this, void 0, void 0, function* () {
    const path = ctx.path;
    if (/\/_next\//.test(path)) {
        yield nextsender(ctx, app);
    }
    else {
        yield next();
        if (ctx.status !== 404 || ctx.method !== 'GET') {
            return;
        }
        yield nextsender(ctx, app);
    }
});
//# sourceMappingURL=index.js.map