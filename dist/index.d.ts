import { Context } from 'koa';
export declare function nextsender(ctx: Context, app: any): Promise<void>;
declare const _default: (app: any) => (ctx: Context, next: () => Promise<any>) => Promise<void>;
export default _default;
