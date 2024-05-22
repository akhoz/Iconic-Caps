import ProvedorModel from '../models/ProvedorModel.js';


export const getProvedores = async (req, res) => {
    try {
        const provedores = await ProvedorModel.findAll();
        res.status(200).json(provedores);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Obtener un Provedor


// Mostrar un registro
export const getProvedor = async (req, res) => {
    try {
        const provedor = await ProvedorModel.findOne({
            where: {
                IdentificadorFiscal: req.params.IdentificadorFiscal
            }
        });
        res.json(provedor);
    } catch (error) {
        res.json({ message: error.message });
    }
};
