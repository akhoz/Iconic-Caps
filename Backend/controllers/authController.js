import jwt from 'jsonwebtoken';
import ClienteModel from '../models/ClienteModel.js';
import PersonaModel from '../models/PersonaModel.js';

// Hay otra issue que arregla el NO uso de .env 
// Entonces voy a poner esto raw hasta que eso ya esté implementado
const JWT_SECRET = 'super-secret-key';
const JWT_EXPIRES_IN = '1h';

const buildSafeUser = (cliente) => ({
  CedulaCliente: cliente.CedulaCliente,
  Usuario: cliente.Usuario,
  Admin: cliente.Admin,
  Persona: cliente.Persona
    ? {
      Cedula: cliente.Persona.Cedula,
      Nombre: cliente.Persona.Nombre,
      Apellido1: cliente.Persona.Apellido1,
      Apellido2: cliente.Persona.Apellido2,
    }
    : undefined,
});

export const login = async (req, res) => {
  try {
    const { Usuario, Contrasena } = req.body;
    console.log('Body recibido:', req.body);

    if (!Usuario || !Contrasena) {
      return res.status(400).json({ message: 'Usuario y contraseña son requeridos' });
    }

    const cliente = await ClienteModel.findOne({
      where: { Usuario },
      include: [{ model: PersonaModel }],
    });

    if (!cliente || cliente.Contrasena !== Contrasena) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Cambios issue BOLA (Adrian) ---
    // Crear token
    const token = jwt.sign(
      {
        sub: cliente.CedulaCliente,
        Usuario: cliente.Usuario,
        Admin: cliente.Admin,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    // Enviar cookie "jwt"
    res.cookie('jwt', token, {
      httpOnly: true,    // No accesible desde JS
      secure: false,     // Pónlo en true si usas HTTPS
      sameSite: 'Lax',   // Protege un poco de CSRF
      maxAge: 60 * 60 * 1000, // 1 hora
    });

    return res.json({ user: buildSafeUser(cliente) });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error en login' });
  }
};
