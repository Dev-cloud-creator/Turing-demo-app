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
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/users.routes.ts
const express_1 = require("express");
const authorize_1 = require("../authorization/authorize");
const admin_controller_1 = require("../controllers/admin.controller");
const bcrypt = require('bcrypt');
const router = (0, express_1.Router)();
const _adminController = new admin_controller_1.AdminController();
// POST - Login with email and pwd
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const result = yield _adminController.GetUserByEmail(email);
        if (result && req.body.password) {
            var hashedpassword = result.password;
            var passwordresult = yield bcrypt.compare(password, hashedpassword);
            if (passwordresult) {
                let user = result.get({ plain: true });
                const token = (0, authorize_1.issueToken)(user);
                return res.status(200).json(Object.assign(Object.assign({}, user), { token }));
            }
        }
        res.status(401).json({ message: "Sorry Not Allowed Here !" });
    }
    catch (ex) {
        res.status(501).json({ exception: ex });
    }
}));
exports.default = router;
//# sourceMappingURL=login.routes.js.map