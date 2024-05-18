import { DataTypes } from 'sequelize';
import db from '../database/db.js';
import PersonaModel from './PersonaModel.js';
import SucursalModel from './SucursalModel.js';

const RepartidorModel = db.define('Repartidor', {
    CedulaRepartidor: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: PersonaModel,
            key: 'Cedula',
        },
        onDelete: 'CASCADE',
    },
    NumeroSucursalAsignada: {
        type: DataTypes.INTEGER,
        references: {
            model: SucursalModel,
            key: 'NumeroSucursal',
        },
        onDelete: 'SET NULL',
    },
}, {
    tableName: 'Repartidor', // Nombre de la tabla
    timestamps: false,
});

RepartidorModel.belongsTo(PersonaModel, {
    foreignKey: 'CedulaRepartidor',
    targetKey: 'Cedula',
});

RepartidorModel.belongsTo(SucursalModel, {
    foreignKey: 'NumeroSucursalAsignada',
    targetKey: 'NumeroSucursal',
});

export default RepartidorModel;
