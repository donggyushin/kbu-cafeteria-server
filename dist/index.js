"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
require("./database");
var app_1 = __importDefault(require("./app"));
dotenv_1.default.config();
var PORT = process.env.PORT;
app_1.default.listen(PORT, function () { return console.log("KBU Cafeteria Web server is listening on port " + PORT); });
