const mongoose = require('mongoose');

const Producer = new mongoose.Schema({
  producerName : {type : String, trim : true},
  producerScore : {type : Number, default : 0},
  producerTotalScore : {type : Number, default : 0},
  producerCount : {type : Number, default : 1},
  crewId : {type : Number}
})

module.exports = mongoose.model("Producer", Producer);
