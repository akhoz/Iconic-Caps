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

export const getCometarioById = async (req, res) => {
    try {
        const comentario = await ComentarioModel.findOne({
            where: {
                IdComentario: req.params.IdComentario
            }
        });
        res.json(comentario);
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const createComentario = async (req, res) => {
    try {
        await ComentarioModel.create(req.body)
        res.json("Comentario creado con éxito")
    } catch (error) {
        res.json({message: error.message})
    }
};

export const updateComentario = async (req, res) => {
    try {
        const comentario = await ComentarioModel.update({
            Comentario: req.body.Comentario,
            Puntuacion: req.body.Puntuacion
        }, {
            where: {
                IdComentario: req.params.IdComentario
            }
        });
        console.log(req.params.IdComentario)
        console.log("Comentario actualizado")
        res.json("Comentario actualizado");
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const deleteComentario = async (req, res) => {
    try {
        const comentario = await ComentarioModel.destroy({
            where: {
                IdComentario: req.params.IdComentario
            }
        });
        res.json("Eliminado con {exito");
    } catch (error) {
        res.json({ message: error.message });
    }
};