import db from '../database/db.js';
import { DataTypes } from 'sequelize';
import ClienteModel from './ClienteModel.js';
import ProductoModel from './ProductoModel.js';

const ComentarioModel = db.define('Comentario', {
    IdComentario: { type: DataTypes.INTEGER, primaryKey: true },
    Estrellas: { type: DataTypes.INTEGER },
    Comentario: { type: DataTypes.STRING },
    Fecha: { type: DataTypes.DATE },
    Hora: { type: DataTypes.TIME }
});

// Definir la relación con ClienteModel
ComentarioModel.belongsTo(ClienteModel, {
    foreignKey: 'CedulaCliente',
    targetKey: 'CedulaCliente'
});

// Definir la relación con ProductoModel
ComentarioModel.belongsTo(ProductoModel, {
    foreignKey: 'ModeloProducto',
    targetKey: 'Modelo'
});

export default ComentarioModel;
