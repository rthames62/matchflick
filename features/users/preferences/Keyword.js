const mongoose = require('mongoose');

const Keyword = new mongoose.Schema({
  keywordName : {type : String, trim : true},
  keywordScore : {type : Number, default : 0},
  keywordTotalScore : {type : Number, default : 0},
  keywordCount : {type : Number, default : 1},
  keywordId : {type : Number}
})

module.exports = mongoose.model("Keyword", Keyword);
