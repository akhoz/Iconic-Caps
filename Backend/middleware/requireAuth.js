import jwt from 'jsonwebtoken';

const JWT_SECRET = 'super-secret-key';

export const requireAuth = (req, res, next) => {
  const token = req.cookies?.jwt;

  if (!token) {
    return res.status(401).json({ message: 'Token no encontrado' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
};
