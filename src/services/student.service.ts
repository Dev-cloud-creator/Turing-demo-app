import Review, { ReviewMap, StateType } from '../models/review';
import User from '../models/user';
import { ReviewService } from './reviews.service';
import { UserService } from './users.service';

export class StudentService {
    /**
   * @description Create an instance of PostService
   */
    private _reviewService: ReviewService;
    private _userService: UserService;
    constructor(reviewService: ReviewService, userService: UserService) {
        // Create instance of review repository
        this._reviewService = reviewService;
        this._userService = userService;
    }

    public async GetReviewsByStudent(userid: any): Promise<Review[]> {
        return await this._reviewService.GetReviewsByStudent(Number(userid));
    }

    public async CancelReviewForStudent(reviewId: any, studentId: any): Promise<Review | null> {
        var reviewByStudent = await this._reviewService.GetReviewByStudent(reviewId, studentId);
        return reviewByStudent ? await this._reviewService.UpdateReviewStatus(reviewByStudent, studentId, StateType.CANCELED) : null;
    }

    public async GetFreeMentors(studentId: any, dateToSchedule: string, hourToSchedule: string = "0", minToSchedule: string = "0"): Promise<User[] | null> {
        //var student = await this._userService.GetStudentById(studentId);
        let { startUTCTime, endUTCTime } = this.GetTimeToSchedule(dateToSchedule, hourToSchedule, minToSchedule);
        var busyMentors = await this._reviewService.GetMentorsBusy(startUTCTime, endUTCTime);
        var freeMentors = null;
        if (busyMentors && busyMentors.length)
            freeMentors = await this._userService.GetMentorsNotInList(busyMentors.map(m => Number(m.mentor_id)))
        else
            freeMentors = await this._userService.GetAllMentors();
        return freeMentors;
    }

    private GetTimeToSchedule(dateToSchedule: string, hourToSchedule: string, minToSchedule: string, timetoBlock: boolean = false) {
        let date = new Date(dateToSchedule ?? new Date().toString());
        let hour = Number(hourToSchedule ?? -1);
        let min = Number(minToSchedule ?? -1);
        date.setHours(hour);
        date.setMinutes(min);
        let startUTCTime = Math.floor(date.getTime() / 1000);
        if(!timetoBlock)
            startUTCTime = startUTCTime - (60 * 30);
        let endUTCTime = startUTCTime + ((timetoBlock) ? 3600 : 7200);
        return { startUTCTime, endUTCTime };
    }

    public async ScheduleReviewWithFreeMentors(studentId: any, mentorId: any, dateToSchedule: string, hourToSchedule: string, minToSchedule: string): Promise<Review | null> {
        var freeMentors = await this.GetFreeMentors(studentId, dateToSchedule, hourToSchedule, minToSchedule);
        var freeMentorIds = freeMentors?.map(m => m.id);
        if (freeMentorIds?.includes(Number(mentorId))) {
            let { startUTCTime, endUTCTime } = this.GetTimeToSchedule(dateToSchedule, hourToSchedule, minToSchedule, true);
            var result = await this._reviewService.CreateOrUpdateReview({
                "statetype": "pending",
                "timestart": startUTCTime,
                "timeend": endUTCTime,
                "mentor_id": mentorId,
                "student_id": studentId,
                "score": 0,
                "comments": ""
            });
            return result;
        }
        return null;
    }
}