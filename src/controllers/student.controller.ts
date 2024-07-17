
import Review from '../models/review';
import User from '../models/user';
import { ReviewRepository } from '../repositories/review.repository';
import { UserRepository } from '../repositories/user.repository';
import { MentorService } from '../services/mentor.service.';
import { ReviewService } from '../services/reviews.service'
import { StudentService } from '../services/student.service';
import { UserService } from '../services/users.service';

export class StudentController {
    /**
   * @description Create an instance of Mentor Controller
   */
    private _studentService: StudentService;
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
        this._studentService = new StudentService(this._reviewService, this._userService);
    }

    // Student - List all Reviews
    public async ListReviews(userid: any): Promise<Review[]> {
        return await this._reviewService.GetReviewsByStudent(Number(userid));
    }

    //Student - Get free mentor next x hours
    public async GetFreeMentorsInNextXHours(studentid: any, hours: any): Promise<User[] | null> {
        var newDate = new Date((Math.floor((new Date(new Date().toISOString())).getTime() / 1000) + (hours * 3600)) * 1000);
        var dateToSchedule = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate();
        var hourToSchedule = newDate.getHours().toString();
        return await this._studentService.GetFreeMentors(studentid, dateToSchedule, hourToSchedule);
    }

    //Student - Get free mentor in any time upto in next 24 hours
    public async GetFreeMentorsInNext24Hours(studentid: any, hours: any, mins: any): Promise<User[] | null> {
        var newDate = new Date((Math.floor((new Date(new Date().toISOString())).getTime() / 1000) + (hours * 3600) + (mins * 60)) * 1000);
        var dateToSchedule = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDay();
        var hourToSchedule = newDate.getHours().toString();
        var minToSchedule = (newDate.getMinutes() < 30 ? 0 : 30).toString() ;
        return await this._studentService.GetFreeMentors(studentid, dateToSchedule, hourToSchedule, minToSchedule);
    }

    //Student - Get free mentor in any time and date
    public async GetFreeMentorsAtTime(studentid: any, dateToSchedule: any, hours: any, mins: any): Promise<User[] | null> {
        return await this._studentService.GetFreeMentors(studentid, dateToSchedule, hours, mins);
    }

    //Student - Schedule review with mentor
    public async ScheduleReview(studentId: any, mentorId: any, dateToSchedule: any, hours: any, mins: any): Promise<Review | null> {
        return await this._studentService.ScheduleReviewWithFreeMentors(studentId, mentorId, dateToSchedule, hours, mins);
    }

    //Student - Cancel a Review associated to self
    public async CancelReview(reviewId: any, studentId: any): Promise<Review | null> {
        return await this._studentService.CancelReviewForStudent(reviewId, studentId);
    }
}