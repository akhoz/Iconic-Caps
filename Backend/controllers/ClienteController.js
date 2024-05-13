//** Métodos para el CRUD**/

import ClienteModel from "../models/ClienteModel.js"
import PersonaModel from "../models/PersonaModel.js"

    //Mostrar todos los registros
    
export const getAllClientes = async (req, res) => {
    try {
            const clientes = await ClienteModel.findAll({include : [{model: PersonaModel}]})
            res.json(clientes)

    } catch (error) {
        res.json({message: error.message})
    }
};

//Mostrar un registro
export const getCliente = async (req, res) => {
    try {
        const cliente = await ClienteModel.findOne({
            where: {
                Usuario: req.params.Usuario
            }
        });
        res.json(cliente);
    } catch (error) {
        res.json({ message: error.message });
    }
};

