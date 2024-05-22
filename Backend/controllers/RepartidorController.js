
// importamos el modelo
import RepartidorModel from "../models/RepartidorModel.js"
import PersonaModel from "../models/PersonaModel.js"
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

// Mostrar un registro
export const getRepartidor = async (req, res) => {
    try {
        const repartidor = await RepartidorModel.findOne({
            where: {
                CedulaRepartidor: req.params.Cedula
            }, 
            include: [{model: PersonaModel}]
        });
        res.json(repartidor);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Crear un registro
export const createRepartidor = async (req, res) => {
    try {
        await RepartidorModel.create({
            CedulaRepartidor: req.body.CedulaRepartidor,
            NumeroSucursalAsignada: req.body.NumeroSucursalAsignada
        });
        res.json("Repartidor creado");
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Actualizar un registro
export const updateRepartidor = async (req, res) => {
    try {
        await RepartidorModel.update({
            NumeroSucursalAsignada: req.body.NumeroSucursalAsignada
        }, {
            where: {
                CedulaRepartidor: req.params.Cedula
            }
        });
        res.json("Repartidor actualizado");
    } catch (error) {
        res.json({ message: error.message });
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