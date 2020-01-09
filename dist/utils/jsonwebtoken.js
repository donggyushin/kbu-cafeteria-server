"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.generateJsonwebtoken = function (text) {
    var key = process.env.JSON_WEB_TOKEN_KEY;
    var token = jsonwebtoken_1.default.sign({
        foo: text
    }, key);
    return token;
};
exports.decodeFooJsonwebtoken = function (token) {
    var key = process.env.JSON_WEB_TOKEN_KEY;
    var decoded = jsonwebtoken_1.default.verify(token, key);
    var foo = decoded.foo;
    return foo;
};
