/**
 * polynomials
 */


export class Polynomial<NumType> {

    coefficients: Array<NumType>;
    ctor: { new(): NumType };

    constructor(C: { new(): NumType }, arrayLength: number = 0) {
        this.ctor = C;
        this.coefficients = Array(arrayLength);
        for (let i = 0; i < arrayLength; ++i)
            this.coefficients[i] = new C();
    }

    length(): number {
        return this.coefficients.length;
    }

    copyFromArray(arry: Array<NumType>): void {
        this.coefficients = [...arry];
        for (let i = 0; i < this.length(); ++ i)
            if (typeof this.coefficients[i] === 'undefined')
                this.coefficients[i] = new this.ctor();
    }

    copyFrom(o: Polynomial<NumType>): void {
        for (let i = 0; i < o.length(); ++i)
            this.coefficients[i] = o.coefficients[i];
    }

    addBy(o: Polynomial<NumType>): Polynomial<NumType> {
        const long = Math.max(this.length(), o.length());
        let res: any = new Polynomial(this.ctor, long);
        res.copyFrom(this);
        for (let i = 0; i < o.length(); ++i)
            res.coefficients[i] = res.coefficients[i].addBy(o.coefficients[i]);
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

    multiplyBy(o: Polynomial<NumType>): Polynomial<NumType> {
        let res = new Polynomial<NumType>(this.ctor, this.length() + o.length() - 1);
        for (let i = 0; i < this.length(); ++i)
            for (let j = 0; j < o.length(); ++j)
                res.coefficients[i+j] = (res.coefficients[i+j] as any).addBy(
                    (this.coefficients[i] as any).multiplyBy(o.coefficients[j])
                );
        return res;
    }

    degree(): number {
        for (let i = this.length()-1; i > -1; --i)
            if (!(this.coefficients[i] as any).isNull())
                return i;
        return -1;
    }

    toString(): string {
        return this.coefficients.map((each, i) => each.toString() + 'x^' + i).join(' + ');
    }
}
