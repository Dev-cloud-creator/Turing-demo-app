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
const database_1 = require("../database");
const authorize_1 = require("../authorization/authorize");
const router = (0, express_1.Router)();
// POST - Mentor - get all reviews - mentors/getReviews
router.get('/getReviews', (0, authorize_1.authorize)(authorize_1.Roles.Mentor), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var loggedinUser = req.user;
        (0, review_1.ReviewMap)(database_1.database);
        let result = yield review_1.default.findAll({
            where: {
                mentor_id: Number(loggedinUser.id)
            }
        });
        res.status(200).json({ Review: result });
    }
    catch (ex) {
        res.status(501).json({ exception: ex });
    }
}));
// PUT - Mentor - Start a Review - mentors/startReview/:id
router.put('/startReview/:id', (0, authorize_1.authorize)(authorize_1.Roles.Mentor), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, review_1.ReviewMap)(database_1.database);
        var loggedinUser = req.user;
        let result = yield review_1.default.findOne({
            where: {
                id: req.params.id,
                mentor_id: loggedinUser.id,
            }
        });
        if (result && result.timestart && result.timestart <= Math.floor((new Date()).getTime() / 1000)) {
            result.statetype = review_1.StateType.INPROGRESS;
            result.save();
            res.status(202).json({ Review: result });
        }
    }
    catch (ex) {
        res.status(501).json({ exception: ex });
    }
}));
// PUT - Complete a Review by id with comments and score - mentors/completeReview/:id
router.put('/completeReview/:id', (0, authorize_1.authorize)(authorize_1.Roles.Mentor), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, review_1.ReviewMap)(database_1.database);
        var loggedinUser = req.user;
        let result = yield review_1.default.findOne({
            where: {
                id: req.params.id,
                mentor_id: loggedinUser.id,
            }
        });
        if (result && result.timestart && result.statetype == review_1.StateType.INPROGRESS
            && result.timestart <= Math.floor((new Date()).getTime() / 1000)) {
            result.statetype = review_1.StateType.COMPLETED;
            result.score = req.body.score;
            result.comments = req.body.comments;
            result.save();
            res.status(202).json({ Review: result });
        }
    }
    catch (ex) {
        res.status(501).json({ exception: ex });
    }
}));
// PUT - Mentor - Cancel a Review associated to self
router.put('/cancelReview/:id', (0, authorize_1.authorize)(authorize_1.Roles.Mentor), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, review_1.ReviewMap)(database_1.database);
        var loggedinUser = req.user;
        let result = yield review_1.default.findOne({
            where: {
                id: req.params.id,
                mentor_id: loggedinUser.id,
            }
        });
        if (result && result.timestart && result.timestart >= Math.floor((new Date()).getTime() / 1000)) {
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
//# sourceMappingURL=mentors.routes.js.map