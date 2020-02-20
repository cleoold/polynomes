/**
 * index page
 */


import { Rational, readRational } from './rationals';
import { FloatNumber, readFloat } from './float'
import { ComplexFloat, readComplexFloat } from './floatcomplex';
import { IntegerModN, readIntegerModN } from './integer';
import { BooleanNum, readBooleanNum } from './boolean';
import { Polynomial } from './polynomials';
import { INumberType } from './numtype';


const $ = document.querySelector.bind(document);

const $inputP = $('#poly-1')                as NonNullable<HTMLInputElement>;
const $inputQ = $('#poly-2')                as NonNullable<HTMLInputElement>;
const $P      = $('#display-poly1 span')    as NonNullable<HTMLElement>;
const $Q      = $('#display-poly2 span')    as NonNullable<HTMLElement>;
const $PaddQ  = $('#display-polyadd span')  as NonNullable<HTMLElement>;
const $PsubQ  = $('#display-polysub span')  as NonNullable<HTMLElement>;
const $PmulQ  = $('#display-polymult span') as NonNullable<HTMLElement>;
const $PdivQ  = $('#display-polydivq span') as NonNullable<HTMLElement>;
const $PmodQ  = $('#display-polydivr span') as NonNullable<HTMLElement>;
const $hcf    = $('#display-polygcd span')  as NonNullable<HTMLElement>;
const $$ins   = [$inputP, $inputQ];
const $$outs  = [$P, $Q, $PaddQ, $PsubQ, $PmulQ, $PdivQ, $PmodQ, $hcf];

const $mode   = $('#set-field')             as NonNullable<HTMLInputElement>;


function checkSlow(strVal: string): boolean {
    const strings = strVal.split(' ');
    for (let i = 1; i < strings.length; i += 2)
        if (parseInt(strings[i]) > 399) return true;
    return false;
}


function slowMsgToggle(strVal: string): boolean {
    const $slowMsg = $('.might-be-slow-msg');
    if (checkSlow(strVal)) {
        if ($slowMsg !== null) return true;
        const $slow = document.createElement('p');
        $slow.innerHTML = 'Ce calcul peut être lent...';
        $slow.style.color = 'red';
        $slow.className = 'might-be-slow-msg';
        ($('.data-head') as HTMLElement).appendChild($slow);
        return true;
    }
    if ($slowMsg === null) return false;
    ($slowMsg.parentNode as HTMLLIElement).removeChild($slowMsg);
    return false;
}


function readPoly<T extends INumberType<T>>(read: (_:string) => T, C: new () => T, strVal: string): Polynomial<T> {
    const strings = strVal.split(' ');
    let arr = [];
    for (let i = 0; i < strings.length; i += 2)
        arr[parseInt(strings[i+1])] = read(strings[i]);
    const res = new Polynomial(C);
    res.copyFromArray(arr);
    return res;
}


function readPolyFromChart<T extends INumberType<T>>(read: (_:string) => T, cls: new () => T): void {
    $$outs.forEach(elem => elem && (elem.innerHTML = ''));

    const Px = (() => {
        try {
            return readPoly(read, cls, $inputP.value)
        } catch (err) {
            if (err instanceof EvalError) $P.innerHTML = err.message;
            else throw err;
        }
    })() as Polynomial<T>;
    const Qx = (() => {
        try {
            return readPoly(read, cls, $inputQ.value)
        } catch (err) {
            if (err instanceof EvalError) $Q.innerHTML = err.message;
            else throw err;
        }
    })() as Polynomial<T>;

    $P.innerHTML = Px.toString();
    $Q.innerHTML = Qx.toString();
    slowMsgToggle($inputP.value) || slowMsgToggle($inputQ.value);

    if ($inputP.value === '' || $inputQ.value === '') return;

    const add = Px.addBy(Qx);
    $PaddQ.innerHTML = add.toString();
    const sub = Px.subtractBy(Qx);
    $PsubQ.innerHTML = sub.toString();
    const mul = Px.multiplyBy(Qx);
    $PmulQ.innerHTML = mul.toString();
    try {
        if (!Px.dividable) {
            throw EvalError('le calcul n\'est pas bien défini');
        }
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


$inputP.oninput = readPolyFromChart.bind(null, readRational, Rational);
$inputQ.oninput = $inputP.oninput;


$mode.addEventListener('change', () => {
    $$ins.forEach(ele => ele.value = '');
    $$outs.forEach(ele => ele.innerHTML = '');
    switch ($mode.value) {
    case 'rational':
        $inputP.oninput = readPolyFromChart.bind(null, readRational, Rational);
        break;
    case 'real':
        $inputP.oninput = readPolyFromChart.bind(null, readFloat, FloatNumber);
        break;
    case 'complex':
        $inputP.oninput = readPolyFromChart.bind(null, readComplexFloat, ComplexFloat);
        break;
    case 'integermodn':
        let n = parseInt(<string>prompt('Veuillez entrer N (classe de congruence de modulo)'));
        if (!(n > 0)) n = 7;
        $inputP.oninput = readPolyFromChart.bind(null, readIntegerModN(n), IntegerModN(n));
        break;
    case 'boolean':
        $inputP.oninput = readPolyFromChart.bind(null, readBooleanNum, BooleanNum);
        break;
    }
    $inputQ.oninput = $inputP.oninput;
})

// example
$inputP.value = '2/1 2 -1/5 1 4/3 0';
$P.innerHTML = '(2)x<sup>2</sup> + (-1/5)x + (4/3)';
