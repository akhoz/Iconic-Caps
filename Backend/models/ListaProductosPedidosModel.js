import { DataTypes } from 'sequelize';
import db from '../database/db.js';
import PedidoModel from './PedidoModel.js';
import ProductoModel from './ProductoModel.js';

const ListaProductosPedidosModel = db.define('ListaProductosPedidos', {
    NumeroFacturaPedido: {
        type: DataTypes.INTEGER,
        references: {
            model: PedidoModel,
            key: 'NumeroFactura',
        },
        onDelete: 'CASCADE',
        primaryKey: true,
    },
    ModeloProducto: {
        type: DataTypes.STRING(25),
        references: {
            model: ProductoModel,
            key: 'Modelo',
        },
        onDelete: 'CASCADE',
        primaryKey: true,
    },
    CantidadProducto: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'ListaProductosPedidos', // Nombre de la tabla
    timestamps: false,
});

ListaProductosPedidosModel.belongsTo(PedidoModel, {
    foreignKey: 'NumeroFacturaPedido',
    targetKey: 'NumeroFactura',
});

ListaProductosPedidosModel.belongsTo(ProductoModel, {
    foreignKey: 'ModeloProducto',
    targetKey: 'Modelo',
});

export default ListaProductosPedidosModel;
