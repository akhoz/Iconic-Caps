// ** Métodos para el CRUD + Login con migración en caliente **

import bcrypt from 'bcrypt';
import ClienteModel from "../models/ClienteModel.js";
import PersonaModel from "../models/PersonaModel.js";

const SALT_ROUNDS = 12;

const looksHashed = (value = "") =>
  typeof value === "string" && (/^\$2[aby]\$/.test(value) || /^\$argon2/.test(value));

export const getAllClientes = async (req, res) => {
  try {
    const clientes = await ClienteModel.findAll({
      attributes: { exclude: ['Contrasena'] },
      include: [{ model: PersonaModel, required: false }]
    });
    return res.json(clientes);
  } catch (error) {
    console.error('[getAllClientes]', error);
    return res.status(500).json({ message: 'Error interno' });
  }
};

export const getCliente = async (req, res) => {
  try {
    const includePassword = req.query.withPassword === 'true';

    const cliente = await ClienteModel.findOne({
      where: { Usuario: req.params.Usuario },
      include: [{ model: PersonaModel, required: false }],
    });

    if (!cliente) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }

    return res.json(cliente);
  } catch (error) {
    console.error('[getCliente]', error);
    return res.status(500).json({ message: 'Error interno' });
  }
};


export const createCliente = async (req, res) => {
  try {
    const { Contrasena, Persona, ...rest } = req.body;

    if (!Contrasena || Contrasena.length < 8) {
      return res.status(400).json({ message: 'La contraseña debe tener al menos 8 caracteres' });
    }

    const hashed = await bcrypt.hash(Contrasena, SALT_ROUNDS);

    const nuevo = await ClienteModel.create(
      {
        ...rest,
        Contrasena: hashed,
        ...(Persona ? { Persona } : {})
      },
      Persona ? { include: [{ model: PersonaModel }] } : undefined
    );

    const { Contrasena: _omit, ...safe } = nuevo.get({ plain: true });
    return res.status(201).json({ message: 'Cliente creado con éxito', cliente: safe });
  } catch (error) {
    console.error('[createCliente]', error);
    return res.status(500).json({ message: 'Error interno' });
  }
};


export const updateUsuarioCliente = async (req, res) => {
  try {
    const { Usuario: nuevoUsuario, Contrasena: nuevaContrasena } = req.body;

    const payload = {};
    if (nuevoUsuario) payload.Usuario = nuevoUsuario?.trim();

    if (typeof nuevaContrasena !== 'undefined') {
      if (!nuevaContrasena || nuevaContrasena.length < 8) {
        return res.status(400).json({ message: 'La contraseña debe tener al menos 8 caracteres' });
      }
      payload.Contrasena = await bcrypt.hash(nuevaContrasena, SALT_ROUNDS);
    }

    if (Object.keys(payload).length === 0) {
      return res.status(400).json({ message: 'No se enviaron campos válidos para actualizar' });
    }

    const [updated] = await ClienteModel.update(payload, {
      where: { Usuario: req.params.Usuario },
    });

    if (updated === 0) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }

    const clienteActualizado = await ClienteModel.findOne({
      where: { Usuario: payload.Usuario || req.params.Usuario },
      attributes: { exclude: ['Contrasena'] },
      include: [{ model: PersonaModel, required: false }]
    });

    return res.json({ message: 'Cliente actualizado', cliente: clienteActualizado });
  } catch (error) {
    console.error('[updateUsuarioCliente]', error);
    return res.status(500).json({ message: 'Error interno' });
  }
};


export const deleteCliente = async (req, res) => {
  try {
    const deleted = await ClienteModel.destroy({
      where: { Usuario: req.params.Usuario }
    });
    if (!deleted) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }
    return res.json({ message: 'Cliente eliminado' });
  } catch (error) {
    console.error('[deleteCliente]', error);
    return res.status(500).json({ message: 'Error interno' });
  }
};

;
