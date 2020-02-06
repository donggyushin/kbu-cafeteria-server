"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var menu_1 = require("../controllers/menu");
var authorization_1 = require("../middlewares/authorization");
var router = express_1.default.Router();
// date 값은 해당 날짜를 miliseconds 단위로 반환한 값이다. 
// 특정 date 값을 받아와서 해당 날에 해당하는 menu 오브젝트를 반환해주는 api    
router.get('/menu/:date', menu_1.getSpecificOneMenuBasedOnDate);
// date1 과 date2 사이에 해당하는 모든 menu 오브젝트들을 반환해주는 api
router.get('/menus/:date1/:date2', menu_1.getMenusBasedOnSpecificDate);
// 해당 연과 달에 해당하는 모든 menu 오브젝트들을 반환해주는 api
router.get('/:year/:month', menu_1.GetMenusOnAMonthly);
router.put('', authorization_1.checkUserAuth, authorization_1.checkCooker, menu_1.PutNewMenu);
exports.default = router;
