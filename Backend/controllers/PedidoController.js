// importamos el modelo
import PedidoModel from "../models/PedidoModel.js"

//** Métodos para el CRUD**/

    //Mostrar todos los registros
export const getAllPedidos = async (req, res) => {
    try {
         const pedidos = await PedidoModel.findAll()
         res.jsonp(pedidos)

    } catch (error) {
        res.json({message: error.message})
    }
};

