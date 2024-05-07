// impoortamos la conexión a la DB
import db from "../database/db.js"

//importamos sequelize
import {DataTypes} from "sequelize";

const ProductoModel = db.define('producto', {
    Modelo: {type: DataTypes.STRING},
    IndentificadorFiscalProvedor : {type: DataTypes.INTEGER},
    Categoria: {type: DataTypes.STRING},
    Precio : {type: DataTypes.INTEGER},
    ExistenciasDisponibles : {type: DataTypes.INTEGER}

})

export default ProductoModel;