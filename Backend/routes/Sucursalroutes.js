import express from 'express'

import {getAllSucursales} from '../controllers/SucursalController.js'
const router = express.Router()

router.get('/', getAllSucursales)

export default router;
