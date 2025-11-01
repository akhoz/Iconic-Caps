import { Sequelize } from 'sequelize'

const db = new Sequelize('IconicCaps', 'iconic_user', 'iconic_pass', {
  host: '127.0.0.1',
  port: 3306,
  dialect: 'mysql',
  define: { timestamps: false }
})

export default db;
