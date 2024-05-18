import { DataTypes } from 'sequelize';
import db from '../database/db.js';
import PedidoModel from './PedidoModel.js';
import RepartidorModel from './RepartidorModel.js';

const EnvioXPedidoModel = db.define('EnvioXPedido', {
    NumeroFacturaPedido: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: PedidoModel,
            key: 'NumeroFactura',
        },
        onDelete: 'CASCADE',
    },
    CedulaRepartidor: {
        type: DataTypes.INTEGER,
        references: {
            model: RepartidorModel,
            key: 'CedulaRepartidor',
        },
        onDelete: 'SET NULL',
    },
    Direccion: {
        type: DataTypes.STRING(25),
        allowNull: false,
    },
    FechaEntrega: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    Estado: {
        type: DataTypes.ENUM('Cancelado', 'Entregado', 'En proceso'),
        allowNull: false,
    },
}, {
    tableName: 'envioxpedido', // Nombre de la tabla
    timestamps: false,
});

EnvioXPedidoModel.belongsTo(PedidoModel, {
    foreignKey: 'NumeroFacturaPedido',
    targetKey: 'NumeroFactura',
});

EnvioXPedidoModel.belongsTo(RepartidorModel, {
    foreignKey: 'CedulaRepartidor',
    targetKey: 'CedulaRepartidor',
});

export default EnvioXPedidoModel;
