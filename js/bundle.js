(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
/**
 * float numbers
 */
Object.defineProperty(exports, "__esModule", { value: true });
function readFloat(input) {
    var float = parseFloat(input);
    return new FloatNumber(isNaN(float) ? 0 : float);
}
exports.readFloat = readFloat;
function eq(a, b) {
    return Math.abs(a - b) < 1e-4;
}
var FloatNumber = /** @class */ (function () {
    function FloatNumber(float) {
        if (float === void 0) { float = 0; }
        this.float = float;
    }
    FloatNumber.prototype.addBy = function (o) {
        return new FloatNumber(this.float + o.float);
    };
    FloatNumber.prototype.subtractBy = function (o) {
        return new FloatNumber(this.float - o.float);
    };
    FloatNumber.prototype.multiplyBy = function (o) {
        return new FloatNumber(this.float * o.float);
    };
    FloatNumber.prototype.dividedBy = function (o) {
        if (eq(o.float, 0))
            throw new EvalError('Error: Division par zéro!');
        return new FloatNumber(this.float / o.float);
    };
    FloatNumber.prototype.negate = function () {
        return new FloatNumber(-this.float);
    };
    FloatNumber.prototype.isNull = function () {
        return eq(this.float, 0);
    };
    FloatNumber.prototype.toString = function () {
        return '(' + (Math.round(this.float * 1e3) / 1e3) + ')';
    };
    return FloatNumber;
}());
exports.FloatNumber = FloatNumber;

},{}],2:[function(require,module,exports){
"use strict";
/**
 * index page
 */
Object.defineProperty(exports, "__esModule", { value: true });
var rationals_1 = require("./rationals");
var float_1 = require("./float");
var polynomials_1 = require("./polynomials");
var $ = document.querySelector.bind(document);
var $inputP = $('#poly-1');
var $inputQ = $('#poly-2');
var $P = $('#display-poly1 span');
var $Q = $('#display-poly2 span');
var $PaddQ = $('#display-polyadd span');
var $PsubQ = $('#display-polysub span');
var $PmulQ = $('#display-polymult span');
var $PdivQ = $('#display-polydivq span');
var $PmodQ = $('#display-polydivr span');
var $hcf = $('#display-polygcd span');
var $$ins = [$inputP, $inputQ];
var $$outs = [$P, $Q, $PaddQ, $PsubQ, $PmulQ, $PdivQ, $PmodQ, $hcf];
var $mode = $('#set-field');
function readPoly(read, C, strVal) {
    var strings = strVal.split(' ');
    var arr = [];
    for (var i = 0; i < strings.length; i += 2)
        arr[strings[i + 1]] = read(strings[i]);
    var res = new polynomials_1.Polynomial(C);
    res.copyFromArray(arr);
    return res;
}
function readPolyFromChart(read, cls) {
    $$outs.forEach(function (elem) { return elem.innerHTML = ''; });
    var Px, Qx;
    try {
        Px = readPoly(read, cls, $inputP.value);
    }
    catch (err) {
        if (err instanceof EvalError)
            $P.innerHTML = err.message;
        else
            throw err;
    }
    try {
        Qx = readPoly(read, cls, $inputQ.value);
    }
    catch (err) {
        if (err instanceof EvalError)
            $Q.innerHTML = err.message;
        else
            throw err;
    }
    $P.innerHTML = Px.toString();
    $Q.innerHTML = Qx.toString();
    if ($inputP.value === '' || $inputQ.value === '')
        return;
    var add = Px.addBy(Qx);
    $PaddQ.innerHTML = add.toString();
    var sub = Px.subtractBy(Qx);
    $PsubQ.innerHTML = sub.toString();
    var mul = Px.multiplyBy(Qx);
    $PmulQ.innerHTML = mul.toString();
    try {
        var _a = Px.dividedBy(Qx), divq = _a.q, divr = _a.r;
        $PdivQ.innerHTML = divq.toString();
        $PmodQ.innerHTML = divr.toString();
        var hcf = Px.hcf(Qx);
        $hcf.innerHTML = hcf.toString();
    }
    catch (err) {
        if (err instanceof EvalError) {
            $PdivQ.innerHTML = err.message;
            $PmodQ.innerHTML = err.message;
            $hcf.innerHTML = err.message;
        }
        else
            throw err;
    }
}
function f() {
    readPolyFromChart(rationals_1.readRational, rationals_1.Rational);
}
function g() {
    readPolyFromChart(float_1.readFloat, float_1.FloatNumber);
}
$inputP.oninput = f;
$inputQ.oninput = f;
$mode.addEventListener('change', function () {
    $$ins.forEach(function (ele) { return ele.value = ''; });
    $$outs.forEach(function (ele) { return ele.innerHTML = ''; });
    if ($mode.value === 'rational') {
        $inputP.oninput = f;
        $inputQ.oninput = f;
    }
    else if ($mode.value === 'real') {
        $inputP.oninput = g;
        $inputQ.oninput = g;
    }
});
// sample
$inputP.value = '2/1 2 -1/5 1 4/3 0';
$P.innerHTML = '(2)x<sup>2</sup> + (-1/5)x + (4/3)';

},{"./float":1,"./polynomials":3,"./rationals":4}],3:[function(require,module,exports){
"use strict";
/**
 * polynomials
 */
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
function hcf(a, b) {
    if (b.isNull())
        return a;
    return hcf(b, a.dividedBy(b).r);
}
var Polynomial = /** @class */ (function () {
    function Polynomial(C, arrayLength) {
        if (arrayLength === void 0) { arrayLength = 0; }
        this.ctor = C;
        this.coef = Array(arrayLength);
        for (var i = 0; i < arrayLength; ++i)
            this.coef[i] = new C();
    }
    Polynomial.prototype.makeCopy = function () {
        var res = new Polynomial(this.ctor);
        res.copyFrom(this);
        return res;
    };
    Polynomial.prototype.deleteTrailingZero = function () {
        for (var i = this.length() - 1; i > -1; --i) {
            if (!this.coef[i].isNull())
                break;
            this.coef.pop();
        }
    };
    Polynomial.prototype.length = function () {
        return this.coef.length;
    };
    Polynomial.prototype.copyFromArray = function (arry) {
        this.coef = __spreadArrays(arry);
        for (var i = 0; i < this.length(); ++i)
            if (typeof this.coef[i] === 'undefined')
                this.coef[i] = new this.ctor();
    };
    Polynomial.prototype.copyFrom = function (o) {
        for (var i = 0; i < o.length(); ++i)
            this.coef[i] = o.coef[i];
    };
    Polynomial.prototype.addBy = function (o) {
        var res = new Polynomial(this.ctor, Math.max(this.length(), o.length()));
        res.copyFrom(this);
        for (var i = 0; i < o.length(); ++i)
            res.coef[i] = res.coef[i].addBy(o.coef[i]);
        res.deleteTrailingZero();
        return res;
    };
    Polynomial.prototype.subtractBy = function (o) {
        return this.addBy(o.negate());
    };
    Polynomial.prototype.negate = function () {
        var res = new Polynomial(this.ctor);
        res.coef = this.coef.map(function (each) { return each.negate(); });
        return res;
    };
    Polynomial.prototype.multiplyBy = function (o) {
        var res = new Polynomial(this.ctor, this.length() + o.length() - 1);
        for (var i = 0; i < this.length(); ++i)
            for (var j = 0; j < o.length(); ++j)
                res.coef[i + j] = res.coef[i + j].addBy(this.coef[i].multiplyBy(o.coef[j]));
        res.deleteTrailingZero();
        return res;
    };
    Polynomial.prototype.dividedBy = function (o) {
        var _this = this;
        var shiftRight = function (p, n) {
            if (n <= 0)
                return p;
            var deg = p.degree();
            var res = p.makeCopy();
            for (var i = deg; i > -1; --i) {
                res.coef[i + n] = res.coef[i];
                res.coef[i] = new _this.ctor();
            }
            return res;
        };
        var mapMult = function (p, n) {
            p.coef = p.coef.map(function (e) { return e.multiplyBy(n); });
        };
        var ndeg = this.degree();
        var ddeg = o.degree();
        if (ndeg < ddeg) {
            return {
                q: new Polynomial(this.ctor, 0),
                r: this.makeCopy()
            };
        }
        var nden = new Polynomial(this.ctor, this.length());
        nden.copyFrom(o);
        var r = this.makeCopy();
        var q = new Polynomial(this.ctor, this.length());
        while (ndeg >= ddeg) {
            var d2 = shiftRight(nden, ndeg - ddeg);
            q.coef[ndeg - ddeg] = r.coef[ndeg].dividedBy(d2.coef[ndeg]);
            mapMult(d2, q.coef[ndeg - ddeg]);
            r = r.subtractBy(d2);
            ndeg = r.degree();
        }
        q.deleteTrailingZero();
        r.deleteTrailingZero();
        return {
            q: q, r: r
        };
    };
    Polynomial.prototype.hcf = function (o) {
        return hcf(this, o);
    };
    Polynomial.prototype.degree = function () {
        for (var i = this.length() - 1; i > -1; --i)
            if (!this.coef[i].isNull())
                return i;
        return -1;
    };
    Polynomial.prototype.isNull = function () {
        return this.coef.every(function (each) { return typeof each === 'undefined' || each.isNull(); });
    };
    Polynomial.prototype.toStringArr = function () {
        return this.coef.map(function (each, i) { return [each.toString(), i]; }).reverse();
    };
    Polynomial.prototype.toString = function () {
        if (this.isNull())
            return '0';
        return this.coef.map(function (each, i) { return [each, i]; })
            .filter(function (t) { return !t[0].isNull(); })
            .reverse()
            .map(function (p) { return p[0].toString() + 'x^' + p[1]; })
            .join(' + ')
            .replace('x^0', '').replace('x^1 ', 'x ')
            .replace(/x\^(\d+)/g, 'x<sup>$1</sup>');
    };
    return Polynomial;
}());
exports.Polynomial = Polynomial;

},{}],4:[function(require,module,exports){
"use strict";
/**
 * rational numbers
 */
Object.defineProperty(exports, "__esModule", { value: true });
function readRational(input) {
    var _a = input.split('/').map(function (e) { return parseInt(e); }), num = _a[0], den = _a[1];
    if (typeof num !== 'undefined' && !isNaN(num)) {
        if (typeof num !== 'undefined' && !isNaN(den))
            return new Rational(num, den);
        return new Rational(num, 1);
    }
    return new Rational();
}
exports.readRational = readRational;
function hcf(a, b) {
    if (b === 0)
        return a;
    return hcf(b, a % b);
}
var Rational = /** @class */ (function () {
    function Rational(numerator, denominator) {
        if (numerator === void 0) { numerator = 0; }
        if (denominator === void 0) { denominator = 1; }
        if (denominator === 0) {
            throw new EvalError('Error: Division par zéro!');
        }
        this.numerator = numerator;
        this.denominator = denominator;
        this.simplify();
    }
    Rational.prototype.simplify = function () {
        var isNegative = (this.numerator > 0 && this.denominator < 0) || (this.numerator < 0 && this.denominator > 0);
        this.numerator = Math.abs(this.numerator) * (isNegative ? -1 : 1);
        this.denominator = Math.abs(this.denominator);
        var myhcf = hcf(Math.abs(this.numerator), this.denominator);
        this.numerator /= myhcf;
        this.denominator /= myhcf;
    };
    Rational.prototype.addBy = function (o) {
        return new Rational(this.numerator * o.denominator + this.denominator * o.numerator, this.denominator * o.denominator);
    };
    Rational.prototype.subtractBy = function (o) {
        return new Rational(this.numerator * o.denominator - this.denominator * o.numerator, this.denominator * o.denominator);
    };
    Rational.prototype.multiplyBy = function (o) {
        return new Rational(this.numerator * o.numerator, this.denominator * o.denominator);
    };
    Rational.prototype.dividedBy = function (o) {
        return new Rational(this.numerator * o.denominator, this.denominator * o.numerator);
    };
    Rational.prototype.negate = function () {
        return new Rational(-this.numerator, this.denominator);
    };
    Rational.prototype.isNull = function () {
        return this.numerator === 0;
    };
    Rational.prototype.toString = function () {
        if (this.numerator === 0)
            return '(0)';
        else if (this.denominator === 1)
            return '(' + this.numerator + ')';
        return '(' + this.numerator + '/' + this.denominator + ')';
    };
    return Rational;
}());
exports.Rational = Rational;

},{}]},{},[2]);
