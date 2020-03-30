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
var menu_1 = __importDefault(require("../models/menu"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.getSpecificOneMenuBasedOnDate = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var date, result, parsedDate, year, month, day, menu, dinner, dinnerPrice, lunch, lunchPrice, fix, fixPrices, daily, dailyPrices, newMenu, err_1, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                date = req.params.date;
                result = {
                    ok: false,
                    error: null,
                    menu: null
                };
                parsedDate = new Date(parseInt(date));
                year = parsedDate.getFullYear();
                month = parsedDate.getMonth();
                day = parsedDate.getDate();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 8, , 9]);
                return [4 /*yield*/, menu_1.default.findOne({
                        year: year,
                        month: month,
                        day: day
                    })];
            case 2:
                menu = _a.sent();
                if (!menu) return [3 /*break*/, 3];
                result.ok = true;
                result.menu = menu;
                res.json(result);
                return [2 /*return*/];
            case 3:
                dinner = {
                    menus: []
                };
                dinnerPrice = 0;
                lunch = {
                    menus: []
                };
                lunchPrice = 0;
                fix = {
                    menus: []
                };
                fixPrices = [];
                daily = {
                    menus: []
                };
                dailyPrices = [];
                _a.label = 4;
            case 4:
                _a.trys.push([4, 6, , 7]);
                return [4 /*yield*/, new menu_1.default({
                        year: year,
                        month: month,
                        day: day,
                        dinner: dinner,
                        lunch: lunch,
                        fix: fix,
                        daily: daily,
                        dinnerPrice: dinnerPrice,
                        lunchPrice: lunchPrice,
                        fixPrices: fixPrices,
                        dailyPrices: dailyPrices
                    })];
            case 5:
                newMenu = _a.sent();
                result.ok = true;
                result.menu = newMenu;
                res.json(result);
                return [2 /*return*/];
            case 6:
                err_1 = _a.sent();
                result.ok = false;
                result.error = 'internal server error. 관리자에게 문의';
                res.json(result);
                return [2 /*return*/];
            case 7: return [3 /*break*/, 9];
            case 8:
                err_2 = _a.sent();
                console.error(err_2);
                result.error = '서버내 에러발생. 관리자에게 문의 바람. ';
                res.json(result);
                return [2 /*return*/];
            case 9: return [2 /*return*/];
        }
    });
}); };
exports.getMenusBasedOnSpecificDate = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, date2, date1, result, menusList, diff, parsedDate1, days, startYear, startMonth, startDay, numberOfDaysOfTheStartMonth, year, month, day, i, menu, dinner, dinnerPrice, lunch, lunchPrice, fix, fixPrices, daily, dailyPrices, newMenu, err_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.params, date2 = _a.date2, date1 = _a.date1;
                result = {
                    ok: false,
                    error: null,
                    menus: []
                };
                menusList = [];
                diff = parseInt(date2) - parseInt(date1);
                if (!(diff >= 0 && diff <= 345600000)) return [3 /*break*/, 12];
                parsedDate1 = new Date(parseInt(date1));
                days = diff / 86400000;
                startYear = parsedDate1.getFullYear();
                startMonth = parsedDate1.getMonth();
                startDay = parsedDate1.getDate();
                numberOfDaysOfTheStartMonth = 32 - new Date(startYear, startMonth, 32).getDate();
                year = startYear;
                month = startMonth;
                day = startDay;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 10, , 11]);
                i = 0;
                _b.label = 2;
            case 2:
                if (!(i <= days)) return [3 /*break*/, 9];
                return [4 /*yield*/, menu_1.default.findOne({
                        year: year,
                        month: month,
                        day: day
                    })];
            case 3:
                menu = _b.sent();
                if (!menu) return [3 /*break*/, 4];
                menusList.push(menu);
                return [3 /*break*/, 7];
            case 4:
                dinner = {
                    menus: []
                };
                dinnerPrice = 0;
                lunch = {
                    menus: []
                };
                lunchPrice = 0;
                fix = {
                    menus: []
                };
                fixPrices = [];
                daily = {
                    menus: []
                };
                dailyPrices = [];
                return [4 /*yield*/, new menu_1.default({
                        year: year,
                        month: month,
                        day: day,
                        dinner: dinner,
                        lunch: lunch,
                        fix: fix,
                        daily: daily,
                        dinnerPrice: dinnerPrice,
                        lunchPrice: lunchPrice,
                        dailyPrices: dailyPrices,
                        fixPrices: fixPrices
                    })];
            case 5:
                newMenu = _b.sent();
                return [4 /*yield*/, newMenu.save()];
            case 6:
                _b.sent();
                menusList.push(newMenu);
                _b.label = 7;
            case 7:
                if (day === numberOfDaysOfTheStartMonth) {
                    day = 1;
                    if (month === 11) {
                        month = 0;
                        year = year + 1;
                    }
                    else {
                        month = month + 1;
                    }
                }
                else {
                    day = day + 1;
                }
                _b.label = 8;
            case 8:
                i++;
                return [3 /*break*/, 2];
            case 9:
                result.ok = true;
                result.menus = menusList;
                res.json(result);
                return [2 /*return*/];
            case 10:
                err_3 = _b.sent();
                console.error("Error occured at [" + __dirname + "]:" + err_3.message);
                result.ok = false;
                result.error = "알수없는 이유로 인해서 메뉴들을 불러오지 못하였습니다. 관리자에게 문의해주세요. 01090411019";
                res.json(result);
                return [2 /*return*/];
            case 11: return [3 /*break*/, 13];
            case 12:
                result.error = '날짜 입력 양식이 잘못되었습니다. 최소 1일, 최대 5일 까지의 범위만 입력해주세요.';
                res.json(result);
                return [2 /*return*/];
            case 13: return [2 /*return*/];
        }
    });
}); };
exports.PutNewMenu = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newMenu, result, menu, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                newMenu = req.body.menu;
                result = {
                    ok: true,
                    error: null,
                    menu: null
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, menu_1.default.findById(newMenu._id)];
            case 2:
                menu = _a.sent();
                menu.lunch.menus = newMenu.lunch.menus;
                menu.dinner.menus = newMenu.dinner.menus;
                menu.fix.menus = newMenu.fix.menus;
                menu.daily.menus = newMenu.daily.menus;
                menu.lunchPrice = newMenu.lunchPrice;
                menu.dinnerPrice = newMenu.dinnerPrice;
                menu.fixPrices = newMenu.fixPrices;
                menu.dailyPrices = newMenu.dailyPrices;
                return [4 /*yield*/, menu.save()];
            case 3:
                _a.sent();
                result.menu = menu;
                res.json(result);
                return [2 /*return*/];
            case 4:
                err_4 = _a.sent();
                console.error("Error occured at [" + __dirname + "]: " + err_4);
                result.ok = false;
                result.error = '메뉴를 변경하던 도중에 에러가 발생함. 관리자에게 문의 부탁';
                res.json(result);
                return [2 /*return*/];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.GetMenusOnAMonthly = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, _a, year, month, parsedYear, parsedMonth, menuObjects, days, index, menu, dinner, dinnerPrice, lunch, lunchPrice, fix, fixPrices, daily, dailyPrices, newMenu, err_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                result = {
                    ok: true,
                    error: null,
                    menus: []
                };
                _a = req.params, year = _a.year, month = _a.month;
                parsedYear = parseInt(year);
                parsedMonth = parseInt(month);
                menuObjects = [];
                days = 32 - new Date(parsedYear, parsedMonth, 32).getDate();
                _b.label = 1;
            case 1:
                _b.trys.push([1, 9, , 10]);
                index = 0;
                _b.label = 2;
            case 2:
                if (!(index < days)) return [3 /*break*/, 8];
                return [4 /*yield*/, menu_1.default.findOne({
                        year: year,
                        month: month,
                        day: index + 1
                    })];
            case 3:
                menu = _b.sent();
                if (!menu) return [3 /*break*/, 4];
                menuObjects.push(menu);
                return [3 /*break*/, 7];
            case 4:
                dinner = {
                    menus: []
                };
                dinnerPrice = 0;
                lunch = {
                    menus: []
                };
                lunchPrice = 0;
                fix = {
                    menus: []
                };
                fixPrices = [];
                daily = {
                    menus: []
                };
                dailyPrices = [];
                return [4 /*yield*/, new menu_1.default({
                        year: year,
                        month: month,
                        day: index + 1,
                        dinner: dinner,
                        lunch: lunch,
                        fix: fix,
                        daily: daily,
                        dinnerPrice: dinnerPrice,
                        lunchPrice: lunchPrice,
                        fixPrices: fixPrices,
                        dailyPrices: dailyPrices
                    })];
            case 5:
                newMenu = _b.sent();
                return [4 /*yield*/, newMenu.save()];
            case 6:
                _b.sent();
                menuObjects.push(newMenu);
                _b.label = 7;
            case 7:
                index++;
                return [3 /*break*/, 2];
            case 8:
                // 그렇게 instance 들을 menuObecjts 라는 배열에 담아주고 
                // 반환해준다
                result.menus = menuObjects;
                res.json(result);
                return [2 /*return*/];
            case 9:
                err_5 = _b.sent();
                console.error("Error occured at:[" + __dirname + "]: " + err_5.message);
                result.ok = false;
                result.error = "internal error";
                res.json(result);
                return [2 /*return*/];
            case 10: return [2 /*return*/];
        }
    });
}); };
