import { Sequelize } from 'sequelize'
import dotenv from 'dotenv';
dotenv.config();

console.log(process.env.DB_NAME, process.env.DB_USER,
)

const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    define: { timestamps: false }
  })

export default db;
