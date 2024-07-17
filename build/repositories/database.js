"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
// src/database.ts
//import { db_host, db_schema, db_port, db_name, db_user, db_password } from './config';
const sequelize_1 = require("sequelize");
class Database {
    constructor(options) {
        const database = new sequelize_1.Sequelize(options);
        this.db = database;
    }
    getDB() {
        return this.db;
    }
}
exports.Database = Database;
/*export const database = new Sequelize({
  dialect: "postgres",
  host: db_host,
  port: db_port,
  database: db_name,
  username: db_user,
  password: db_password,
  schema: db_schema,
  logging: console.log
});*/ 
//# sourceMappingURL=database.js.map