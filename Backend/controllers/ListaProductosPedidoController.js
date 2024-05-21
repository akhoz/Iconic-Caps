// importamos el modelo
import ListaProductosPedidosModel from "../models/ListaProductosPedidosModel.js"

//** Métodos para el CRUD**/

    //Mostrar todos los registros
export const getAllListaProductos = async (req, res) => {
    try {
         const pedidos = await ListaProductosPedidosModel.findAll()
         res.jsonp(pedidos)

    } catch (error) {
        res.json({message: error.message})
    }
};

export const createListaPoductos= async(req, res) => {
    try {
        await ListaProductosPedidosModel.create(req.body)
        res.json({"message":"Lista productos creada"})
    } catch (error) {
        res.json({message: error.message})
    }
};
