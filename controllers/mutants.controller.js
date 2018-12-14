const secuenciasMutantes = ["AAAA", "TTTT", "CCCC", "GGGG"];
const distanciaHorizontal = 1;
const distanciaVertical = 6;
const distanciaDiagonal = 7;
const LONGITUD_PALABRA = 4; //longitud de las cadenas a buscar
var adnString = "";
const Persona = require('../models/persona.model');
const Estadistica = require('../models/estadistica.model');


module.exports = {

    /**
     * Metodo que verifica si una cadena de ADN es mutante y persiste en la BD el resultado
     */
    isMutant: (request, response) => {
        
        // Expresiones regulares para busqueda de patrones
        var expregA = /[A][A][A][A]|[A]\S\S\S\S\S\S[A]\S\S\S\S\S\S[A]\S\S\S\S\S\S[A]|[A]\S\S\S\S\S\S\S[A]\S\S\S\S\S\S\S[A]\S\S\S\S\S\S\S[A]/
        var expregT = /[T][T][T][T]|[T]\S\S\S\S\S\S[T]\S\S\S\S\S\S[T]\S\S\S\S\S\S[T]|[T]\S\S\S\S\S\S\S[T]\S\S\S\S\S\S\S[T]\S\S\S\S\S\S\S[T]/
        var expregC = /[C][C][C][C]|[C]\S\S\S\S\S\S[C]\S\S\S\S\S\S[C]\S\S\S\S\S\S[C]|[C]\S\S\S\S\S\S\S[C]\S\S\S\S\S\S\S[C]\S\S\S\S\S\S\S[C]/
        var expregG = /[G][G][G][G]|[G]\S\S\S\S\S\S[G]\S\S\S\S\S\S[G]\S\S\S\S\S\S[G]|[G]\S\S\S\S\S\S\S[G]\S\S\S\S\S\S\S[G]\S\S\S\S\S\S\S[G]/;
        var result = false;
        var adnString = ""; //Matris de adn pasada a un String
        
        if (request.body.dna) {
            //Unifico matriz en un string
            request.body.dna.forEach(fila => {
                adnString += fila+'-';
            });
            
            //Verifico si existe algun patrón en la cadena de adn
            var resultadosA = adnString.match( expregA );
            var resultadosT = adnString.match( expregT );
            var resultadosC = adnString.match( expregC );
            var resultadosG = adnString.match( expregG );
            if (resultadosA || resultadosT || resultadosC || resultadosG) {
                result = true;
            }
        }

        // Persisto en DB el resultado asincrónicamente
        module.exports.persistirPersona(adnString, result);
        
        if (result == true) {
            response.status(200).send({
                status: 'Es Mutante',
            });
        } else {
            response.status(403).send({
                status: 'Es Humano',
            });
        }
    },


    
    /**
     * Persiste el resultado del analisis en la base de datos, uno por cada mutante
     */
    persistirPersona: (adn, esMutante) => {
        //Genera un registro nuevo solo si la cadena de adn no existe en la base de datos
        return Persona.findOneAndUpdate({cadenaADN: adn}, {cadenaADN: adn, esMutante: esMutante}, { upsert: true }).then(() => {
            console.log("OK", "Persona persistida");

            // Calculo y persisto las estadisticas
            module.exports.actualizarEstadistica();
        }).catch(err => {
            console.log(err);
            console.log("ERROR", "Persistiendo la persona");
        });

        
    },


    /**
     * Metodo que calcula y persiste las estadisticas
     */
    actualizarEstadistica() {
        // Cuento mutantes
        Persona.countDocuments({esMutante: true}).then(cantM => {
            // Cuento humanos
            Persona.countDocuments({esMutante: false}).then(cantH => {
                
                // Busco estadisticas previas
                Estadistica.find({}).then( estadisticas => {
                    //Calculo Ratio
                    var ratioCalculado = 0;
                    if (cantM > 0) {
                        ratioCalculado = cantM * 100 / (cantM + cantH);
                    }

                    if (estadisticas != null && estadisticas.length > 0) {
                        var estadistica = estadisticas[0];
                        estadistica.cantidadMutantes = cantM;
                        estadistica.cantidadHumanos = cantH;
                        estadistica.ratio = ratioCalculado;
                        
                        //Persisto estadisticas calculadas
                        Estadistica.update(estadistica).then(estadistica => {
                            console.log("OK", "Estadistica persistida");
                        }).catch(err => {
                        console.log("ERROR", "Persistiendo las estadisticas");
                        });
                    } else {
                        const estadistica = new Estadistica({ cantidadMutantes: cantM, cantidadHumanos: cantH, ratio: ratioCalculado });
                        //Persisto estadisticas calculadas                        
                        estadistica.save().then(estadistica => {
                            console.log("OK", "Estadistica persistida");
                        }).catch(err => {
                        console.log("ERROR", "Persistiendo las estadisticas");
                        });
                    }
                });
            });
        });

        
    },

    /**
     * Metodo que busca en la base de datos las estadisticas
     */
    stats: (request, response) => {
        return Estadistica.find().then((estadisticas) => {
            if (estadisticas) {
                response.status(200).send({
                    count_mutant_dna: estadisticas[0].cantidadMutantes,
                    count_human_dna: estadisticas[0].cantidadHumanos,
                    ratio: estadisticas[0].ratio
                });
            } else {
                response.status(403).send(
                    "Se produjo un error al obtener las estadisticas."
                );
            }
        }).catch(err => {
            return response.status(403).send(
                "Se produjo un error al obtener las estadisticas."
            );
        });
    }
}