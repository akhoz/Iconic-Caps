//** Métodos para el CRUD**/

import ClienteModel from "../models/ClienteModel.js"
import PersonaModel from "../models/PersonaModel.js"
import bcrypt from 'bcrypt';

//Mostrar todos los registros
export const getAllClientes = async (req, res) => {
  try {
    const clientes = await ClienteModel.findAll({
      include: [{ model: PersonaModel }],
      attributes: { exclude: ['Contrasena'] }
    });
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Mostrar un registro
export const getCliente = async (req, res) => {
    try {
        const cliente = await ClienteModel.findOne({
          where: { Usuario: req.params.Usuario },
          include: [{ model: PersonaModel }],
          attributes: { exclude: ['Contrasena'] }
        });
        res.json(cliente);
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const createCliente = async (req, res) => {
    try {
      const data = { ...req.body };
  
      if (data.Contrasena) {
        const saltRounds = 12; // ajustar si necesario
        data.Contrasena = await bcrypt.hash(data.Contrasena, saltRounds);
      }
  
      await ClienteModel.create(data);
      res.json({ message: "Cliente creado con éxito" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  export const updateUsuarioCliente = async (req, res) => {
    try {
      const payload = { ...req.body };
  
      if (payload.Contrasena) {
        const saltRounds = 12;
        payload.Contrasena = await bcrypt.hash(payload.Contrasena, saltRounds);
      }
  
      await ClienteModel.update(payload, {
        where: { Usuario: req.params.Usuario }
      });
  
      res.json({ message: "Cliente actualizado con éxito" });
    } catch (error) {
      res.status(500).json({ message: error.message });
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
