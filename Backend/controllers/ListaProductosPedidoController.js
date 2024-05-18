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
