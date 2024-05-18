
// importamos el modelo
import RepartidorModel from "../models/RepartidorModel.js"

//** Métodos para el CRUD**/

    //Mostrar todos los registros
export const getAllRepartidores = async (req, res) => {
    try {
         const repartidores = await RepartidorModel.findAll()
         res.json(repartidores)

    } catch (error) {
        res.json({message: error.message})
    }
};
