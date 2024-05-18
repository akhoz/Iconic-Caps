import { DataTypes } from 'sequelize';
import db from '../database/db.js';
import PersonaModel from './PersonaModel.js';

const ClienteModel = db.define('Cliente', {
    CedulaCliente: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: PersonaModel,
            key: 'Cedula',
        },
    },
    Usuario: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Contrasena: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'Clientes', // Nombre de la tabla
    timestamps: false,
});

ClienteModel.belongsTo(PersonaModel, {
    foreignKey: 'CedulaCliente',
    targetKey: 'Cedula',
});

export default ClienteModel;
