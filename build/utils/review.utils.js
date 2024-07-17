"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewUtil = void 0;
const review_1 = require("../models/review");
class ReviewUtil {
    static isReviewValid(review, stateType) {
        var isReviewValid = false;
        if (review) {
            switch (stateType) {
                case review_1.StateType.CANCELED:
                    isReviewValid = ReviewUtil.isReviewValidForCancel(review);
                    break;
                case review_1.StateType.COMPLETED:
                    isReviewValid = ReviewUtil.isReviewValidForComplete(review);
                    break;
                case review_1.StateType.INPROGRESS:
                    isReviewValid = ReviewUtil.isReviewValidForStart(review);
                    break;
                case review_1.StateType.PENDING:
                    isReviewValid = ReviewUtil.isReviewValidForScheduled(review);
                    break;
                default:
                    break;
            }
        }
        return isReviewValid;
    }
    static isReviewValidForStart(review) {
        if (ReviewUtil.isReviewInPast(review)
            && review.statetype == review_1.StateType.PENDING) {
            return true;
        }
        else
            return false;
    }
    static isReviewValidForCancel(review) {
        if (ReviewUtil.isReviewInFuture(review)
            && review.statetype == review_1.StateType.PENDING) {
            return true;
        }
        else
            return false;
    }
    static isReviewValidForComplete(review) {
        if (ReviewUtil.isReviewInPast(review)
            && review.statetype == review_1.StateType.INPROGRESS
            && review.score == 0
            && review.comments == '') {
            return true;
        }
        else
            return false;
    }
    static isReviewValidForScheduled(review) {
        if (ReviewUtil.isReviewInFuture(review)
            && ReviewUtil.isReviewTimeOkForSchedule(review)) {
            return true;
        }
        else
            return false;
    }
    static isReviewInFuture(review) {
        if (review
            && review.timestart
            && review.timestart > Math.floor((new Date()).getTime() / 1000)) {
            return true;
        }
        else
            return false;
    }
    static isReviewInPast(review) {
        if (review
            && review.timestart
            && review.timestart <= Math.floor((new Date()).getTime() / 1000)) {
            return true;
        }
        else
            return false;
    }
    static isReviewTimeOkForSchedule(review) {
        if (review
            && review.timestart
            && review.timestart % (3600 * 30) == 0) {
            return true;
        }
        else
            return false;
    }
}
exports.ReviewUtil = ReviewUtil;
//# sourceMappingURL=review.utils.js.map