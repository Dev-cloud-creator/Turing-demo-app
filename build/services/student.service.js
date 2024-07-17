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
exports.StudentService = void 0;
const review_1 = require("../models/review");
class StudentService {
    constructor(reviewService, userService) {
        // Create instance of review repository
        this._reviewService = reviewService;
        this._userService = userService;
    }
    GetReviewsByStudent(userid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._reviewService.GetReviewsByStudent(Number(userid));
        });
    }
    CancelReviewForStudent(reviewId, studentId) {
        return __awaiter(this, void 0, void 0, function* () {
            var reviewByStudent = yield this._reviewService.GetReviewByStudent(reviewId, studentId);
            return reviewByStudent ? yield this._reviewService.UpdateReviewStatus(reviewByStudent, studentId, review_1.StateType.CANCELED) : null;
        });
    }
    GetFreeMentors(studentId_1, dateToSchedule_1) {
        return __awaiter(this, arguments, void 0, function* (studentId, dateToSchedule, hourToSchedule = "0", minToSchedule = "0") {
            //var student = await this._userService.GetStudentById(studentId);
            let { startUTCTime, endUTCTime } = this.GetTimeToSchedule(dateToSchedule, hourToSchedule, minToSchedule);
            var busyMentors = yield this._reviewService.GetMentorsBusy(startUTCTime, endUTCTime);
            var freeMentors = null;
            if (busyMentors && busyMentors.length)
                freeMentors = yield this._userService.GetMentorsNotInList(busyMentors.map(m => Number(m.mentor_id)));
            else
                freeMentors = yield this._userService.GetAllMentors();
            return freeMentors;
        });
    }
    GetTimeToSchedule(dateToSchedule, hourToSchedule, minToSchedule, timetoBlock = false) {
        let date = new Date(dateToSchedule !== null && dateToSchedule !== void 0 ? dateToSchedule : new Date().toString());
        let hour = Number(hourToSchedule !== null && hourToSchedule !== void 0 ? hourToSchedule : -1);
        let min = Number(minToSchedule !== null && minToSchedule !== void 0 ? minToSchedule : -1);
        date.setHours(hour);
        date.setMinutes(min);
        let startUTCTime = Math.floor(date.getTime() / 1000);
        if (!timetoBlock)
            startUTCTime = startUTCTime - (60 * 30);
        let endUTCTime = startUTCTime + ((timetoBlock) ? 3600 : 7200);
        return { startUTCTime, endUTCTime };
    }
    ScheduleReviewWithFreeMentors(studentId, mentorId, dateToSchedule, hourToSchedule, minToSchedule) {
        return __awaiter(this, void 0, void 0, function* () {
            var freeMentors = yield this.GetFreeMentors(studentId, dateToSchedule, hourToSchedule, minToSchedule);
            var freeMentorIds = freeMentors === null || freeMentors === void 0 ? void 0 : freeMentors.map(m => m.id);
            if (freeMentorIds === null || freeMentorIds === void 0 ? void 0 : freeMentorIds.includes(Number(mentorId))) {
                let { startUTCTime, endUTCTime } = this.GetTimeToSchedule(dateToSchedule, hourToSchedule, minToSchedule, true);
                var result = yield this._reviewService.CreateOrUpdateReview({
                    "statetype": "pending",
                    "timestart": startUTCTime,
                    "timeend": endUTCTime,
                    "mentor_id": mentorId,
                    "student_id": studentId,
                    "score": 0,
                    "comments": ""
                });
                return result;
            }
            return null;
        });
    }
}
exports.StudentService = StudentService;
//# sourceMappingURL=student.service.js.map