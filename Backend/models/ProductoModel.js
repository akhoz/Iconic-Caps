// impoortamos la conexión a la DB
import db from "../database/db.js"
import ProvedorModel from "./ProvedorModel.js";

//importamos sequelize
import {DataTypes} from "sequelize";

const ProductoModel = db.define('Producto', {
    Modelo: {type: DataTypes.STRING, primaryKey:true},
    Categoria: {type: DataTypes.STRING},
    Precio : {type: DataTypes.INTEGER},
    ExistenciasDisponibles : {type: DataTypes.INTEGER}

});

ProvedorModel.hasOne(ProductoModel, {
    foreignKey: 'IdentificadorFiscalProvedor',
});
ProductoModel.belongsTo(ProvedorModel, {
    foreignKey: 'IdentificadorFiscalProvedor',
});

export default ProductoModel;
