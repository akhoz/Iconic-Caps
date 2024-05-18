import { DataTypes } from 'sequelize';
import db from '../database/db.js';
import ClienteModel from './ClienteModel.js';

const PedidoModel = db.define('Pedido', {
    NumeroFactura: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    CedulaCliente: {
        type: DataTypes.INTEGER,
        references: {
            model: ClienteModel,
            key: 'CedulaCliente',
        },
        onDelete: 'SET NULL',
    },
    FechaDeCompra: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    tableName: 'Pedido', // Nombre de la tabla
    timestamps: false,
});

PedidoModel.belongsTo(ClienteModel, {
    foreignKey: 'CedulaCliente',
    targetKey: 'CedulaCliente',
});

export default PedidoModel;
