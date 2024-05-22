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

//Mostrar un registro
export const getEmpleado = async (req, res) => {
    try {
        const empleado = await EmpleadoModel.findOne({
            where: {
                CedulaEmpleado: req.params.Cedula
            }, include: [{model: SucursalModel, as: 'SucursalAsignada'}, {model: PersonaModel}]
        });
        res.json(empleado);
    }
    catch (error) {
        res.json({ message: error.message });
    }
};

export const createEmpleado = async (req, res) => {
    try {
        await EmpleadoModel.create(req.body)
        res.json("Empleado creado con éxito")
    } catch (error) {
        res.json({message: error.message})
    }
};

export const updateEmpleado = async (req, res) => {
    try {
        const empleado = await EmpleadoModel.update({
            CedulaEmpleado: req.body.Cedula,
            NumeroSucursalAsignada: req.body.NumeroSucursalAsignada
        }, {
            where: {
                CedulaEmpleado: req.params.Cedula
            }
        });
        console.log("Empleado actualizado")
        res.json("Empleado actualizado");
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const deleteEmpleado = async (req, res) => {
    try {
        const empleado = await EmpleadoModel.destroy({
            where: {
                CedulaEmpleado: req.params.Cedula
            }
        });
        res.json("Empleado eliminado");
    } catch (error) {
        res.json({ message: error.message });
    }
};

