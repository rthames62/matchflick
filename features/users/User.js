const mongoose = require('mongoose');
const Movie = require('../movies/Movie.js');

const Genre = new mongoose.Schema({
  genreName : {type : String, unique : true, trim : true},
  genreScore : {type : Number, default : 0},
  genreCount : {type : Number, default : 1},
  genreId : {type : Number, unique : true}
})

const LeadActor = new mongoose.Schema({
  leadActorName : {type : String, unique : true, trim : true},
  leadActorScore : {type : Number, default : 0},
  leadActorCount : {type : Number, default : 1},
  castId : {type : Number, unique : true}
})

const Director = new mongoose.Schema({
  directorName : {type : String, unique : true, trim : true},
  directorScore : {type : Number, default : 0},
  directorCount : {type : Number, default : 1},
  crewId : {type : Number, unique : true}
})

const Producer = new mongoose.Schema({
  producerName : {type : String, unique : true, trim : true},
  producerScore : {type : Number, default : 0},
  producerCount : {type : Number, default : 1},
  crewId : {type : Number, unique : true}
})

const Writer = new mongoose.Schema({
  writerName : {type : String, unique : true, trim : true},
  writerScore : {type : Number, default : 0},
  writerCount : {type : Number, default : 1},
  crewId : {type : Number, unique : true}
})

const Keyword = new mongoose.Schema({
  keywordName : {type : String, unique : true, trim : true},
  keywordScore : {type : Number, default : 0},
  keywordCount : {type : Number, default : 1},
  keywordId : {type : Number, unique : true}
})

const Decade = new mongoose.Schema({
  decadeName : {type : String, unique : true, trim : true},
  decadeScore : {type : Number, default : 0},
  decadeCount : {type : Number, default : 1}
})

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
  // topFive : [{type : mongoose.Schema.Types.ObjectId, ref : "Movie"}],
  initRecommended : [{type : mongoose.Schema.Types.ObjectId, ref : "Movie"}],
  ratedMoviesOne : [{type : mongoose.Schema.Types.ObjectId, ref : "Movie"}],
  ratedMoviesTwo : [{type : mongoose.Schema.Types.ObjectId, ref : "Movie"}],
  ratedMoviesThree : [{type : mongoose.Schema.Types.ObjectId, ref : "Movie"}],
  ratedMoviesFour : [{type : mongoose.Schema.Types.ObjectId, ref : "Movie"}],
  ratedMoviesFive : [{type : mongoose.Schema.Types.ObjectId, ref : "Movie"}],
  unseenMovies : [{type : mongoose.Schema.Types.ObjectId, ref : "Movie"}],
  watchlist : [{type : mongoose.Schema.Types.ObjectId, ref : "Movie"}],
  preferences : {
      genres : [Genre],
      leadActors : [LeadActor],
      directors : [Director],
      producers : [Producer],
      writers : [Writer],
      keywords : [Keyword],
      decades : [Decade]
  }
})

module.exports = mongoose.model("User", User);
