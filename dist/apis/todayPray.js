"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var authorization_1 = require("../middlewares/authorization");
var getTodayPray_1 = require("../controllers/todayPray/getTodayPray");
var todayPray_1 = require("../controllers/todayPray");
var router = express_1.default.Router();
router.get('/pray/:id', todayPray_1.getTodayPrayById);
router.get('/prays/:page', todayPray_1.getTodayPrays);
router.get('/:date', getTodayPray_1.getTodayPray);
router.post('/:date', authorization_1.checkUserAuth, authorization_1.checkPrayer, todayPray_1.postTodayPraySpecificDate);
router.post('', authorization_1.checkUserAuth, authorization_1.checkPrayer, todayPray_1.postTodayPray);
exports.default = router;
