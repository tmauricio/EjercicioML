
*********************************
** Ejercicio para ingreso a ML **
** Detalle                     **
*********************************
El ejercicio fué realizado con node.js utilizando Express para exponer servicios REST. 
De base de datos se utilizó MongoDB la cual está instanciada en (https://mlab.com/databases/mutantes) para fines demostrativos del ejercicio.
Los servicios estan deployados en una instancia EC2 de Amazon

******************************
** Resolucion del ejercicio **
******************************
El array de caracteres recibido se deja en una sola linea de caracteres concatenando todos sus elementos para facilitar su análisis.
La búsqueda de los patrones se hace a traves de expresiones regulares, en caso de que alguna de las expresiones concuerde se marca como mutante al usuario.
Una vez terminado el análisis se devuelve el control al usuario diciendo si es o no mutante y por detras queda corriendo la persistencia a la base de datos.
En la base de datos no solo se persiste las cadenas de adn con su resultado sino tambien que se va calculando el ratio de mutantes para que dicho valor pueda 
obtenerse rapidamente con el servicio /stats



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


IP del servidor de Amazon: http://18.223.101.59:3500




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