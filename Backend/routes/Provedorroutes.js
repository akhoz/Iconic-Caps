import express from 'express';
import { getProvedores, getProvedor } from '../controllers/ProvedorController.js';

const router = express.Router();
router.get('/', getProvedores);
router.get('/:NombreEmpresa', getProvedor);

export default router;