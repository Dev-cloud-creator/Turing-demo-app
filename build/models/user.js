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
exports.UserMap = exports.UserType = void 0;
// src/models/user.ts
const sequelize_1 = require("sequelize");
const bcrypt = require('bcrypt');
class User extends sequelize_1.Model {
}
exports.default = User;
var UserType;
(function (UserType) {
    UserType["STUDENT"] = "student";
    UserType["MENTOR"] = "mentor";
    UserType["ADMIN"] = "admin";
})(UserType || (exports.UserType = UserType = {}));
const UserMap = (sequelize) => {
    User.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: sequelize_1.DataTypes.STRING(50)
        },
        email: {
            type: sequelize_1.DataTypes.STRING(30)
        },
        password: {
            type: sequelize_1.DataTypes.STRING(100)
        },
        usertype: {
            type: sequelize_1.DataTypes.ENUM,
            values: ['student', 'mentor', 'admin'],
            allowNull: false
        },
        starttime: {
            type: sequelize_1.DataTypes.SMALLINT
        },
        endtime: {
            type: sequelize_1.DataTypes.SMALLINT
        },
        active: {
            type: sequelize_1.DataTypes.BOOLEAN
        }
    }, {
        hooks: {
            beforeCreate: (user) => __awaiter(void 0, void 0, void 0, function* () {
                if (user.password) {
                    const salt = yield bcrypt.genSaltSync(10, 'a');
                    user.password = bcrypt.hashSync(user.password, salt);
                }
            }),
            beforeUpdate: (user) => __awaiter(void 0, void 0, void 0, function* () {
                if (user.password) {
                    const salt = yield bcrypt.genSaltSync(10, 'a');
                    user.password = bcrypt.hashSync(user.password, salt);
                }
            })
        },
        sequelize,
        tableName: 'users',
        timestamps: false
    });
    //User.hasMany(Review, {foreignKey: "mentor_id", sourceKey: "id", keyType: DataTypes.INTEGER});
    //User.hasMany(Review, {as: 'student_id'});
    //User.sync();
};
exports.UserMap = UserMap;
//# sourceMappingURL=user.js.map