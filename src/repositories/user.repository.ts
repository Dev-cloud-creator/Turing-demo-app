import Review, { ReviewMap } from '../models/review';
import User, { UserMap } from '../models/user';
import { Database } from './database';
import { db_host, db_schema, db_port, db_name, db_user, db_password } from '../config';
import { Op, Identifier } from 'sequelize';

export class UserRepository {
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

    public async ListUsers(): Promise<User[]> {
        return await User.findAll<User>();
    }

    public async GetUserById(id: Identifier): Promise<User | null> {
        return await User.findByPk<User>(id);
    }

    public async GetUserByEmail(email: string): Promise<User | null> {
        return await User.findOne<User>({
            where: {
              email: email,
              active: true,
            }
          });
    }

    public async GetAllStudents(): Promise<User[]> {
        return await User.findAll<User>({
            attributes: ['id', 'name', 'email'],
            where: {
                active: true,
                usertype: "student"
            }
        });
    }

    public async GetAllMentors(): Promise<User[] | null> {
        let allMentors =  await User.findAll<User>({
            attributes: ['id', 'name', 'email'],
            where: {
                active: true,
                usertype: "mentor"
            }
        });
        return allMentors;
    }

    public async GetStudentById(id: Identifier): Promise<User | null> {
        return await User.findOne<User>({
            attributes: ['id', 'name'],
            where: {
                id: id,
                active: true,
                usertype: "student"
            }
        });
    }

    public async GetMentorById(id: Identifier): Promise<User | null> {
        return await User.findOne<User>({
            attributes: ['id', 'name'],
            where: {
                id: id,
                active: true,
                usertype: "student"
            }
        });
    }

    public async GetMentorsNotInList(mentorIds: number[]): Promise<User[]> {
        return await User.findAll<User>({
            attributes: ['id', 'name'],
            where: {
                [Op.not]: [
                    { id: mentorIds },
                ],
                active: true,
                usertype: "mentor"
            }
        });
    }

    public async CreateOrUpdateUser(user: any): Promise<User> {
        let createdUser = await User.create<User>(user);
        return createdUser?.dataValues as User;
    }

}