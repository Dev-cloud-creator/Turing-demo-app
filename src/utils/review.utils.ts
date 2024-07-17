import Review, { StateType } from "../models/review";

export class ReviewUtil {

    public static isReviewValid(review: Review | null, stateType: StateType): boolean {
        var isReviewValid = false;
        if (review) {
            switch (stateType) {
                case StateType.CANCELED:
                    isReviewValid = ReviewUtil.isReviewValidForCancel(review);
                    break;
                case StateType.COMPLETED:
                    isReviewValid = ReviewUtil.isReviewValidForComplete(review);
                    break;
                case StateType.INPROGRESS:
                    isReviewValid = ReviewUtil.isReviewValidForStart(review);
                    break;
                case StateType.PENDING:
                    isReviewValid = ReviewUtil.isReviewValidForScheduled(review);
                    break;
                default:
                    break;
            }
        }
        return isReviewValid;
    }

    public static isReviewValidForStart(review: Review): boolean {
        if (ReviewUtil.isReviewInPast(review)
            && review.statetype == StateType.PENDING) {
            return true;
        }
        else
            return false;
    }

    public static isReviewValidForCancel(review: Review) {
        if (ReviewUtil.isReviewInFuture(review)
            && review.statetype == StateType.PENDING) {
            return true;
        }
        else
            return false;
    }

    public static isReviewValidForComplete(review: Review) {
        if (ReviewUtil.isReviewInPast(review)
            && review.statetype == StateType.INPROGRESS
            && review.score == 0
            && review.comments == '') {
            return true;
        }
        else
            return false;
    }

    public static isReviewValidForScheduled(review: Review): boolean {
        if (ReviewUtil.isReviewInFuture(review)
            && ReviewUtil.isReviewTimeOkForSchedule(review)) {
            return true;
        }
        else
            return false;
    }

    private static isReviewInFuture(review: Review): boolean {
        if (review
            && review.timestart
            && review.timestart > Math.floor((new Date()).getTime() / 1000)) {
            return true;
        }
        else
            return false;
    }

    private static isReviewInPast(review: Review): boolean {
        if (review
            && review.timestart
            && review.timestart <= Math.floor((new Date()).getTime() / 1000)) {
            return true;
        }
        else
            return false;
    }

    private static isReviewTimeOkForSchedule(review: Review): boolean {
        if (review
            && review.timestart
            && review.timestart % (3600 * 30) == 0) {
            return true;
        }
        else
            return false;
    }

}