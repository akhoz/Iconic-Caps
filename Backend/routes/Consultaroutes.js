import express from 'express';
import { obtenerInformacionPedidos, obtenerProductosComprados} from '../controllers/ConsultaController.js';

const router = express.Router();

router.get('/pedidos/:CedulaClienteConsultado', obtenerInformacionPedidos);
router.get('/productos/:CedulaClienteConsultado', obtenerProductosComprados);
export default router;