
import Review from '../models/review';
import User from '../models/user';
import { ReviewRepository } from '../repositories/review.repository';
import { UserRepository } from '../repositories/user.repository';
import { ReviewService } from '../services/reviews.service'
import { UserService } from '../services/users.service';

export class AdminController {
    /**
   * @description Create an instance of PostService
   */
    private _reviewService: ReviewService;
    private _reviewRepository: ReviewRepository;
    private _userService: UserService;
    private _userRepository: UserRepository;
    constructor() {
        // Create instance of review repository
        this._reviewRepository = new ReviewRepository();
        this._reviewService = new ReviewService(this._reviewRepository);
        this._userRepository = new UserRepository();
        this._userService = new UserService(this._userRepository);
    }

    // Admin - List all Reviews
    public async ListReviews(): Promise<Review[]> {
        return await this._reviewService.ListReviews();
    }

    // Admin - List all Users
    public async ListUsers(): Promise<User[]> {
        return await this._userService.ListUsers();
    }

    //Admin - List one review by id
    public async GetReviewById(id: any): Promise<Review | null> {
        return await this._reviewService.GetReviewById(Number(id));
    }

    //Admin - List one user by id
    public async GetUserById(id: any): Promise<User | null> {
        return await this._userService.GetUserById(Number(id));
    }

    //Admin - List one user by email
    public async GetUserByEmail(email: any): Promise<User | null> {
        return await this._userService.GetUserByEmail(email);
    }

    //Admin - List any users review
    public async GetReviewsByUser(userid: any): Promise<Review[]> {
        return await this._reviewService.GetReviewsByUser(Number(userid));
    }

    //Admin - Create or update any review
    public async CreateOrUpdateReview(review: any): Promise<Review> {
        return await this._reviewService.CreateOrUpdateReview(review);
    }

    //Admin - Create or update any review
    public async CreateOrUpdateUser(user: any): Promise<User> {
        return await this._userService.CreateOrUpdateUser(user);
    }

    //Admin - Cancel a Review
    public async CancelReview(id: any): Promise<Review | null> {
        let result = await this._reviewService.CancelReview(Number(id));
        return result;
    }
}