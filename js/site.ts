import { Rational } from './rationals';
import { Polynomial } from './polynomials';

let v = new Polynomial<Rational>(Rational, 10);
v.copyFromArray([new Rational(), new Rational(), new Rational(-2,14), new Rational(), new Rational(1, 89)]);
let u = new Polynomial<Rational>(Rational, 10);
u.copyFromArray([new Rational(), new Rational(), new Rational(4, 21), new Rational(-1,4), new Rational(-3, 1)]);

document.body.innerHTML = 
`u:   ${u.toString()}<br/>
v:    ${v.toString()}<br/>
u+v:  ${v.addBy(u).toString()}<br/>
u-v:  ${v.subtractBy(u).toString()}<br/>
u*v:  ${v.multiplyBy(u).toString()}<br/>
u/v:  ${u.dividedBy(v).q.toString()}<br/>
u%v:  ${u.dividedBy(v).r.toString()}<br/>
hcf:  ${v.hcf(u).toString()}<br/>
`.replace(/\^(\d+)/g, '<sup>$1</sup>')
console.log(v.toStringArr())
