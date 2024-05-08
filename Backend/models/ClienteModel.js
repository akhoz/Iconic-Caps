import db from '../database/db.js'

import { DataTypes } from 'sequelize'
import PersonaModel from './PersonaModel.js';

const ClienteModel = db.define('Cliente', {
    CedulaCliente: { type: DataTypes.INTEGER, primaryKey: true },
    Usuario: { type: DataTypes.STRING },
    Contrasena: { type: DataTypes.STRING },
    UltimoIngreso: { type: DataTypes.STRING }
});

ClienteModel.belongsTo(PersonaModel, {
    foreignKey: 'CedulaCliente',
    targetKey: 'Cedula'
});

export default ClienteModel;