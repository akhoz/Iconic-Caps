import ClienteModel from "../models/ClienteModel.js";
import ComentarioModel from "../models/ComentarioModel.js";
import ProductoModel from "../models/ProductoModel.js";

export const getAllComentarios = async (req, res) => {
    try {
         const comentarios = await ComentarioModel.findAll({include : [{model: ProductoModel}, {model: ClienteModel}]})
         res.json(comentarios)

    } catch (error) {
        res.json({message: error.message})
    }
};

//Mostrar un registro
export const getComentario = async (req, res) => {
    try {
        const comentarios = await ComentarioModel.findAll({
            where:{
                ModeloProducto:req.params.ModeloProducto
            }
        })
        res.json(comentarios)
    } catch (error) {
        res.json({message: error.message})
    }
};