const mongoose = require('mongoose');

const Movie = new mongoose.Schema({
  movieTitle : {type : String, required : true, trim : true},
  description : {type : String, trim : true},
  popularity : {type : Number, trim : true},
  posterUrl : {type : String, trim : true},
  releaseDate : {type : String, trim : true},
  video : {type : Boolean},
  vote : {type : Number},
  voteCount : {type : Number},
  genreIds : {type : Array},
  backdropPath : {type : String, trim : true},
  omdbId : {type : Number, unique : true},
  language : {type : String, trim : true},
  homepage : {type : String, trim : true},
  imdbId : {type : String, trim : true},
  productionCompanies : {type : Array},
  revenue : {type : Number},
  runtime : {type : Number},
  status : {type : String, trim : true},
  tagline : {type : String, trim : true},
  videos : {type : Array, max : 5},
  images : {type : Array, max : 20},
  adult : {type : Boolean},
  cast : {type : Array},
  crew : {type : Array},
  keywords : {type : Array},
  recommendations : {type : Array},
  similar : {type : Array},
  certification : {type : String, trim : true}
})

module.exports = mongoose.model("Movie", Movie);
