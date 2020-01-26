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
var todayPray_1 = __importDefault(require("../models/todayPray"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.getTodayPray = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var date, result, dateObject, year, month, day, todayPray, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                date = req.params.date;
                result = {
                    ok: false,
                    error: null,
                    todayPray: null
                };
                if (!date) return [3 /*break*/, 5];
                dateObject = new Date(parseInt(date));
                year = dateObject.getFullYear();
                month = dateObject.getMonth();
                day = dateObject.getDate();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, todayPray_1.default.findOne({
                        year: year,
                        month: month,
                        day: day
                    })];
            case 2:
                todayPray = _a.sent();
                if (todayPray) {
                    todayPray.writer.password = "";
                    result.ok = true;
                    result.todayPray = todayPray;
                    res.json(result);
                    return [2 /*return*/];
                }
                else {
                    result.error = "요청하신 날짜의 오늘의 기도문은 아직 업로드 되지 않았습니다. ";
                    res.json(result);
                    return [2 /*return*/];
                }
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                result.error = "오늘의 기도 데이터를 불러오던 도중에 에러가 발생하였습니다. ";
                res.json(result);
                return [2 /*return*/];
            case 4: return [3 /*break*/, 6];
            case 5:
                result.error = "인자를 제대로 전달받지 못하였습니다. 누락된 parameter: date";
                res.json(result);
                return [2 /*return*/];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.postTodayPray = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, studentPray, ads, todayPrayContent, date, result, writer, year, month, day, existingPray, err_2, todayPray, err_3, err_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, studentPray = _a.studentPray, ads = _a.ads, todayPrayContent = _a.todayPrayContent;
                date = new Date();
                result = {
                    ok: false,
                    error: null,
                    todayPray: null
                };
                if (!(studentPray && ads && todayPrayContent)) return [3 /*break*/, 14];
                writer = req.user;
                year = date.getFullYear();
                month = date.getMonth();
                day = date.getDate();
                _b.label = 1;
            case 1:
                _b.trys.push([1, 12, , 13]);
                return [4 /*yield*/, todayPray_1.default.findOne({
                        year: year,
                        month: month,
                        day: day
                    })];
            case 2:
                existingPray = _b.sent();
                if (!existingPray) return [3 /*break*/, 7];
                existingPray.writer = writer;
                existingPray.ads = ads;
                existingPray.studentPray = studentPray;
                existingPray.todayPrayContent = todayPrayContent;
                _b.label = 3;
            case 3:
                _b.trys.push([3, 5, , 6]);
                return [4 /*yield*/, existingPray.save()];
            case 4:
                _b.sent();
                result.ok = true;
                result.todayPray = existingPray;
                res.json(result);
                return [2 /*return*/];
            case 5:
                err_2 = _b.sent();
                result.error = '기도문을 수정하던 도중에 에러발생';
                res.json(result);
                return [2 /*return*/];
            case 6: return [3 /*break*/, 11];
            case 7:
                _b.trys.push([7, 10, , 11]);
                return [4 /*yield*/, new todayPray_1.default({
                        writer: writer,
                        year: year,
                        month: month,
                        day: day,
                        studentPray: studentPray,
                        ads: ads,
                        todayPrayContent: todayPrayContent
                    })];
            case 8:
                todayPray = _b.sent();
                todayPray.writer;
                return [4 /*yield*/, todayPray.save()];
            case 9:
                _b.sent();
                result.ok = true;
                result.todayPray = todayPray;
                res.json(result);
                return [2 /*return*/];
            case 10:
                err_3 = _b.sent();
                console.log("\uC0C8\uB85C\uC6B4 today \uAC1D\uCCB4\uB97C \uB9CC\uB4E4\uB2E4\uAC00 \uC624\uB958 \uBC1C\uC0DD. ");
                result.error = '새로운 today 객체를 만들다가 오류 발생. ';
                res.json(result);
                return [2 /*return*/];
            case 11: return [3 /*break*/, 13];
            case 12:
                err_4 = _b.sent();
                console.log('기존에 존재하는 기도문을 찾던 도중에 에러 발생.');
                result.error = '기존에 존재하는 기도문을 찾던 도중에 에러 발생.';
                res.json(result);
                return [2 /*return*/];
            case 13: return [3 /*break*/, 15];
            case 14:
                result.error = '인자를 제대로 전달받지 못하였습니다. ';
                console.log('studentPray: ', studentPray);
                console.log('ads: ', ads);
                console.log('todayPrayContent: ', todayPrayContent);
                res.json(result);
                return [2 /*return*/];
            case 15: return [2 /*return*/];
        }
    });
}); };
