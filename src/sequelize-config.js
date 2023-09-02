import { Sequelize } from 'sequelize'
import DB from './db-config.js'

const DBConnection = new Sequelize({
  database: DB.NAME,
  username: DB.USER,
  password: DB.PASS,
  host: DB.HOST,
  port: DB.PORT,
  dialect: DB.DIALECT,
})
export default DBConnection
