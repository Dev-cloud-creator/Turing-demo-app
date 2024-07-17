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
const admin_controller_1 = require("../controllers/admin.controller");
const router = (0, express_1.Router)();
const _adminController = new admin_controller_1.AdminController();
// GET - Admin - List all Reviews
router.get('/', (0, authorize_1.authorize)(authorize_1.Roles.Admin), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield _adminController.ListReviews();
        res.status(200).json({ Reviews: result });
    }
    catch (ex) {
        res.status(501).json({ exception: ex });
    }
}));
// GET - Admin - List one review by id - Reviews/:id
router.get('/:id', (0, authorize_1.authorize)(authorize_1.Roles.Admin), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield _adminController.GetReviewById(req.params.id);
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
        if (userid)
            res.status(200).json({ Review: yield _adminController.GetReviewsByUser(userid) });
        else
            res.status(404).json({ Message: "notfound" });
    }
    catch (ex) {
        res.status(501).json({ exception: ex });
    }
}));
// POST - Admin - update any review
router.post('/', (0, authorize_1.authorize)(authorize_1.Roles.Admin), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield _adminController.CreateOrUpdateReview(req.body);
        res.status(201).json({ Review: result });
    }
    catch (ex) {
        res.status(501).json({ exception: ex });
    }
}));
// PUT - Admin - Cancel a Review
router.put('/cancelReview/:id', (0, authorize_1.authorize)(authorize_1.Roles.Admin), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let result = yield _adminController.CancelReview(req.params.id);
        if (result) {
            res.status(202).json({ Review: result });
        }
        else
            res.status(412).json({ Message: "failed to update" });
    }
    catch (ex) {
        res.status(501).json({ exception: ex });
    }
}));
exports.default = router;
//# sourceMappingURL=reviews.routes.js.map