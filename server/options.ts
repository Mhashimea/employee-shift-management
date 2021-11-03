import { Sequelize } from "sequelize-typescript"

export const sequelize = new Sequelize({
  username: "doadmin",
  password: "Xs81MjE8Wi2xcGzh",
  database: "defaultdb",
  host: "db-mysql-blr1-17476-do-user-6932806-0.b.db.ondigitalocean.com",
  port: 25060,
  dialect: "mysql",
  models: [__dirname + "/model"],
})