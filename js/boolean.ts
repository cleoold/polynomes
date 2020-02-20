/**
 * boolean (in-or, and)
 */

import { INumberType } from './numtype';


export function readBooleanNum(input: string): BooleanNum {
    return new BooleanNum(parseInt(input));
}


export class BooleanNum implements INumberType<BooleanNum> {

    num: boolean;

    constructor(num: boolean | number = false) {
        this.num = (num === 0 || num === false) ? false : true;
    }

    get isNull(): boolean {
        return this.num === false;
    }

    addBy(o: BooleanNum): BooleanNum {
        return new BooleanNum(this.num || o.num);
    }

    subtractBy(o: BooleanNum): BooleanNum {
        return this.addBy(o.negate());
    }

    multiplyBy(o: BooleanNum): BooleanNum {
        return new BooleanNum(this.num && o.num);
    }

    negate(): BooleanNum {
        return new BooleanNum(!this.num);
    }

    toString(): string {
        return this.isNull ? '(0)' : '(1)';
    }
}
