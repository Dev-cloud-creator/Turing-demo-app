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
const router = (0, express_1.Router)();
const _adminController = new admin_controller_1.AdminController();
// GET - Admin - List all users
router.get('/', (0, authorize_1.authorize)(authorize_1.Roles.Admin), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield _adminController.ListUsers();
        res.status(200).json({ users: result });
    }
    catch (ex) {
        res.status(501).json({ exception: ex });
    }
}));
// GET - Admin - get a user - users/:id
router.get('/:id', (0, authorize_1.authorize)(authorize_1.Roles.Admin), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let result = yield _adminController.GetUserById(req.params.id);
        res.status(200).json({ users: result });
    }
    catch (ex) {
        res.status(501).json({ exception: ex });
    }
}));
// POST - Admin - Create a user
router.post('/', (0, authorize_1.authorize)(authorize_1.Roles.Admin), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let newUser = yield _adminController.CreateOrUpdateUser(req.body);
        const token = (0, authorize_1.issueToken)(newUser);
        res.status(201).json(Object.assign(Object.assign({}, newUser), { token }));
    }
    catch (ex) {
        res.status(501).json({ exception: ex });
    }
}));
exports.default = router;
//# sourceMappingURL=users.routes.js.map