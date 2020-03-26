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
var key = "";
var cert = "";
var chain = "";
if (env === 'docker') {
    key = fs_1.default.readFileSync('/usr/src/app/dist/keys/privkey.pem', 'utf8');
    cert = fs_1.default.readFileSync('/usr/src/app/dist/keys/cert.pem', 'utf8');
    chain = fs_1.default.readFileSync('/usr/src/app/dist/keys/chain.pem', 'utf8');
}
else if (env === 'production') {
    key = fs_1.default.readFileSync('/etc/letsencrypt/live/api.kbucard.com/privkey.pem', 'utf8');
    cert = fs_1.default.readFileSync('/etc/letsencrypt/live/api.kbucard.com/cert.pem', 'utf8');
    chain = fs_1.default.readFileSync('/etc/letsencrypt/live/api.kbucard.com/chain.pem', 'utf8');
}
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
if (env === 'dev') {
    httpServer.listen(PORT, function () { return console.log("kbu-cafeteria-server listening on port " + PORT); });
}
else if (env === 'docker') {
    httpsServer.listen(PORT, function () { return console.log("[HTTPS]kbu-cafeteria-server listening on port " + PORT); });
}
else if (env === 'production') {
    httpsServer.listen(PORT, function () { return console.log("[HTTPS]kbu-cafeteria-server listening on port " + PORT); });
}
