import express from 'express';
import { requireAuth } from '../middleware/requireAuth.js';

import {
  obtenerInformacionPedidos, obtenerProductosComprados, crearNuevoPedido, obtenerDatosDesdeVista,
  obtenerCantidadComprasPorProducto, obtenerPedidosPendientes
} from '../controllers/ConsultaController.js';
import { generarPdfConVistas } from '../controllers/pdfController.js';
const router = express.Router();

router.get('/pedidos/:CedulaClienteConsultado', requireAuth, obtenerInformacionPedidos);
router.get('/productos/:CedulaClienteConsultado', obtenerProductosComprados);
router.get('/vista/:vista', obtenerDatosDesdeVista);
router.get('/generar-pdf-vista', generarPdfConVistas);
router.get('/cantidad-compras-producto', obtenerCantidadComprasPorProducto);
router.get('/pedidos-pendientes', obtenerPedidosPendientes);
router.post('/crearpedido', crearNuevoPedido)

export default router;
