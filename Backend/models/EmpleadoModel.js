// EmpleadoModel.js
import db from '../database/db.js';
import { DataTypes } from 'sequelize';
import SucursalModel from './SucursalModel.js'; // Importa el modelo de Sucursal
import PersonaModel from './PersonaModel.js';

const EmpleadoModel = db.define('Empleado', {
    CedulaEmpleado: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    NumeroSucursalAsignada: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

// Definir la relación entre Empleado y Sucursal
EmpleadoModel.belongsTo(SucursalModel, { foreignKey: 'NumeroSucursalAsignada', as: 'SucursalAsignada' });

EmpleadoModel.belongsTo(PersonaModel, { foreignKey: 'CedulaEmpleado', targetKey: 'Cedula' });

export default EmpleadoModel;


