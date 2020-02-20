"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var user_1 = require("../controllers/user");
var router = express_1.default.Router();
router.post('/new/account', user_1.makeNewAccount);
router.post('/login', user_1.UserLoginController);
router.post('/authorities', user_1.giveAuthorities);
exports.default = router;
