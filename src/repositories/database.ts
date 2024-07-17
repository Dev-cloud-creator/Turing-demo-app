// src/database.ts
//import { db_host, db_schema, db_port, db_name, db_user, db_password } from './config';
import { Sequelize, Options, Dialect } from 'sequelize';

export class Database {
  public db: Sequelize | undefined;
  constructor(options: Options) {
    const database = new Sequelize(options);
    this.db = database;
  }
  public getDB(): Sequelize {
    return this.db as Sequelize;
  }
}

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