// SucursalModel.js
import db from '../database/db.js';
import { DataTypes } from 'sequelize';

const SucursalModel = db.define('Sucursal', {
    NumeroSucursal: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    Nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Direccion: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    NumeroTelefono: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

export default SucursalModel;
