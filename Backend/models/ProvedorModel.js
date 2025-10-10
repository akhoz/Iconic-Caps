// impoortamos la conexión a la DB
import db from "../database/db.js"

//importamos sequelize
import { DataTypes } from "sequelize";

const ProvedorModel = db.define('Provedor', {
  IdentificadorFiscal: { type: DataTypes.INTEGER, primaryKey: true },
  NombreEmpresa: { type: DataTypes.STRING },
  CorreoElectronico: { type: DataTypes.STRING }
},
  {
    tableName: 'Provedor',
    timestamps: false,
  });

export default ProvedorModel;
