"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importStar(require("mongoose"));
var dailyMenuSchema = new mongoose_1.Schema({
    menus: [String]
});
var fixMenuSchema = new mongoose_1.Schema({
    menus: [String]
});
var lunchSchema = new mongoose_1.Schema({
    menus: [String]
});
var dinnerSchema = new mongoose_1.Schema({
    menus: [String]
});
var menuSchema = new mongoose_1.Schema({
    year: Number,
    month: Number,
    day: Number,
    lunch: lunchSchema,
    dinner: dinnerSchema,
    daily: dailyMenuSchema,
    fix: fixMenuSchema
});
var MenuModel = mongoose_1.default.model('menu', menuSchema);
exports.default = MenuModel;
