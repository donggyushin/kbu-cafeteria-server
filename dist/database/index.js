"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var endpoint = process.env.DEV_MONGODB_URL;
var env = process.env.NODE_ENV;
if (env === 'docker') {
    endpoint = process.env.PROD_MONGODB_URL;
}
else if (env == 'production') {
    endpoint = process.env.PROD_MONGODB_URL2;
}
mongoose_1.default.connect(endpoint, {
    useUnifiedTopology: true,
    useNewUrlParser: true
});
var db = mongoose_1.default.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function () {
    console.log('Database connected successfully');
});
