"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = void 0;
// src/database.ts
const config_1 = require("./config");
const sequelize_1 = require("sequelize");
exports.database = new sequelize_1.Sequelize({
    dialect: "postgres",
    host: config_1.db_host,
    port: config_1.db_port,
    database: config_1.db_name,
    username: config_1.db_user,
    password: config_1.db_password,
    schema: config_1.db_schema,
    logging: console.log
});
//# sourceMappingURL=database.js.map