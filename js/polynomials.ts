/**
 * polynomials
 */


export class Polynomial<NumType> {

    coefficients: Array<NumType>;
    ctor: { new(): NumType };

    constructor(C: { new(): NumType }, arrayLength: number = 0) {
        this.ctor = C;
        this.coefficients = Array(arrayLength);
        this.coefficients.forEach((_, i) => {
            this.coefficients[i] = new C();
        });
    }

    copyFromArray(arry: Array<NumType>): void {
        this.coefficients = [...arry];
        this.coefficients.forEach((_, i) => {
            if (typeof this.coefficients[i] === 'undefined')
                this.coefficients[i] = new this.ctor();
        });
    }

    copyFrom(o: Polynomial<NumType>): void {
        o.coefficients.forEach((_, i) => {
            this.coefficients[i] = o.coefficients[i];
        });
    }

    addBy(o: Polynomial<NumType>): Polynomial<NumType> {
        const long = Math.max(this.coefficients.length, o.coefficients.length);
        let res: any = new Polynomial(this.ctor, long);
        res.copyFrom(this);
        o.coefficients.forEach((_, i) => {
            res.coefficients[i] = res.coefficients[i].addBy(o.coefficients[i]);
        });
        return res;
    }

    subtractBy(o: Polynomial<NumType>): Polynomial<NumType> {
        return this.addBy(o.negate());
    }

    negate(): Polynomial<NumType> {
        let res = new Polynomial<NumType>(this.ctor);
        res.coefficients = this.coefficients.map(each => (each as any).negate());
        return res;
    }

    toString(): string {
        return this.coefficients.map((each, i) => each.toString() + 'x^' + i).join(' + ');
    }
}
