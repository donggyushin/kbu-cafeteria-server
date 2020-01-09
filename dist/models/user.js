"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var UserSchema = new mongoose_1.default.Schema({
    email: String,
    password: String,
    name: String,
    phone: String
});
var UserModel = mongoose_1.default.model('user', UserSchema);
exports.default = UserModel;
