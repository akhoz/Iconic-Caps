import express from 'express';
import { obtenerInformacionPedidos } from '../controllers/ConsultaController.js';

const router = express.Router();

router.get('/pedidos/:CedulaClienteConsultado', obtenerInformacionPedidos);

export default router;