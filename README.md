
*********************************
** Ejercicio para ingreso a ML **
** Detalle                     **
*********************************
El ejercicio fué realizado con node.js utilizando Express para exponer servicios REST. 
De base de datos se utilizó MongoDB la cual está instanciada en (https://mlab.com/databases/mutantes) para fines demostrativos del ejercicio.
Los servicios estan deployados en una instancia EC2 de Amazon



****************************
** Como correr aplicacion **
****************************
1.- pararse en el raiz del proyecto y ejecutar npm install
2.- Luego, ejecutar el comando node server.js
3.- Los servicios expuestos estarán disponibles en http://localhost:3500



*************************
** Servicios expuestos **
*************************
** Servicio que calcula si una cadena de adn es mutante o humana
http://localhost:3500/mutant
ejemplo de request: { dna: ["asdasd", "asdasda", "asdasd", "qweasd"] }

** Servicio que devuelve las estadisticas de mutantes
http://localhost:3500/stats




***********************
*** casos de prueba utilizados ***
***********************
** MUTANTE **

"ATGCGA",
"CAGTGC",
"TTATGT",
"AGAAGG",
"CCCCTA",
"TCACTG"

"ATGCGA",
"CCGTGC",
"TTATGT",
"AGAAGG",
"CCCCTA",
"TCACTG"

"ATGCGA",
"CAGTGC",
"TTGTTT",
"AGAAGT",
"GCCCTT",
"TCACTT"


** HUMANO **

"ATGCGA",
"CAGTGC",
"TTGTAT",
"AGAAGG",
"CACCTA",
"TCACTG"

"GTGCGA",
"CCGTGC",
"TTGGAT",
"AGAAAG",
"CACCTA",
"ACACTG"