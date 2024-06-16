// src/models/user.ts
import { Model, Sequelize, DataTypes } from 'sequelize';
import Review from './review';
const bcrypt = require('bcrypt');
export default class User extends Model {
  public id?: number;
  public name!: string;
  public email?: string;
  public password?: string;
  public usertype?: UserType;
  public starttime?: number;
  public endtime?: number;
  public active?: boolean;
  public reviews?: object;
}
export enum UserType {
  STUDENT = 'student',
  MENTOR = 'mentor',
  ADMIN = 'admin'
}
export const UserMap = (sequelize: Sequelize) => {
  User.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(50)
    },
    email: {
      type: DataTypes.STRING(30)
    },
    password:{
      type: DataTypes.STRING(100)
    },
    usertype: {
      type: DataTypes.ENUM,
      values: ['student', 'mentor', 'admin'],
      allowNull: false
    },
    starttime:{
      type: DataTypes.SMALLINT
    },
    endtime:{
      type: DataTypes.SMALLINT
    },
    active:{
      type: DataTypes.BOOLEAN
    }
  }, {
    hooks: {
      beforeCreate: async (user) => {
       if (user.password) {
        const salt = await bcrypt.genSaltSync(10, 'a');
        user.password = bcrypt.hashSync(user.password, salt);
       }
      },
      beforeUpdate:async (user) => {
       if (user.password) {
        const salt = await bcrypt.genSaltSync(10, 'a');
        user.password = bcrypt.hashSync(user.password, salt);
       }
      }
     },
    sequelize,
    tableName: 'users',
    timestamps: false
  });
  //User.hasMany(Review, {foreignKey: "mentor_id", sourceKey: "id", keyType: DataTypes.INTEGER});
  //User.hasMany(Review, {as: 'student_id'});
  //User.sync();
}