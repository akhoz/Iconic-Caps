import express from 'express';
import { obtenerInformacionPedidos, obtenerProductosComprados, crearNuevoPedido} from '../controllers/ConsultaController.js';

const router = express.Router();

router.get('/pedidos/:CedulaClienteConsultado', obtenerInformacionPedidos);
router.get('/productos/:CedulaClienteConsultado', obtenerProductosComprados);
router.get('/crearpedido', crearNuevoPedido)
export default router;