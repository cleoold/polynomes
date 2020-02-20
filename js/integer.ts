/**
 * integer mod n
 */


import { INumberType, integer } from './numtype';

export function readIntegerModN(n: integer) {
    const ctor = IntegerModN(n);
    return (input: string) => new ctor(parseInt(input));
}


export function IntegerModN(n: integer) {

class A implements INumberType<A> {
    num: integer;
    mod: integer = n;

    constructor(num: integer = 0) {
        this.num = num % this.mod;
        if (this.num < 0) this.num += this.mod;
    }

    get isNull(): boolean {
        return this.num === 0;
    }

    addBy(o: A): A {
        return new A((this.num + o.num) % this.mod);
    }

    subtractBy(o: A): A {
        return new A((this.num - o.num) % this.mod);
    }

    multiplyBy(o: A): A {
        return new A((this.num * o.num) % this.mod);
    }

    negate(): A {
        return new A(-this.num % this.mod);
    }

    toString(): string {
        return '[' + this.num + ']' + '_' + this.mod;
    }
}
return A;
}
