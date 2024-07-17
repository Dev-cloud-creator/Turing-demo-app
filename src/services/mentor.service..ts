import Review, { ReviewMap, StateType } from '../models/review';
import { ReviewRepository } from '../repositories/review.repository'
import { ReviewUtil } from '../utils/review.utils';
import { ReviewService } from './reviews.service';

export class MentorService {
    /**
   * @description Create an instance of PostService
   */
    private _reviewService: ReviewService;
    constructor(reviewService: ReviewService) {
        // Create instance of review repository
        this._reviewService = reviewService;
    }

    public async GetReviewsByMentor(userid: any): Promise<Review[]> {
        return await this._reviewService.GetReviewsByMentor(Number(userid));
    }

    public async StartReviewForMentor(reviewId: any, mentorId: any): Promise<Review | null> {
        var reviewByMentor = await this._reviewService.GetReviewByMentor(reviewId, mentorId);
        return reviewByMentor ? await this._reviewService.UpdateReviewStatus(reviewByMentor, mentorId, StateType.INPROGRESS) : null;
    }

    public async CancelReviewForMentor(reviewId: any, mentorId: any): Promise<Review | null> {
        var reviewByMentor = await this._reviewService.GetReviewByMentor(reviewId, mentorId);
        return reviewByMentor ? await this._reviewService.UpdateReviewStatus(reviewByMentor, mentorId, StateType.CANCELED) : null;
    }

    public async CompleteReviewForMentor(reviewId: any, mentorId: any, score: number, comments: string): Promise<Review | null> {
        var reviewByMentor = await this._reviewService.GetReviewByMentor(reviewId, mentorId);
        return reviewByMentor ? await this._reviewService.UpdateReviewStatus(reviewByMentor, mentorId, StateType.COMPLETED, score, comments) : null;
    }
}