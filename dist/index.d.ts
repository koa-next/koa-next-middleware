import { Context } from 'koa';
interface IArgs {
    cache?: any;
}
export declare function nextsender(ctx: Context, app: any, args: IArgs): Promise<void>;
declare const _default: (app: any, args?: {}) => (ctx: Context, next: () => Promise<any>) => Promise<void>;
export default _default;
