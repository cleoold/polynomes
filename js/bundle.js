(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
        var long = Math.max(this.length(), o.length());
        var res = new Polynomial(this.ctor, long);
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
            var res = new Polynomial(_this.ctor, p.length());
            res.copyFrom(p);
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
            var copy = new Polynomial(this.ctor, this.length());
            copy.copyFrom(this);
            return {
                q: new Polynomial(this.ctor, 0),
                r: copy
            };
        }
        var nden = new Polynomial(this.ctor, this.length());
        var r = new Polynomial(this.ctor, this.length());
        var q = new Polynomial(this.ctor, this.length());
        nden.copyFrom(o);
        r.copyFrom(this);
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
            .replace('x^0', '').replace('x^1', 'x');
    };
    return Polynomial;
}());
exports.Polynomial = Polynomial;

},{}],2:[function(require,module,exports){
"use strict";
/**
 * rational numbers
 */
Object.defineProperty(exports, "__esModule", { value: true });
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
            throw Error("Division par zéro!");
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
    Rational.prototype.toString = function () {
        if (this.numerator === 0)
            return '(0)';
        else if (this.denominator === 1)
            return '(' + this.numerator + ')';
        return '(' + this.numerator + '/' + this.denominator + ')';
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
    return Rational;
}());
exports.Rational = Rational;

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rationals_1 = require("./rationals");
var polynomials_1 = require("./polynomials");
var v = new polynomials_1.Polynomial(rationals_1.Rational, 10);
v.copyFromArray([new rationals_1.Rational(), new rationals_1.Rational(), new rationals_1.Rational(-2, 14), new rationals_1.Rational(), new rationals_1.Rational(1, 89)]);
var u = new polynomials_1.Polynomial(rationals_1.Rational, 10);
u.copyFromArray([new rationals_1.Rational(), new rationals_1.Rational(), new rationals_1.Rational(4, 21), new rationals_1.Rational(-1, 4), new rationals_1.Rational(-3, 1)]);
document.body.innerHTML =
    ("u:   " + u.toString() + "<br/>\nv:    " + v.toString() + "<br/>\nu+v:  " + v.addBy(u).toString() + "<br/>\nu-v:  " + v.subtractBy(u).toString() + "<br/>\nu*v:  " + v.multiplyBy(u).toString() + "<br/>\nu/v:  " + u.dividedBy(v).q.toString() + "<br/>\nu%v:  " + u.dividedBy(v).r.toString() + "<br/>\nhcf:  " + v.hcf(u).toString() + "<br/>\n").replace(/\^(\d+)/g, '<sup>$1</sup>');
console.log(v.toStringArr());

},{"./polynomials":1,"./rationals":2}]},{},[3]);
