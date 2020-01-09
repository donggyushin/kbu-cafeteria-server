"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var aes256_1 = __importDefault(require("aes256"));
exports.encryptText = function (text) {
    var key = process.env.AES256_KEY;
    var encryptedText = aes256_1.default.encrypt(key, text);
    return encryptedText;
};
exports.decryptText = function (encryptedText) {
    var key = process.env.AES256_KEY;
    var decryptedText = aes256_1.default.decrypt(key, encryptedText);
    return decryptedText;
};
