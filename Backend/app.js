import express from "express";
import cors from 'cors'

import db from '../Backend/database/db.js'
import productoRoutes from './routes/Productoroutes.js'
import clienteRoutes from './routes/Clienteroutes.js'
import comentatioRoutes from './routes/Comentarioroutes.js'
import empleadoRoutes from './routes/Empleadoroutes.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/productos', productoRoutes)
app.use('/clientes',clienteRoutes)
app.use('/comentarios',comentatioRoutes)
app.use('/empleados', empleadoRoutes)


try {git
    await db.authenticate()
    console.log('Conexión exitosa a la DB')
} catch (error) {
    console.log(`El error de conexión es: ${error}`)
}

app.get('/', (req, res)=>{
    res.send('Hola Mundo')
})

app.listen (8000, ()=>{
    console.log('Server UP running in http://localhost:8000/')
})