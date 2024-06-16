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
// src/routes/Reviews.routes.ts
const express_1 = require("express");
const review_1 = __importStar(require("../models/review"));
const user_1 = require("../models/user");
const database_1 = require("../database");
const authorize_1 = require("../authorization/authorize");
const sequelize_1 = require("sequelize");
const router = (0, express_1.Router)();
// GET - Admin - List all Reviews
router.get('/', (0, authorize_1.authorize)(authorize_1.Roles.Admin), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, review_1.ReviewMap)(database_1.database);
        const result = yield review_1.default.findAll();
        res.status(200).json({ Reviews: result });
    }
    catch (ex) {
        res.status(501).json({ exception: ex });
    }
}));
// GET - Admin - List one review by id - Reviews/:id
router.get('/:id', (0, authorize_1.authorize)(authorize_1.Roles.Admin), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, review_1.ReviewMap)(database_1.database);
        const result = yield review_1.default.findByPk(req.params.id);
        res.status(200).json({ Reviews: result });
    }
    catch (ex) {
        res.status(501).json({ exception: ex });
    }
}));
// GET - Admin - List any users review - Reviews/:id
router.get('/getReviewsForUser/:userid', (0, authorize_1.authorize)(authorize_1.Roles.Admin), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userid } = req.params;
        (0, review_1.ReviewMap)(database_1.database);
        let result = yield review_1.default.findAll({
            where: {
                [sequelize_1.Op.or]: [
                    { mentor_id: Number(userid) },
                    { student_id: Number(userid) }
                ]
            }
        });
        res.status(200).json({ Review: result });
    }
    catch (ex) {
        res.status(501).json({ exception: ex });
    }
}));
// POST - Admin - update any review
router.post('/', (0, authorize_1.authorize)(authorize_1.Roles.Admin), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, user_1.UserMap)(database_1.database);
        (0, review_1.ReviewMap)(database_1.database);
        const result = yield review_1.default.create(req.body);
        let newReview = result.dataValues;
        res.status(201).json({ Review: newReview });
    }
    catch (ex) {
        res.status(501).json({ exception: ex });
    }
}));
// POST - Admin - Cancel a Review
router.put('/cancelReview/:id', (0, authorize_1.authorize)(authorize_1.Roles.Admin), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, review_1.ReviewMap)(database_1.database);
        let result = yield review_1.default.findByPk(req.params.id);
        if (result) {
            result.statetype = review_1.StateType.CANCELED;
            result.save();
            res.status(202).json({ Review: result });
        }
    }
    catch (ex) {
        res.status(501).json({ exception: ex });
    }
}));
exports.default = router;
//# sourceMappingURL=reviews.routes.js.map