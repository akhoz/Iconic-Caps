import EmpleadoModel from "../models/EmpleadoModel.js";
import PersonaModel from "../models/PersonaModel.js";
import SucursalModel from "../models/SucursalModel.js";



export const getAllEmpleados = async (req, res) => {
    try {
         const empleados = await EmpleadoModel.findAll({ include: [{model: SucursalModel, as: 'SucursalAsignada'}, {model: PersonaModel}]})
         res.json(empleados)

    } catch (error) {
        res.json({message: error.message})
    }
};