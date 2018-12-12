/**
 * BIBLIOGRAFIA:
 * https://zellwk.com/blog/crud-express-mongodb/
 * 
 * 
 * mongo
 * https://mlab.com/home?newDatabase=1
 * mongo ds137631.mlab.com:37631/mutantes -u <dbuser> -p <dbpassword>
 * mutante / mutante09
 * 
 * REGULAR EXPRESION
 * https://medium.com/@liran.tal/node-js-pitfalls-how-a-regex-can-bring-your-system-down-cbf1dc6c4e02
 */

const express = require('express');
const app = express();
const bodyParser= require('body-parser')
const mongoose = require('mongoose');
const Persona = require('./models/persona.model');
const controller = require('./controllers/mutants.controller');
const routes = require('./routes');


//Configuracion de parametros para servicios
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Conexion con base de datos
mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://mutante:mutante09@ds137631.mlab.com:37631/mutantes', { useNewUrlParser: true });
mongoose.connect('mongodb://localhost/mutantes', { useNewUrlParser: true });

app.listen(3500, function() {
    console.log('listening on 3500')
})




//Ruteo de servicios
const Appplication = { app, mongoose }
routes(Appplication);

module.exports = Appplication;





/* -------------------- RUTEOS -------------------- */
/*
app.get('/stats', function(req, res) {
    console.log("entrando a las estadisticas...");
    controller.stats().then(estadistica => {
        return res.status(200).send({
            ...estadistica
        });
    }).catch(errpr => {
        return res.status(403).send({
            status: 'Error!',
        });
    });
})*/


/**
 * boolean isMutant(String[] dna);
 */
/*app.route('/mutant').post(function (req, res) {
    controller.isMutant(req.body, req);
});*/
