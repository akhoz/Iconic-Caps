// importamos el modelo
import ProductoModel from "../models/ProductoModel.js";
import ProvedorModel from "../models/ProvedorModel.js";

//** Métodos para el CRUD**/

    //Mostrar todos los registros
export const getAllProductos = async (req, res) => {
    try {
         const productos = await ProductoModel.findAll({include : [{model: ProvedorModel}]})
         res.json(productos)

    } catch (error) {
        res.json({message: error.message})
    }
}

//Mostrar un registro
export const getProducto = async (req, res) => {
    try {
        const producto = await ProductoModel.findAll({
            where:{
                modelo:req.params.modelo
            }
        })
        res.json(producto[0])
    } catch (error) {
        res.json({message: error.message})
    }
};

// Crear un registro
export const createProducto = async (req, res) => {
    try {
        await ProductoModel.create(req.body)
        res.json({"message" : "Registro Completado con éxito" })
    } catch (error) {
        res.json({message: error.message})
    }
};

// Actualizar un registro
export const updateProducto = async (req, res) => {
    try {
        const producto3 = await ProductoModel.update( 
            {
            Categoria: req.body.Categoria,
            Precio: req.body.Precio,
            ExistenciasDisponibles: req.body.ExistenciasDisponibles,
            Img: req.body.Img,
            IdentificadorFiscalProvedor: req.body.IdentificadorFiscalProvedor
            },

        {
            where: {modelo: req.params.modelo}
        });
        res.json({"message":"Registro actualizado con éxito"})
    } catch (error) {
        res.json({message: error.message})
    }
};

// Eliminar un registro
export const deleteProducto = async (req, res) => {
    try {
        await ProductoModel.destroy({
            where: {Modelo : req.params.modelo}
        })
        res.json({"message":"Registro actualizado con éxito"})
    } catch (error) {
        res.json({message: error.message})
    }
};

//
