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
// src/routes/Reviews.routes.ts
const express_1 = require("express");
const authorize_1 = require("../authorization/authorize");
const mentor_controller_1 = require("../controllers/mentor.controller");
const router = (0, express_1.Router)();
const _mentorController = new mentor_controller_1.MentorController();
// POST - Mentor - get all reviews - mentors/getReviews
router.get('/getReviews', (0, authorize_1.authorize)(authorize_1.Roles.Mentor), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var loggedinUser = req.user;
        let result = yield _mentorController.ListReviews(loggedinUser.id);
        res.status(200).json({ Review: result });
    }
    catch (ex) {
        res.status(501).json({ exception: ex });
    }
}));
// PUT - Mentor - Start a Review - mentors/startReview/:id
router.put('/startReview/:id', (0, authorize_1.authorize)(authorize_1.Roles.Mentor), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var loggedinUser = req.user;
        let result = yield _mentorController.StartReview(req.params.id, loggedinUser.id);
        res.status(202).json({ Review: result });
    }
    catch (ex) {
        res.status(501).json({ exception: ex });
    }
}));
// PUT - Complete a Review by id with comments and score - mentors/completeReview/:id
router.put('/completeReview/:id', (0, authorize_1.authorize)(authorize_1.Roles.Mentor), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var loggedinUser = req.user;
        var result = yield _mentorController.CompleteReview(req.params.id, loggedinUser.id, req.body.score, req.body.comments);
        res.status(202).json({ Review: result });
    }
    catch (ex) {
        res.status(501).json({ exception: ex });
    }
}));
// PUT - Mentor - Cancel a Review associated to self
router.put('/cancelReview/:id', (0, authorize_1.authorize)(authorize_1.Roles.Mentor), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var loggedinUser = req.user;
        let result = yield _mentorController.CancelReview(req.params.id, loggedinUser.id);
        res.status(202).json({ Review: result });
    }
    catch (ex) {
        res.status(501).json({ exception: ex });
    }
}));
exports.default = router;
//# sourceMappingURL=mentors.routes.js.map