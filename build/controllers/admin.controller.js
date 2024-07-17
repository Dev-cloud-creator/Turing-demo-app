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
exports.AdminController = void 0;
const review_repository_1 = require("../repositories/review.repository");
const user_repository_1 = require("../repositories/user.repository");
const reviews_service_1 = require("../services/reviews.service");
const users_service_1 = require("../services/users.service");
class AdminController {
    constructor() {
        // Create instance of review repository
        this._reviewRepository = new review_repository_1.ReviewRepository();
        this._reviewService = new reviews_service_1.ReviewService(this._reviewRepository);
        this._userRepository = new user_repository_1.UserRepository();
        this._userService = new users_service_1.UserService(this._userRepository);
    }
    // Admin - List all Reviews
    ListReviews() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._reviewService.ListReviews();
        });
    }
    // Admin - List all Users
    ListUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._userService.ListUsers();
        });
    }
    //Admin - List one review by id
    GetReviewById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._reviewService.GetReviewById(Number(id));
        });
    }
    //Admin - List one user by id
    GetUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._userService.GetUserById(Number(id));
        });
    }
    //Admin - List one user by email
    GetUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._userService.GetUserByEmail(email);
        });
    }
    //Admin - List any users review
    GetReviewsByUser(userid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._reviewService.GetReviewsByUser(Number(userid));
        });
    }
    //Admin - Create or update any review
    CreateOrUpdateReview(review) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._reviewService.CreateOrUpdateReview(review);
        });
    }
    //Admin - Create or update any review
    CreateOrUpdateUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._userService.CreateOrUpdateUser(user);
        });
    }
    //Admin - Cancel a Review
    CancelReview(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield this._reviewService.CancelReview(Number(id));
            return result;
        });
    }
}
exports.AdminController = AdminController;
//# sourceMappingURL=admin.controller.js.map