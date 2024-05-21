import { DataTypes } from 'sequelize';
import db from '../database/db.js';
import PedidoModel from './PedidoModel.js';

const GarantiaXPedidoModel = db.define('GarantiaXPedido', {
    NumeroFacturaPedido: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: PedidoModel,
            key: 'NumeroFactura',
        },
        onDelete: 'CASCADE',
    },
    FechaInicio: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    FechaFinal: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    TipoGarantia: {
        type: DataTypes.STRING(25),
        allowNull: false,
    },
}, {
    tableName: 'GarantiaXPedido',
    timestamps: false,
});

GarantiaXPedidoModel.belongsTo(PedidoModel, {
    foreignKey: 'NumeroFacturaPedido',
    targetKey: 'NumeroFactura',
});

export default GarantiaXPedidoModel;
