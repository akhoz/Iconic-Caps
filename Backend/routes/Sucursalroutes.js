import express from 'express'

import {getAllSucursales, getSucursal, updateSucursal, deleteSucursal} from '../controllers/SucursalController.js'
const router = express.Router()

router.get('/', getAllSucursales)
router.get('/:idSucursal', getSucursal)
//router.post('/', createSucursal)
router.put('/:idSucursal', updateSucursal)
router.delete('/:idSucursal', deleteSucursal)

export default router;
