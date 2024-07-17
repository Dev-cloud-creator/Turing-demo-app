"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.UserRepository = void 0;
const review_1 = require("../models/review");
const user_1 = __importStar(require("../models/user"));
const database_1 = require("./database");
const config_1 = require("../config");
const sequelize_1 = require("sequelize");
class UserRepository {
    /**
   * @description Create an instance of PostService
   */
    constructor() {
        // Create instance of Data Access layer using our desired model
        var db = new database_1.Database({
            dialect: "postgres",
            host: config_1.db_host,
            port: config_1.db_port,
            database: config_1.db_name,
            username: config_1.db_user,
            password: config_1.db_password,
            schema: config_1.db_schema,
            logging: console.log
        });
        (0, user_1.UserMap)(db.getDB());
        (0, review_1.ReviewMap)(db.getDB());
    }
    ListUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_1.default.findAll();
        });
    }
    GetUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_1.default.findByPk(id);
        });
    }
    GetUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_1.default.findOne({
                where: {
                    email: email,
                    active: true,
                }
            });
        });
    }
    GetAllStudents() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_1.default.findAll({
                attributes: ['id', 'name', 'email'],
                where: {
                    active: true,
                    usertype: "student"
                }
            });
        });
    }
    GetAllMentors() {
        return __awaiter(this, void 0, void 0, function* () {
            let allMentors = yield user_1.default.findAll({
                attributes: ['id', 'name', 'email'],
                where: {
                    active: true,
                    usertype: "mentor"
                }
            });
            return allMentors;
        });
    }
    GetStudentById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_1.default.findOne({
                attributes: ['id', 'name'],
                where: {
                    id: id,
                    active: true,
                    usertype: "student"
                }
            });
        });
    }
    GetMentorById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_1.default.findOne({
                attributes: ['id', 'name'],
                where: {
                    id: id,
                    active: true,
                    usertype: "student"
                }
            });
        });
    }
    GetMentorsNotInList(mentorIds) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_1.default.findAll({
                attributes: ['id', 'name'],
                where: {
                    [sequelize_1.Op.not]: [
                        { id: mentorIds },
                    ],
                    active: true,
                    usertype: "mentor"
                }
            });
        });
    }
    CreateOrUpdateUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            let createdUser = yield user_1.default.create(user);
            return createdUser === null || createdUser === void 0 ? void 0 : createdUser.dataValues;
        });
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map