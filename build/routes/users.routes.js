"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const user_1 = __importStar(require("../models/user"));
const database_1 = require("../database");
const review_1 = require("../models/review");
const authorize_1 = require("../authorization/authorize");
const router = (0, express_1.Router)();
// GET - Admin - List all users
router.get('/', (0, authorize_1.authorize)(authorize_1.Roles.Admin), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, user_1.UserMap)(database_1.database);
        const result = yield user_1.default.findAll();
        res.status(200).json({ users: result });
    }
    catch (ex) {
        res.status(501).json({ exception: ex });
    }
}));
// GET - Admin - get a user - users/:id
router.get('/:id', (0, authorize_1.authorize)(authorize_1.Roles.Admin), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, user_1.UserMap)(database_1.database);
        (0, review_1.ReviewMap)(database_1.database);
        const result = yield user_1.default.findByPk(req.params.id);
        res.status(200).json({ users: result });
    }
    catch (ex) {
        res.status(501).json({ exception: ex });
    }
}));
// POST - Admin - Create a user
router.post('/', (0, authorize_1.authorize)(authorize_1.Roles.Admin), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, user_1.UserMap)(database_1.database);
        const result = yield user_1.default.create(req.body);
        let newUser = result.dataValues;
        const token = (0, authorize_1.issueToken)(newUser);
        res.status(201).json(Object.assign(Object.assign({}, newUser), { token }));
    }
    catch (ex) {
        res.status(501).json({ exception: ex });
    }
}));
exports.default = router;
//# sourceMappingURL=users.routes.js.map