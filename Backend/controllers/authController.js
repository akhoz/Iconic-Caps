import jwt from 'jsonwebtoken';
import ClienteModel from '../models/ClienteModel.js';
import PersonaModel from '../models/PersonaModel.js';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
dotenv.config();

let { JWT_SECRET, JWT_EXPIRES_IN } = process.env;
JWT_EXPIRES_IN = JWT_EXPIRES_IN || '1h';

const buildSafeUser = (cliente) => ({
  CedulaCliente: cliente.CedulaCliente,
  Usuario: cliente.Usuario,
  Admin: !!cliente.Admin,
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
    });

    if (!cliente) return res.status(401).json({ message: 'Credenciales inválidas' });

    const match = await bcrypt.compare(Contrasena, cliente.Contrasena || '');
    if (!match) return res.status(401).json({ message: 'Credenciales inválidas' });

    if (!JWT_SECRET) {
      console.error('FATAL: JWT_SECRET no definido en .env');
      return res.status(500).json({ message: 'Config error' });
    }

    // >>>>> CLAVEEE: firma el token con los campos que usas luego (sub, Admin)
    const token = jwt.sign(
      {
        sub: String(cliente.CedulaCliente),
        Usuario: cliente.Usuario,
        Admin: !!cliente.Admin,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    // En local estás usando https://localhost:3443 → usa secure:true
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: true,       // cookie solo se envía por HTTPS
      sameSite: 'Lax',    // si algún día sirves front en otro dominio, usa 'None'
      maxAge: 60 * 60 * 1000,
    });

    return res.json({ user: buildSafeUser(cliente) });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error en login' });
  }
};
