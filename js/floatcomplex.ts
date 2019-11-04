/**
 * float complex (a + bi)
 */


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

    dividedBy(o: ComplexFloat): ComplexFloat {
        const den: number = o.re * o.re + o.im * o.im;
        return new ComplexFloat(
            (this.re * o.re + this.im * o.im) / den,
            (this.im * o.re - this.re * o.im) / den
        );
    }

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
            return '(' + this.re + '+' + this.im + 'j)';
        if (!eq(this.re, 0) && this.im < 0)
            return '(' + this.re + this.im + 'j)';
        if (!eq(this.re, 0) && eq(this.im, 0))
            return '(' + this.re + ')'
        if (eq(this.re, 0) && !eq(this.im, 0))
            return '(' + this.im + 'j)'
        return '(0)';
    }
}
