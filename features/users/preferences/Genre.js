const mongoose = require('mongoose');

const Genre = new mongoose.Schema({
  genreName : {type : String, trim : true},
  genreScore : {type : Number, default : 0},
  genreTotalScore : {type : Number, default : 0},
  genreCount : {type : Number, default : 1},
  genreId : {type : Number}
})

module.exports = mongoose.model("Genre", Genre);
