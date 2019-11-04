/**
 * index page
 */


import { Rational, readRational } from './rationals';
import { FloatNumber, readFloat } from './float'
import { Polynomial } from './polynomials';


const $ = document.querySelector.bind(document);

const $inputP = $('#poly-1');
const $inputQ = $('#poly-2');
const $P = $('#display-poly1 span');
const $Q = $('#display-poly2 span');
const $PaddQ = $('#display-polyadd span');
const $PsubQ = $('#display-polysub span');
const $PmulQ = $('#display-polymult span');
const $PdivQ = $('#display-polydivq span');
const $PmodQ = $('#display-polydivr span');
const $hcf = $('#display-polygcd span');
const $$ins = [$inputP, $inputQ]
const $$outs = [$P, $Q, $PaddQ, $PsubQ, $PmulQ, $PdivQ, $PmodQ, $hcf];

const $mode = $('#set-field');


function readPoly<NumType>(read: (_:string) => NumType, C: { new(): NumType }, strVal: string): Polynomial<NumType> {
    const strings = strVal.split(' ');
    let arr = [];
    for (let i = 0; i < strings.length; i += 2)
        arr[strings[i+1]] = read(strings[i]);
    const res = new Polynomial(C);
    res.copyFromArray(arr);
    return res;
}


function readPolyFromChart<NumType>(read: (_:string) => NumType, cls: new () => NumType): void {
    $$outs.forEach(elem => elem.innerHTML = '');

    let Px: Polynomial<any>, Qx: Polynomial<any>;
    try {
        Px = readPoly(read, cls, $inputP.value);
    } catch (err) {
        if (err instanceof EvalError) $P.innerHTML = err.message;
        else throw err;
    }
    try {
        Qx = readPoly(read, cls, $inputQ.value);
    } catch (err) {
        if (err instanceof EvalError) $Q.innerHTML = err.message;
        else throw err;
    }
    $P.innerHTML = Px.toString();
    $Q.innerHTML = Qx.toString();

    if ($inputP.value === '' || $inputQ.value === '') return;

    const add = Px.addBy(Qx);
    $PaddQ.innerHTML = add.toString();
    const sub = Px.subtractBy(Qx);
    $PsubQ.innerHTML = sub.toString();
    const mul = Px.multiplyBy(Qx);
    $PmulQ.innerHTML = mul.toString();
    try {
        const {q: divq, r: divr} = Px.dividedBy(Qx);
        $PdivQ.innerHTML = divq.toString();
        $PmodQ.innerHTML = divr.toString();
        const hcf = Px.hcf(Qx);
        $hcf.innerHTML = hcf.toString();
    } catch (err) {
        if (err instanceof EvalError) {
            $PdivQ.innerHTML = err.message;
            $PmodQ.innerHTML = err.message;
            $hcf.innerHTML = err.message;
        }
        else throw err;
    }
}


function f() {
    readPolyFromChart(readRational, Rational);
}

function g() {
    readPolyFromChart(readFloat, FloatNumber);
}

$inputP.oninput = f;
$inputQ.oninput = f;


$mode.addEventListener('change', () => {
    $$ins.forEach(ele => ele.value = '');
    $$outs.forEach(ele => ele.innerHTML = '');
    if ($mode.value === 'rational') {
        $inputP.oninput = f;
        $inputQ.oninput = f;
    } else if ($mode.value === 'real') {
        $inputP.oninput = g;
        $inputQ.oninput = g;
    }
})

// sample
$inputP.value = '2/1 2 -1/5 1 4/3 0';
$P.innerHTML = '(2)x<sup>2</sup> + (-1/5)x + (4/3)';
