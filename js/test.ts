import { Rational } from './rationals';
import { Polynomial } from './polynomials';
import { FloatNumber } from './float'

let v = new Polynomial<Rational>(Rational, 10);
v.copyFromArray([new Rational(), new Rational(), new Rational(-2,14), new Rational(), new Rational(1, 89)]);
let u = new Polynomial<Rational>(Rational, 10);
u.copyFromArray([new Rational(), new Rational(), new Rational(4, 21), new Rational(-1,4), new Rational(-3, 1)]);

let x = new Polynomial<FloatNumber>(FloatNumber, 10);
x.copyFromArray([new FloatNumber(1), new FloatNumber(5), new FloatNumber(), new FloatNumber(0), new FloatNumber(9)]);
let y = new Polynomial<FloatNumber>(FloatNumber, 10);
y.copyFromArray([new FloatNumber(4), new FloatNumber(), new FloatNumber(3.6), new FloatNumber(-1)]);

document.body.innerHTML = 
`u:   ${u.toString()}<br/>
v:    ${v.toString()}<br/>
u+v:  ${v.addBy(u).toString()}<br/>
u-v:  ${v.subtractBy(u).toString()}<br/>
u*v:  ${v.multiplyBy(u).toString()}<br/>
u/v:  ${u.dividedBy(v).q.toString()}<br/>
u%v:  ${u.dividedBy(v).r.toString()}<br/>
hcf:  ${v.hcf(u).toString()}<br/>
x:    ${x.toString()}<br/>
y:    ${y.toString()}<br/>
x+y:  ${x.addBy(y).toString()}<br/>
x-y:  ${x.subtractBy(y).toString()}<br/>
x*y:  ${x.multiplyBy(y).toString()}<br/>
x/y:  ${x.dividedBy(y).q.toString()}<br/>
x%y:  ${x.dividedBy(y).r.toString()}<br/>
hcf:  ${x.hcf(y).toString()}<br/>
`.replace(/\^(\d+)/g, '<sup>$1</sup>')


