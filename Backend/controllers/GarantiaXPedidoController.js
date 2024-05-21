import GarantiaXPedidoModel from "../models/GarantiaxPedido.js";

export const getAllGarantias = async (req, res) => {
    try {
         const garantias = await GarantiaXPedidoModel.findAll()
         res.jsonp(garantias)

    } catch (error) {
        res.json({message: error.message})
    }
};