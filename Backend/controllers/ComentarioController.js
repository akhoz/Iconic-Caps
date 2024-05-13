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
export const getComentarioByModel = async (req, res) => {
    try {
        const comentarios = await ComentarioModel.findAll({
            where:{
                ModeloProducto:req.params.ModeloProducto
            }, include: [{model: ProductoModel}, {model: ClienteModel}]
        })
        res.json(comentarios)
    } catch (error) {
        res.json({message: error.message})
    }
};



//Mostrar un registro
export const getComentarioByCedula = async (req, res) => {
    try {
        const comentarios = await ComentarioModel.findAll({
            where:{
                CedulaCliente:req.params.CedulaCliente
            }, include: [{model: ProductoModel}, {model: ClienteModel}]
        })
        res.json(comentarios)
    } catch (error) {
        res.json({message: error.message})
    }
};