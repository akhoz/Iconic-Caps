import express from 'express';
import { obtenerInformacionPedidos, obtenerProductosComprados, crearNuevoPedido, obtenerDatosDesdeVista} from '../controllers/ConsultaController.js';

const router = express.Router();

router.get('/pedidos/:CedulaClienteConsultado', obtenerInformacionPedidos);
router.get('/productos/:CedulaClienteConsultado', obtenerProductosComprados);
router.get('/vista/:vista', obtenerDatosDesdeVista);
router.post('/crearpedido', crearNuevoPedido)
export default router;