const mongoose = require('mongoose');

const User = new mongoose.Schema({
  firstName : {type : String, required : true, trim : true},
  lastName : {type : String, required : true, trim : true},
  email : {type : String, trim : true},
  facebookId : {type : String, required : true, trim : true, unique : true},
  gender : {type : String, enum : ["Male", "Female"]},
  profileUrl : {type : String, trim : true},
  location : {type : String, trim : true},
  coverPhotoUrl : {type : String, trim : true},
  profilePictureUrl : {type : String, trim : true},
  initialized : {type : Boolean, default : false},
  topFive : [{
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
    videos : {type : Array},
    images : {type : Array},
    adult : {type : Boolean},
    crew : {type : Array},
    movieCast : {type : Array},
    keywords : {type : Array},
    recommendations : {type : Array},
    similar : {type : Array},
    certification : {type : String, trim : true}
  }],
  initRecommended : {type : Array},
  ratedMoviesOne : {type : Array},
  ratedMoviesTwo : {type : Array},
  ratedMoviesThree : {type : Array},
  ratedMoviesFour : {type : Array},
  ratedMoviesFive : {type : Array},
  unseenMovies : {type : Array}
})

module.exports = mongoose.model("User", User);
