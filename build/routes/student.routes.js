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
const student_controller_1 = require("../controllers/student.controller");
const router = (0, express_1.Router)();
const _studentController = new student_controller_1.StudentController();
// GET - Get free mentor next x hours - Students/getmentor/:hour/:min
router.get('/getmentor/:hour', (0, authorize_1.authorize)(authorize_1.Roles.Student), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var loggedinUser = req.user;
        const mentorsFree = yield _studentController.GetFreeMentorsInNextXHours(loggedinUser.id, req.params.hour);
        res.status(200).json({ Reviews: mentorsFree });
    }
    catch (ex) {
        res.status(501).json({ exception: ex });
    }
}));
// GET - Get free mentor in any time upto in next 24 hours - Students/getmentor/:hour/:min
router.get('/getmentor/:hour/:min', (0, authorize_1.authorize)(authorize_1.Roles.Student), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var loggedinUser = req.user;
        const mentorsFree = yield _studentController.GetFreeMentorsInNext24Hours(loggedinUser.id, req.params.hour, req.params.min);
        res.status(200).json({ Reviews: mentorsFree });
    }
    catch (ex) {
        res.status(501).json({ exception: ex });
    }
}));
// GET - Get free mentor in any time and date - Students/getmentor/:date/:hour/:min
router.get('/getmentor/:date/:hour/:min', (0, authorize_1.authorize)(authorize_1.Roles.Student), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var loggedinUser = req.user;
        const mentorsFree = yield _studentController.GetFreeMentorsAtTime(loggedinUser.id, req.params.date, req.params.hour, req.params.min);
        res.status(200).json({ Reviews: mentorsFree });
    }
    catch (ex) {
        res.status(501).json({ exception: ex });
    }
}));
// GET - Check Reviews for student - Student/getReviews
router.get('/getReviews', (0, authorize_1.authorize)(authorize_1.Roles.Student), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var loggedinUser = req.user;
        const mentorsFree = yield _studentController.ListReviews(loggedinUser.id);
        res.status(200).json({ Reviews: mentorsFree });
    }
    catch (ex) {
        res.status(501).json({ exception: ex });
    }
}));
// GET - schedule review with mentor
router.get('/schedulereview/:mentorid/:date/:hour/:min', (0, authorize_1.authorize)(authorize_1.Roles.Student), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var loggedinUser = req.user;
        const mentorsFree = yield _studentController.ScheduleReview(loggedinUser.id, req.params.mentorid, req.params.date, req.params.hour, req.params.min);
        res.status(200).json({ Review: mentorsFree });
    }
    catch (ex) {
        res.status(501).json({ exception: ex });
    }
}));
// PUT - Student - Cancel a Review associated to self
router.put('/cancelReview/:id', (0, authorize_1.authorize)(authorize_1.Roles.Student), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var loggedinUser = req.user;
        const mentorsFree = yield _studentController.CancelReview(req.params.id, loggedinUser.id);
        res.status(200).json({ Review: mentorsFree });
    }
    catch (ex) {
        res.status(501).json({ exception: ex });
    }
}));
exports.default = router;
//# sourceMappingURL=student.routes.js.map