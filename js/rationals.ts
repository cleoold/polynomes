/**
 * rational numbers
 */


type integer = number;


export function readRational(input: string): Rational {
    const [num, den] = input.split('/').map(parseInt);
    if (typeof num !== 'undefined' && !isNaN(num)) {
        if (typeof num !== 'undefined' && !isNaN(den)) 
            return new Rational(num, den);
        return new Rational(num, 1);
    }
    return new Rational();
}


function hcf(a: integer, b: integer): integer {
    if (b === 0)
        return a;
    return hcf(b, a % b);
}


export class Rational {

    numerator: integer;
    denominator: integer;

    simplify(): void {
        const isNegative: boolean = (this.numerator > 0 && this.denominator < 0) || (this.numerator < 0 && this.denominator > 0);
        this.numerator = Math.abs(this.numerator) * (isNegative ? -1 : 1);
        this.denominator = Math.abs(this.denominator);
        const myhcf = hcf(Math.abs(this.numerator), this.denominator);
        this.numerator /= myhcf;
        this.denominator /=myhcf;
    }

    constructor(numerator: integer = 0, denominator: integer = 1) {
        if (denominator === 0) {
            throw Error("Division par zéro!");
        }
        this.numerator = numerator;
        this.denominator = denominator;
        this.simplify();
    }

    addBy(o: Rational): Rational {
        return new Rational(
            this.numerator * o.denominator + this.denominator * o.numerator,
            this.denominator * o.denominator
        );
    }

    subtractBy(o: Rational): Rational {
        return new Rational(
            this.numerator * o.denominator - this.denominator * o.numerator,
            this.denominator * o.denominator
        );
    }

    multiplyBy(o: Rational): Rational {
        return new Rational(
            this.numerator * o.numerator,
            this.denominator * o.denominator
        );
    }

    dividedBy(o: Rational): Rational {
        return new Rational(
            this.numerator * o.denominator,
            this.denominator * o.numerator
        );
    }

    negate(): Rational {
        return new Rational(
            -this.numerator,
            this.denominator
        );
    }

    isNull(): boolean {
        return this.numerator === 0;
    }

    toString(): string {
        if (this.numerator === 0) return '(0)';
        else if (this.denominator === 1) return '(' + this.numerator + ')';
        return '(' + this.numerator + '/' + this.denominator + ')';
    }
}
