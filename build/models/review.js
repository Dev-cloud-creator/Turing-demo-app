"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewMap = exports.StateType = void 0;
// src/models/Review.ts
const sequelize_1 = require("sequelize");
class Review extends sequelize_1.Model {
    static associate(models) {
        // define association here
        Review.belongsTo(models.User, {
            as: 'mentor',
            foreignKey: 'mentor_id'
        });
        Review.belongsTo(models.User, {
            as: 'student',
            foreignKey: 'student_id'
        });
    }
}
exports.default = Review;
var StateType;
(function (StateType) {
    StateType["PENDING"] = "pending";
    StateType["INPROGRESS"] = "in_progress";
    StateType["COMPLETED"] = "completed";
    StateType["CANCELED"] = "canceled";
})(StateType || (exports.StateType = StateType = {}));
const ReviewMap = (sequelize) => {
    Review.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        statetype: {
            type: sequelize_1.DataTypes.ENUM,
            values: ['pending', 'in_progress', 'completed', 'canceled'],
            allowNull: false
        },
        timestart: {
            type: sequelize_1.DataTypes.INTEGER
        },
        timeend: {
            type: sequelize_1.DataTypes.INTEGER
        },
        mentor_id: {
            type: sequelize_1.DataTypes.INTEGER,
            /*references: {
              model: "users",
              key: "id"
            }*/
        },
        student_id: {
            type: sequelize_1.DataTypes.INTEGER,
            /*references: {
              model: "users",
              key: "id"
            }*/
        },
        score: {
            type: sequelize_1.DataTypes.SMALLINT
        },
        comments: {
            type: sequelize_1.DataTypes.STRING(1024)
        }
    }, {
        sequelize,
        tableName: 'reviews',
        timestamps: false
    });
    //Review.belongsTo(User, {as:"student", foreignKey:"id", keyType: DataTypes.INTEGER});
    //Review.belongsTo(User, {as: 'student_id'});
    //Review.sync();
};
exports.ReviewMap = ReviewMap;
//# sourceMappingURL=review.js.map