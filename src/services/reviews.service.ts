import Review, { ReviewMap, StateType } from '../models/review';
import { ReviewRepository } from '../repositories/review.repository'
import { ReviewUtil } from '../utils/review.utils';

export class ReviewService {
    /**
   * @description Create an instance of PostService
   */
    private _reviewRepository: ReviewRepository;
    constructor(reviewRepository: ReviewRepository) {
        // Create instance of review repository
        this._reviewRepository = reviewRepository;
    }

    public async ListReviews(): Promise<Review[]> {
        return await this._reviewRepository.ListReviews();
    }

    public async GetReviewById(id: any): Promise<Review | null> {
        return await this._reviewRepository.GetReviewById(Number(id));
    }

    public async GetReviewsByUser(userid: any): Promise<Review[]> {
        return await this._reviewRepository.GetReviewsByUser(Number(userid));
    }

    public async GetReviewsByMentor(userid: any): Promise<Review[]> {
        return await this._reviewRepository.GetReviewsByMentor(Number(userid));
    }

    public async GetReviewByMentor(reviewId: any, userid: any): Promise<Review | null> {
        return await this._reviewRepository.GetReviewByMentor(Number(reviewId), Number(userid));
    }

    public async GetReviewsByStudent(userid: any): Promise<Review[]> {
        return await this._reviewRepository.GetReviewsByStudent(Number(userid));
    }

    public async GetReviewByStudent(reviewId: any, userid: any): Promise<Review | null> {
        return await this._reviewRepository.GetReviewByStudent(Number(reviewId), Number(userid));
    }

    public async CreateOrUpdateReview(review: any): Promise<Review> {
        return await this._reviewRepository.CreateOrUpdateReview(review);
    }

    public async GetMentorsBusy(currentUTCTime: number, endUTCDateTime: number): Promise<Review[]> {
        return await this._reviewRepository.GetMentorsBusy(currentUTCTime, endUTCDateTime);
    }

    public async CancelReview(reviewId: any): Promise<Review | null> {
        return await this._reviewRepository.UpdateReviewStatus(reviewId, StateType.CANCELED)
    }

    public async UpdateReviewStatus(review: Review, mentorId: any, stateType: StateType, score: number = 0, comments: string = ""): Promise<Review | null> {        
        if (ReviewUtil.isReviewValid(review, stateType)) {
            return await this._reviewRepository.UpdateReviewStatus(Number(review.id), stateType, score, comments);
        }
        else
            return null;
    }
}