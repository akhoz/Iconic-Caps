import SucursalModel from "../models/SucursalModel.js";

export const getAllSucursales= async (req, res) => {
    try {
        const sucursales = await SucursalModel.findAll()
        res.json(sucursales)

    } catch (error) {
        res.json({message: error.message})
    }
};

export const getSucursal= async (req, res) => {
    try {
       const sucursal = await SucursalModel.findAll(
              {
                where: {
                     NumeroSucursal: req.params.idSucursal
                }
              }
       ) 
       res.json(sucursal)
    } catch (error) {
        
    }
};

export const updateSucursal = async (req, res) => {
    try {
        const sucursal = await SucursalModel.update({
            Nombre: req.body.Nombre,
            Direccion: req.body.Direccion,
            Telefono: req.body.Telefono
        }, {
            where: {
                NumeroSucursal: req.params.idSucursal
            }
        });
        console.log(req.params.idSucursal)
        console.log("Sucursal actualizada")
        res.json("Sucursal actualizada");
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const deleteSucursal = async (req, res) => {
    try {
        const sucursal = await SucursalModel.destroy({
            where: {
                NumeroSucursal: req.params.idSucursal
            }
        });
        res.json(sucursal);
    } catch (error) {
        res.json({ message: error.message });
    }
}
