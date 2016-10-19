const mongoose = require('mongoose');
const Movie = require('../movies/Movie.js');
// const Actor = require('./preferences/Actor.js');
// const Decade = require('./preferences/Decade.js');
// const Director = require('./preferences/Director.js');
// const Genre = require('./preferences/Genre.js');
// const Keyword = require('./preferences/Keyword.js');
// const Producer = require('./preferences/Producer.js');
// const Writer = require('./preferences/Writer.js');

const Actor = new mongoose.Schema({
  actorName : {type : String, trim : true},
  actorScore : {type : Number, default : 0},
  actorTotalScore : {type : Number, default : 0},
  actorCount : {type : Number, default : 1},
  castId : {type : Number}
})

const Decade = new mongoose.Schema({
  decadeName : {type : String, trim : true},
  decadeScore : {type : Number, default : 0},
  decadeTotalScore : {type : Number, default : 0},
  decadeCount : {type : Number, default : 1}
})

const Director = new mongoose.Schema({
  directorName : {type : String, trim : true},
  directorScore : {type : Number, default : 0},
  directorTotalScore : {type : Number, default : 0},
  directorCount : {type : Number, default : 1},
  crewId : {type : Number}
})

const Genre = new mongoose.Schema({
  genreName : {type : String, trim : true},
  genreScore : {type : Number, default : 0},
  genreTotalScore : {type : Number, default : 0},
  genreCount : {type : Number, default : 1},
  genreId : {type : Number}
})

const Keyword = new mongoose.Schema({
  keywordName : {type : String, trim : true},
  keywordScore : {type : Number, default : 0},
  keywordTotalScore : {type : Number, default : 0},
  keywordCount : {type : Number, default : 1},
  keywordId : {type : Number}
})

const Producer = new mongoose.Schema({
  producerName : {type : String, trim : true},
  producerScore : {type : Number, default : 0},
  producerTotalScore : {type : Number, default : 0},
  producerCount : {type : Number, default : 1},
  crewId : {type : Number}
})

const Writer = new mongoose.Schema({
  writerName : {type : String, trim : true},
  writerScore : {type : Number, default : 0},
  writerTotalScore : {type : Number, default : 0},
  writerCount : {type : Number, default : 1},
  crewId : {type : Number}
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
  matchQueue : [{type : mongoose.Schema.Types.ObjectId, ref : "Movie"}],
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
      actors : {
        num : [Actor],
        a : [Actor],
        b : [Actor],
        c : [Actor],
        d : [Actor],
        e : [Actor],
        f : [Actor],
        g : [Actor],
        h : [Actor],
        i : [Actor],
        j : [Actor],
        k : [Actor],
        l : [Actor],
        m : [Actor],
        n : [Actor],
        o : [Actor],
        p : [Actor],
        q : [Actor],
        r : [Actor],
        s : [Actor],
        t : [Actor],
        u : [Actor],
        v : [Actor],
        w : [Actor],
        x : [Actor],
        y : [Actor],
        z : [Actor]
      },
      directors : {
        num : [Director],
        a : [Director],
        b : [Director],
        c : [Director],
        d : [Director],
        e : [Director],
        f : [Director],
        g : [Director],
        h : [Director],
        i : [Director],
        j : [Director],
        k : [Director],
        l : [Director],
        m : [Director],
        n : [Director],
        o : [Director],
        p : [Director],
        q : [Director],
        r : [Director],
        s : [Director],
        t : [Director],
        u : [Director],
        v : [Director],
        w : [Director],
        x : [Director],
        y : [Director],
        z : [Director]
      },
      producers : {
        num : [Producer],
        a : [Producer],
        b : [Producer],
        c : [Producer],
        d : [Producer],
        e : [Producer],
        f : [Producer],
        g : [Producer],
        h : [Producer],
        i : [Producer],
        j : [Producer],
        k : [Producer],
        l : [Producer],
        m : [Producer],
        n : [Producer],
        o : [Producer],
        p : [Producer],
        q : [Producer],
        r : [Producer],
        s : [Producer],
        t : [Producer],
        u : [Producer],
        v : [Producer],
        w : [Producer],
        x : [Producer],
        y : [Producer],
        z : [Producer]
      },
      writers : {
        num : [Writer],
        a : [Writer],
        b : [Writer],
        c : [Writer],
        d : [Writer],
        e : [Writer],
        f : [Writer],
        g : [Writer],
        h : [Writer],
        i : [Writer],
        j : [Writer],
        k : [Writer],
        l : [Writer],
        m : [Writer],
        n : [Writer],
        o : [Writer],
        p : [Writer],
        q : [Writer],
        r : [Writer],
        s : [Writer],
        t : [Writer],
        u : [Writer],
        v : [Writer],
        w : [Writer],
        x : [Writer],
        y : [Writer],
        z : [Writer]
      },
      keywords : {
        num : [Keyword],
        a : [Keyword],
        b : [Keyword],
        c : [Keyword],
        d : [Keyword],
        e : [Keyword],
        f : [Keyword],
        g : [Keyword],
        h : [Keyword],
        i : [Keyword],
        j : [Keyword],
        k : [Keyword],
        l : [Keyword],
        m : [Keyword],
        n : [Keyword],
        o : [Keyword],
        p : [Keyword],
        q : [Keyword],
        r : [Keyword],
        s : [Keyword],
        t : [Keyword],
        u : [Keyword],
        v : [Keyword],
        w : [Keyword],
        x : [Keyword],
        y : [Keyword],
        z : [Keyword]
      },
      decades : [Decade]
  }
})

module.exports = mongoose.model("User", User);
