"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var apis_1 = __importDefault(require("./apis"));
var cors_1 = __importDefault(require("cors"));
var fs_1 = __importDefault(require("fs"));
var dotenv_1 = __importDefault(require("dotenv"));
var http_1 = __importDefault(require("http"));
var https_1 = __importDefault(require("https"));
dotenv_1.default.config();
var env = process.env.NODE_ENV || 'dev';
var key = fs_1.default.readFileSync(__dirname + '/keys/privkey.pem', 'utf8');
var cert = fs_1.default.readFileSync(__dirname + '/keys/cert.pem', 'utf8');
var chain = fs_1.default.readFileSync(__dirname + '/keys/chain.pem', 'utf8');
var credentials = {
    key: key,
    cert: cert,
    ca: chain
};
var app = express_1.default();
var httpServer = http_1.default.createServer(app);
var httpsServer = https_1.default.createServer(credentials, app);
var PORT = process.env.PORT;
app.use(cors_1.default());
app.use(express_1.default.json());
app.use('/api', apis_1.default);
httpServer.listen(4001, function () { return console.log("kbu-cafeteria-server listening on port " + PORT); });
// if (env === 'dev'){
//     httpServer.listen(PORT, () => console.log(`kbu-cafeteria-server listening on port ${PORT}`))
// }else {
//     httpsServer.listen(PORT, () => console.log(`kbu-cafeteria-server listening on port ${PORT}`))
// }
