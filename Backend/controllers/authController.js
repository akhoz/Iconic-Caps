import jwt from 'jsonwebtoken';
import ClienteModel from '../models/ClienteModel.js';
import PersonaModel from '../models/PersonaModel.js';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
dotenv.config();

// Hay otra issue que arregla el NO uso de .env 
// Entonces voy a poner esto raw hasta que eso ya esté implementado
//const JWT_SECRET = 'super-secret-key';
//const JWT_EXPIRES_IN = '1h';

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

const buildSafeUser = (cliente) => ({
  CedulaCliente: cliente.CedulaCliente,
  Usuario: cliente.Usuario,
  Admin: cliente.Admin,
  Persona: cliente.Persona ? {
    Cedula: cliente.Persona.Cedula,
    Nombre: cliente.Persona.Nombre,
    PrimerApellido: cliente.Persona.PrimerApellido,
    SegundoApellido: cliente.Persona.SegundoApellido,
    Email: cliente.Persona.Email
  } : null
});

export const login = async (req, res) => {
  try {
    const { Usuario, Contrasena } = req.body;
    if (!Usuario || !Contrasena) {
      return res.status(400).json({ message: 'Usuario y contraseña son requeridos' });
    }

    const cliente = await ClienteModel.findOne({
      where: { Usuario },
      include: [{ model: PersonaModel }],
      // puedes excluir explícitamente la contraseña si está en el modelo:
      // attributes: { exclude: ['Contrasena'] }
    });

    if (!cliente) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // comparar hash
    const match = await bcrypt.compare(Contrasena, cliente.Contrasena || '');
    if (!match) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Crear token JWT (si ya lo haces)
    const token = jwt.sign({ id: cliente.CedulaCliente, user: cliente.Usuario }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    // enviar cookie segura: en producción asegurarse secure: true (cuando HTTPS)
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // true en prod (HTTPS)
      sameSite: 'Lax',
      maxAge: 60 * 60 * 1000,
    });

    return res.json({ user: buildSafeUser(cliente) });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error en login' });
  }
};