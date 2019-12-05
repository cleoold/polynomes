/**
 * polynomials
 */



function hcf<NumType>(a: Polynomial<NumType>, b: Polynomial<NumType>): Polynomial<NumType> {
    while (!b.isNull()) {
        let t = b;
        b = a.dividedBy(b).r;
        a = t;
    }
    return a;
}


export class Polynomial<NumType> {

    coef: Array<NumType>;
    ctor: new () => NumType;

    constructor(C: new () => NumType, arrayLength: number = 0) {
        this.ctor = C;
        this.coef = Array(arrayLength);
        for (let i = 0; i < arrayLength; ++i)
            this.coef[i] = new C();
    }

    makeCopy(): Polynomial<NumType> {
        let res = new Polynomial(this.ctor);
        res.copyFrom(this);
        return res;
    }

    deleteTrailingZero(): void {
        for (let i = this.length()-1; i > -1; --i) {
            if (!(this.coef[i] as any).isNull())
                break;
            this.coef.pop();
        }
    }

    length(): number {
        return this.coef.length;
    }

    copyFromArray(arry: Array<NumType>): void {
        this.coef = [...arry];
        for (let i = 0; i < this.length(); ++ i)
            if (typeof this.coef[i] === 'undefined')
                this.coef[i] = new this.ctor();
    }

    copyFrom(o: Polynomial<NumType>): void {
        for (let i = 0; i < o.length(); ++i)
            this.coef[i] = o.coef[i];
    }

    addBy(o: Polynomial<NumType>): Polynomial<NumType> {
        let res: any = new Polynomial(this.ctor, Math.max(this.length(), o.length()));
        res.copyFrom(this);
        for (let i = 0; i < o.length(); ++i)
            res.coef[i] = res.coef[i].addBy(o.coef[i]);
        res.deleteTrailingZero();
        return res;
    }

    subtractBy(o: Polynomial<NumType>): Polynomial<NumType> {
        return this.addBy(o.negate());
    }

    negate(): Polynomial<NumType> {
        let res = new Polynomial(this.ctor);
        res.coef = this.coef.map(each => (each as any).negate());
        return res;
    }

    multiplyBy(o: Polynomial<NumType>): Polynomial<NumType> {
        let res = new Polynomial(this.ctor, this.length() + o.length() - 1);
        for (let i = 0; i < this.length(); ++i)
            for (let j = 0; j < o.length(); ++j)
                res.coef[i+j] = (res.coef[i+j] as any).addBy(
                    (this.coef[i] as any).multiplyBy(o.coef[j])
                );
        res.deleteTrailingZero();
        return res;
    }

    dividedBy(o: Polynomial<NumType>): {q: Polynomial<NumType>, r: Polynomial<NumType>} {

        const shiftRight = (p: Polynomial<NumType>, n: number): Polynomial<NumType> => {
            if (n <= 0) return p;
            const deg = p.degree();
            let res: Polynomial<NumType> = p.makeCopy();
            for (let i = deg; i > -1; --i) {
                res.coef[i+n] = res.coef[i];
                res.coef[i] = new this.ctor();
            }
            return res;
        }

        const mapMult = (p: Polynomial<NumType>, n: NumType): void => {
            p.coef = p.coef.map((e: any) => e.multiplyBy(n));
        }

        let ndeg = this.degree();
        const ddeg = o.degree();
        if (ndeg < ddeg) {
            return {
                q: new Polynomial(this.ctor, 0),
                r : this.makeCopy()
            };
        }

        let nden = new Polynomial(this.ctor, this.length());
        nden.copyFrom(o);
        let r = this.makeCopy();
        let q = new Polynomial(this.ctor, this.length());

        while (ndeg >= ddeg) {
            let d2 = shiftRight(nden, ndeg-ddeg);
            q.coef[ndeg-ddeg] = (r.coef[ndeg] as any).dividedBy(d2.coef[ndeg]);
            mapMult(d2, q.coef[ndeg-ddeg]);
            r = (r as any).subtractBy(d2);
            ndeg = r.degree();
        }
        q.deleteTrailingZero();
        r.deleteTrailingZero();
        return {
            q: q, r: r
        };
    }

    hcf(o: Polynomial<NumType>): Polynomial<NumType> {
        return hcf(this, o);
    }

    degree(): number {
        for (let i = this.length()-1; i > -1; --i)
            if (!(this.coef[i] as any).isNull())
                return i;
        return -1;
    }

    isNull(): boolean {
        return this.coef.every((each: any) => typeof each === 'undefined' || each.isNull());
    }

    toStringArr(): Array<Array<string | number>> {
        return this.coef.map((each, i) => [each.toString(), i]).reverse();
    }

    toString(): string {
        if (this.isNull())
            return '0';
        return this.coef.map((each, i) => [each, i])
            .filter(t => !(t[0] as any).isNull())
            .reverse()
            .map(p => p[0].toString() + 'x^' + p[1])
            .join(' + ')
            .replace('x^0', '').replace('x^1 ', 'x ')
            .replace(/x\^(\d+)/g, 'x<sup>$1</sup>')
            .replace(/\_(\d+)/g, '<sub>$1</sub>');
    }
}
