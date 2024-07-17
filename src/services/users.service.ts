import Review, { ReviewMap, StateType } from '../models/review';
import User from '../models/user';
import { ReviewRepository } from '../repositories/review.repository'
import { UserRepository } from '../repositories/user.repository';
import { ReviewUtil } from '../utils/review.utils';

export class UserService {
    /**
   * @description Create an instance of PostService
   */
    private _userRepository: UserRepository;
    constructor(userRepository: UserRepository) {
        // Create instance of review repository
        this._userRepository = userRepository;
    }

    public async ListUsers(): Promise<User[]> {
        return await this._userRepository.ListUsers();
    }

    public async GetUserById(id: any): Promise<User | null> {
        return await this._userRepository.GetUserById(Number(id));
    }

    public async GetUserByEmail(email: string): Promise<User | null> {
        return await this._userRepository.GetUserByEmail(email);
    }

    public async GetAllMentors(): Promise<User[] | null> {
        return await this._userRepository.GetAllMentors();
    }

    public async GetStudentById(id: any): Promise<User | null> {
        return await this._userRepository.GetStudentById(Number(id));
    }

    public async GetMentorById(id: any): Promise<User | null> {
        return await this._userRepository.GetMentorById(Number(id));
    }

    public async GetMentorsNotInList(mentorIds: number[]): Promise<User[]> {
        return await this._userRepository.GetMentorsNotInList(mentorIds);
    }

    public async CreateOrUpdateUser(user: any): Promise<User> {
        return await this._userRepository.CreateOrUpdateUser(user);
    }
}