/**
 * Autor: Tobias Mauricio
 * 
 */

const express = require('express');
const app = express();
const bodyParser= require('body-parser')
const mongoose = require('mongoose');
const routes = require('./routes');


// Configuracion de parametros para servicios
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


// Conexion con base de datos
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://mutante:mutante09@ds137631.mlab.com:37631/mutantes', { useNewUrlParser: true });
//mongoose.connect('mongodb://localhost/mutantes', { useNewUrlParser: true });


// Puerto de escucha
app.listen(3500, function() {
    console.log('listening on 3500')
})


//Ruteo de servicios
const Appplication = { app, mongoose }
routes(Appplication);
module.exports = Appplication;

