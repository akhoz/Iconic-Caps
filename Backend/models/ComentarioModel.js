import db from '../database/db.js';
import { DataTypes } from 'sequelize';
import ClienteModel from './ClienteModel.js';
import ProductoModel from './ProductoModel.js';

const ComentarioModel = db.define('Comentario', {
  IdComentario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Estrellas: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: true,
      min: 1,
      max: 5,
    },
  },
  Comentario: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Fecha: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  Hora: {
    type: DataTypes.TIME,
    allowNull: false,
  },
}, {
  tableName: 'Comentario',
  timestamps: false,
});

// Relación con ClienteModel
ComentarioModel.belongsTo(ClienteModel, {
  foreignKey: 'CedulaCliente',
  targetKey: 'CedulaCliente',
});

// Relación con ProductoModel
ComentarioModel.belongsTo(ProductoModel, {
  foreignKey: 'ModeloProducto',
  targetKey: 'Modelo',
});

export default ComentarioModel;
