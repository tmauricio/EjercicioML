const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Estadistica = new Schema({
  cantidadMutantes: {
    type: Number
  },
  cantidadHumanos: {
    type: Number
  }, 
  ratio: {
    type: Number
  }
},{
    collection: 'estadisticas'
});

module.exports = mongoose.model('Estadistica', Estadistica);
