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
var user_1 = require("./user");
var studentPraySchema = new mongoose_1.Schema({
    name: String,
    studentId: String,
    prays: [String]
});
var todayPraySchema = new mongoose_1.Schema({
    year: Number,
    month: Number,
    day: Number,
    studentPray: [studentPraySchema],
    ads: [String],
    todayPrayContent: [String],
    writer: user_1.UserSchema
});
var PrayModel = mongoose_1.default.model('todayPray', todayPraySchema);
exports.default = PrayModel;
