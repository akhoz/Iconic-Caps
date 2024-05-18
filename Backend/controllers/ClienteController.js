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

export const createCliente = async (req, res) => {
    try {
        await ClienteModel.create(req.body)
        res.json("Cliente creado con éxito")
    } catch (error) {
        res.json({message: error.message})
    }
};

export const updateUsuarioCliente = async (req, res) => {
    try {
        const cliente = await ClienteModel.update({
            Usuario: req.body.Usuario
        }, {
            where: {
                Usuario: req.params.Usuario
            }
        });
        console.log(req.params.Usuario)
        console.log("Cliente actualizado")
        res.json("Cliente actualizado");
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const updateContrasenaCliente = async (req, res) => {
    try {
        const cliente = await ClienteModel.update({
            Contrasena: req.body.Contrasena
        }, {
            where: {
                Usuario: req.params.Usuario
            }
        });
        console.log(req.params.Usuario);
        console.log("Cliente actualizado");
        res.json("Cliente actualizado");
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const deleteCliente = async (req, res) => {
    try {
        await ClienteModel.destroy({
            where: {
                Usuario: req.params.Usuario
            }
        });
        res.json("Cliente eliminado");
    } catch (error) {
        res.json({ message: error.message });
    }
};
