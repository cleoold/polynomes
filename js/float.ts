/**
 * float numbers
 */


export function readFloat(input: string): FloatNumber {
    const float: number = parseFloat(input);
    return new FloatNumber(isNaN(float) ? 0 : float);
}


function eq(a: number, b: number) {
    return Math.abs(a - b) < 1e-4;
}


export class FloatNumber {

    float: number;

    constructor(float: number = 0) {
        this.float = float;
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
        return new FloatNumber(
            this.float / o.float
        );
    }

    negate(): FloatNumber {
        return new FloatNumber(
            -this.float
        );
    }

    isNull(): boolean {
        return eq(this.float, 0);
    }

    toString(): string {
        return '(' + (Math.round(this.float * 1e3) / 1e3) + ')';
    }
}
