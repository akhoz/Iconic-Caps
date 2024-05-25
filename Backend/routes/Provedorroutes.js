import express from 'express';
import { getProvedores, getProvedor, createProvedor, updateProvedor, deleteProvedor } from '../controllers/ProvedorController.js';

const router = express.Router();
router.get('/', getProvedores);
router.get('/:NombreEmpresa', getProvedor);
router.post('/', createProvedor);
router.put('/:NombreEmpresa', updateProvedor);
router.delete('/:NombreEmpresa', deleteProvedor);

export default router;