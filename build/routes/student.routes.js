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
const user_1 = __importStar(require("../models/user"));
const database_1 = require("../database");
const sequelize_1 = require("sequelize");
const authorize_1 = require("../authorization/authorize");
const router = (0, express_1.Router)();
// GET - Get free mentor next x hours - Students/getmentor/:hour/:min
router.get('/getmentor/:hours', (0, authorize_1.authorize)(authorize_1.Roles.Student), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let currentUTCTime = Math.floor((new Date()).getTime() / 1000);
        currentUTCTime = currentUTCTime - (3600 * 30);
        const endUTCDateTime = currentUTCTime + (3600 * Number(req.params.hours));
        console.log("querying with current utc time -->" + currentUTCTime);
        const mentorsFree = yield GetFreeMentors(currentUTCTime, endUTCDateTime);
        res.status(200).json({ Reviews: mentorsFree });
    }
    catch (ex) {
        res.status(501).json({ exception: ex });
    }
}));
// GET - Get free mentor in any time upto in next 24 hours - Students/getmentor/:hour/:min
router.get('/getmentor/:hour/:min', (0, authorize_1.authorize)(authorize_1.Roles.Student), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        let hour = Number((_a = req.params.hour) !== null && _a !== void 0 ? _a : -1);
        let min = Number((_b = req.params.min) !== null && _b !== void 0 ? _b : -1);
        if (hour && min && (hour >= 0 && hour <= 24) && (min == 0 || min == 30)) {
            let currentUTCTime = Math.floor((new Date()).getTime() / 1000);
            currentUTCTime = currentUTCTime - (60 * 30);
            const endUTCDateTime = currentUTCTime + (3600 * Number(req.params.hour));
            console.log("querying with current utc time -->" + currentUTCTime);
            const mentorsFree = yield GetFreeMentors(currentUTCTime, endUTCDateTime);
            res.status(200).json({ Reviews: mentorsFree });
        }
    }
    catch (ex) {
        res.status(501).json({ exception: ex });
    }
}));
// GET - Get free mentor in any time and date - Students/getmentor/:date/:hour/:min
router.get('/getmentor/:date/:hour/:min', (0, authorize_1.authorize)(authorize_1.Roles.Student), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d, _e;
    try {
        let date = new Date((_c = req.params.date) !== null && _c !== void 0 ? _c : new Date().toString());
        let hour = Number((_d = req.params.hour) !== null && _d !== void 0 ? _d : -1);
        let min = Number((_e = req.params.min) !== null && _e !== void 0 ? _e : -1);
        if (hour && min && (hour >= 0 && hour <= 24) && (min == 0 || min == 30)) {
            date.setHours(hour);
            date.setMinutes(min);
            let startUTCTime = Math.floor((new Date()).getTime() / 1000);
            startUTCTime = startUTCTime - (60 * 30);
            const endUTCDateTime = startUTCTime + 7200;
            console.log("querying with start utc time -->" + startUTCTime);
            const mentorsFree = yield GetFreeMentors(startUTCTime, endUTCDateTime);
            res.status(200).json({ Reviews: mentorsFree });
        }
    }
    catch (ex) {
        res.status(501).json({ exception: ex });
    }
}));
// POST - Check Reviews for student - Student/getReviews
router.get('/getReviews', (0, authorize_1.authorize)(authorize_1.Roles.Student), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var loggedinUser = req.user;
        (0, review_1.ReviewMap)(database_1.database);
        let result = yield review_1.default.findAll({
            where: {
                student_id: Number(loggedinUser.id)
            }
        });
        res.status(200).json({ Review: result });
    }
    catch (ex) {
        res.status(501).json({ exception: ex });
    }
}));
// GET - schedule review with mentor
router.get('/schedulereview/:mentorid/:date/:hour/:min', (0, authorize_1.authorize)(authorize_1.Roles.Student), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _f, _g, _h;
    try {
        //UserMap(database);
        //ReviewMap(database);
        var loggedinUser = req.user;
        let date = new Date((_f = req.params.date) !== null && _f !== void 0 ? _f : new Date().toString());
        let hour = Number((_g = req.params.hour) !== null && _g !== void 0 ? _g : -1);
        let min = Number((_h = req.params.min) !== null && _h !== void 0 ? _h : -1);
        if (hour >= 0 && hour <= 24 && (min == 0 || min == 30)) {
            date.setHours(hour);
            date.setMinutes(min);
            let startUTCTime = Math.floor(date.getTime() / 1000);
            let endUTCTime = startUTCTime + 3600;
            const mentorsFree = yield GetFreeMentors(startUTCTime, endUTCTime);
            if (mentorsFree.filter(m => m.id == Number(req.params.mentorid)).length) {
                let reviewBody = {
                    "statetype": "pending",
                    "timestart": startUTCTime,
                    "timeend": endUTCTime,
                    "mentor_id": req.params.mentorid,
                    "student_id": loggedinUser.id,
                    "score": 0,
                    "comments": ""
                };
                const result = yield review_1.default.create(reviewBody);
                let newReview = result.dataValues;
                res.status(201).json({ Review: newReview });
            }
            else {
                res.status(412).json({ Message: "mentors are not available in selected timeslot!" });
            }
        }
    }
    catch (ex) {
        res.status(501).json({ exception: ex });
    }
}));
// POST - Student - Cancel a Review associated to self
router.put('/cancelReview/:id', (0, authorize_1.authorize)(authorize_1.Roles.Student), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, review_1.ReviewMap)(database_1.database);
        var loggedinUser = req.user;
        let result = yield review_1.default.findOne({
            where: {
                id: req.params.id,
                student_id: loggedinUser.id,
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
function GetFreeMentors(currentUTCTime, endUTCDateTime) {
    return __awaiter(this, void 0, void 0, function* () {
        const mentorsBusy = yield GetBusyMentors(currentUTCTime, endUTCDateTime);
        (0, user_1.UserMap)(database_1.database);
        let queryForMeentorsBusy = mentorsBusy && mentorsBusy.length ? {
            attributes: ['id', 'name'],
            where: {
                [sequelize_1.Op.not]: [
                    { id: mentorsBusy },
                ],
                active: true,
                usertype: "mentor"
            }
        } : {
            attributes: ['id', 'name'],
            where: {
                active: true,
                usertype: "mentor"
            }
        };
        const usersFree = yield user_1.default.findAll(queryForMeentorsBusy);
        return usersFree;
    });
}
function GetBusyMentors(currentUTCTime, endUTCDateTime) {
    return __awaiter(this, void 0, void 0, function* () {
        (0, review_1.ReviewMap)(database_1.database);
        const usersBusy = yield review_1.default.findAll({
            attributes: ['mentor_id'],
            where: {
                timestart: {
                    [sequelize_1.Op.gt]: currentUTCTime,
                    [sequelize_1.Op.lt]: endUTCDateTime
                }
            }
        });
        const mentorsBusy = usersBusy.map(a => a.mentor_id);
        return mentorsBusy;
    });
}
//# sourceMappingURL=student.routes.js.map