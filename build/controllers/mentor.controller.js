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
exports.MentorController = void 0;
const review_repository_1 = require("../repositories/review.repository");
const mentor_service_1 = require("../services/mentor.service.");
const reviews_service_1 = require("../services/reviews.service");
class MentorController {
    constructor() {
        // Create instance of review repository
        this._reviewRepository = new review_repository_1.ReviewRepository();
        this._reviewService = new reviews_service_1.ReviewService(this._reviewRepository);
        this._mentorService = new mentor_service_1.MentorService(this._reviewService);
    }
    // Mentor - List all Reviews
    ListReviews(userid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._reviewService.GetReviewsByMentor(Number(userid));
        });
    }
    //Mentor - Start a Review
    StartReview(reviewid, mentorid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._mentorService.StartReviewForMentor(reviewid, mentorid);
        });
    }
    //Mentor - Complete a Review by id with comments and score
    CompleteReview(reviewId, mentorId, score, comments) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._mentorService.CompleteReviewForMentor(reviewId, mentorId, score, comments);
        });
    }
    //Mentor - Cancel a Review associated to self
    CancelReview(reviewId, mentorId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._mentorService.CancelReviewForMentor(reviewId, mentorId);
        });
    }
}
exports.MentorController = MentorController;
//# sourceMappingURL=mentor.controller.js.map