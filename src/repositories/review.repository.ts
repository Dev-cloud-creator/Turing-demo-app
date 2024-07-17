import Review, { ReviewMap, StateType } from '../models/review';
import { UserMap } from '../models/user';
import { Database } from './database';
import { db_host, db_schema, db_port, db_name, db_user, db_password } from '../config';
import { Op, Identifier } from 'sequelize';

export class ReviewRepository {
    /**
   * @description Create an instance of PostService
   */
    constructor() {
        // Create instance of Data Access layer using our desired model
        var db = new Database({
            dialect: "postgres",
            host: db_host,
            port: db_port,
            database: db_name,
            username: db_user,
            password: db_password,
            schema: db_schema,
            logging: console.log
        });
        UserMap(db.getDB());
        ReviewMap(db.getDB());
    }

    public async ListReviews(): Promise<Review[]> {
        return await Review.findAll<Review>();
    }

    public async GetReviewById(id: Identifier): Promise<Review | null> {
        return await Review.findByPk<Review>(id);
    }

    public async GetReviewsByUser(userid: Number): Promise<Review[]> {
        return await Review.findAll<Review>({
            where: {
                [Op.or]: [
                    { mentor_id: userid },
                    { student_id: userid }
                ]
            }
        });
    }

    public async GetReviewsByMentor(userid: Number): Promise<Review[]> {
        let reviews = await Review.findAll<Review>({
            where: {
                mentor_id: userid
            }
        });
        return reviews;
    }

    public async GetReviewByMentor(reviewId: Number, userid: Number): Promise<Review | null> {
        let review = await Review.findOne<Review>({
            where: {
                id: reviewId,
                mentor_id: userid,
            }
        });
        return review?.dataValues as Review;
    }

    public async GetReviewByStudent(reviewId: Number, userid: Number): Promise<Review | null> {
        let review = await Review.findOne<Review>({
            where: {
                id: reviewId,
                student_id: userid,
            }
        });
        return review?.dataValues as Review;
    }

    public async GetReviewsByStudent(userid: Number): Promise<Review[]> {
        let review = await Review.findAll<Review>({
            where: {
                student_id: userid
            }
        });
        return review;
    }

    public async GetReviewByStudentAndMentor(reviewId: Number, studentId: Number, mentorId: Number): Promise<Review | null> {
        let review = await Review.findOne<Review>({
            where: {
                id: reviewId,
                mentor_id: mentorId,
                stutdent_id: studentId
            }
        });
        return review;
    }

    public async CreateOrUpdateReview(review: any): Promise<Review> {
        let createdReview = await Review.create<Review>(review);
        return createdReview?.dataValues as Review;
    }

    public async UpdateReviewStatus(reviewId: Identifier, stateType: StateType, score: number = 0, comments: string = ""): Promise<Review | null> {
        let result = await Review.findByPk<Review>(reviewId);
        if (result) {
            result.statetype = stateType;
            if (result.statetype == StateType.COMPLETED) {
                result.score = score;
                result.comments = comments;
            }
            this.UpdateReview(result);
        }
        return result;
    }

    public async UpdateReview(review: Review): Promise<Review> {
        review.save();
        return review;
    }

    public async GetMentorsBusy(currentUTCTime: number, endUTCDateTime: number): Promise<Review[]> {
        return await Review.findAll<Review>({
            attributes: ['mentor_id'],
            where: {
                timestart: {
                    [Op.gte]: currentUTCTime,
                    [Op.lte]: endUTCDateTime
                }
            }
        });
    }

}