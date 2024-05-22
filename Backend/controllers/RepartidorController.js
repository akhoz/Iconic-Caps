
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

// Eliminar un registro
export const deleteRepartidor = async (req, res) => {
    try {
        await RepartidorModel.destroy({
            where: {
                CedulaRepartidor: req.params.Cedula
            }
        });
        res.json("Repartidor eliminado");
    } catch (error) {
        res.json({ message: error.message });
    }
};