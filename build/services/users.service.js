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
exports.UserService = void 0;
class UserService {
    constructor(userRepository) {
        // Create instance of review repository
        this._userRepository = userRepository;
    }
    ListUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._userRepository.ListUsers();
        });
    }
    GetUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._userRepository.GetUserById(Number(id));
        });
    }
    GetUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._userRepository.GetUserByEmail(email);
        });
    }
    GetAllMentors() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._userRepository.GetAllMentors();
        });
    }
    GetStudentById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._userRepository.GetStudentById(Number(id));
        });
    }
    GetMentorById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._userRepository.GetMentorById(Number(id));
        });
    }
    GetMentorsNotInList(mentorIds) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._userRepository.GetMentorsNotInList(mentorIds);
        });
    }
    CreateOrUpdateUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._userRepository.CreateOrUpdateUser(user);
        });
    }
}
exports.UserService = UserService;
//# sourceMappingURL=users.service.js.map