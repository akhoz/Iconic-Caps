import { Sequelize } from 'sequelize'

const db = new Sequelize('IconicCaps', 'root', 'MX34zcajvp.', {
  host: 'localhost',
  dialect: 'mysql',
  define: { timestamps: false }
})

export default db;
