import ProvedorModel from '../models/ProvedorModel.js';


export const getProvedores = async (req, res) => {
    try {
        const provedores = await ProvedorModel.findAll();
        res.status(200).json(provedores);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};


// Mostrar un registro
export const getProvedor = async (req, res) => {
    try {
        const provedor = await ProvedorModel.findOne({
            where: {
                NombreEmpresa: req.params.NombreEmpresa
            }
        });
        res.json(provedor);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Crear un registro
export const createProvedor = async (req, res) => {
    try {
        const provedor = await ProvedorModel.create(req.body);
        res.status(201).json(provedor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un registro
export const updateProvedor = async (req, res) => {
    try {
        const provedor = await ProvedorModel.findOne({
            where: {
                NombreEmpresa: req.params.NombreEmpresa
            }
        });

        if (provedor) {
            provedor.update(req.body);
            res.json({ message: 'Provedor actualizado' });
        } else {
            res.json({ message: 'Provedor no encontrado' });
        }
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Eliminar un registro
export const deleteProvedor = async (req, res) => {
    try {
        const provedor = await ProvedorModel.findOne({
            where: {
                NombreEmpresa: req.params.NombreEmpresa
            }
        });

        if (provedor) {
            provedor.destroy();
            res.json({ message: 'Provedor eliminado' });
        } else {
            res.json({ message: 'Provedor no encontrado' });
        }
    } catch (error) {
        res.json({ message: error.message });
    }
};
