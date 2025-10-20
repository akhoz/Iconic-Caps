import ClienteModel from '../models/ClienteModel.js';
import PersonaModel from '../models/PersonaModel.js';

const buildSafeUser = (cliente) => ({
  CedulaCliente: cliente.CedulaCliente,
  Usuario: cliente.Usuario,
  Admin: cliente.Admin,
  Persona: cliente.Persona ? {
    Cedula: cliente.Persona.Cedula,
    Nombre: cliente.Persona.Nombre,
    Apellido1: cliente.Persona.Apellido1,
    Apellido2: cliente.Persona.Apellido2,
  } : undefined
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

    if (!cliente || cliente.Contrasena !== Contrasena) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    return res.json({ user: buildSafeUser(cliente) });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error en login' });
  }
};

