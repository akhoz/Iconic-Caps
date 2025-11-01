import { Sequelize } from 'sequelize'

const db = new Sequelize('IconicCaps', 'root', '86750527', {
  host: 'localhost',
  dialect: 'mysql',
  define: { timestamps: false }
})

export default db;
