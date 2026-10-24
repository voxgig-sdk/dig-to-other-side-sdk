import { DigToOtherSideEntityBase } from '../DigToOtherSideEntityBase';
import type { DigToOtherSideSDK } from '../DigToOtherSideSDK';
import type { Control } from '../types';
import type { Dig, DigLoadMatch } from '../DigToOtherSideTypes';
declare class DigEntity extends DigToOtherSideEntityBase<Dig> {
    constructor(client: DigToOtherSideSDK, entopts: any);
    make(this: DigEntity): DigEntity;
    load(this: any, reqmatch?: DigLoadMatch, ctrl?: Control): Promise<DigEntity>;
}
export { DigEntity };
