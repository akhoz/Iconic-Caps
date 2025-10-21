import { Sequelize } from 'sequelize'

const db = new Sequelize('IconicCaps', 'root', 'Jojadaya', {
  host: 'localhost',
  dialect: 'mysql',
  define: { timestamps: false }
})

export default db;
