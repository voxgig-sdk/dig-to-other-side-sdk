import { DigEntity } from './entity/DigEntity';
export type * from './DigToOtherSideTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { DigToOtherSideEntityBase } from './DigToOtherSideEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
type DirectResult = {
    ok: false;
    err: any;
    status?: undefined;
    headers?: undefined;
    data?: undefined;
} | {
    ok: boolean;
    status: number;
    headers: any;
    data: any;
    err?: any;
};
declare class DigToOtherSideSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<DirectResult>;
    _rawRequest(fetchargs?: any): Promise<DirectResult>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Dig(entopts?: Record<string, any>): DigEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): DigToOtherSideSDK;
    tester(testopts?: any, sdkopts?: any): DigToOtherSideSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof DigToOtherSideSDK;
export { stdutil, config, BaseFeature, DigToOtherSideEntityBase, DigToOtherSideSDK, SDK, };
export type { DirectResult };
