"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { app } = require("./app");
const http_1 = __importDefault(require("http"));
const port = 3000;
const server = http_1.default.createServer(app);
server.listen(port, () => {
    console.log(`API started at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map