import express from 'express'

import {getAllEmpleados, getEmpleado, createEmpleado, updateEmpleado, deleteEmpleado} from '../controllers/EmpleadoController.js'


const router = express.Router()

router.get('/', getAllEmpleados)
router.get('/:Cedula', getEmpleado)
router.post('/', createEmpleado)
router.put('/:Cedula', updateEmpleado)
router.delete('/:Cedula', deleteEmpleado)

export default router;