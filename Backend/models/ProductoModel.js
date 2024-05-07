// impoortamos la conexión a la DB
import db from "../database/db.js"

//importamos sequelize
import {DataTypes} from "sequelize";

const ProductoModel = db.define('Producto', {
    Modelo: {type: DataTypes.STRING, primaryKey:true},
    //IndentificadorFiscalProvedor : {type: DataTypes.INTEGER},
    Categoria: {type: DataTypes.STRING},
    Precio : {type: DataTypes.INTEGER},
    ExistenciasDisponibles : {type: DataTypes.INTEGER}

})

export default ProductoModel;