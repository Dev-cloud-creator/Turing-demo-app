// src/models/Review.ts
import { Model, Sequelize, DataTypes } from 'sequelize';
import User from './user';

export default class Review extends Model {
  public id?: number;
  public statetype?: StateType;
  public timestart?: number;
  public timeend?: number;
  public mentor_id?: number;
  public student_id?: number;
  public score?: number;
  public comments?: string;
  static associate(models: any) {
    // define association here
    Review.belongsTo(models.User,{
      as:'mentor',
      foreignKey: 'mentor_id'
    });
    Review.belongsTo(models.User,{
      as:'student',
      foreignKey: 'student_id'
    });
  }
}

export enum StateType {
  PENDING = 'pending',
  INPROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELED = 'canceled'
}
export const ReviewMap = (sequelize: Sequelize) => {
  Review.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    statetype: {
      type: DataTypes.ENUM,
      values: ['pending', 'in_progress', 'completed', 'canceled'],
      allowNull: false
    },
    timestart:{
      type: DataTypes.INTEGER
    },
    timeend:{
      type: DataTypes.INTEGER
    },
    mentor_id:{
      type: DataTypes.INTEGER,
      /*references: {
        model: "users",
        key: "id"
      }*/
    },
    student_id:{
      type: DataTypes.INTEGER,
      /*references: {
        model: "users",
        key: "id"
      }*/
    },
    score:{
      type: DataTypes.SMALLINT
    },
    comments:{
      type: DataTypes.STRING(1024)
    }
  }, {
    sequelize,
    tableName: 'reviews',
    timestamps: false
  });
  //Review.belongsTo(User, {as:"student", foreignKey:"id", keyType: DataTypes.INTEGER});
  //Review.belongsTo(User, {as: 'student_id'});
  //Review.sync();
}