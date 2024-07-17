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
exports.MentorService = void 0;
const review_1 = require("../models/review");
class MentorService {
    constructor(reviewService) {
        // Create instance of review repository
        this._reviewService = reviewService;
    }
    GetReviewsByMentor(userid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._reviewService.GetReviewsByMentor(Number(userid));
        });
    }
    StartReviewForMentor(reviewId, mentorId) {
        return __awaiter(this, void 0, void 0, function* () {
            var reviewByMentor = yield this._reviewService.GetReviewByMentor(reviewId, mentorId);
            return reviewByMentor ? yield this._reviewService.UpdateReviewStatus(reviewByMentor, mentorId, review_1.StateType.INPROGRESS) : null;
        });
    }
    CancelReviewForMentor(reviewId, mentorId) {
        return __awaiter(this, void 0, void 0, function* () {
            var reviewByMentor = yield this._reviewService.GetReviewByMentor(reviewId, mentorId);
            return reviewByMentor ? yield this._reviewService.UpdateReviewStatus(reviewByMentor, mentorId, review_1.StateType.CANCELED) : null;
        });
    }
    CompleteReviewForMentor(reviewId, mentorId, score, comments) {
        return __awaiter(this, void 0, void 0, function* () {
            var reviewByMentor = yield this._reviewService.GetReviewByMentor(reviewId, mentorId);
            return reviewByMentor ? yield this._reviewService.UpdateReviewStatus(reviewByMentor, mentorId, review_1.StateType.COMPLETED, score, comments) : null;
        });
    }
}
exports.MentorService = MentorService;
//# sourceMappingURL=mentor.service..js.map