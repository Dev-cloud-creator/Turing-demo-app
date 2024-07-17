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
exports.StudentController = void 0;
const review_repository_1 = require("../repositories/review.repository");
const user_repository_1 = require("../repositories/user.repository");
const reviews_service_1 = require("../services/reviews.service");
const student_service_1 = require("../services/student.service");
const users_service_1 = require("../services/users.service");
class StudentController {
    constructor() {
        // Create instance of review repository
        this._reviewRepository = new review_repository_1.ReviewRepository();
        this._reviewService = new reviews_service_1.ReviewService(this._reviewRepository);
        this._userRepository = new user_repository_1.UserRepository();
        this._userService = new users_service_1.UserService(this._userRepository);
        this._studentService = new student_service_1.StudentService(this._reviewService, this._userService);
    }
    // Student - List all Reviews
    ListReviews(userid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._reviewService.GetReviewsByStudent(Number(userid));
        });
    }
    //Student - Get free mentor next x hours
    GetFreeMentorsInNextXHours(studentid, hours) {
        return __awaiter(this, void 0, void 0, function* () {
            var newDate = new Date((Math.floor((new Date(new Date().toISOString())).getTime() / 1000) + (hours * 3600)) * 1000);
            var dateToSchedule = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate();
            var hourToSchedule = newDate.getHours().toString();
            return yield this._studentService.GetFreeMentors(studentid, dateToSchedule, hourToSchedule);
        });
    }
    //Student - Get free mentor in any time upto in next 24 hours
    GetFreeMentorsInNext24Hours(studentid, hours, mins) {
        return __awaiter(this, void 0, void 0, function* () {
            var newDate = new Date((Math.floor((new Date(new Date().toISOString())).getTime() / 1000) + (hours * 3600) + (mins * 60)) * 1000);
            var dateToSchedule = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDay();
            var hourToSchedule = newDate.getHours().toString();
            var minToSchedule = (newDate.getMinutes() < 30 ? 0 : 30).toString();
            return yield this._studentService.GetFreeMentors(studentid, dateToSchedule, hourToSchedule, minToSchedule);
        });
    }
    //Student - Get free mentor in any time and date
    GetFreeMentorsAtTime(studentid, dateToSchedule, hours, mins) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._studentService.GetFreeMentors(studentid, dateToSchedule, hours, mins);
        });
    }
    //Student - Schedule review with mentor
    ScheduleReview(studentId, mentorId, dateToSchedule, hours, mins) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._studentService.ScheduleReviewWithFreeMentors(studentId, mentorId, dateToSchedule, hours, mins);
        });
    }
    //Student - Cancel a Review associated to self
    CancelReview(reviewId, studentId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._studentService.CancelReviewForStudent(reviewId, studentId);
        });
    }
}
exports.StudentController = StudentController;
//# sourceMappingURL=student.controller.js.map