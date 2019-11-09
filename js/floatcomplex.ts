import { type } from "os";
import { parse } from "querystring";

/**
 * float complex (a + bi)
 */


export function readComplexFloat(input: string): ComplexFloat {
    const matchedBoth = /^([\+\-]?\d+(\.\d+)?)([\+\-](\d+(\.\d+)?)(i|j))$/ig.exec(input);
    if (matchedBoth !== null)
        return new ComplexFloat(
            parseFloat(matchedBoth[1]), 
            parseFloat(matchedBoth[4])
        );
    const matchedReal = /^([\+\-]?\d+(\.\d+)?)$/ig.exec(input);
    if (matchedReal !== null)
        return new ComplexFloat(
            parseFloat(matchedReal[0]), 0
        );
    const matchedImg = /^([\+\-]?(\d+(\.\d+)?)(i|j))$/ig.exec(input);
    if (matchedImg !== null)
        return new ComplexFloat(
            0, parseFloat(matchedImg[0])
        );
    return new ComplexFloat();
}


function trail(n: number): number {
    return (Math.round(n * 1e3) / 1e3);
}


function eq(a: number, b: number) {
    return Math.abs(a - b) < 1e-5;
}

export class ComplexFloat {

    re: number;
    im: number;

    constructor(re: number = 0, im: number = 0) {
        this.re = re;
        this.im = im;
    }

    addBy(o: ComplexFloat): ComplexFloat {
        return new ComplexFloat(
            this.re + o.re,
            this.im + o.im
        );
    }

    subtractBy(o: ComplexFloat): ComplexFloat {
        return new ComplexFloat(
            this.re - o.re,
            this.im - o.im
        );
    }

    multiplyBy(o: ComplexFloat): ComplexFloat {
        return new ComplexFloat(
            this.re * o.re - this.im * o.im,
            this.im * o.re + this.re * o.im
        );
    }

    /* not well defined, skip
    dividedBy(o: ComplexFloat): ComplexFloat {
        const den: number = o.re * o.re + o.im * o.im;
        return new ComplexFloat(
            (this.re * o.re + this.im * o.im) / den,
            (this.im * o.re - this.re * o.im) / den
        );
    }
    */

    negate(): ComplexFloat {
        return new ComplexFloat(
            -this.re,
            this.im
        );
    }

    isNull(): boolean {
        return eq(this.re, 0) && eq(this.im, 0);
    }

    toString(): string {
        if (!eq(this.re, 0) && this.im > 0)
            return '(' + trail(this.re) + '+' + trail(this.im) + 'j)';
        if (!eq(this.re, 0) && this.im < 0)
            return '(' + trail(this.re) + trail(this.im) + 'j)';
        if (!eq(this.re, 0) && eq(this.im, 0))
            return '(' + trail(this.re) + ')'
        if (eq(this.re, 0) && !eq(this.im, 0))
            return '(' + trail(this.im) + 'j)'
        return '(0)';
    }
}
