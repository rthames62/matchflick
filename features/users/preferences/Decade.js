const mongoose = require('mongoose');

const Decade = new mongoose.Schema({
  decadeName : {type : String, trim : true},
  decadeScore : {type : Number, default : 0},
  decadeTotalScore : {type : Number, default : 0},
  decadeCount : {type : Number, default : 1}
})

module.exports = mongoose.model("Decade", Decade);
