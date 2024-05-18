// importamos el modelo
import EnvioXPedidoModel from "../models/EnvioXPedidoModel.js"

//** Métodos para el CRUD**/

    //Mostrar todos los registros
export const getAllEnvioXPedido = async (req, res) => {
    try {
         const envios = await EnvioXPedidoModel.findAll()
         res.jsonp(envios)

    } catch (error) {
        res.json({message: error.message})
    }
};
