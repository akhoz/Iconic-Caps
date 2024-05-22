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

export const createSucursal = async (req, res) => {
    try {
        await SucursalModel.create(req.body)
        res.json("Sucursal creada con éxito")
    } catch (error) {
        res.json({message: error.message})
    }
}


export const updateSucursal = async (req, res) => {
    try {
        const sucursal = await SucursalModel.update({
            Nombre: req.body.Nombre,
            Direccion: req.body.Direccion,
            NumeroTelefono: req.body.NumeroTelefono,
            Img: req.body.Img,
            LinkGoogleMaps: req.body.LinkGoogleMaps
        }, {
            where: {
                NumeroSucursal: req.params.idSucursal
            }
        });
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
