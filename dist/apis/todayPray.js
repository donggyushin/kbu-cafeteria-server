"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var authorization_1 = require("../middlewares/authorization");
var todayPray_1 = require("../controllers/todayPray");
var router = express_1.default.Router();
router.post('', authorization_1.checkUserAuth, todayPray_1.postTodayPray);
router.get('/:date', todayPray_1.getTodayPray);
exports.default = router;
