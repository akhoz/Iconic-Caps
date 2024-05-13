import express from 'express'

import {getAllEmpleados} from '../controllers/EmpleadoController.js'


const router = express.Router()

router.get('/', getAllEmpleados)

export default router;