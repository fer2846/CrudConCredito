const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const myconn = require('express-myconnection');

const routes = require('./routes')


const app = express();
app.set('port', process.env.PORT || 9000);

//Opciones de conexion mysql
const dbOptions = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'admin',
    database: 'prospectos'
}

//Middlewares
app.use(cors())
app.use(myconn(mysql,dbOptions,'single'))
app.use(express.json())


//Rutas principales
app.get('/',(req,resp)=>{
    resp.send('Prueba1');
})

app.use('/prospectos', routes)


//Servidor escuchando
app.listen(app.get('port'), ()=>{
    console.log('Server running on port', app.get('port'))
})