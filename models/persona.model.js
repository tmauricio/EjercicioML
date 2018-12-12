const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Persona = new Schema({
  cadenaADN: {
    type: String
  },
  esMutante: {
    type: Boolean
  }
},{
    collection: 'personas'
});

module.exports = mongoose.model('Persona', Persona);
