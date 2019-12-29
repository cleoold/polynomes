/**
 * float numbers
 */

import { INumberDivisibleType } from './numtype';


export function readFloat(input: string): FloatNumber {
    const float: number = parseFloat(input);
    return new FloatNumber(isNaN(float) ? 0 : float);
}


function eq(a: number, b: number) {
    return Math.abs(a - b) < 1e-4;
}


export class FloatNumber implements INumberDivisibleType {

    float: number;

    constructor(float: number = 0) {
        this.float = float;
    }

    get isNull(): boolean {
        return eq(this.float, 0);
    }

    addBy(o: FloatNumber): FloatNumber {
        return new FloatNumber(
            this.float + o.float
        );
    }

    subtractBy(o: FloatNumber): FloatNumber {
        return new FloatNumber(
            this.float - o.float
        );
    }

    multiplyBy(o: FloatNumber): FloatNumber {
        return new FloatNumber(
            this.float * o.float
        );
    }

    dividedBy(o: FloatNumber): FloatNumber {
        if (eq(o.float, 0)) throw new EvalError('Error: Division par zéro!');
        return new FloatNumber(
            this.float / o.float
        );
    }

    negate(): FloatNumber {
        return new FloatNumber(
            -this.float
        );
    }

    toString(): string {
        return '(' + (Math.round(this.float * 1e3) / 1e3) + ')';
    }
}
