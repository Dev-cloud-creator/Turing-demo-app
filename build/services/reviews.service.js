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
exports.ReviewService = void 0;
const review_1 = require("../models/review");
const review_utils_1 = require("../utils/review.utils");
class ReviewService {
    constructor(reviewRepository) {
        // Create instance of review repository
        this._reviewRepository = reviewRepository;
    }
    ListReviews() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._reviewRepository.ListReviews();
        });
    }
    GetReviewById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._reviewRepository.GetReviewById(Number(id));
        });
    }
    GetReviewsByUser(userid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._reviewRepository.GetReviewsByUser(Number(userid));
        });
    }
    GetReviewsByMentor(userid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._reviewRepository.GetReviewsByMentor(Number(userid));
        });
    }
    GetReviewByMentor(reviewId, userid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._reviewRepository.GetReviewByMentor(Number(reviewId), Number(userid));
        });
    }
    GetReviewsByStudent(userid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._reviewRepository.GetReviewsByStudent(Number(userid));
        });
    }
    GetReviewByStudent(reviewId, userid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._reviewRepository.GetReviewByStudent(Number(reviewId), Number(userid));
        });
    }
    CreateOrUpdateReview(review) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._reviewRepository.CreateOrUpdateReview(review);
        });
    }
    GetMentorsBusy(currentUTCTime, endUTCDateTime) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._reviewRepository.GetMentorsBusy(currentUTCTime, endUTCDateTime);
        });
    }
    CancelReview(reviewId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._reviewRepository.UpdateReviewStatus(reviewId, review_1.StateType.CANCELED);
        });
    }
    UpdateReviewStatus(review_2, mentorId_1, stateType_1) {
        return __awaiter(this, arguments, void 0, function* (review, mentorId, stateType, score = 0, comments = "") {
            if (review_utils_1.ReviewUtil.isReviewValid(review, stateType)) {
                return yield this._reviewRepository.UpdateReviewStatus(Number(review.id), stateType, score, comments);
            }
            else
                return null;
        });
    }
}
exports.ReviewService = ReviewService;
//# sourceMappingURL=reviews.service.js.map