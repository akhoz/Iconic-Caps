import SucursalModel from "../models/SucursalModel.js";

export const getAllSucursales= async (req, res) => {
    try {
        const sucursales = await SucursalModel.findAll()
        res.json(sucursales)

    } catch (error) {
        res.json({message: error.message})
    }
};
