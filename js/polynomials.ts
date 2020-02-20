/**
 * polynomials
 */

import { INumberType} from './numtype';



function hcf<T extends INumberType<T>>(a: Polynomial<T>, b: Polynomial<T>): Polynomial<T> {
    while (!b.isNull) {
        let t = b;
        b = a.dividedBy(b).r;
        a = t;
    }
    return a;
}


export /** final */ class Polynomial<T extends INumberType<T>> {

    coef: T[];
    ctor: new () => T;

    constructor(C: new () => T, arrayLength: number = 0) {
        this.ctor = C;
        this.coef = Array(arrayLength);
        for (let i = 0; i < arrayLength; ++i)
            this.coef[i] = new C();
    }

    get dividable(): boolean {
        return 'dividedBy' in new this.ctor();
    }

    get length(): number {
        return this.coef.length;
    }

    get degree(): number {
        for (let i = this.length-1; i > -1; --i)
            if (!this.coef[i].isNull)
                return i;
        return -1;
    }

    get isNull(): boolean {
        return this.coef.every(each => typeof each === 'undefined' || each.isNull);
    }

    makeCopy(): Polynomial<T> {
        let res = new Polynomial(this.ctor);
        res.copyFrom(this);
        return res;
    }

    deleteTrailingZero(): void {
        for (let i = this.length-1; i > -1; --i) {
            if (!this.coef[i].isNull)
                break;
            this.coef.pop();
        }
    }

    copyFromArray(arry: Array<T>): void {
        this.coef = [...arry];
        for (let i = 0; i < this.length; ++ i)
            if (typeof this.coef[i] === 'undefined')
                this.coef[i] = new this.ctor();
    }

    copyFrom(o: Polynomial<T>): void {
        for (let i = 0; i < o.length; ++i)
            this.coef[i] = o.coef[i];
    }

    addBy(o: Polynomial<T>): Polynomial<T> {
        let res = new Polynomial(this.ctor, Math.max(this.length, o.length));
        res.copyFrom(this);
        for (let i = 0; i < o.length; ++i)
            res.coef[i] = res.coef[i].addBy(o.coef[i]);
        res.deleteTrailingZero();
        return res;
    }

    subtractBy(o: Polynomial<T>): Polynomial<T> {
        return this.addBy(o.negate());
    }

    negate(): Polynomial<T> {
        let res = new Polynomial(this.ctor);
        res.coef = this.coef.map(each => each.negate());
        return res;
    }

    multiplyBy(o: Polynomial<T>): Polynomial<T> {
        let res = new Polynomial(this.ctor, this.length + o.length - 1);
        for (let i = 0; i < this.length; ++i)
            for (let j = 0; j < o.length; ++j)
                res.coef[i+j] = res.coef[i+j].addBy(
                    this.coef[i].multiplyBy(o.coef[j])
                );
        res.deleteTrailingZero();
        return res;
    }

    dividedBy(o: Polynomial<T>): {q: Polynomial<T>, r: Polynomial<T>} {
        if (!this.dividable) throw TypeError;

        const shiftRight = (p: Polynomial<T>, n: number): Polynomial<T> => {
            if (n <= 0) return p;
            const deg = p.degree;
            let res: Polynomial<T> = p.makeCopy();
            for (let i = deg; i > -1; --i) {
                res.coef[i+n] = res.coef[i];
                res.coef[i] = new this.ctor();
            }
            return res;
        }

        const mapMult = (p: Polynomial<T>, n: T): void => {
            p.coef = p.coef.map(e => e.multiplyBy(n));
        }

        let ndeg = this.degree;
        const ddeg = o.degree;
        if (ndeg < ddeg) {
            return {
                q: new Polynomial(this.ctor, 0),
                r : this.makeCopy()
            };
        }

        let nden = new Polynomial(this.ctor, this.length);
        nden.copyFrom(o);
        let r = this.makeCopy();
        let q = new Polynomial(this.ctor, this.length);

        while (ndeg >= ddeg) {
            let d2 = shiftRight(nden, ndeg-ddeg);
            q.coef[ndeg-ddeg] = (r.coef[ndeg] as any).dividedBy(d2.coef[ndeg]);
            mapMult(d2, q.coef[ndeg-ddeg]);
            r = r.subtractBy(d2);
            ndeg = r.degree;
        }
        q.deleteTrailingZero();
        r.deleteTrailingZero();
        return {
            q: q, r: r
        };
    }

    hcf(o: Polynomial<T>): Polynomial<T> {
        return hcf(this, o);
    }

    toStringArr(): Array<Array<string | number>> {
        return this.coef.map((each, i) => [each.toString(), i]).reverse();
    }

    toString(): string {
        if (this.isNull)
            return '0';
        return this.coef.map((each, i) => [each, i])
            .filter(t => !(t[0] as T).isNull)
            .reverse()
            .map(p => p[0].toString() + 'x^' + p[1])
            .join(' + ')
            .replace('x^0', '').replace('x^1 ', 'x ')
            .replace(/x\^(\d+)/g, 'x<sup>$1</sup>')
            .replace(/\_(\d+)/g, '<sub>$1</sub>');
    }
}
