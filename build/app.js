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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const users_routes_1 = __importDefault(require("./routes/users.routes"));
const reviews_routes_1 = __importDefault(require("./routes/reviews.routes"));
const student_routes_1 = __importDefault(require("./routes/student.routes"));
const mentors_routes_1 = __importDefault(require("./routes/mentors.routes"));
const login_routes_1 = __importDefault(require("./routes/login.routes"));
const port = 3000;
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({
        message: 'Hello World'
    });
}));
app.use('/users', users_routes_1.default);
app.use('/reviews', reviews_routes_1.default);
app.use('/students', student_routes_1.default);
app.use('/mentors', mentors_routes_1.default);
app.use('/login', login_routes_1.default);
module.exports = { app };
//# sourceMappingURL=app.js.map