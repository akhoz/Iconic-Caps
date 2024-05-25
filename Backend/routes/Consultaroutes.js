import express from 'express';
import { obtenerInformacionPedidos, obtenerProductosComprados, crearNuevoPedido, obtenerDatosDesdeVista, generarPdfConVistas,
    obtenerCantidadComprasPorProducto
} from '../controllers/ConsultaController.js';

const router = express.Router();

router.get('/pedidos/:CedulaClienteConsultado', obtenerInformacionPedidos);
router.get('/productos/:CedulaClienteConsultado', obtenerProductosComprados);
router.get('/vista/:vista', obtenerDatosDesdeVista);
router.get('/generar-pdf', generarPdfConVistas);
router.get('/cantidad-compras-producto', obtenerCantidadComprasPorProducto);
router.post('/crearpedido', crearNuevoPedido)
export default router;