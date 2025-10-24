export const requireAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'No autenticado' });
  }
  if (!req.user.Admin) {
    return res.status(403).json({ message: 'Acceso denegado: se requiere rol admin' });
  }
  next();
};