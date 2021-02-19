"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
});
exports.router = void 0;

var _express = _interopRequireDefault(require("express")),
    _helmet = _interopRequireDefault(require("helmet")),
    _cors = _interopRequireDefault(require("cors")),
    _core = require("@jstc/core");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var a = new WeakMap(); return _getRequireWildcardCache = function() { return a; }, a; }

function _interopRequireWildcard(a) { if (a && a.__esModule) return a; if (a === null || typeof a !== "object" && typeof a !== "function") return { default: a }; var b = _getRequireWildcardCache(); if (b && b.has(a)) return b.get(a); var c = {},
        d = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var e in a)
        if (Object.prototype.hasOwnProperty.call(a, e)) { var f = d ? Object.getOwnPropertyDescriptor(a, e) : null;
            f && (f.get || f.set) ? Object.defineProperty(c, e, f) : c[e] = a[e]; }
    return c.default = a, b && b.set(a, c), c; }

function asyncGeneratorStep(a, b, c, d, e, f, g) { try { var h = a[f](g),
            i = h.value; } catch (a) { return void c(a); }
    h.done ? b(i) : Promise.resolve(i).then(d, e); }

function _asyncToGenerator(a) { return function() { var b = this,
            c = arguments; return new Promise(function(d, e) {
            function f(a) { asyncGeneratorStep(h, d, e, f, g, "next", a); }

            function g(a) { asyncGeneratorStep(h, d, e, f, g, "throw", a); } var h = a.apply(b, c);
            f(undefined); }); }; }

const app = (0, _express.default)();
app.use((0, _helmet.default)()), app.use((0, _cors.default)());

const router = _express.default.Router();
exports.router = router;
router.get('/', function(a, b) {
    b.status(200).send({
        code: ""
    });
}), router.get('/python', function(a, b) {
    _asyncToGenerator(function*() {
        if (a.query.code) try {
            if (typeof a.query.code === "string") {
                const b = yield Promise.resolve().then(function() {
                        return _interopRequireWildcard(require("acorn"));
                    }),
                    c = b.parse(a.query.code, {
                        ecmaVersion: "latest",
                        allowAwaitOutsideFunction: !0,
                        allowImportExportEverywhere: !0,
                        allowReserved: !0
                    });
                return new _core.python({
                    codes: c,
                    mode: "python",
                    option: {
                        optimisation: !1
                    }
                });
            }
        } catch (a) {
            return "";
        }
        return "";
    })().then(function(a) {
        return b.status(200).send({
            code: a ? a === null || a === void 0 ? void 0 : a.parse.code : ""
        });
    });
}), router.get('/ruby', function(a, b) {
    _asyncToGenerator(function*() {
        if (a.query.code) try {
            if (typeof a.query.code === "string") {
                const b = yield Promise.resolve().then(function() {
                        return _interopRequireWildcard(require("acorn"));
                    }),
                    c = b.parse(a.query.code, {
                        ecmaVersion: "latest",
                        allowAwaitOutsideFunction: !0,
                        allowImportExportEverywhere: !0,
                        allowReserved: !0
                    });
                return new _core.ruby({
                    codes: c,
                    mode: "ruby",
                    option: {
                        optimisation: !1
                    }
                });
            }
        } catch (a) {
            return "";
        }
        return "";
    })().then(function(a) {
        return b.status(200).send({
            code: a ? a === null || a === void 0 ? void 0 : a.parse.code : ""
        });
    });
}), app.use(function(a, b) {
    b.status(404), b.render('error', {
        param: {
            status: 404,
            message: 'not found'
        }
    });
});