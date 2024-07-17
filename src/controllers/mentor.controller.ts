
import Review from '../models/review';
import { ReviewRepository } from '../repositories/review.repository';
import { MentorService } from '../services/mentor.service.';
import { ReviewService } from '../services/reviews.service'

export class MentorController {
    /**
   * @description Create an instance of Mentor Controller
   */
    private _mentorService: MentorService;
    private _reviewService: ReviewService;
    private _reviewRepository: ReviewRepository;
    constructor() {
        // Create instance of review repository
        this._reviewRepository = new ReviewRepository();
        this._reviewService = new ReviewService(this._reviewRepository);
        this._mentorService = new MentorService(this._reviewService);
    }

    // Mentor - List all Reviews
    public async ListReviews(userid: any): Promise<Review[]> {
        return await this._reviewService.GetReviewsByMentor(Number(userid));
    }

    //Mentor - Start a Review
    public async StartReview(reviewid: any, mentorid: any): Promise<Review | null> {
        return await this._mentorService.StartReviewForMentor(reviewid, mentorid)
    }

    //Mentor - Complete a Review by id with comments and score
    public async CompleteReview(reviewId: any, mentorId: any, score: number, comments: string): Promise<Review | null> {
        return await this._mentorService.CompleteReviewForMentor(reviewId, mentorId, score, comments);
    }

    //Mentor - Cancel a Review associated to self
    public async CancelReview(reviewId: any, mentorId: any): Promise<Review | null> {
        return await this._mentorService.CancelReviewForMentor(reviewId, mentorId);
    }
}