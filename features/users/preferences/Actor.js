const mongoose = require('mongoose');

const Actor = new mongoose.Schema({
  actorName : {type : String, trim : true},
  actorScore : {type : Number, default : 0},
  actorTotalScore : {type : Number, default : 0},
  actorCount : {type : Number, default : 1},
  castId : {type : Number}
})

module.exports = mongoose.model("Actor", Actor);
