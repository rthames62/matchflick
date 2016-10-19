const mongoose = require('mongoose');

const Writer = new mongoose.Schema({
  writerName : {type : String, trim : true},
  writerScore : {type : Number, default : 0},
  writerTotalScore : {type : Number, default : 0},
  writerCount : {type : Number, default : 1},
  crewId : {type : Number}
})

module.exports = mongoose.model("Writer", Writer);
