'use strict'
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt (value) { return value instanceof P ? value : new P(function (resolve) { resolve(value) }) }

    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled (value) { try { step(generator.next(value)) } catch (e) { reject(e) } }

        function rejected (value) { try { step(generator['throw'](value)) } catch (e) { reject(e) } }

        function step (result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected) }

        step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
}
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = {
        label: 0, sent: function () {
            if (t[0] & 1) throw t[1]
            return t[1]
        }, trys: [], ops: []
    }, f, y, t, g
    return g = {
        next: verb(0),
        'throw': verb(1),
        'return': verb(2)
    }, typeof Symbol === 'function' && (g[Symbol.iterator] = function () { return this }), g

    function verb (n) { return function (v) { return step([n, v]) } }

    function step (op) {
        if (f) throw new TypeError('Generator is already executing.')
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y['return'] : op[0] ? y['throw'] || ((t = y['return']) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t
            if (y = 0, t) op = [op[0] & 2, t.value]
            switch (op[0]) {
                case 0:
                case 1:
                    t = op
                    break
                case 4:
                    _.label++
                    return { value: op[1], done: false }
                case 5:
                    _.label++
                    y = op[1]
                    op = [0]
                    continue
                case 7:
                    op = _.ops.pop()
                    _.trys.pop()
                    continue
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0
                        continue
                    }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                        _.label = op[1]
                        break
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1]
                        t = op
                        break
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2]
                        _.ops.push(op)
                        break
                    }
                    if (t[2]) _.ops.pop()
                    _.trys.pop()
                    continue
            }
            op = body.call(thisArg, _)
        } catch (e) {
            op = [6, e]
            y = 0
        } finally { f = t = 0 }
        if (op[0] & 5) throw op[1]
        return { value: op[0] ? op[1] : void 0, done: true }
    }
}
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { 'default': mod }
}
exports.__esModule = true
var express_1 = __importDefault(require('express'))
var request_synchronizer_1 = __importDefault(require('./request-synchronizer'))
var app = (0, express_1['default'])()
var port = 5000
var randInt = function (min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min))
}
var getSimple = function (data) {
    return new Promise(function (resolve) {
        var timeOut = randInt(0, 2000)
        setTimeout(function () {
            resolve(true)
        }, timeOut)
    })
}
var getComplex = function (data) {
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve) {
                var timeOut = randInt(0, 20000)
                setTimeout(function () {
                    if (timeOut % 2 === 0) {
                        resolve(true)
                    }
                    resolve(false)
                }, timeOut)
            })]
        })
    })
}
var getSimpleHandler = function (req, res) {
    return __awaiter(void 0, void 0, void 0, function () {
        var data, result
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    data = req.body
                    return [4 /*yield*/, getSimple(data)]
                case 1:
                    result = _a.sent()
                    if (result) {
                        res.status(200).end()
                    }
                    res.status(500).end()
                    return [2 /*return*/]
            }
        })
    })
}
var complexCounter = 0
var getComplexHandler = function (req, res) {
    return __awaiter(void 0, void 0, void 0, function () {
        var data, counter
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('complex handler started')
                    data = req.body
                    counter = complexCounter
                    console.log('complex counter: '.concat(counter))
                    return [4 /*yield*/, getComplex(data)]
                case 1:
                    _a.sent()
                    console.log('complex awaited')
                    complexCounter = counter + 1
                    console.log('new complex counter: '.concat(complexCounter))
                    return [2 /*return*/]
            }
        })
    })
}
app.get('/simple', function (req, res) {
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            request_synchronizer_1['default'].resolveRequest({ func: getSimpleHandler, req: req, res: res }, 'simple')
            return [2 /*return*/]
        })
    })
})
app.get('/complex', function (req, res) {
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            console.log('complex request started')
            request_synchronizer_1['default'].resolveRequest({
                func: getComplexHandler,
                req: req,
                res: res
            }, 'complex')
            res.status(200).end()
            return [2 /*return*/]
        })
    })
})
app.get('/complex-result', function (req, res) {
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            res.json({ complexCounter: complexCounter }).status(200)
            return [2 /*return*/]
        })
    })
})
app.listen(port, function () { return console.log('server started') })
//# sourceMappingURL=test.js.map