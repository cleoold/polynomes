/**
 * boolean (in-or, and)
 */


export function readBooleanNum(input: string): BooleanNum {
    return new BooleanNum(parseInt(input));
}


export class BooleanNum {

    num: boolean;

    constructor(num: boolean | number = false) {
        this.num = (num === 0 || num === false) ? false : true;
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

    isNull(): boolean {
        return this.num === false;
    }

    toString(): string {
        return this.isNull() ? '(0)' : '(1)';
    }
}
