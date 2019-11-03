import { Rational } from './rationals';
import { Polynomial } from './polynomials';

let v = new Polynomial<Rational>(Rational, 10);
v.copyFromArray([new Rational(3,4), new Rational(-2,7), new Rational(-2,14), new Rational(), new Rational(1, 89)]);
let u = new Polynomial<Rational>(Rational, 10);
u.copyFromArray([new Rational(), new Rational(), new Rational(4, 21), new Rational(), new Rational(-3, 1)]);

document.body.innerHTML = 
`u:   ${v.toString()}<br/>
v:    ${u.toString()}<br/>
u+v:  ${v.addBy(u).toString()}<br/>
u-v:  ${v.subtractBy(u).toString()}<br/>
`