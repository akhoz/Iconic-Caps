import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const requireAuth = (req, res, next) => {
  const token = req.cookies?.jwt;

  // 1️⃣ Si no viene la cookie JWT → 401
  if (!token) {
    return res.status(401).json({ message: 'No autorizado: token no encontrado' });
  }

  try {
    // 2️⃣ Verificar el token
    const decoded = jwt.verify(token, JWT_SECRET);

    // 3️⃣ Guardar payload en req.user (para controladores que usan req.user.sub o req.user.Admin)
    req.user = decoded;

    // 4️⃣ Continuar al siguiente middleware/controlador
    next();
  } catch (err) {
    console.error('❌ Error verificando JWT:', err.message);
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
};
