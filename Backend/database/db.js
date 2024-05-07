import {Sequelize} from 'sequelize'

const db = new Sequelize('IconicCaps' , 'root', 'Luisguapo03',{
    host: 'localhost',
    dialect: 'mysql',
    define: {  
        timestamps: false,
        freezeTableName: true, 
      }
    
})

export default db;