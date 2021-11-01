import { Sequelize } from "sequelize-typescript"

export const sequelize = new Sequelize({
  username: "root",
  password: "",
  database: "restaurant",
  host: "localhost",
  dialect: "mysql",
  models: [__dirname + "/model"],
})