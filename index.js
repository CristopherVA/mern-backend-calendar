require('dotenv').config();
const express = require("express");
const cors = require('cors');
const { dbConnection } = require('./db/config');
const port = process.env.PORT

const app = express();

// Conexion a la base de datos
dbConnection()

// Cors
app.use(cors())

// Directorio publico
app.use(express.static('public'))

// Lectura y parseo de body
app.use(express.json())

//Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'))

app.listen(port, () => {
    console.log(`Servidor corriendo en puerto: ${port}`)
})