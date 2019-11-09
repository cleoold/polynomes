/**
 * integer mod n
 */


type integer = number;


export type IntegerModN_T = {
    addBy(o: IntegerModN_T): IntegerModN_T;
    subtractBy(o: IntegerModN_T): IntegerModN_T;
    multiplyBy(o: IntegerModN_T): IntegerModN_T;
    negate(o: IntegerModN_T): IntegerModN_T;
    isNull(): boolean;
    toString(): string;
}


export function readIntegerModN(n: integer): (input:string) => IntegerModN_T {
    const ctor = IntegerModN(n);
    return input => new ctor(parseInt(input));
}


export function IntegerModN(n: integer): new (...a) => IntegerModN_T {

class A {
    num: integer;
    mod: integer = n;

    constructor(num: integer = 0) {
        this.num = num % this.mod;
        if (this.num < 0) this.num += this.mod;
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

    isNull(): boolean {
        return this.num === 0;
    }

    toString(): string {
        return '[' + this.num + ']' + '_' + this.mod;
    }
}
return A;
}
