const mongoose = require('mongoose');

const Director = new mongoose.Schema({
  directorName : {type : String, trim : true},
  directorScore : {type : Number, default : 0},
  directorTotalScore : {type : Number, default : 0},
  directorCount : {type : Number, default : 1},
  crewId : {type : Number}
})

module.exports = mongoose.model("Director", Director);
