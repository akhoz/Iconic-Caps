import express from "express";
import cors from 'cors'

import db from "./database/db.js";
import productoRoutes from './routes/Productoroutes.js'
import clienteRoutes from './routes/Clienteroutes.js'
const app = express()

app.use(cors())
app.use(express.json())
app.use('/productos', productoRoutes)
app.use('/clientes',clienteRoutes)


try {
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