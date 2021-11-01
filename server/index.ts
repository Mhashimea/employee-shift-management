import bodyParser from "body-parser"
import cors from "cors"
import express from "express"
import createEndPoints from "./endpoints/index"
import { sequelize } from "./options"

const http = require("http")

const app = express()
const port = 3000

app.use(bodyParser.json({ limit: "50mb" }))
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }))
app.use(bodyParser.text());
app.use(bodyParser.urlencoded());

app.use(cors())
app.use((req: any, res: any, next: any) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type,Accept"
  )
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE,OPTIONS")
  next()
})


createEndPoints(app)
const server = http.createServer(app)

server.listen(port, () => {
  sequelize.authenticate().then(async () => {
    await sequelize.sync()
    console.log("Nodejs Connected on port", port)
  })
})
