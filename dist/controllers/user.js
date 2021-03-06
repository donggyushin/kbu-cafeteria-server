"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = __importDefault(require("../models/user"));
var dotenv_1 = __importDefault(require("dotenv"));
var aes256_1 = require("../utils/aes256");
var jsonwebtoken_1 = require("../utils/jsonwebtoken");
dotenv_1.default.config();
exports.UserLoginController = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, result, user, decryptedPassword, token, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                result = {
                    ok: true,
                    error: null,
                    token: null,
                    user: null
                };
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, user_1.default.findOne({
                        email: email
                    })
                    // 해당 user 가 존재하지 않는다면 error 
                ];
            case 2:
                user = _b.sent();
                // 해당 user 가 존재하지 않는다면 error 
                if (user === null) {
                    result.ok = false;
                    result.error = '존재하지 않는 이메일입니다.';
                    res.json(result);
                    return [2 /*return*/];
                }
                decryptedPassword = aes256_1.decryptText(user.password);
                if (password === decryptedPassword) {
                    token = jsonwebtoken_1.generateJsonwebtoken(user.id);
                    result.token = token;
                    result.user = user;
                    res.json(result);
                    return [2 /*return*/];
                }
                else {
                    result.ok = false;
                    result.error = '비밀번호가 일치하지 않습니다.';
                    res.json(result);
                    return [2 /*return*/];
                }
                return [3 /*break*/, 4];
            case 3:
                err_1 = _b.sent();
                console.error(err_1);
                result.error = "내부에러 발생";
                return [2 /*return*/, res.json(result)];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.giveAuthorities = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, authorities, result, user, userPassword, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password, authorities = _a.authorities;
                result = {
                    ok: false,
                    error: null,
                    user: null
                };
                if (!(email && password)) return [3 /*break*/, 10];
                _b.label = 1;
            case 1:
                _b.trys.push([1, 8, , 9]);
                return [4 /*yield*/, user_1.default.findOne({
                        email: email
                    })];
            case 2:
                user = _b.sent();
                if (!user) return [3 /*break*/, 6];
                userPassword = aes256_1.decryptText(user.password);
                if (!(userPassword === password)) return [3 /*break*/, 4];
                user.authorities = authorities;
                return [4 /*yield*/, user.save()];
            case 3:
                _b.sent();
                result.ok = true;
                result.user = user;
                return [2 /*return*/, res.json(result)];
            case 4:
                result.error = "패스워드가 틀렸습니다.";
                return [2 /*return*/, res.json(result)];
            case 5: return [3 /*break*/, 7];
            case 6:
                result.error = "해당하는 유저는 존재하지 않습니다.";
                return [2 /*return*/, res.json(result)];
            case 7: return [3 /*break*/, 9];
            case 8:
                err_2 = _b.sent();
                console.log(err_2.message);
                result.error = "서버 내부 에러 발생";
                res.json(result);
                return [2 /*return*/];
            case 9: return [3 /*break*/, 11];
            case 10:
                result.error = "인자를 제대로 전달받지 못하였습니다.";
                res.json(result);
                return [2 /*return*/];
            case 11: return [2 /*return*/];
        }
    });
}); };
exports.makeNewAccount = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, name, phone, result, existingUsers, existingUsersNumber, encryptedPassword, user, err_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password, name = _a.name, phone = _a.phone;
                result = {
                    ok: true,
                    error: null,
                    user: null
                };
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, user_1.default.find({
                        email: email
                    })];
            case 2:
                existingUsers = _b.sent();
                existingUsersNumber = existingUsers.length;
                if (existingUsersNumber !== 0) {
                    // 영양사가 존재하면 이미 존재한다고 알려주는 response
                    result.ok = false;
                    result.error = '이미 존재하는 아이디입니다.';
                    res.json(result);
                    return [2 /*return*/];
                }
                else {
                    encryptedPassword = aes256_1.encryptText(password);
                    user = new user_1.default({
                        email: email,
                        password: encryptedPassword,
                        name: name,
                        phone: phone
                    });
                    user.save();
                    result.user = user;
                    res.json(result);
                    return [2 /*return*/];
                }
                return [3 /*break*/, 4];
            case 3:
                err_3 = _b.sent();
                result.ok = false;
                result.error = err_3.message,
                    res.json(result);
                return [2 /*return*/];
            case 4: return [2 /*return*/];
        }
    });
}); };
