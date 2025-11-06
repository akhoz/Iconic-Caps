// app.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import db from "../Backend/database/db.js";
import productoRoutes from "./routes/Productoroutes.js";
import clienteRoutes from "./routes/Clienteroutes.js";
import comentatioRoutes from "./routes/Comentarioroutes.js";
import empleadoRoutes from "./routes/Empleadoroutes.js";
import sucursalRoutes from "./routes/Sucursalroutes.js";
import repartidorRoutes from "./routes/Repartidorroutes.js";
import pedidoRoutes from "./routes/Pedidoroutes.js";
import listaProductosRoutes from "./routes/Listaproductosroutes.js";
import envioxpedidoRoutes from "./routes/Envioxpedidoroutes.js";
import consultaRoutes from "./routes/Consultaroutes.js";
import personaRoutes from "./routes/Personaroutes.js";
import garantiasRoutes from "./routes/Garantiaroutes.js";
import provedorRoutes from "./routes/Provedorroutes.js";
import authRoutes from "./routes/authRoutes.js";
import { requireAuth } from './middleware/requireAuth.js';

import cookieParser from "cookie-parser";
import fs from "fs";
import https from "https";
import helmet from "helmet";

const app = express();

/* ---------------------- MIDDLEWARES ---------------------- */
app.use(helmet()); // cabeceras seguras por defecto
app.use(express.json());
app.use(cookieParser());

// CORS: en desarrollo puedes permitir origen dinámico con process.env.CORS_ORIGIN (comma-separated o '*')
// En producción define CORS_ORIGIN explícito (ej: https://mi-frontend.com)
const corsOrigin = process.env.CORS_ORIGIN || true;
app.use(
  cors({
    origin: ['http://localhost:5173', 'https://localhost:5173'],
    credentials: true,
  })
);


function ensureSecure(req, res, next) {
  if (req.secure || req.headers["x-forwarded-proto"] === "https") {
    return next();
  }
  // Si FORCE_HTTPS no está activo, no redirigimos (útil para dev sin certs)
  if (process.env.FORCE_HTTPS !== "true") {
    return next();
  }
  const host = req.headers.host ? req.headers.host.split(":")[0] : "localhost";
  const httpsPort = process.env.HTTPS_PORT || 3443;
  return res.redirect(301, `https://${host}:${httpsPort}${req.originalUrl}`);
}
if (process.env.FORCE_HTTPS === "true") {
  app.use(ensureSecure);
}

/* ---------------------- RUTAS ---------------------- */
app.use("/productos", productoRoutes);
app.use("/clientes", clienteRoutes);
app.use("/comentarios", comentatioRoutes);
app.use("/empleados", empleadoRoutes);
app.use("/sucursales", sucursalRoutes);
app.use("/repartidores", repartidorRoutes);
app.use("/pedidos", pedidoRoutes);
app.use("/listaProductos", listaProductosRoutes);
app.use("/envioxpedido", envioxpedidoRoutes);
app.use('/consultas', requireAuth, consultaRoutes);
app.use("/personas", personaRoutes);
app.use("/garantias", garantiasRoutes);
app.use("/provedores", provedorRoutes);

app.use("/auth", authRoutes);

/* ---------------------- DB ---------------------- */
try {
  await db.authenticate();
  console.log("Conexión exitosa a la DB");
} catch (error) {
  console.log(`El error de conexión es: ${error}`);
}

/* ---------------------- RUTAS ADICIONALES ---------------------- */
app.get("/", (req, res) => {
  res.send("Hola Mundo");
});

/* ---------------------- START SERVERS ---------------------- */
/*
 - HTTP always started (useful para redirección o dev).
 - HTTPS started only si detecta key/cert o si defines rutas env SSL_KEY/SSL_CERT.
*/
const HTTP_PORT = process.env.PORT || 8000;
const HTTPS_PORT = process.env.HTTPS_PORT || 3443;

app.listen(HTTP_PORT, () => {
  console.log(`HTTP Server UP running on http://localhost:${HTTP_PORT}/`);
});

// Inicia HTTPS si existen certificados
const keyPath = process.env.SSL_KEY || "./key.pem";
const certPath = process.env.SSL_CERT || "./cert.pem";

if (fs.existsSync(keyPath) && fs.existsSync(certPath)) {
  const options = {
    key: fs.readFileSync(keyPath),
    cert: fs.readFileSync(certPath),
  };

  // Añadimos HSTS sólo si el servidor HTTPS está activo y en modo FORCED HTTPS
  app.use(
    helmet.hsts({
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    })
  );

  https.createServer(options, app).listen(HTTPS_PORT, () => {
    console.log(`HTTPS Server UP running on https://localhost:${HTTPS_PORT}/`);
  });
} else {
  console.warn(
    "No SSL certs found: HTTPS server not started. Generate key.pem/cert.pem or set SSL_KEY/SSL_CERT env vars."
  );
}
