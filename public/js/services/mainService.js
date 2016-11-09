// import initMatchQueue from "./recMovies.js";
function mainService($http, $location, $timeout, $q){
  let currentUser = {};
  let currentUserFbId = "";
  let topFive = [];
  let myThis = this;
  myThis.done = 0;
  myThis.userLoaded = [];
  let recommendMoviesForMatch = [];
  let initCounter = 0;
  myThis.initCounter = 0;
  myThis.myRecMoviesByGenre = [];
  let indexToRemoveXXX = [];
  let currentMovie;
  let tempDiscover = [];
  let currentTopActors = [];
  let currentTopGenres = [];
  let currentTopDirectors = [];
  let currentTopProducers = [];
  let currentTopWriters = [];
  let currentTopKeywords = [];
  let action80s = [218, 941, 85, 562, 106];
  let action90s = [36955, 1701, 754, 710, 9772];
  let action00s = [155, 98, 2501, 180, 8681, 1858];
  let action10s = [76341, 137113, 1771, 118340];
  let comedy80s = [620, 9377, 2108, 11977, 90];
  let comedy90s = [8467, 1542, 3049, 816, 9614];
  let comedy00s = [8699, 9522, 9398, 134, 8363];
  let comedy10s = [27581, 109414, 22538, 55721, 41733];
  let drama80s = [235, 601, 207, 88, 2323];
  let drama90s = [278, 13, 857, 597, 275];
  let drama00s = [7345, 1422, 12405, 8358, 70];
  let drama10s = [37799, 68734, 210577, 85350, 76203];
  let adventure80s = [9340, 2493, 105];
  let adventure90s = [329, 8844, 564, 197];
  let adventure00s = [19995, 674, 22];
  let adventure10s = [27205, 87827, 36657, 116745];
  let scifi80s = [11, 348];
  let scifi90s = [602, 607, 18];
  let scifi00s = [17654, 16320, 13475, 6479, 2675];
  let scifi10s = [120, 24428, 37686, 20504, 277];
  const omdbUrl = "https://api.themoviedb.org/3/"
  const omdbKey = "550&api_key=be7c9a53bfd40a5a3d9aa3c4cf99b5c9";

  this.getFbCurrentUser = function(){
    return $http.get("/api/facebook").then(function(response){
      let results = response.data;
      $http.get(`/api/users/fb/${results.id}`).then(function(userResponse){
        if(userResponse.data.length > 0){
          currentUser = userResponse.data[0];
          myThis.currentUser = currentUser;
          myThis.initCounter = currentUser.ratedMoviesOne.length + currentUser.ratedMoviesTwo.length + currentUser.ratedMoviesThree.length + currentUser.ratedMoviesFour.length + currentUser.ratedMoviesFive.length;
          myThis.userLoaded.push("lets go");
        } else {
          console.log("new user");
            currentUser = {
              firstName : results._json.first_name,
              lastName : results._json.last_name,
              email : results._json.email,
              facebookId : results.id,
              profileUrl : results.profileUrl,
              location : results._json.location,
              coverPhotoUrl : results._json.cover.source,
              profilePictureUrl : results._json.picture.data.url,
              topFive : [],
              initRecommended : [],
              matchQueue : shuffleArray(initMatchQueue),
              ratedMoviesOne : [],
              ratedMoviesTwo : [],
              ratedMoviesThree : [],
              ratedMoviesFour : [],
              ratedMoviesFive : [],
              unseenMovies : [],
              watchlist : [],
              preferences : []
            };
            console.log("1");
            currentUserFbId = results.id;
            console.log("2");
            postCurrentUser(currentUser);
            console.log("3");
          }
      })
      return response.data;
    })
  }

  this.addToTopFive = function(obj) {
    let dfd = $q.defer();
    let addedMovie;
    return $http.get(`${omdbUrl}movie/${obj.id}?${omdbKey}&append_to_response=videos,images,credits,recommendations,keywords,similar,release_dates`)
    .then(function(response) {
        let results = response.data;
        let movieObj = {
          movieTitle : results.title,
          description : results.overview,
          popularity : results.popularity,
          posterUrl : `http://image.tmdb.org/t/p/w500/${results.poster_path}`,
          releaseDate : formatDate(results.release_date),
          video : results.video,
          vote : results.vote_average,
          voteCount : results.vote_count,
          genreIds : results.genres,
          backdropPath : `http://image.tmdb.org/t/p/w500/${results.backdrop_path}`,
          omdbId : results.id,
          language : results.original_language,
          homepage : results.homepage,
          imdbId : results.imdb_id,
          productionCompanies : results.production_companies,
          revenue : results.revenue,
          runtime : results.runtime,
          status : results.status,
          tagline : results.tagline,
          videos : results.videos.results,
          images : results.images.backdrops,
          adult : results.adult,
          crew : results.credits.crew,
          movieCast : results.credits.cast,
          keywords : results.keywords.keywords,
          recommendations : results.recommendations.results,
          similar : results.similar.results,
          certification : getCertification(results.release_dates.results)
        }
        if(movieObj.crew.length < 3) {
          movieObj.crew = movieObj.crew[0];
        }
        movieObj.crew.forEach(function(y){
          if(!y.profile_path){
            y.profile_path = "http://159.203.169.243/images/no-picture.png"
          } else {
            y.profile_path = `http://image.tmdb.org/t/p/w500/${y.profile_path}`
          }
        })
        movieObj.movieCast.forEach(function(y){
          // console.log(y.profile_path);
          if(!y.profile_path){
            // console.log("no picture");
            y.profile_path = "http://159.203.169.243/images/no-picture.png"
          } else {
            // console.log("replacing picture");
            y.profile_path = `http://image.tmdb.org/t/p/w500/${y.profile_path}`
          }
        })
        if(currentUser.topFive.length < 5){
            // postMovieToDB(movieObj);
            $http.post("/api/movies", movieObj).then(function(response){
              let addedMovie = response.data;
              currentUser.topFive.push(addedMovie);
              topFive = currentUser.topFive;
              $http.post(`/api/user/${currentUser._id}/topFive`, addedMovie);

              dfd.resolve(topFive);
            });
            // currentUser.topFive.push(addedMovie);
            // topFive = currentUser.topFive;
            // $http.post(`/api/user/${currentUser._id}/topFive`, addedMovie);
        }
        postGenrePref(movieObj, 3);
        postActorPref(movieObj, 3);
        postDirectorPref(movieObj, 3);
        postProducerPref(movieObj, 3);
        postWriterPref(movieObj, 3);
        postKeywordPref(movieObj, 3);
        // postDecadePref(movieObj, 3);
          // console.log("chicken", topFive);
          // return topFive;
          return dfd.promise;
    })
  }

  this.postInitRec = function(){
    let dfd = $q.defer();
    let movieIds = recommendMovieForInitMatch();
    movieIds.push(action80s, action90s, action00s, action10s, comedy80s, comedy90s, comedy00s, comedy10s, drama80s, drama90s, drama00s, drama10s, adventure80s, adventure90s, adventure00s, adventure10s, scifi80s, scifi90s, scifi00s, scifi10s);
    movieIds = flattenArr(movieIds)
    let topFiveIds = getTopFiveIds(currentUser.topFive);
    movieIds = findDuplicates(movieIds, topFiveIds);
    movieIds = removeDuplicates(movieIds);
    movieIds = shuffleArray(movieIds);
    let recommendMoviesArr = [];

    let someMovies = movieIds.slice(0, 60);

    currentUser.initRecommended = [];
    someMovies.forEach(function(x, i){
      if(x !== currentUser.topFive.omdbId){
        $http.get(`${omdbUrl}movie/${x}?${omdbKey}&append_to_response=videos,images,credits,recommendations,keywords,similar,release_dates`).then(function(response2){
          let results = response2.data;
          let movieObj = {
            movieTitle : results.title,
            description : results.overview,
            popularity : results.popularity,
            posterUrl : `http://image.tmdb.org/t/p/w500/${results.poster_path}`,
            releaseDate : formatDate(results.release_date),
            video : results.video,
            vote : results.vote_average,
            voteCount : results.vote_count,
            genreIds : results.genres,
            backdropPath : `http://image.tmdb.org/t/p/w500/${results.backdrop_path}`,
            omdbId : results.id,
            language : results.original_language,
            homepage : results.homepage,
            imdbId : results.imdb_id,
            productionCompanies : results.production_companies,
            revenue : results.revenue,
            runtime : results.runtime,
            status : results.status,
            tagline : results.tagline,
            videos : results.videos.results,
            images : results.images.backdrops,
            adult : results.adult,
            crew : results.credits.crew,
            movieCast : results.credits.cast,
            keywords : results.keywords.keywords,
            recommendations : results.recommendations.results,
            similar : results.similar.results,
            certification : getCertification(results.release_dates.results)
          }
          if(movieObj.crew.length < 3) {
            movieObj.crew = movieObj.crew[0];
          }
          movieObj.crew.forEach(function(y){
            if(!y.profile_path){
              y.profile_path = "http://159.203.169.243/images/no-picture.png"
            } else {
              y.profile_path = `http://image.tmdb.org/t/p/w500/${y.profile_path}`
            }
          })
          movieObj.movieCast.forEach(function(y){
            // console.log(y.profile_path);
            if(!y.profile_path){
              // console.log("no picture");
              y.profile_path = "http://159.203.169.243/images/no-picture.png"
            } else {
              // console.log("replacing picture");
              y.profile_path = `http://image.tmdb.org/t/p/w500/${y.profile_path}`
            }
          })
          // currentUser.initRecommended.push(movieObj);
          $http.post("/api/movies", movieObj).then(function(response){
            currentUser.initRecommended.push(response.data);
            $http.post(`/api/user/${currentUser._id}/initRec`, {_id : response.data._id});
            myThis.recommendMoviesForMatch = currentUser.initRecommended;
          });
          dfd.resolve(myThis.recommendMoviesForMatch)
          // console.log("rec movies arr", myThis.recommendMoviesForMatch);
        })
      } else {
      }
    })
    // console.log("rec movies arr", myThis.recommendMoviesForMatch);
    return dfd.promise;
  }

  this.removeFromTopFive = function(obj){
    $http.put(`/api/user/${currentUser._id}/topFive`, obj);
    currentUser.topFive.map(function(x, i){
      if(x.omdbId === obj.omdbId){
        currentUser.topFive.splice(i, 1);
      }
    })
    return currentUser.topFive;
  }

  this.getTopFive = function(){
      this.topFive = [];
      if(currentUser.topFive.length > 0){
        this.topFive = currentUser.topFive;
      }
      return this.topFive;
  }

  this.getInitRecommendedArr = function(){
    let initRecArr = [];
    if(currentUser.initRecommended){
      initRecArr = currentUser.initRecommended;
    }
    return initRecArr;
  }

  this.queryFavMovies = function(query){
    return $http.get(`${omdbUrl}search/movie?${omdbKey}&language=en-US&query=${query}`).then(function(response){
      let results = response.data.results;
      let resultsArr = [];
      results.forEach(function(x, i){
        if(x.poster_path){
          x.poster_path = `http://image.tmdb.org/t/p/w500/${x.poster_path}`;
          resultsArr.push(x);
        }
      })
      return resultsArr;
    })
  }

  this.loading = function(){
      if(currentUser.initialized === false && currentUser.topFive.length === 5){
        $location.path("/getting-started/match")
      } else if(currentUser.initialized === false && currentUser.topFive.length > 0){
        $location.path("/getting-started/favorites")
      } else if(currentUser.initialized === false){
        $location.path("/getting-started")
      } else {
        $location.path("/dashboard")
      }
  }

  this.reachFive = function(arr){
    if(arr.length === 5){
      return false;
    } else {
      return true;
    }
  }

  this.getRecommendedMovieForInitMatch = function(){
    if(Object.keys(currentUser).length > 0) {
      initCounter = currentUser.ratedMoviesOne.length + currentUser.ratedMoviesTwo.length + currentUser.ratedMoviesThree.length + currentUser.ratedMoviesFour.length + currentUser.ratedMoviesFive.length;
      let toTwenty = currentUser.ratedMoviesOne.length + currentUser.ratedMoviesTwo.length + currentUser.ratedMoviesThree.length + currentUser.ratedMoviesFour.length + currentUser.ratedMoviesFive.length;

      myThis.initCounter = initCounter;

      if(toTwenty < 20 && initCounter < 100){
        currentMovie = currentUser.initRecommended[initCounter];
        return currentMovie;
      } else {
        myThis.initLoading = true;
        currentUser.initialized = true;
        $http.put(`/api/user/${currentUser._id}`, {initialized : true});
        $location.path("/getting-started/congratulations")
      }
    }
  }

  this.discoverForMatch = function(){
    for (var i = 0; i < 50; i++) {
      $http.get(`${omdbUrl}discover/movie?${omdbKey}&sort_by=popularity.desc&include_adult=false&include_video=true&page=${i}&with_genres=9648`).then(function(response){
        response.data.results.forEach(function(x){
          tempDiscover.push(x.id);
        })
      });
    }
  }

  this.getMoviesFromDiscover = function(){
      for (var i = 0; i < 40; i++) {
      $http.get(`${omdbUrl}movie/${tempDiscover[i]}?${omdbKey}&append_to_response=videos,images,credits,recommendations,keywords,similar,release_dates`).then(function(response2){
        let results = response2.data;
        // console.log(results);
        let movieObj = {
          movieTitle : results.title,
          description : results.overview,
          popularity : results.popularity,
          posterUrl : `http://image.tmdb.org/t/p/w500/${results.poster_path}`,
          releaseDate : formatDate(results.release_date),
          video : results.video,
          vote : results.vote_average,
          voteCount : results.vote_count,
          genreIds : results.genres,
          backdropPath : `http://image.tmdb.org/t/p/w500/${results.backdrop_path}`,
          omdbId : results.id,
          language : results.original_language,
          homepage : results.homepage,
          imdbId : results.imdb_id,
          productionCompanies : results.production_companies,
          revenue : results.revenue,
          runtime : results.runtime,
          status : results.status,
          tagline : results.tagline,
          videos : results.videos.results,
          images : results.images.backdrops,
          adult : results.adult,
          crew : results.credits.crew,
          movieCast : results.credits.cast,
          keywords : results.keywords.keywords,
          recommendations : results.recommendations.results,
          similar : results.similar.results,
          certification : getCertification(results.release_dates.results)
        }
        if(movieObj.crew.length < 3) {
          movieObj.crew = movieObj.crew[0];
        }
        movieObj.crew.forEach(function(y){
          if(!y.profile_path){
            y.profile_path = "http://159.203.169.243/images/no-picture.png"
          } else {
            y.profile_path = `http://image.tmdb.org/t/p/w500/${y.profile_path}`
          }
        })
        movieObj.movieCast.forEach(function(y){
          // console.log(y.profile_path);
          if(!y.profile_path){
            // console.log("no picture");
            y.profile_path = "http://159.203.169.243/images/no-picture.png"
          } else {
            // console.log("replacing picture");
            y.profile_path = `http://image.tmdb.org/t/p/w500/${y.profile_path}`
          }
        })
        // currentUser.initRecommended.push(movieObj);
        $http.post("/api/movies", movieObj).then(function(response){
          currentUser.matchQueue.push(response.data._id);
          $http.post(`/api/user/${currentUser._id}/matchQueue`, {_id : response.data._id});
          tempDiscover.splice(0, 1);
        });
      })
    }
  }

  this.getInitMatchQueue = function(){
    return $http.get(`/api/movies/${currentUser.matchQueue[0]}`).then(function(response){
      return response.data;
    })
  }



  this.addToRatedOne = function(obj){
    currentUser.ratedMoviesOne.push(obj);
    $http.post(`/api/user/${currentUser._id}/ratedOne`, {_id : obj._id});
    postGenrePref(obj, -2);
    postActorPref(obj, -2);
    postDirectorPref(obj, -2);
    postProducerPref(obj, -2);
    postWriterPref(obj, -2);
    postKeywordPref(obj, -2);
    // postDecadePref(obj, -2);
  }

  this.addToRatedTwo = function(obj){
    currentUser.ratedMoviesTwo.push(obj);
    $http.post(`/api/user/${currentUser._id}/ratedTwo`, {_id : obj._id});
    postGenrePref(obj, -1);
    postActorPref(obj, -1);
    postDirectorPref(obj, -1);
    postProducerPref(obj, -1);
    postWriterPref(obj, -1);
    postKeywordPref(obj, -1);
    // postDecadePref(obj, -1);
  }

  this.addToRatedThree = function(obj){
    currentUser.ratedMoviesThree.push(obj);
    $http.post(`/api/user/${currentUser._id}/ratedThree`, {_id : obj._id});
    postGenrePref(obj, 1);
    postActorPref(obj, 1);
    postDirectorPref(obj, 1);
    postProducerPref(obj, 1);
    postWriterPref(obj, 1);
    postKeywordPref(obj, 1);
    // postDecadePref(obj, 1);
  }

  this.addToRatedFour = function(obj){
    currentUser.ratedMoviesFour.push(obj);
    $http.post(`/api/user/${currentUser._id}/ratedFour`, {_id : obj._id});
    postGenrePref(obj, 2);
    postActorPref(obj, 2);
    postDirectorPref(obj, 2);
    postProducerPref(obj, 2);
    postWriterPref(obj, 2);
    postKeywordPref(obj, 2);
    // postDecadePref(obj, 2);
  }

  this.addToRatedFive = function(obj){
    currentUser.ratedMoviesFive.push(obj);
    $http.post(`/api/user/${currentUser._id}/ratedFive`, {_id : obj._id});
    postGenrePref(obj, 3);
    postActorPref(obj, 3);
    postDirectorPref(obj, 3);
    postProducerPref(obj, 3);
    postWriterPref(obj, 3);
    postKeywordPref(obj, 3);
    // postDecadePref(obj, 3);
    myThis.done = 1;
    return myThis.done;
  }

  this.addToUnseen = function(obj){
    currentUser.unseenMovies.push(obj);
    $http.post(`/api/user/${currentUser._id}/unseenMovies`, {_id : obj._id});
  }

  this.addToWatchlist = function(obj){
    currentUser.watchlist.push(obj);
    $http.post(`/api/user/${currentUser._id}/watchlist`, {_id : obj._id});
  }

  this.getUserGenrePrefs = function(){
    return $http.get(`/api/user/${currentUser._id}/genrePref`).then(function(response){
      currentTopGenres = response.data;
      return response.data;
    })
  }

  this.getUserActorPrefs = function(){
    return $http.get(`/api/user/${currentUser._id}/actorPref`).then(function(response){
      currentTopActors = response.data;
      return response.data;
    })
  }

  this.getUserDirectorPrefs = function(){
    return $http.get(`/api/user/${currentUser._id}/directorPref`).then(function(response){
      currentTopDirectors = response.data;
      return response.data;
    })
  }

  this.getUserProducerPrefs = function(){
    return $http.get(`/api/user/${currentUser._id}/producerPref`).then(function(response){
      currentTopProducers = response.data;
      return response.data;
    })
  }

  this.getUserWriterPrefs = function(){
    return $http.get(`/api/user/${currentUser._id}/writerPref`).then(function(response){
      currentTopWriters = response.data;
      return response.data;
    })
  }

  this.getUserKeywordPrefs = function(){
    return $http.get(`/api/user/${currentUser._id}/keywordPref`).then(function(response){
      currentTopKeywords = response.data;
      return response.data;
    })
  }

  this.getUserDecadePrefs = function(){
    return $http.get(`/api/user/${currentUser._id}/decadePref`).then(function(response){
      return response.data;
    })
  }

  this.getCurrentPage = function(){
      myThis.currentPage = $location.path();
      return myThis.currentPage;
  }

  this.removeFromMatchQueue = function(mId){
    currentUser.matchQueue.splice(0,1);
    $http.put(`/api/user/${currentUser._id}/matchQueue`, {_id : mId});
  }

  this.getRatedFive = function(){
    return currentUser.ratedMoviesFive;
  }

  this.getRatedFour = function(){
    return currentUser.ratedMoviesFour;
  }

  this.getRatedThree = function(){
    return currentUser.ratedMoviesThree;
  }

  this.getWatchlist = function(){
    return currentUser.watchlist;
  }

  this.removePorn = function(){
    let myArr = initMatchQueue;

    myArr.forEach(function(x){
      $http.get(`/api/movies/${x}`).then(function(response){
        // console.log(`/api/movies/${x}`);
        if(response.data.popularity < 1){
          $http.put(`/api/user/${currentUser._id}/matchQueue`, {_id : x})
        }
      })
    })
  }

  this.getRecommendationsByGenre = function(arr){
    let promises = [];
    let unseen = [];


    arr.forEach(function(x){
      promises.push(getByGenre(x));
    })


        // return $http.get(`/api/genres?id=${arr[0]}`)

    return $q.all(promises).then(function(response){
      let moviePromises = [];
      let allMovies = [];
      let rankedMovies = [];
      let seenMovies = [];
      let remove;

      seenMovies.push(currentUser.ratedMoviesFive, currentUser.ratedMoviesFour, currentUser.ratedMoviesThree, currentUser.ratedMoviesTwo, currentUser.ratedMoviesOne, currentUser.topFive);

      response.forEach(function(x){
        allMovies.push(x);
      })
      allMovies = flattenArr(allMovies);
      seenMovies = flattenArr(seenMovies);
      allMovies = sortByScore(allMovies, "omdbId")
      seenMovies = sortByScore(seenMovies, "omdbId")

      for (var i = 0; i < seenMovies.length; i++) {
        searchDuplicates(0, allMovies.length - 1, allMovies, seenMovies[i].omdbId, "omdbId");
      }

      for (var i = indexToRemoveXXX.length - 1; i >= 0 ; i--) {
        allMovies.splice(indexToRemoveXXX[i], 1);
      }

      let someMovies = allMovies.slice(0, 50);
      allMovies.forEach(function(x){
        rankedMovies.push(compareToPreferences(x));
      })

      rankedMovies = sortByScore(rankedMovies, "totalScore").reverse();

      console.log("ranked movies", rankedMovies);


      rankedMovies.forEach(function(x){
        moviePromises.push(getMovieByMid(x.mId));
      })

      return $q.all(moviePromises).then(function(response){
        let finalMovies = [];

        response.forEach(function(x){
          finalMovies.push(x.data);
        })
        myThis.myRecMoviesByGenre = finalMovies;
        $location.path("/recommendations")
        return finalMovies;
      })
    })
  }

  this.removeFromRecommended = function(id){

  }

// **********************************************************
//  HELPER FUNCTIONS
// **********************************************************


  function getMovieByMid(id){
    return $http.get(`/api/movies/${id}`);
  }

  function searchDuplicates(low, high, arr, value, key){
    let mid = Math.floor((low + high) / 2);

    if(high < low){
      return;
    }
    if(arr[mid][key] === value){
      indexToRemoveXXX.push(mid);
      return;
    } else if(value < arr[mid][key]){
      searchDuplicates(low, mid - 1, arr, value, key);
    } else {
      searchDuplicates(mid + 1, high, arr, value, key)
    }
  }

  function compareToPreferences(obj){
    let score = {
      mId : obj._id,
      movieName : obj.movieTitle,
      genres : obj.genreIds,
      posterUrl : obj.posterUrl,
      totalScore : 0,
      actorScore : 0,
      keywordScore : 0,
      directorScore : 0,
      producerScore : 0,
      writerScore : 0
    };
    for (let i = 0; i < obj.movieCast.length; i++) {
      let actorName = obj.movieCast[i].name;
      let actorFirstLetter = actorName.slice(0, 1);
      let compareTo = currentUser.preferences.actors[actorFirstLetter.toLowerCase()];

      if(compareTo){
        for (let j = 0; j < compareTo.length; j++) {
          if(actorName === compareTo[j].actorName){
            if(compareTo[j].actorCount === 1){
              console.log("name", actorName);
              console.log("score", compareTo[j].actorTotalScore);
              score.actorScore += compareTo[j].actorTotalScore;
            } else {
              score.actorScore += compareTo[j].actorScore;
            }
            break;
          }
        }
      }
    }

    for (let i = 0; i < obj.keywords.length; i++) {
      let name = obj.keywords[i].name;
      let firstLetter = name.slice(0, 1);
      let compareTo = currentUser.preferences.keywords[firstLetter.toLowerCase()];

      if(compareTo){
        for (let j = 0; j < compareTo.length; j++) {
          if(name === compareTo[j].keywordName){
            if(compareTo[j].keywordCount === 1){
              score.keywordScore += compareTo[j].keywordTotalScore;
            } else {
              score.keywordScore += compareTo[j].keywordScore;
            }
            break;
          }
        }
      }
    }

    for (let i = 0; i < obj.crew.length; i++) {
      let name = obj.crew[i].name;
      let firstLetter = name.slice(0, 1);
      let compareTo = currentUser.preferences.directors[firstLetter.toLowerCase()];

      if(compareTo){
        for (let j = 0; j < compareTo.length; j++) {
          if(name === compareTo[j].directorName){
            if(compareTo[j].directorCount === 1){
              score.directorScore += compareTo[j].directorTotalScore;
            } else {
              score.directorScore += compareTo[j].directorScore;
            }
            break;
          }
        }
      }
    }

    for (let i = 0; i < obj.crew.length; i++) {
      let name = obj.crew[i].name;
      let firstLetter = name.slice(0, 1);
      let compareTo = currentUser.preferences.producers[firstLetter.toLowerCase()];

      if(compareTo){
        for (let j = 0; j < compareTo.length; j++) {
          if(name === compareTo[j].producerName){
            if(compareTo[j].producerCount === 1){
              score.producerScore += compareTo[j].producerTotalScore;
            } else {
              score.producerScore += compareTo[j].producerScore;
            }
            break;
          }
        }
      }
    }

    for (let i = 0; i < obj.crew.length; i++) {
      let name = obj.crew[i].name;
      let firstLetter = name.slice(0, 1);
      let compareTo = currentUser.preferences.writers[firstLetter.toLowerCase()];

      if(compareTo){
        for (let j = 0; j < compareTo.length; j++) {
          if(name === compareTo[j].writerName){
            if(compareTo[j].writerCount === 1){
              score.writerScore += compareTo[j].writerTotalScore;
            } else {
              score.writerScore += compareTo[j].writerScore;
            }
            break;
          }
        }
      }
    }
    score.totalScore = score.actorScore + (score.keywordScore / 2) + (score.directorScore / 1.5) + (score.producerScore / 1.5) + (score.writerScore / 1.5);

    return score;
  }

  function getByGenre(id){
    return $http.get(`/api/genres?id=${id}`).then(function(response){
      return response.data;
    })
  }

  function postCurrentUser(obj){
    return $http.post("/api/users", obj).then(function(response){
      currentUser = response.data;
      return response;
    });
  }

  function postMovieToDB(obj){
    return $http.post("/api/movies", obj).then(function(response){
      return response.data;
    });
  }

  function postTopFiveToDB(obj){
    return $http.post("/api/movies", obj).then(function(response){
      currentUser.topFive.push(obj);
      topFive = currentUser.topFive;
      $http.post(`/api/user/${currentUser._id}/topFive`, addedMovie);
    });
  }

  function postInitRecToDB(obj){
    return $http.post("/api/movies", obj).then(function(response){
      currentUser.initRecommended.push(response.data._id);
      $http.post(`/api/user/${currentUser._id}/initRec`, {_id : response.data._id});
      myThis.recommendMoviesForMatch = [];
      myThis.recommendMoviesForMatch = currentUser.initRecommended;
    });
  }

  function recommendMovieForInitMatch(){
    let recommendedMovies = [];
    let shuffled = [];
    currentUser.topFive.forEach(function(x, i){
      x.recommendations.forEach(function(y, j){
        recommendedMovies.push(y.id);
      })
    })
    return shuffleArray(recommendedMovies);
  }

  function shuffleArray(arr) {
    let array = arr.slice(0, arr.length)
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {

      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  function getCertification(arr){
      for (var i = 0; i < arr.length; i++) {
        if(arr[i].iso_3166_1 === "US"){
          if(arr[i].release_dates.length < 2){
            return arr[i].release_dates[0].certification;
          } else {
            for (var j = 0; j < arr[i].release_dates.length; j++) {
              if(arr[i].release_dates[j].certification){
                return arr[i].release_dates[j].certification;
              }
            }
          }
        }
      }
  }

  function formatDate(str){
    let splitStr = str.split("");
    let year = splitStr.slice(0, 4).join("");
    let day = splitStr.slice(8, 10).join("");
    let month = splitStr.slice(5, 7).join("");
    let date = "";

    if(month === "01"){month = "January"};
    if(month === "02"){month = "February"};
    if(month === "03"){month = "March"};
    if(month === "04"){month = "April"};
    if(month === "05"){month = "May"};
    if(month === "06"){month = "June"};
    if(month === "07"){month = "July"};
    if(month === "08"){month = "August"};
    if(month === "09"){month = "September"};
    if(month === "10"){month = "October"};
    if(month === "11"){month = "November"};
    if(month === "12"){month = "December"};

    date = `${month} ${day}, ${year}`;

    return date;
  }

  function postGenrePref(obj, score){
    let transferObj = {};

    obj.genreIds.forEach(function(x){
      transferObj = {
        genreName : x.name,
        genreTotalScore : score,
        genreId : x.id
      }

      $http.post(`/api/user/${currentUser._id}/genrePref`, transferObj);
    })
  }

  function postActorPref(obj, score){
    let transferObj = {};
    let myArray = obj.movieCast.slice(0, 3);

    // for (var i = 0; i < 3; i++) {
    //   transferObj = {
    //     actorName : obj.movieCast[i].name,
    //     actorTotalScore : score,
    //     castId : obj.movieCast[i].id
    //   }
    //   $http.post(`/api/user/${currentUser._id}/actorPref`, transferObj).then(function(response){
    //
    //   })
    // }

    angular.forEach(myArray, function(x){
      transferObj = {
        actorName : x.name,
        actorTotalScore : score,
        castId : x.id
      }


      let promise = $http({
        url : `/api/user/${currentUser._id}/actorPref`,
        method : "POST",
        data : transferObj
      });
    })
  }

  function postDirectorPref(obj, score){
    let transferObj = {};

    obj.crew.forEach(function(x){
      if(x.job === "Director"){
        transferObj = {
          directorName : x.name,
          directorTotalScore : score,
          crewId : x.id
        }

        $http.post(`/api/user/${currentUser._id}/directorPref`, transferObj);
      }
    })
  }

  function postProducerPref(obj, score){
    let transferObj = {};
    let count = 0;

    for (var i = 0; i < obj.crew.length; i++) {
      if(obj.crew[i].job === "Producer"){
        count++;
        transferObj = {
          producerName : obj.crew[i].name,
          producerTotalScore : score,
          crewId : obj.crew[i].id
        }
        $http.post(`/api/user/${currentUser._id}/producerPref`, transferObj);
      }
      if(count === 2) {
        break;
      }
    }
  }

  function postWriterPref(obj, score){
    let transferObj = {};
    let count = 0;

    for (var i = 0; i < obj.crew.length; i++) {
      if(obj.crew[i].department === "Writing"){
        count++;
        transferObj = {
          writerName : obj.crew[i].name,
          writerTotalScore : score,
          crewId : obj.crew[i].id
        }
        $http.post(`/api/user/${currentUser._id}/writerPref`, transferObj);
      }
      if(count === 2) {
        break;
      }
    }
  }

  function postKeywordPref(obj, score){
    let transferObj = {};
    let keywordsArr = obj.keywords.slice(0,3);

    keywordsArr.forEach(function(x){
        transferObj = {
          keywordName : x.name,
          keywordTotalScore : score,
          keywordId : x.id
        }
        $http.post(`/api/user/${currentUser._id}/keywordPref`, transferObj);
    })
  }

  function postDecadePref(obj, score){
    let transferObj = {};
    let year = parseInt(obj.releaseDate.split("").reverse().slice(0, 4).reverse().join(""));

    if(year >= 2010 && year <= 2019){
      transferObj = {
        decadeName : "2010s",
        decadeTotalScore : score
      }
      return $http.post(`/api/user/${currentUser._id}/decadePref`, transferObj);
    } else if(year >= 2000 && year <= 2009){
      transferObj = {
        decadeName : "2000s",
        decadeTotalScore : score
      }
      return $http.post(`/api/user/${currentUser._id}/decadePref`, transferObj);
    } else if(year >= 1990 && year <= 1999){
      transferObj = {
        decadeName : "1990s",
        decadeTotalScore : score
      }
      return $http.post(`/api/user/${currentUser._id}/decadePref`, transferObj);
    } else if(year >= 1980 && year <= 1989){
      transferObj = {
        decadeName : "1980s",
        decadeTotalScore : score
      }
      return $http.post(`/api/user/${currentUser._id}/decadePref`, transferObj);
    } else if(year >= 1970 && year <= 1979){
      transferObj = {
        decadeName : "1970s",
        decadeTotalScore : score
      }
      return $http.post(`/api/user/${currentUser._id}/decadePref`, transferObj);
    } else if(year >= 1960 && year <= 1969){
      transferObj = {
        decadeName : "1960s",
        decadeTotalScore : score
      }
      return $http.post(`/api/user/${currentUser._id}/decadePref`, transferObj);
    } else if(year >= 1950 && year <= 1959){
      transferObj = {
        decadeName : "1950s",
        decadeTotalScore : score
      }
      return $http.post(`/api/user/${currentUser._id}/decadePref`, transferObj);
    } else if(year >= 1940 && year <= 1949){
      transferObj = {
        decadeName : "1940s",
        decadeTotalScore : score
      }
      return $http.post(`/api/user/${currentUser._id}/decadePref`, transferObj);
    } else if(year >= 1930 && year <= 1939){
      transferObj = {
        decadeName : "1930s",
        decadeTotalScore : score
      }
      return $http.post(`/api/user/${currentUser._id}/decadePref`, transferObj);
    }
  }

  function sortByScore(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  }

  function findDuplicates(array1, array2){
  	let initRec = array1;
  	let topFive = array2;
  	initRec = initRec.filter(function(val) {
    		return topFive.indexOf(val) == -1;
  	});
  	return initRec;
  }

  function removeDuplicates(a){
	let uniqueArray = a.filter(function(item, pos, self) {
      return self.indexOf(item) == pos;
  })
  	return uniqueArray
  }

  function getTopFiveIds(arr){
    let idsArr = [];
    arr.forEach(function(x){
      idsArr.push(x.omdbId);
    })
    return idsArr;
  }

  function flattenArr(arr){
  	var newArr = [];
  	newArr = [].concat.apply([], arr);
  	return newArr;
  }

  function getAndPostMovieByOMDBId(id){
    // console.log("apple");
    return $http.get(`${omdbUrl}movie/${id}?${omdbKey}&append_to_response=videos,images,credits,recommendations,keywords,similar,release_dates`).then(function(response){
      let movieObj = organizeMovie(response);
      // console.log(movieObj);
      return $http.post("/api/movies", movieObj).then(function(response2){
        return response2;
      })
    })
  }

  // function generateScores(arr){
  //   let allRecommended = [];
  //   arr.forEach(function(x, i){
  //     $http.get("/api/movies").then(function(response){
  //       if()
  //     })
  //   })
  // }

  function organizeMovie(response){
    let results = response.data;
    let movieObj = {
      movieTitle : results.title,
      description : results.overview,
      popularity : results.popularity,
      posterUrl : `http://image.tmdb.org/t/p/w500/${results.poster_path}`,
      releaseDate : formatDate(results.release_date),
      video : results.video,
      vote : results.vote_average,
      voteCount : results.vote_count,
      genreIds : results.genres,
      backdropPath : `http://image.tmdb.org/t/p/w500/${results.backdrop_path}`,
      omdbId : results.id,
      language : results.original_language,
      homepage : results.homepage,
      imdbId : results.imdb_id,
      productionCompanies : results.production_companies,
      revenue : results.revenue,
      runtime : results.runtime,
      status : results.status,
      tagline : results.tagline,
      videos : results.videos.results,
      images : results.images.backdrops,
      adult : results.adult,
      crew : results.credits.crew,
      movieCast : results.credits.cast,
      keywords : results.keywords.keywords,
      recommendations : results.recommendations.results,
      similar : results.similar.results,
      certification : getCertification(results.release_dates.results)
    }
    if(movieObj.crew.length < 3) {
      movieObj.crew = movieObj.crew[0];
    }
    movieObj.crew.forEach(function(y){
      if(!y.profile_path){
        y.profile_path = "http://159.203.169.243/images/no-picture.png"
      } else {
        y.profile_path = `http://image.tmdb.org/t/p/w500/${y.profile_path}`
      }
    })
    movieObj.movieCast.forEach(function(y){
      // console.log(y.profile_path);
      if(!y.profile_path){
        // console.log("no picture");
        y.profile_path = "http://159.203.169.243/images/no-picture.png"
      } else {
        // console.log("replacing picture");
        y.profile_path = `http://image.tmdb.org/t/p/w500/${y.profile_path}`
      }
    })
    return movieObj;
  }

  const initMatchQueue = [
        "580653decbfa7d81497fe80d",
        "58065d1c2418ec817d0989eb",
        "5806522a868f85812eb9f262",
        "580653bfcbfa7d81497fe7d6",
        "58065e7314a214818555f28d",
        "58065214868f85812eb9f25f",
        "5806552911337e81519b53f4",
        "58065d0a2418ec817d0989cc",
        "58065416cbfa7d81497fe875",
        "58065439cbfa7d81497fe8a5",
        "5806547ccbfa7d81497fe911",
        "5806529c868f85812eb9f2d0",
        "58065182868f85812eb9f1af",
        "58065eb714a214818555f306",
        "5806552011337e81519b53e5",
        "580653eecbfa7d81497fe829",
        "580657342a4f8e8160c49b3c",
        "58065ed514a214818555f34d",
        "580537853ca7247be13fe4db",
        "58065235868f85812eb9f28e",
        "58065d0a2418ec817d0989cf",
        "580652e8868f85812eb9f36b",
        "58065427cbfa7d81497fe88f",
        "580652c7868f85812eb9f33b",
        "5806437851275a805bf3f1e7",
        "58065235868f85812eb9f29b",
        "580651fa868f85812eb9f234",
        "580652c9868f85812eb9f353",
        "580657352a4f8e8160c49b3e",
        "5806548dcbfa7d81497fe935",
        "58065254868f85812eb9f2ae",
        "580657ff2a4f8e8160c49c9c",
        "5806545acbfa7d81497fe8eb",
        "5806556311337e81519b5434",
        "58065212868f85812eb9f240",
        "5806515a868f85812eb9f163",
        "58065d752418ec817d098a7c",
        "58065ec714a214818555f325",
        "58065e8a14a214818555f2b7",
        "580655cc11337e81519b54a7",
        "58064f20cd5dd981118aa2bd",
        "5806579a2a4f8e8160c49bbf",
        "58065d292418ec817d098a08",
        "58065e5714a214818555f265",
        "58065159868f85812eb9f156",
        "5806546acbfa7d81497fe8f3",
        "58065b3629169f816f05d209",
        "5806456154027480830ccd63",
        "5806522c868f85812eb9f27d",
        "58064f1dcd5dd981118aa2b3",
        "58065acb29169f816f05d1c7",
        "58065e8a14a214818555f2be",
        "58065407cbfa7d81497fe859",
        "580651c1868f85812eb9f1d5",
        "58064e0b7c476280f8b331be",
        "580657912a4f8e8160c49ba7",
        "5806553c11337e81519b53fd",
        "58064f0dcd5dd981118aa289",
        "580653accbfa7d81497fe79d",
        "58065d0a2418ec817d0989d9",
        "5806408b6dcddf8010f371e6",
        "5806549ccbfa7d81497fe949",
        "580653d8cbfa7d81497fe808",
        "5806559f11337e81519b5488",
        "580657682a4f8e8160c49b6a",
        "58065439cbfa7d81497fe8a0",
        "58064f2acd5dd981118aa2d7",
        "5806584c2a4f8e8160c49ce0",
        "580537853ca7247be13fe4c0",
        "58064dfd7c476280f8b3319b",
        "5806553c11337e81519b5403",
        "5806559f11337e81519b548f",
        "58065ec714a214818555f31e",
        "58064fa29e84498120e7cbde",
        "58064dfb7c476280f8b3318d",
        "58065e9714a214818555f2c9",
        "58065edf14a214818555f360",
        "58065391cbfa7d81497fe769",
        "58064d9caf05f980ef9eaacf",
        "58065e5714a214818555f263",
        "58064d7aaf05f980ef9eaa8f",
        "5806456154027480830ccd69",
        "58065ef914a214818555f38e",
        "580653ddcbfa7d81497fe80c",
        "58065d292418ec817d098a11",
        "580655b711337e81519b549d",
        "580657f22a4f8e8160c49c65",
        "580537853ca7247be13fe4b0",
        "58064e097c476280f8b331b7",
        "580653b5cbfa7d81497fe7b6",
        "5806529b868f85812eb9f2c4",
        "58064f11cd5dd981118aa295",
        "580652f4868f85812eb9f39d",
        "58064fae9e84498120e7cc03",
        "58064e097c476280f8b331b6",
        "5806408a6dcddf8010f371d9",
        "580657f32a4f8e8160c49c73",
        "5806408a6dcddf8010f371d5",
        "58064f26cd5dd981118aa2cb",
        "58064dfa7c476280f8b33187",
        "58065254868f85812eb9f2b4",
        "58065e8014a214818555f2a6",
        "580657462a4f8e8160c49b4f",
        "580652e8868f85812eb9f36f",
        "58065ef914a214818555f38b",
        "580657ff2a4f8e8160c49c9a",
        "580537843ca7247be13fe4af",
        "5806552011337e81519b53e3",
        "58064d9caf05f980ef9eaacc",
        "5806456254027480830ccd73",
        "5806545acbfa7d81497fe8ee",
        "58064dfb7c476280f8b33190",
        "580537843ca7247be13fe490",
        "58065d372418ec817d098a2c",
        "5806574f2a4f8e8160c49b58",
        "580651ea868f85812eb9f217",
        "58064e6ca05fd98101c67262",
        "580653b5cbfa7d81497fe7ab",
        "58065e6814a214818555f275",
        "58064f9b9e84498120e7cbcc",
        "580658142a4f8e8160c49cc3",
        "58064d82af05f980ef9eaa9a",
        "58064dfb7c476280f8b3318c",
        "58065ab829169f816f05d1c1",
        "58065304868f85812eb9f3b7",
        "58064eb42120e2810a5e0321",
        "58064e68a05fd98101c6724f",
        "58065a9029169f816f05d1a6",
        "5806546ccbfa7d81497fe909",
        "58065aa029169f816f05d1b3",
        "580652e9868f85812eb9f378",
        "58065254868f85812eb9f2ac",
        "580653bfcbfa7d81497fe7cd",
        "580651c1868f85812eb9f1c7",
        "58065235868f85812eb9f298",
        "58065e7214a214818555f281",
        "580655cc11337e81519b54aa",
        "58064fa69e84498120e7cbeb",
        "5806553d11337e81519b540e",
        "58065aa029169f816f05d1b2",
        "5806579b2a4f8e8160c49bc1",
        "58065d1e2418ec817d0989f8",
        "5806556f11337e81519b5449",
        "5806408a6dcddf8010f371d6",
        "580652f3868f85812eb9f380",
        "58064d9aaf05f980ef9eaac6",
        "58065254868f85812eb9f2af",
        "5806555711337e81519b5421",
        "58065ea514a214818555f2f1",
        "58064df57c476280f8b3316d",
        "580657742a4f8e8160c49b70",
        "5806584c2a4f8e8160c49ce4",
        "580652b5868f85812eb9f315",
        "580657f22a4f8e8160c49c64",
        "58065ea514a214818555f2f3",
        "58064e59a05fd98101c6722b",
        "58065e9914a214818555f2dc",
        "58065b3629169f816f05d208",
        "580657f22a4f8e8160c49c60",
        "58065426cbfa7d81497fe886",
        "580652c8868f85812eb9f34d",
        "5806579b2a4f8e8160c49bc2",
        "58065ec714a214818555f327",
        "58064cd15564f580e70fc3ad",
        "580651fa868f85812eb9f22b",
        "58065304868f85812eb9f3b8",
        "58064e74a05fd98101c6726f",
        "5806456154027480830ccd6a",
        "58065304868f85812eb9f3b3",
        "5806456254027480830ccd71",
        "58065427cbfa7d81497fe895",
        "5806539ccbfa7d81497fe781",
        "58065b5829169f816f05d218",
        "5806558111337e81519b5462",
        "580537843ca7247be13fe48a",
        "580651ea868f85812eb9f214",
        "580653bfcbfa7d81497fe7c7",
        "580537843ca7247be13fe498",
        "5806578f2a4f8e8160c49b96",
        "58064f33cd5dd981118aa2ee",
        "5806545acbfa7d81497fe8e7",
        "580657352a4f8e8160c49b41",
        "58065e7214a214818555f27c",
        "5806584c2a4f8e8160c49cd5",
        "58065ee114a214818555f378",
        "58065407cbfa7d81497fe851",
        "5806575a2a4f8e8160c49b61",
        "5806555811337e81519b542e",
        "580653decbfa7d81497fe818",
        "58064f11cd5dd981118aa296",
        "580537843ca7247be13fe49b",
        "58064d6faf05f980ef9eaa74",
        "58065eb714a214818555f30c",
        "58064f19cd5dd981118aa2a4",
        "580652b5868f85812eb9f320",
        "58065a9029169f816f05d1ae",
        "5806456154027480830ccd64",
        "58065b2b29169f816f05d1fa",
        "58065d752418ec817d098a86",
        "5806573c2a4f8e8160c49b47",
        "58065b3629169f816f05d20c",
        "58065166868f85812eb9f186",
        "58064e68a05fd98101c6724a",
        "58064dfd7c476280f8b3319d",
        "58065304868f85812eb9f3ae",
        "5806548dcbfa7d81497fe92c",
        "5806552011337e81519b53e4",
        "580657e32a4f8e8160c49c55",
        "58064d95af05f980ef9eaabe",
        "58065d502418ec817d098a5c",
        "580651bf868f85812eb9f1b9",
        "5806584a2a4f8e8160c49cca",
        "580653bfcbfa7d81497fe7c2",
        "580651c0868f85812eb9f1c0",
        "580653bfcbfa7d81497fe7d8",
        "58065254868f85812eb9f2a9",
        "58065446cbfa7d81497fe8c4",
        "5806549ccbfa7d81497fe955",
        "58064e78a05fd98101c6727c",
        "580657fe2a4f8e8160c49c8a",
        "58065416cbfa7d81497fe870",
        "58064dfd7c476280f8b3319c",
        "580537863ca7247be13fe4f6",
        "580658002a4f8e8160c49ca4",
        "58064f9b9e84498120e7cbc5",
        "58065eb714a214818555f308",
        "58065a7529169f816f05d1a1",
        "58065e8a14a214818555f2bb",
        "58064f999e84498120e7cbbc",
        "58064f19cd5dd981118aa2a5",
        "58065e8014a214818555f2a7",
        "580653bfcbfa7d81497fe7c5",
        "580537503ca7247be13fe414",
        "580651e8868f85812eb9f1ff",
        "580657e32a4f8e8160c49c56",
        "580657832a4f8e8160c49b79",
        "58065180868f85812eb9f192",
        "58065235868f85812eb9f292",
        "58065180868f85812eb9f194",
        "580657ff2a4f8e8160c49c9b",
        "580537843ca7247be13fe49d",
        "58065e8a14a214818555f2bf",
        "58065ee014a214818555f369",
        "5806559e11337e81519b547b",
        "58065e7214a214818555f282",
        "58065445cbfa7d81497fe8b2",
        "580658132a4f8e8160c49caf",
        "58064f23cd5dd981118aa2c2",
        "5806552911337e81519b53f5",
        "58064e097c476280f8b331b2",
        "58065254868f85812eb9f2b1",
        "5806558c11337e81519b5467",
        "580652b5868f85812eb9f316",
        "58065d752418ec817d098a89",
        "580657692a4f8e8160c49b6e",
        "58065181868f85812eb9f19f",
        "58064f9b9e84498120e7cbc8",
        "58065eb714a214818555f307",
        "5806456254027480830ccd70",
        "580653d8cbfa7d81497fe800",
        "5806549ccbfa7d81497fe944",
        "580653b5cbfa7d81497fe7bf",
        "5806539ccbfa7d81497fe789",
        "580537853ca7247be13fe4da",
        "58064fab9e84498120e7cbfc",
        "58064f999e84498120e7cbc0",
        "58065df714a214818555f25a",
        "580537833ca7247be13fe46d",
        "58065180868f85812eb9f18f",
        "580655b711337e81519b549f",
        "580652b6868f85812eb9f326",
        "580658002a4f8e8160c49ca3",
        "58065d752418ec817d098a87",
        "58065ec714a214818555f31d",
        "58065e8914a214818555f2af",
        "58065d292418ec817d098a0e",
        "58064e0b7c476280f8b331bc",
        "580652e8868f85812eb9f366",
        "58065426cbfa7d81497fe889",
        "58064e77a05fd98101c67273",
        "58065ea514a214818555f2e9",
        "580537853ca7247be13fe4bb",
        "58064e6da05fd98101c67268",
        "58065445cbfa7d81497fe8b5",
        "580537853ca7247be13fe4ed",
        "580652f3868f85812eb9f37c",
        "5806515a868f85812eb9f162",
        "580652a7868f85812eb9f2f7",
        "5806555811337e81519b5427",
        "58065d372418ec817d098a25",
        "58065e8914a214818555f2ae",
        "58065ea614a214818555f2fd",
        "58064e5fa05fd98101c67234",
        "58065447cbfa7d81497fe8d2",
        "580537853ca7247be13fe4d5",
        "580653accbfa7d81497fe795",
        "580652a6868f85812eb9f2eb",
        "58065d502418ec817d098a4d",
        "5806559e11337e81519b547e",
        "58065212868f85812eb9f24e",
        "58065e7214a214818555f27b",
        "5806553c11337e81519b5408",
        "580652e8868f85812eb9f36c",
        "580652b5868f85812eb9f31f",
        "5806549ccbfa7d81497fe950",
        "5806559e11337e81519b547f",
        "58065159868f85812eb9f159",
        "5806529c868f85812eb9f2d1",
        "58065427cbfa7d81497fe897",
        "580651fa868f85812eb9f230",
        "58064f1dcd5dd981118aa2af",
        "58065edf14a214818555f35d",
        "580651ce868f85812eb9f1e8",
        "580653cccbfa7d81497fe7e1",
        "58064f1fcd5dd981118aa2b7",
        "5806408b6dcddf8010f371ec",
        "580652e7868f85812eb9f358",
        "58065165868f85812eb9f185",
        "58064f0fcd5dd981118aa292",
        "580657832a4f8e8160c49b7c",
        "580657e12a4f8e8160c49c4b",
        "5806554c11337e81519b541c",
        "5806558e11337e81519b546f",
        "58064fab9e84498120e7cbfb",
        "58064df87c476280f8b3317c",
        "5806558011337e81519b5458",
        "580652c9868f85812eb9f352",
        "5806584c2a4f8e8160c49cdb",
        "58065ec714a214818555f32d",
        "58065d622418ec817d098a72",
        "580652c6868f85812eb9f338",
        "58065426cbfa7d81497fe885",
        "5806408a6dcddf8010f371d8",
        "58065303868f85812eb9f3a0",
        "580651c1868f85812eb9f1cc",
        "580537843ca7247be13fe486",
        "58065417cbfa7d81497fe87b",
        "580651e8868f85812eb9f1fc",
        "580651cf868f85812eb9f1f2",
        "5806556311337e81519b5437",
        "5806584a2a4f8e8160c49cc8",
        "58065b1029169f816f05d1ec",
        "58064dfe7c476280f8b331a2",
        "5806549ccbfa7d81497fe945",
        "58064d8faf05f980ef9eaaa3",
        "58064fae9e84498120e7cc02",
        "58065e6814a214818555f272",
        "58065151868f85812eb9f151",
        "5806573c2a4f8e8160c49b46",
        "58065415cbfa7d81497fe861",
        "58065e8b14a214818555f2c6",
        "580653d8cbfa7d81497fe806",
        "58064d95af05f980ef9eaab8",
        "58065235868f85812eb9f29e",
        "58065181868f85812eb9f19d",
        "58064e9c2120e2810a5e0315",
        "5806529c868f85812eb9f2cd",
        "58065ad829169f816f05d1d0",
        "58064f1dcd5dd981118aa2b1",
        "58064fa69e84498120e7cbe8",
        "580653accbfa7d81497fe7a0",
        "580652a7868f85812eb9f2fa",
        "58065eb914a214818555f319",
        "58065aa029169f816f05d1b1",
        "58064f30cd5dd981118aa2e4",
        "58065d622418ec817d098a6f",
        "58065305868f85812eb9f3c0",
        "58065303868f85812eb9f3a5",
        "5806555811337e81519b542c",
        "58064e047c476280f8b331a6",
        "58065b5829169f816f05d219",
        "5806522b868f85812eb9f26f",
        "58064f0fcd5dd981118aa293",
        "580537833ca7247be13fe46a",
        "5806578f2a4f8e8160c49b91",
        "580653accbfa7d81497fe79f",
        "58065304868f85812eb9f3b4",
        "58065a5a29169f816f05d191",
        "58064f00cd5dd981118aa275",
        "58065a5429169f816f05d18e",
        "58065ed514a214818555f353",
        "58065e7314a214818555f290",
        "58065ed414a214818555f341",
        "58065e9714a214818555f2ce",
        "580653bfcbfa7d81497fe7d7",
        "5806552911337e81519b53f8",
        "580655a011337e81519b5491",
        "5806575a2a4f8e8160c49b62",
        "5806556f11337e81519b5444",
        "580537853ca7247be13fe4e9",
        "58064e6da05fd98101c67266",
        "58065214868f85812eb9f25d",
        "580658132a4f8e8160c49cbc",
        "58065e8a14a214818555f2ba",
        "580651ce868f85812eb9f1d6",
        "5806549ccbfa7d81497fe94e",
        "580653cccbfa7d81497fe7f3",
        "58065ec714a214818555f331",
        "580651bf868f85812eb9f1b8",
        "580652b5868f85812eb9f31e",
        "580653b5cbfa7d81497fe7b9",
        "58064ecb2120e2810a5e0331",
        "5806546acbfa7d81497fe8f9",
        "5806556311337e81519b5436",
        "5805375b3ca7247be13fe433",
        "580537833ca7247be13fe46c",
        "58065e8014a214818555f297",
        "5806573c2a4f8e8160c49b45",
        "58064e6ba05fd98101c6725e",
        "580655ce11337e81519b54c2",
        "5806559f11337e81519b5486",
        "58065b1a29169f816f05d1f0",
        "580643aeb624f68064c5bdb0",
        "5806546acbfa7d81497fe8f0",
        "58065b3529169f816f05d1fe",
        "58065ea514a214818555f2f9",
        "58065415cbfa7d81497fe85f",
        "58065407cbfa7d81497fe85e",
        "5806539ccbfa7d81497fe784",
        "58065ae729169f816f05d1d8",
        "5806548fcbfa7d81497fe93e",
        "58065303868f85812eb9f3a4",
        "5806539ccbfa7d81497fe780",
        "58065416cbfa7d81497fe86e",
        "58064f11cd5dd981118aa29a",
        "58064dfb7c476280f8b3318f",
        "580658132a4f8e8160c49cb1",
        "58064df97c476280f8b33181",
        "580651f9868f85812eb9f227",
        "58064fa99e84498120e7cbf3",
        "58065391cbfa7d81497fe76c",
        "580652a7868f85812eb9f2f9",
        "58064df77c476280f8b33176",
        "58065e8014a214818555f2a0",
        "58064f32cd5dd981118aa2e5",
        "5806456154027480830ccd6c",
        "580652a7868f85812eb9f2f4",
        "580652b7868f85812eb9f32e",
        "58065426cbfa7d81497fe88a",
        "580537843ca7247be13fe4a5",
        "58064f09cd5dd981118aa27b",
        "58064e77a05fd98101c67279",
        "580652c8868f85812eb9f34e",
        "58065cf92418ec817d0989be",
        "58065ec714a214818555f332",
        "580652a7868f85812eb9f2fb",
        "58065acb29169f816f05d1c9",
        "58064f9e9e84498120e7cbd3",
        "580537843ca7247be13fe497",
        "580655cd11337e81519b54be",
        "5806529c868f85812eb9f2ce",
        "580653b5cbfa7d81497fe7bc",
        "58065ce22418ec817d0989ad",
        "5806522a868f85812eb9f265",
        "5806573c2a4f8e8160c49b48",
        "58064e59a05fd98101c6722c",
        "58065ec714a214818555f323",
        "58065d742418ec817d098a79",
        "5806558e11337e81519b546b",
        "58064d7eaf05f980ef9eaa94",
        "58064e61a05fd98101c67239",
        "580657fd2a4f8e8160c49c85",
        "58065254868f85812eb9f2b2",
        "58065166868f85812eb9f18c",
        "5806552011337e81519b53eb",
        "58065ec714a214818555f329",
        "58065eb914a214818555f316",
        "58064fa69e84498120e7cbe5",
        "5806546acbfa7d81497fe8fa",
        "5806559e11337e81519b547d",
        "58064e6aa05fd98101c67254",
        "58064d9aaf05f980ef9eaac8",
        "580652c6868f85812eb9f336",
        "580653eecbfa7d81497fe822",
        "5806547ccbfa7d81497fe920",
        "58064e0a7c476280f8b331ba",
        "58065a4729169f816f05d187",
        "58065459cbfa7d81497fe8e6",
        "580652c8868f85812eb9f34c",
        "580655b711337e81519b549c",
        "58065407cbfa7d81497fe852",
        "5806522b868f85812eb9f26d",
        "580653b5cbfa7d81497fe7bb",
        "5806548dcbfa7d81497fe92a",
        "58064d71af05f980ef9eaa75",
        "580657f32a4f8e8160c49c6f",
        "58065304868f85812eb9f3b5",
        "58065ee014a214818555f363",
        "58065181868f85812eb9f1aa",
        "58065415cbfa7d81497fe860",
        "580537833ca7247be13fe45e",
        "58064e6da05fd98101c67264",
        "58065a5429169f816f05d190",
        "580652c7868f85812eb9f33c",
        "58065edf14a214818555f35e",
        "5806539ccbfa7d81497fe78d",
        "580537833ca7247be13fe463",
        "58065ef914a214818555f388",
        "58065ec714a214818555f333",
        "58065e8b14a214818555f2c1",
        "5806548dcbfa7d81497fe93c",
        "580653decbfa7d81497fe814",
        "58064d78af05f980ef9eaa87",
        "580653cccbfa7d81497fe7e8",
        "580652a8868f85812eb9f301",
        "58064eb72120e2810a5e0323",
        "58065303868f85812eb9f39f",
        "580657f32a4f8e8160c49c6c",
        "5806529c868f85812eb9f2d3",
        "58065459cbfa7d81497fe8da",
        "58065e9914a214818555f2e2",
        "580652a8868f85812eb9f304",
        "58065e8014a214818555f294",
        "58064df77c476280f8b3317a",
        "58065e7314a214818555f289",
        "580653decbfa7d81497fe816",
        "58065ce22418ec817d0989b0",
        "58065e8b14a214818555f2c2",
        "5806408b6dcddf8010f371ef",
        "58065ee114a214818555f36f",
        "58064f0bcd5dd981118aa284",
        "580653accbfa7d81497fe79e",
        "5806552911337e81519b53ef",
        "580653d8cbfa7d81497fe805",
        "580657fe2a4f8e8160c49c8e",
        "58065d1e2418ec817d0989fa",
        "58064d6daf05f980ef9eaa6e",
        "58065d502418ec817d098a56",
        "580651d0868f85812eb9f1f5",
        "580652a7868f85812eb9f2ee",
        "58065ef814a214818555f382",
        "58064d82af05f980ef9eaa9d",
        "58065aca29169f816f05d1c5",
        "580651fa868f85812eb9f235",
        "5806555711337e81519b5420",
        "58065160868f85812eb9f178",
        "58064e6ba05fd98101c6725c",
        "580653b5cbfa7d81497fe7b0",
        "5806558e11337e81519b5472",
        "580653b5cbfa7d81497fe7b8",
        "58065eb914a214818555f317",
        "58065165868f85812eb9f17e",
        "58064e5ba05fd98101c67231",
        "5806408a6dcddf8010f371db",
        "5806556f11337e81519b5455",
        "580537853ca7247be13fe4e8",
        "58065ea514a214818555f2ec",
        "5806539ccbfa7d81497fe788",
        "58064e6da05fd98101c6726a",
        "58065416cbfa7d81497fe86c",
        "58065acb29169f816f05d1cb",
        "58065446cbfa7d81497fe8c9",
        "58064f23cd5dd981118aa2c5",
        "580653cccbfa7d81497fe7ea",
        "58064f979e84498120e7cbbb",
        "58064e74a05fd98101c6726d",
        "580653eecbfa7d81497fe838",
        "58065b3629169f816f05d206",
        "5806549ccbfa7d81497fe948",
        "58064e0b7c476280f8b331c1",
        "580653bfcbfa7d81497fe7c8",
        "580655ce11337e81519b54c3",
        "58064d8faf05f980ef9eaaa8",
        "58065ee014a214818555f36a",
        "58064fa29e84498120e7cbe0",
        "580653b5cbfa7d81497fe7a6",
        "58065254868f85812eb9f2a7",
        "58064d95af05f980ef9eaab6",
        "58065b1929169f816f05d1ee",
        "580651e8868f85812eb9f208",
        "5806529c868f85812eb9f2d6",
        "58064d93af05f980ef9eaab1",
        "580651ce868f85812eb9f1ed",
        "5806547bcbfa7d81497fe90c",
        "58064f1ccd5dd981118aa2ab",
        "5806529b868f85812eb9f2bf",
        "58064e6ba05fd98101c6725b",
        "58065439cbfa7d81497fe8ae",
        "580652b7868f85812eb9f330",
        "58065182868f85812eb9f1b1",
        "580657f12a4f8e8160c49c5b",
        "580651ce868f85812eb9f1d8",
        "5806559f11337e81519b5490",
        "58065af929169f816f05d1dd",
        "58065afb29169f816f05d1e6",
        "58064f1ccd5dd981118aa2ac",
        "580652a6868f85812eb9f2e8",
        "58065234868f85812eb9f287",
        "58065ea514a214818555f2f7",
        "580658002a4f8e8160c49ca1",
        "5806522a868f85812eb9f268",
        "58064f2acd5dd981118aa2d9",
        "58064d78af05f980ef9eaa86",
        "58065439cbfa7d81497fe8b0",
        "58065305868f85812eb9f3ba",
        "58064dfa7c476280f8b33185",
        "580537833ca7247be13fe464",
        "58065df714a214818555f259",
        "58065b3629169f816f05d202",
        "58064f0fcd5dd981118aa28b",
        "58064ea62120e2810a5e0319",
        "580657e12a4f8e8160c49c4c",
        "5806529d868f85812eb9f2db",
        "58065d502418ec817d098a5d",
        "580651bf868f85812eb9f1b4",
        "580652b5868f85812eb9f312",
        "58065181868f85812eb9f1ac",
        "5806549ccbfa7d81497fe947",
        "58065214868f85812eb9f25b",
        "58065212868f85812eb9f243",
        "58064e60a05fd98101c67236",
        "5806552011337e81519b53e6",
        "5806556311337e81519b5438",
        "58065e8914a214818555f2b3",
        "580652b5868f85812eb9f318",
        "5806554b11337e81519b5411",
        "58065ed514a214818555f34c",
        "580657f32a4f8e8160c49c7d",
        "58065304868f85812eb9f3b6",
        "58065e7214a214818555f284",
        "5806522b868f85812eb9f278",
        "580657fd2a4f8e8160c49c86",
        "5806584c2a4f8e8160c49ce3",
        "58065acb29169f816f05d1c6",
        "5806547ccbfa7d81497fe910",
        "580653decbfa7d81497fe819",
        "58065d622418ec817d098a74",
        "58065d432418ec817d098a42",
        "580653b5cbfa7d81497fe7a9",
        "58064f2acd5dd981118aa2d8",
        "580652b6868f85812eb9f325",
        "5806522b868f85812eb9f26b",
        "5806584c2a4f8e8160c49cd7",
        "58064f19cd5dd981118aa2a7",
        "580652b5868f85812eb9f311",
        "58065d432418ec817d098a46",
        "580537843ca7247be13fe49f",
        "58065212868f85812eb9f24d",
        "580653b5cbfa7d81497fe7a5",
        "580651c1868f85812eb9f1c5",
        "58064e097c476280f8b331b4",
        "5806555811337e81519b5424",
        "58065e9914a214818555f2df",
        "58065d1c2418ec817d0989e5",
        "580657462a4f8e8160c49b4d",
        "58064f1dcd5dd981118aa2b2",
        "58064f32cd5dd981118aa2e9",
        "58065ada29169f816f05d1d4",
        "58065446cbfa7d81497fe8c8",
        "580651c1868f85812eb9f1cd",
        "58065a7529169f816f05d1a0",
        "58065d752418ec817d098a7e",
        "5806546acbfa7d81497fe8fe",
        "580537823ca7247be13fe450",
        "580537853ca7247be13fe4d6",
        "58065ee114a214818555f376",
        "58064ea02120e2810a5e0317",
        "58065d432418ec817d098a44",
        "5806574f2a4f8e8160c49b5d",
        "58065400cbfa7d81497fe84e",
        "58065416cbfa7d81497fe871",
        "580651c0868f85812eb9f1bf",
        "580657832a4f8e8160c49b7b",
        "580653b5cbfa7d81497fe7a4",
        "5806574f2a4f8e8160c49b57",
        "58064f11cd5dd981118aa297",
        "580652f4868f85812eb9f398",
        "580651e8868f85812eb9f202",
        "580657fe2a4f8e8160c49c96",
        "58065b3629169f816f05d203",
        "580651e9868f85812eb9f20d",
        "580655b811337e81519b54a2",
        "58065e8014a214818555f29c",
        "5806547ccbfa7d81497fe90e",
        "5806584c2a4f8e8160c49ce1",
        "58064dfd7c476280f8b33198",
        "58065e8a14a214818555f2bc",
        "580657762a4f8e8160c49b74",
        "5806515a868f85812eb9f15f",
        "58065cf92418ec817d0989c8",
        "58064f9e9e84498120e7cbd0",
        "58065d0a2418ec817d0989d2",
        "58064fa89e84498120e7cbee",
        "58064fa39e84498120e7cbe3",
        "5806529c868f85812eb9f2d7",
        "58065166868f85812eb9f18a",
        "58065d432418ec817d098a3e",
        "58065427cbfa7d81497fe893",
        "580652a9868f85812eb9f305",
        "580655cc11337e81519b54a9",
        "580537853ca7247be13fe4e3",
        "5806548dcbfa7d81497fe927",
        "58064cd15564f580e70fc3ab",
        "58064e097c476280f8b331b5",
        "580537843ca7247be13fe493",
        "580651fb868f85812eb9f239",
        "580651bf868f85812eb9f1be",
        "58065e7314a214818555f288",
        "58065160868f85812eb9f170",
        "58064df77c476280f8b33175",
        "58065b5829169f816f05d214",
        "580657fe2a4f8e8160c49c94",
        "580655cc11337e81519b54a5",
        "58065151868f85812eb9f153",
        "580537753ca7247be13fe441",
        "580652e8868f85812eb9f371",
        "58064df67c476280f8b33172",
        "5806408b6dcddf8010f371e9",
        "58065417cbfa7d81497fe87c",
        "580537863ca7247be13fe4f5",
        "5806456154027480830ccd62",
        "580652c8868f85812eb9f34b",
        "58064e067c476280f8b331ad",
        "5806559f11337e81519b5483",
        "58065b3629169f816f05d20a",
        "5806553c11337e81519b53fe",
        "580657452a4f8e8160c49b4b",
        "580653bfcbfa7d81497fe7c1",
        "58065b1029169f816f05d1e7",
        "58065b5829169f816f05d20f",
        "580652a6868f85812eb9f2e7",
        "58065a4729169f816f05d188",
        "58065180868f85812eb9f197",
        "580651c1868f85812eb9f1d4",
        "580657992a4f8e8160c49bad",
        "58064972503fae80cb45d7fc",
        "580657fe2a4f8e8160c49c97",
        "58065212868f85812eb9f24f",
        "58065a9029169f816f05d1a9",
        "58065d752418ec817d098a83",
        "5806552911337e81519b53ee",
        "5806539ccbfa7d81497fe785",
        "580653eecbfa7d81497fe831",
        "580652c6868f85812eb9f337",
        "58065eb714a214818555f305",
        "580652f4868f85812eb9f38c",
        "58065a5d29169f816f05d197",
        "580658122a4f8e8160c49cac",
        "580652a7868f85812eb9f2f6",
        "5806522c868f85812eb9f281",
        "58065426cbfa7d81497fe88b",
        "58065ad829169f816f05d1d1",
        "5806515a868f85812eb9f160",
        "580658122a4f8e8160c49ca5",
        "580653b5cbfa7d81497fe7b1",
        "5806515a868f85812eb9f166",
        "58065445cbfa7d81497fe8bc",
        "5806558e11337e81519b5475",
        "58064e6da05fd98101c67265",
        "580651c1868f85812eb9f1c3",
        "580652e8868f85812eb9f367",
        "58064d91af05f980ef9eaaac",
        "58065213868f85812eb9f253",
        "580658142a4f8e8160c49cc1",
        "580651f9868f85812eb9f220",
        "580652f4868f85812eb9f39a",
        "58065cf92418ec817d0989c3",
        "580653accbfa7d81497fe79b",
        "58065407cbfa7d81497fe854",
        "58065e9914a214818555f2e0",
        "580658122a4f8e8160c49ca6",
        "5806578f2a4f8e8160c49b89",
        "58064fa99e84498120e7cbf5",
        "58064f11cd5dd981118aa29c",
        "580657692a4f8e8160c49b6f",
        "58065439cbfa7d81497fe8a2",
        "5806529c868f85812eb9f2d8",
        "5806529b868f85812eb9f2c5",
        "5806579a2a4f8e8160c49bba",
        "58064f33cd5dd981118aa2ed",
        "58065afb29169f816f05d1e2",
        "58065151868f85812eb9f150",
        "580657992a4f8e8160c49baf",
        "58065212868f85812eb9f24c",
        "5806556f11337e81519b5443",
        "58064f13cd5dd981118aa2a2",
        "58064e77a05fd98101c67277",
        "580657f32a4f8e8160c49c75",
        "58065416cbfa7d81497fe86a",
        "58065afa29169f816f05d1de",
        "58064eb12120e2810a5e0320",
        "580655b711337e81519b549e",
        "5806584c2a4f8e8160c49cd8",
        "580652f4868f85812eb9f394",
        "580653bfcbfa7d81497fe7c9",
        "58064d77af05f980ef9eaa84",
        "58064e64a05fd98101c6723f",
        "58064df57c476280f8b3316c",
        "58064e9c2120e2810a5e0314",
        "5806559e11337e81519b547a",
        "58064e097c476280f8b331b8",
        "580657742a4f8e8160c49b71",
        "58064e067c476280f8b331ae",
        "580652b7868f85812eb9f328",
        "58064d95af05f980ef9eaab9",
        "5806559f11337e81519b548b",
        "58064fa09e84498120e7cbd6",
        "58065e9714a214818555f2c8",
        "58064d95af05f980ef9eaab7",
        "580652c9868f85812eb9f354",
        "58065426cbfa7d81497fe87d",
        "58064d91af05f980ef9eaaab",
        "58064d73af05f980ef9eaa78",
        "58064dfa7c476280f8b33184",
        "58065388cbfa7d81497fe765",
        "5806572d2a4f8e8160c49b37",
        "58064e6ba05fd98101c67261",
        "58065ee114a214818555f373",
        "5806554c11337e81519b5416",
        "58065ef814a214818555f381",
        "580657f32a4f8e8160c49c74",
        "58064df87c476280f8b3317d",
        "580652a7868f85812eb9f2fd",
        "58064e0b7c476280f8b331bb",
        "580651fa868f85812eb9f22d",
        "58065de514a214818555f257",
        "5806559f11337e81519b5484",
        "580652f4868f85812eb9f390",
        "5806437851275a805bf3f1e6",
        "58065166868f85812eb9f18d",
        "580655cc11337e81519b54a6",
        "580653ffcbfa7d81497fe83f",
        "58064e77a05fd98101c67275",
        "58065ee114a214818555f36e",
        "580657e12a4f8e8160c49c47",
        "58064fae9e84498120e7cc04",
        "580653accbfa7d81497fe799",
        "58065305868f85812eb9f3be",
        "58065ea514a214818555f2e7",
        "580657f32a4f8e8160c49c70",
        "580653b5cbfa7d81497fe7b5",
        "580652a7868f85812eb9f2f1",
        "58065a5b29169f816f05d192",
        "5806547ccbfa7d81497fe919",
        "580652b5868f85812eb9f324",
        "580652e7868f85812eb9f35b",
        "58065a7629169f816f05d1a2",
        "580657fe2a4f8e8160c49c91",
        "5806548dcbfa7d81497fe934",
        "58064f30cd5dd981118aa2e1",
        "580657f32a4f8e8160c49c76",
        "58064d9aaf05f980ef9eaac7",
        "58065a5229169f816f05d189",
        "580651fa868f85812eb9f236",
        "580657e32a4f8e8160c49c53",
        "58064d93af05f980ef9eaab4",
        "58065a5329169f816f05d18b",
        "5806539ccbfa7d81497fe78c",
        "580537853ca7247be13fe4ea",
        "5806529b868f85812eb9f2c1",
        "58065d432418ec817d098a3a",
        "580537863ca7247be13fe4f4",
        "58065d362418ec817d098a22",
        "5806558e11337e81519b546c",
        "580651e9868f85812eb9f20b",
        "58064e6ba05fd98101c6725f",
        "58065e9714a214818555f2cc",
        "580652e7868f85812eb9f35e",
        "58065166868f85812eb9f189",
        "58065ea514a214818555f2ef",
        "58065ce22418ec817d0989af",
        "580653eecbfa7d81497fe833",
        "58065426cbfa7d81497fe888",
        "580652b5868f85812eb9f310",
        "58065ce22418ec817d0989b5",
        "580658002a4f8e8160c49ca2",
        "5806529d868f85812eb9f2da",
        "580657f32a4f8e8160c49c71",
        "580537853ca7247be13fe4d9",
        "580652e9868f85812eb9f379",
        "58065a9029169f816f05d1a8",
        "58065eb814a214818555f310",
        "580653accbfa7d81497fe792",
        "58065ed514a214818555f359",
        "580657f22a4f8e8160c49c63",
        "5806555811337e81519b542f",
        "58065b3629169f816f05d200",
        "5806546bcbfa7d81497fe907",
        "580652e8868f85812eb9f360",
        "58064e74a05fd98101c6726e",
        "580643aeb624f68064c5bdaf",
        "580653b5cbfa7d81497fe7be",
        "5806554b11337e81519b5412",
        "580537833ca7247be13fe472",
        "58065d502418ec817d098a4c",
        "58065d292418ec817d098a10",
        "58064f23cd5dd981118aa2bf",
        "5806578f2a4f8e8160c49b94",
        "580657f22a4f8e8160c49c5e",
        "58065e6814a214818555f271",
        "5806558e11337e81519b5469",
        "580655b711337e81519b5498",
        "580537843ca7247be13fe494",
        "580651bf868f85812eb9f1b3",
        "58065a5d29169f816f05d195",
        "58065235868f85812eb9f29d",
        "58065446cbfa7d81497fe8c1",
        "58064e61a05fd98101c6723c",
        "58064d91af05f980ef9eaaa9",
        "58065eb914a214818555f31a",
        "58065de414a214818555f256",
        "58065ed514a214818555f347",
        "58065439cbfa7d81497fe8a8",
        "580657f32a4f8e8160c49c77",
        "58065b5829169f816f05d20e",
        "580655b711337e81519b5495",
        "58065182868f85812eb9f1b0",
        "5806529d868f85812eb9f2e1",
        "580537833ca7247be13fe46e",
        "58065b5829169f816f05d212",
        "58064f11cd5dd981118aa29d",
        "58065e9714a214818555f2d5",
        "58064e6aa05fd98101c67253",
        "58065ad829169f816f05d1cf",
        "58065400cbfa7d81497fe845",
        "580537853ca7247be13fe4e2",
        "58064e097c476280f8b331b9",
        "58065ef914a214818555f38a",
        "580655b711337e81519b5493",
        "58065400cbfa7d81497fe84c",
        "58064d97af05f980ef9eaac3",
        "580653cccbfa7d81497fe7e2",
        "5806548dcbfa7d81497fe936",
        "580651ea868f85812eb9f20f",
        "580657452a4f8e8160c49b4a",
        "580651f8868f85812eb9f219",
        "58064f1ccd5dd981118aa2ae",
        "58065181868f85812eb9f19e",
        "580537853ca7247be13fe4d8",
        "58065d0a2418ec817d0989d5",
        "5806548dcbfa7d81497fe92f",
        "58064f999e84498120e7cbc1",
        "58064f0bcd5dd981118aa280",
        "580537853ca7247be13fe4ba",
        "580653eecbfa7d81497fe827",
        "5806556f11337e81519b5445",
        "580657fe2a4f8e8160c49c8f",
        "58065407cbfa7d81497fe85d",
        "58064e047c476280f8b331a4",
        "580657752a4f8e8160c49b72",
        "58065e8a14a214818555f2b4",
        "58064e6ba05fd98101c6725d",
        "580537833ca7247be13fe460",
        "580652b5868f85812eb9f30f",
        "580653d8cbfa7d81497fe80b",
        "58064f11cd5dd981118aa298",
        "58065a9029169f816f05d1ad",
        "58064f30cd5dd981118aa2df",
        "580657832a4f8e8160c49b7d",
        "58064f26cd5dd981118aa2ca",
        "5806546acbfa7d81497fe8f2",
        "58064f33cd5dd981118aa2ea",
        "58065e7314a214818555f28b",
        "58064f13cd5dd981118aa29f",
        "58064e68a05fd98101c6724d",
        "58065459cbfa7d81497fe8e5",
        "5806559e11337e81519b547c",
        "58065ed414a214818555f33c",
        "58064f9e9e84498120e7cbd2",
        "58064f30cd5dd981118aa2dd",
        "5806552911337e81519b53fa",
        "58065159868f85812eb9f15b",
        "58064e067c476280f8b331ac",
        "580651f9868f85812eb9f229",
        "580652b5868f85812eb9f30e",
        "58064eab2120e2810a5e031c",
        "5806546bcbfa7d81497fe906",
        "58065ee014a214818555f362",
        "58064df87c476280f8b3317e",
        "58065d622418ec817d098a60",
        "5806574f2a4f8e8160c49b54",
        "580653d8cbfa7d81497fe7fa",
        "58065afb29169f816f05d1e5",
        "5806522b868f85812eb9f27b",
        "580651ce868f85812eb9f1de",
        "58065160868f85812eb9f175",
        "58064ea02120e2810a5e0318",
        "58065254868f85812eb9f2b7",
        "58065d292418ec817d098a07",
        "58065426cbfa7d81497fe87f",
        "580652a6868f85812eb9f2ea",
        "5806529e868f85812eb9f2e6",
        "58065d422418ec817d098a32",
        "58065a5d29169f816f05d194",
        "580537843ca7247be13fe483",
        "580652a8868f85812eb9f302",
        "58064f33cd5dd981118aa2ec",
        "580653eecbfa7d81497fe826",
        "58065afb29169f816f05d1e0",
        "5806558111337e81519b545d",
        "58064d7aaf05f980ef9eaa8d",
        "58065152868f85812eb9f155",
        "580652f4868f85812eb9f395",
        "58065e8a14a214818555f2b5",
        "580653decbfa7d81497fe813",
        "5806558111337e81519b545a",
        "58065254868f85812eb9f2bd",
        "580537853ca7247be13fe4dc",
        "5806456154027480830ccd6b",
        "580657fe2a4f8e8160c49c89",
        "58065b5829169f816f05d211",
        "58064e61a05fd98101c6723a",
        "580652c7868f85812eb9f348",
        "58065b3629169f816f05d204",
        "580652c7868f85812eb9f347",
        "58064e74a05fd98101c67271",
        "580651c1868f85812eb9f1d3",
        "58064e0b7c476280f8b331c0",
        "58064f0dcd5dd981118aa288",
        "5806556311337e81519b5433",
        "58065ef914a214818555f38f",
        "58064f19cd5dd981118aa2a6",
        "58065d622418ec817d098a6d",
        "580653cccbfa7d81497fe7df",
        "58065439cbfa7d81497fe8a7",
        "58065400cbfa7d81497fe842",
        "5806574f2a4f8e8160c49b5a",
        "58064cd15564f580e70fc3b1",
        "5806546acbfa7d81497fe900",
        "58065446cbfa7d81497fe8c2",
        "580653d8cbfa7d81497fe7f9",
        "580537853ca7247be13fe4d4",
        "5806549ccbfa7d81497fe956",
        "58065b1029169f816f05d1e8",
        "58065a7629169f816f05d1a3",
        "5806547ccbfa7d81497fe914",
        "58065d372418ec817d098a29",
        "580652a9868f85812eb9f30a",
        "5806554c11337e81519b5414",
        "58065ee114a214818555f374",
        "5806546acbfa7d81497fe904",
        "580652f4868f85812eb9f392",
        "5806456154027480830ccd66",
        "580651bf868f85812eb9f1b5",
        "580537843ca7247be13fe489",
        "580651ce868f85812eb9f1dc",
        "58064f0bcd5dd981118aa285",
        "580652c7868f85812eb9f344",
        "580652a9868f85812eb9f306",
        "580537843ca7247be13fe4a7",
        "580657fe2a4f8e8160c49c8c",
        "58064df67c476280f8b3316f",
        "58064e66a05fd98101c67246",
        "58064fac9e84498120e7cbfd",
        "58064f2acd5dd981118aa2d6",
        "580537853ca7247be13fe4d2",
        "58064fa69e84498120e7cbea",
        "58065d0a2418ec817d0989cb",
        "580653ffcbfa7d81497fe840",
        "5806456154027480830ccd68",
        "58065426cbfa7d81497fe883",
        "5806552911337e81519b53fb",
        "58065160868f85812eb9f177",
        "5806522b868f85812eb9f26e",
        "58065182868f85812eb9f1b2",
        "5806552911337e81519b53f6",
        "58064f9b9e84498120e7cbc9",
        "580653eecbfa7d81497fe836",
        "5806558111337e81519b5461",
        "58065e9814a214818555f2d6",
        "580537843ca7247be13fe476",
        "58064f9d9e84498120e7cbce",
        "58065a0d29169f816f05d182",
        "58064e6aa05fd98101c67259",
        "58065e7314a214818555f28e",
        "58065e7314a214818555f286",
        "580652e7868f85812eb9f357",
        "58065214868f85812eb9f25e",
        "580651e8868f85812eb9f1f8",
        "580652f3868f85812eb9f386",
        "580653b5cbfa7d81497fe7b7",
        "58064f2acd5dd981118aa2d3",
        "5806546acbfa7d81497fe8fc",
        "580651e8868f85812eb9f204",
        "580537853ca7247be13fe4bc",
        "58065acb29169f816f05d1ca",
        "580657e12a4f8e8160c49c4a",
        "58064ec22120e2810a5e032c",
        "58064ec62120e2810a5e032f",
        "58065d292418ec817d098a0b",
        "580657362a4f8e8160c49b42",
        "580651ce868f85812eb9f1e0",
        "58065160868f85812eb9f16c",
        "58065445cbfa7d81497fe8c0",
        "58065e6714a214818555f267",
        "58064e067c476280f8b331ab",
        "58065b1029169f816f05d1e9",
        "58064e77a05fd98101c67278",
        "5806578f2a4f8e8160c49b98",
        "58065d0a2418ec817d0989d0",
        "58064d77af05f980ef9eaa83",
        "58065213868f85812eb9f250",
        "58065e9714a214818555f2d4",
        "58064dfc7c476280f8b33194",
        "58065ed414a214818555f33d",
        "58065391cbfa7d81497fe777",
        "58065a5429169f816f05d18d",
        "58065254868f85812eb9f2a1",
        "58064e5ba05fd98101c67230",
        "58065ee014a214818555f367",
        "58065212868f85812eb9f241",
        "58065160868f85812eb9f173",
        "580657682a4f8e8160c49b69",
        "58064d6faf05f980ef9eaa72",
        "580657912a4f8e8160c49ba6",
        "58064f0fcd5dd981118aa291",
        "58065459cbfa7d81497fe8df",
        "58064e56a05fd98101c67228",
        "58064d95af05f980ef9eaabc",
        "58065235868f85812eb9f290",
        "5806555811337e81519b5429",
        "58064e64a05fd98101c67242",
        "58064dfa7c476280f8b33188",
        "580653b5cbfa7d81497fe7ae",
        "580653decbfa7d81497fe817",
        "5806546acbfa7d81497fe8f1",
        "580537853ca7247be13fe4b2",
        "58065d0a2418ec817d0989d7",
        "5806574f2a4f8e8160c49b56",
        "58065427cbfa7d81497fe894",
        "58064f26cd5dd981118aa2d1",
        "58064e56a05fd98101c67229",
        "58065e8914a214818555f2ab",
        "58065407cbfa7d81497fe858",
        "58064f09cd5dd981118aa27a",
        "58065e8014a214818555f2a4",
        "58065ae729169f816f05d1d7",
        "58065d372418ec817d098a24",
        "58065d622418ec817d098a69",
        "580657fe2a4f8e8160c49c98",
        "58065ce22418ec817d0989b6",
        "580537853ca7247be13fe4c2",
        "5806539ccbfa7d81497fe78b",
        "580657682a4f8e8160c49b67",
        "58065416cbfa7d81497fe86d",
        "5806558111337e81519b545f",
        "58065aca29169f816f05d1c3",
        "5806555811337e81519b5428",
        "580652a6868f85812eb9f2e9",
        "580651cf868f85812eb9f1f3",
        "580652f4868f85812eb9f399",
        "58065407cbfa7d81497fe85c",
        "58064d9caf05f980ef9eaacb",
        "5806584a2a4f8e8160c49cc7",
        "5806553c11337e81519b540b",
        "5806549ccbfa7d81497fe943",
        "58064f1fcd5dd981118aa2b6",
        "5806584b2a4f8e8160c49cd1",
        "580653bfcbfa7d81497fe7c3",
        "58064df67c476280f8b33173",
        "58065ec714a214818555f334",
        "580652e7868f85812eb9f359",
        "5806548dcbfa7d81497fe922",
        "58065ee114a214818555f36d",
        "58065e9714a214818555f2d3",
        "58065ef914a214818555f389",
        "58064dfd7c476280f8b33199",
        "58065cf92418ec817d0989c1",
        "580653decbfa7d81497fe80f",
        "580651f9868f85812eb9f228",
        "580653ffcbfa7d81497fe83b",
        "580657e32a4f8e8160c49c59",
        "58065459cbfa7d81497fe8d9",
        "58064f9e9e84498120e7cbd4",
        "5806584a2a4f8e8160c49ccc",
        "58064f0fcd5dd981118aa28f",
        "58064f9b9e84498120e7cbc6",
        "5806584c2a4f8e8160c49cd4",
        "5806574f2a4f8e8160c49b53",
        "580653accbfa7d81497fe794",
        "58065e8014a214818555f2a9",
        "58065af929169f816f05d1dc",
        "5806551411337e81519b53e0",
        "580657f22a4f8e8160c49c66",
        "58064f13cd5dd981118aa2a0",
        "58065e9914a214818555f2e1",
        "58065212868f85812eb9f244",
        "58064e6da05fd98101c67269",
        "580651c1868f85812eb9f1d0",
        "580658132a4f8e8160c49cb4",
        "58065445cbfa7d81497fe8bb",
        "580537843ca7247be13fe484",
        "58065ab629169f816f05d1b9",
        "580653cccbfa7d81497fe7ec",
        "5806522c868f85812eb9f27f",
        "58064d7aaf05f980ef9eaa8c",
        "58064fab9e84498120e7cbf8",
        "5806408b6dcddf8010f371e8",
        "58065aa129169f816f05d1b4",
        "580537843ca7247be13fe4a2",
        "5806408b6dcddf8010f371ee",
        "580655cc11337e81519b54a8",
        "58064f30cd5dd981118aa2e2",
        "58064f9e9e84498120e7cbd5",
        "580657992a4f8e8160c49bb2",
        "58064dfd7c476280f8b33197",
        "58064df57c476280f8b3316e",
        "58065212868f85812eb9f249",
        "58065417cbfa7d81497fe877",
        "5806554c11337e81519b5418",
        "58065446cbfa7d81497fe8cb",
        "580657682a4f8e8160c49b68",
        "58065d362418ec817d098a16",
        "58065ce22418ec817d0989b8",
        "58065e8014a214818555f2a5",
        "580652f3868f85812eb9f37e",
        "580653decbfa7d81497fe81b",
        "58065a5229169f816f05d18a",
        "58065d752418ec817d098a81",
        "580651f9868f85812eb9f225",
        "580652c7868f85812eb9f33e",
        "580657832a4f8e8160c49b7e",
        "580652b5868f85812eb9f31a",
        "58064d73af05f980ef9eaa7b",
        "58064d75af05f980ef9eaa7f",
        "58065391cbfa7d81497fe76b",
        "580653c0cbfa7d81497fe7da",
        "58065181868f85812eb9f1ab",
        "580653decbfa7d81497fe81c",
        "58064f33cd5dd981118aa2eb",
        "580653b5cbfa7d81497fe7ad",
        "58064ec02120e2810a5e032b",
        "58064d77af05f980ef9eaa85",
        "58065b5829169f816f05d217",
        "580655cd11337e81519b54ba",
        "58064e68a05fd98101c6724b",
        "5806553c11337e81519b5400",
        "580655cd11337e81519b54bc",
        "580651ce868f85812eb9f1e9",
        "5806584b2a4f8e8160c49cd2",
        "5806408a6dcddf8010f371d4",
        "58064d91af05f980ef9eaaad",
        "58065ab829169f816f05d1bf",
        "5806548dcbfa7d81497fe92b",
        "580652a9868f85812eb9f30b",
        "5806529d868f85812eb9f2df",
        "58065eb714a214818555f309",
        "58065cf72418ec817d0989ba",
        "58064dfe7c476280f8b3319e",
        "58064e61a05fd98101c6723b",
        "58065d752418ec817d098a82",
        "580537853ca7247be13fe4d7",
        "58065446cbfa7d81497fe8c5",
        "58065ef814a214818555f37a",
        "5806522b868f85812eb9f270",
        "580653bfcbfa7d81497fe7d4",
        "5806553c11337e81519b540d",
        "58065a7629169f816f05d1a4",
        "580657832a4f8e8160c49b7a",
        "580658132a4f8e8160c49cb2",
        "58065303868f85812eb9f3a1",
        "58065d0a2418ec817d0989da",
        "58065446cbfa7d81497fe8cd",
        "58065ec714a214818555f326",
        "580652e7868f85812eb9f35a",
        "580537853ca7247be13fe4bf",
        "58065d622418ec817d098a63",
        "580537843ca7247be13fe482",
        "5806547ccbfa7d81497fe918",
        "58065d622418ec817d098a5e",
        "580537853ca7247be13fe4e0",
        "58064eba2120e2810a5e0327",
        "580655cd11337e81519b54bb",
        "5806539ccbfa7d81497fe786",
        "580537843ca7247be13fe491",
        "58064f30cd5dd981118aa2de",
        "58064f32cd5dd981118aa2e6",
        "580653bfcbfa7d81497fe7cf",
        "58065ab629169f816f05d1bb",
        "580658132a4f8e8160c49cb6",
        "58065214868f85812eb9f259",
        "58065ef914a214818555f392",
        "580651ce868f85812eb9f1ee",
        "580651ce868f85812eb9f1d9",
        "580653edcbfa7d81497fe81f",
        "58065303868f85812eb9f3aa",
        "58064f05cd5dd981118aa278",
        "58064e64a05fd98101c67241",
        "58064d78af05f980ef9eaa89",
        "58065ce22418ec817d0989b4",
        "58065e6814a214818555f274",
        "5806549ccbfa7d81497fe94a",
        "58064e77a05fd98101c6727a",
        "58065e7214a214818555f283",
        "580651c1868f85812eb9f1c9",
        "58065391cbfa7d81497fe770",
        "580653eecbfa7d81497fe82c",
        "58065d362418ec817d098a20",
        "580537853ca7247be13fe4b7",
        "580652a9868f85812eb9f308",
        "5806556f11337e81519b544d",
        "58064fa39e84498120e7cbe4",
        "58065ef914a214818555f390",
        "58065e9814a214818555f2d7",
        "58064f23cd5dd981118aa2c7",
        "5806553c11337e81519b5406",
        "580658132a4f8e8160c49cbb",
        "580658132a4f8e8160c49cbf",
        "58065426cbfa7d81497fe87e",
        "580655cd11337e81519b54b8",
        "580652b5868f85812eb9f30c",
        "58065ada29169f816f05d1d3",
        "58065235868f85812eb9f291",
        "58065b3629169f816f05d201",
        "58065e9714a214818555f2d0",
        "580658122a4f8e8160c49ca9",
        "58064e9e2120e2810a5e0316",
        "580652e8868f85812eb9f369",
        "58064e047c476280f8b331a3",
        "58064e067c476280f8b331a9",
        "5806539ccbfa7d81497fe77c",
        "58064f1fcd5dd981118aa2b5",
        "58065d502418ec817d098a59",
        "5806584b2a4f8e8160c49cce",
        "58065439cbfa7d81497fe8b1",
        "580653eecbfa7d81497fe82b",
        "5806529d868f85812eb9f2dc",
        "5806549ccbfa7d81497fe953",
        "58065e4014a214818555f261",
        "58065415cbfa7d81497fe866",
        "58064df87c476280f8b3317b",
        "5806578f2a4f8e8160c49b8e",
        "5806548dcbfa7d81497fe926",
        "58065e7214a214818555f27a",
        "580657832a4f8e8160c49b82",
        "5806549ccbfa7d81497fe940",
        "580653bfcbfa7d81497fe7c4",
        "580653accbfa7d81497fe7a2",
        "5806549ccbfa7d81497fe94b",
        "580537853ca7247be13fe4ca",
        "58065ea514a214818555f2ed",
        "58065ef914a214818555f391",
        "58064fa09e84498120e7cbda",
        "580652b5868f85812eb9f31c",
        "58064e66a05fd98101c67248",
        "580657832a4f8e8160c49b85",
        "580537843ca7247be13fe495",
        "580651f9868f85812eb9f222",
        "58065ed414a214818555f342",
        "5806552911337e81519b53ed",
        "580651ce868f85812eb9f1e3",
        "58065254868f85812eb9f2b5",
        "58065b1029169f816f05d1eb",
        "58065e8014a214818555f29d",
        "58065303868f85812eb9f3a7",
        "58064dfa7c476280f8b33183",
        "58065b5829169f816f05d21d",
        "5806515a868f85812eb9f15e",
        "58064d93af05f980ef9eaab5",
        "58065ab729169f816f05d1be",
        "58064eba2120e2810a5e0326",
        "580657f22a4f8e8160c49c68",
        "580651ea868f85812eb9f211",
        "5806584c2a4f8e8160c49cda",
        "58064dfc7c476280f8b33196",
        "58065415cbfa7d81497fe867",
        "580653d8cbfa7d81497fe7fe",
        "58064f0dcd5dd981118aa28a",
        "580651ce868f85812eb9f1d7",
        "580655cd11337e81519b54b7",
        "580652f3868f85812eb9f37b",
        "58064e66a05fd98101c67247",
        "580537853ca7247be13fe4b3",
        "58064d71af05f980ef9eaa77",
        "58064f2acd5dd981118aa2d2",
        "58065159868f85812eb9f15a",
        "58065a6629169f816f05d198",
        "5806559f11337e81519b548c",
        "5806555811337e81519b542d",
        "58064e68a05fd98101c6724c",
        "58065b2c29169f816f05d1fd",
        "58065212868f85812eb9f23f",
        "58065e7314a214818555f291",
        "5806555811337e81519b542a",
        "5806554c11337e81519b5419",
        "58065b1029169f816f05d1ed",
        "58065d292418ec817d098a0d",
        "580651f9868f85812eb9f22a",
        "580657e12a4f8e8160c49c43",
        "58064d91af05f980ef9eaaae",
        "5806529c868f85812eb9f2cc",
        "5806522b868f85812eb9f26c",
        "580653decbfa7d81497fe810",
        "580655b711337e81519b5497",
        "58064df87c476280f8b33180",
        "580652c7868f85812eb9f341",
        "580537853ca7247be13fe4bd",
        "580651f9868f85812eb9f21d",
        "58065391cbfa7d81497fe76a",
        "58064d82af05f980ef9eaa9b",
        "580652f4868f85812eb9f38f",
        "58065166868f85812eb9f187",
        "580652e9868f85812eb9f377",
        "5806549dcbfa7d81497fe957",
        "5806552011337e81519b53e7",
        "580653d8cbfa7d81497fe803",
        "58064e6aa05fd98101c67258",
        "5806539ccbfa7d81497fe783",
        "580653d8cbfa7d81497fe809",
        "58065e9814a214818555f2d9",
        "58065160868f85812eb9f171",
        "58065213868f85812eb9f254",
        "58065b1b29169f816f05d1f5",
        "58065ea514a214818555f2e6",
        "58064ec62120e2810a5e032d",
        "58064f1fcd5dd981118aa2ba",
        "580651bf868f85812eb9f1bb",
        "5806529d868f85812eb9f2d9",
        "58065ec714a214818555f324",
        "58065e6814a214818555f26c",
        "58065eb914a214818555f314",
        "5806574f2a4f8e8160c49b59",
        "58064e6aa05fd98101c67252",
        "5806437851275a805bf3f1e4",
        "58065ee014a214818555f368",
        "58065eb914a214818555f313",
        "58065159868f85812eb9f158",
        "5806549ccbfa7d81497fe952",
        "58065cf92418ec817d0989c9",
        "58065d292418ec817d098a0a",
        "5806584a2a4f8e8160c49ccd",
        "58065e6814a214818555f268",
        "58065151868f85812eb9f152",
        "58065b5829169f816f05d21a",
        "580657842a4f8e8160c49b87",
        "580652c9868f85812eb9f351",
        "5806456254027480830ccd72",
        "58065202868f85812eb9f23e",
        "58064fab9e84498120e7cbf9",
        "58065427cbfa7d81497fe890",
        "580651f8868f85812eb9f218",
        "580537853ca7247be13fe4f1",
        "58064f09cd5dd981118aa27c",
        "58065159868f85812eb9f15c",
        "58065304868f85812eb9f3b2",
        "58065ed514a214818555f354",
        "58065cf92418ec817d0989c5",
        "58064fab9e84498120e7cbf7",
        "58064f26cd5dd981118aa2c9",
        "5806522c868f85812eb9f280",
        "5806551411337e81519b53df",
        "580651fb868f85812eb9f23c",
        "58064f2fcd5dd981118aa2db",
        "5806552911337e81519b53fc",
        "580537843ca7247be13fe49c",
        "58064f05cd5dd981118aa277",
        "58065236868f85812eb9f2a0",
        "58065e6814a214818555f26b",
        "5806578f2a4f8e8160c49b8d",
        "58064e6aa05fd98101c67256",
        "58065305868f85812eb9f3bb",
        "58065ab829169f816f05d1c2",
        "58065234868f85812eb9f286",
        "580652f4868f85812eb9f38b",
        "58064df67c476280f8b33170",
        "58064d6faf05f980ef9eaa70",
        "58064e74a05fd98101c67270",
        "580537843ca7247be13fe478",
        "580652e9868f85812eb9f376",
        "58065eb714a214818555f30d",
        "580657912a4f8e8160c49ba5",
        "58065e8914a214818555f2b1",
        "580651c1868f85812eb9f1c4",
        "58065ea614a214818555f2fe",
        "58065e9914a214818555f2dd",
        "58065213868f85812eb9f251",
        "58064e077c476280f8b331b1",
        "580658132a4f8e8160c49cb8",
        "58065160868f85812eb9f16e",
        "58064fa09e84498120e7cbdb",
        "580652e8868f85812eb9f362",
        "58065212868f85812eb9f245",
        "58064d93af05f980ef9eaab3",
        "5806522a868f85812eb9f264",
        "58064e6ba05fd98101c6725a",
        "58065426cbfa7d81497fe88d",
        "580652f4868f85812eb9f393",
        "58065a3229169f816f05d184",
        "58065ea514a214818555f2f0",
        "58064e5aa05fd98101c6722e",
        "58065303868f85812eb9f3ab",
        "58064d78af05f980ef9eaa88",
        "580652b5868f85812eb9f323",
        "58064ecb2120e2810a5e0332",
        "580537843ca7247be13fe47b",
        "580657e22a4f8e8160c49c4e",
        "580537843ca7247be13fe49a",
        "5806556f11337e81519b5453",
        "580653edcbfa7d81497fe81e",
        "580657342a4f8e8160c49b3b",
        "5806558111337e81519b5460",
        "58064d6faf05f980ef9eaa71",
        "5806584c2a4f8e8160c49cdf",
        "58065445cbfa7d81497fe8bf",
        "58064d73af05f980ef9eaa7a",
        "58065254868f85812eb9f2b3",
        "58065acb29169f816f05d1ce",
        "5806559f11337e81519b5489",
        "580653decbfa7d81497fe812",
        "58065ed414a214818555f344",
        "58065eb714a214818555f304",
        "580657fe2a4f8e8160c49c8b",
        "58064f999e84498120e7cbc2",
        "58064e047c476280f8b331a7",
        "58064dee7c476280f8b33164",
        "580652b5868f85812eb9f313",
        "58065181868f85812eb9f1a0",
        "5806556311337e81519b543a",
        "58065303868f85812eb9f39e",
        "580651ce868f85812eb9f1ea",
        "58065ee114a214818555f36b",
        "58065afa29169f816f05d1df",
        "58064f0fcd5dd981118aa28e",
        "58065b2b29169f816f05d1f8",
        "5806515a868f85812eb9f167",
        "580537863ca7247be13fe4fa",
        "58064fac9e84498120e7cc00",
        "5806556311337e81519b543c",
        "58065e8014a214818555f2a2",
        "58064fa69e84498120e7cbe9",
        "580651f9868f85812eb9f21c",
        "58064e68a05fd98101c6724e",
        "580537843ca7247be13fe4ae",
        "5806548dcbfa7d81497fe932",
        "580651c1868f85812eb9f1d2",
        "580653bfcbfa7d81497fe7d5",
        "58065235868f85812eb9f297",
        "58065ed514a214818555f348",
        "58065254868f85812eb9f2b0",
        "58065151868f85812eb9f14f",
        "580651fa868f85812eb9f22c",
        "58065181868f85812eb9f1a6",
        "58064f23cd5dd981118aa2c3",
        "58064f11cd5dd981118aa29b",
        "58065ce22418ec817d0989ae",
        "58065391cbfa7d81497fe768",
        "58065b5829169f816f05d216",
        "58064dfd7c476280f8b3319a",
        "58065439cbfa7d81497fe89f",
        "5806545acbfa7d81497fe8ec",
        "58065d372418ec817d098a26",
        "58065b1029169f816f05d1ea",
        "58064dfe7c476280f8b331a0",
        "58065212868f85812eb9f246",
        "58065eb714a214818555f301",
        "58065391cbfa7d81497fe77a",
        "580658132a4f8e8160c49cb9",
        "5806408b6dcddf8010f371e5",
        "58065ed514a214818555f34b",
        "58065ee114a214818555f377",
        "580653cccbfa7d81497fe7de",
        "580652b5868f85812eb9f317",
        "580652e7868f85812eb9f35d",
        "580651e8868f85812eb9f206",
        "58065445cbfa7d81497fe8b7",
        "58065459cbfa7d81497fe8e3",
        "58065d292418ec817d0989fc",
        "5806584c2a4f8e8160c49ce2",
        "580651e8868f85812eb9f205",
        "58065ed414a214818555f340",
        "580537843ca7247be13fe474",
        "58065afb29169f816f05d1e1",
        "580657902a4f8e8160c49b9f",
        "580651c1868f85812eb9f1c6",
        "580657f22a4f8e8160c49c6b",
        "580655cc11337e81519b54ab",
        "580653eecbfa7d81497fe837",
        "5806584b2a4f8e8160c49cd3",
        "580651c1868f85812eb9f1cb",
        "5806522b868f85812eb9f271",
        "580651c1868f85812eb9f1c2",
        "58065ea514a214818555f2f6",
        "58064ec02120e2810a5e0329",
        "58065acb29169f816f05d1cd",
        "58064dfe7c476280f8b331a1",
        "58065180868f85812eb9f193",
        "58065d432418ec817d098a40",
        "58064dfc7c476280f8b33191",
        "580653eecbfa7d81497fe834",
        "58065e8b14a214818555f2c3",
        "58065234868f85812eb9f288",
        "58065a7429169f816f05d19e",
        "580657f32a4f8e8160c49c79",
        "58064df47c476280f8b33166",
        "580655b711337e81519b5499",
        "58065445cbfa7d81497fe8be",
        "58065d0a2418ec817d0989db",
        "58065254868f85812eb9f2ab",
        "580653d8cbfa7d81497fe7fc",
        "58065391cbfa7d81497fe771",
        "5806548dcbfa7d81497fe92e",
        "580655cd11337e81519b54bf",
        "580655b711337e81519b549b",
        "580653accbfa7d81497fe796",
        "580653bfcbfa7d81497fe7cb",
        "5806546acbfa7d81497fe8fb",
        "5806552911337e81519b53f2",
        "58064dfc7c476280f8b33193",
        "58064d97af05f980ef9eaac2",
        "5806556e11337e81519b543f",
        "58064df97c476280f8b33182",
        "58064f2acd5dd981118aa2d5",
        "580657f32a4f8e8160c49c7b",
        "580653accbfa7d81497fe791",
        "58065d292418ec817d098a01",
        "58064f1fcd5dd981118aa2b8",
        "58065cf92418ec817d0989c7",
        "58065212868f85812eb9f247",
        "58065234868f85812eb9f285",
        "58065416cbfa7d81497fe869",
        "58064f08cd5dd981118aa279",
        "58064f26cd5dd981118aa2cf",
        "58065ea514a214818555f2f4",
        "580537843ca7247be13fe4a9",
        "58064df57c476280f8b3316a",
        "58065a6829169f816f05d19b",
        "580651bf868f85812eb9f1bd",
        "58064d80af05f980ef9eaa99",
        "5806529c868f85812eb9f2c9",
        "5806556311337e81519b5432",
        "5806522a868f85812eb9f266",
        "58065165868f85812eb9f17d",
        "58064d9aaf05f980ef9eaac9",
        "580652c7868f85812eb9f349",
        "580651f9868f85812eb9f226",
        "58065d292418ec817d098a13",
        "58065ed514a214818555f357",
        "58064df77c476280f8b33177",
        "58065181868f85812eb9f19a",
        "58065ef814a214818555f37d",
        "58064dfa7c476280f8b33186",
        "580651ce868f85812eb9f1e1",
        "58065e9814a214818555f2da",
        "580537843ca7247be13fe477",
        "58064d6caf05f980ef9eaa6c",
        "58065ea514a214818555f2ee",
        "58064d82af05f980ef9eaa9c",
        "58065439cbfa7d81497fe8a3",
        "5806553c11337e81519b5405",
        "58065235868f85812eb9f29f",
        "5806547ccbfa7d81497fe913",
        "58064f09cd5dd981118aa27d",
        "58065e5814a214818555f266",
        "580651ce868f85812eb9f1da",
        "580657e32a4f8e8160c49c5a",
        "5806548dcbfa7d81497fe92d",
        "58064df67c476280f8b33174",
        "58065d0a2418ec817d0989dd",
        "58065180868f85812eb9f190",
        "580652c6868f85812eb9f333",
        "58065a4529169f816f05d186",
        "58065180868f85812eb9f191",
        "58065235868f85812eb9f293",
        "580652a8868f85812eb9f300",
        "5806456154027480830ccd65",
        "58065b1b29169f816f05d1f4",
        "5806548dcbfa7d81497fe924",
        "58064fa69e84498120e7cbe7",
        "5806552011337e81519b53ea",
        "580652b5868f85812eb9f30d",
        "58065166868f85812eb9f18e",
        "58064d8faf05f980ef9eaa9f",
        "5806547ccbfa7d81497fe91c",
        "580657f22a4f8e8160c49c61",
        "580651ce868f85812eb9f1e5",
        "580537853ca7247be13fe4ee",
        "580653d8cbfa7d81497fe7f6",
        "58065ef914a214818555f385",
        "58065ae829169f816f05d1d9",
        "5806579a2a4f8e8160c49bb9",
        "58065ab629169f816f05d1bc",
        "58065d362418ec817d098a1d",
        "580658142a4f8e8160c49cc4",
        "580653bfcbfa7d81497fe7c6",
        "58065d432418ec817d098a36",
        "580651c1868f85812eb9f1c8",
        "58065439cbfa7d81497fe89d",
        "5806553c11337e81519b5401",
        "58065304868f85812eb9f3af",
        "58065254868f85812eb9f2bc",
        "58065d292418ec817d098a09",
        "58065415cbfa7d81497fe864",
        "5806556211337e81519b5431",
        "58064e59a05fd98101c6722a",
        "58064e6da05fd98101c67267",
        "5806558e11337e81519b546e",
        "58065d1c2418ec817d0989e2",
        "58065a5329169f816f05d18c",
        "58064eba2120e2810a5e0325",
        "580537843ca7247be13fe475",
        "5806552911337e81519b53f9",
        "58065254868f85812eb9f2a8",
        "58065ec714a214818555f330",
        "58065cc02418ec817d0989ab",
        "580537853ca7247be13fe4c1",
        "58064e53a05fd98101c67226",
        "58064dfb7c476280f8b3318a",
        "58065213868f85812eb9f252",
        "58064ec82120e2810a5e0330",
        "58065d362418ec817d098a15",
        "580651fb868f85812eb9f23d",
        "580652a9868f85812eb9f309",
        "58064f23cd5dd981118aa2c1",
        "58064ebd2120e2810a5e0328",
        "5806551411337e81519b53de",
        "580537843ca7247be13fe488",
        "580652a7868f85812eb9f2ef",
        "580651fa868f85812eb9f233",
        "5806522b868f85812eb9f274",
        "58064e64a05fd98101c67243",
        "5806522a868f85812eb9f260",
        "5806408a6dcddf8010f371d7",
        "580653eecbfa7d81497fe82e",
        "5806573b2a4f8e8160c49b44",
        "580651ea868f85812eb9f215",
        "58065d1c2418ec817d0989ec",
        "58065eb814a214818555f311",
        "58064e6aa05fd98101c67251",
        "580537843ca7247be13fe47e",
        "58065459cbfa7d81497fe8d8",
        "58065427cbfa7d81497fe892",
        "580653cccbfa7d81497fe7e0",
        "580653bfcbfa7d81497fe7ca",
        "5806579a2a4f8e8160c49bb8",
        "580652b7868f85812eb9f32c",
        "580537843ca7247be13fe48f",
        "580651fa868f85812eb9f231",
        "58065d742418ec817d098a76",
        "58065445cbfa7d81497fe8b4",
        "5806556311337e81519b5439",
        "58065ada29169f816f05d1d5",
        "5806552911337e81519b53f0",
        "58064df57c476280f8b33169",
        "580653d8cbfa7d81497fe804",
        "58065427cbfa7d81497fe88e",
        "58064f999e84498120e7cbbf",
        "5806572f2a4f8e8160c49b3a",
        "5806408a6dcddf8010f371e1",
        "58065b3629169f816f05d207",
        "58065160868f85812eb9f174",
        "58065416cbfa7d81497fe873",
        "58064e59a05fd98101c6722d",
        "58064f23cd5dd981118aa2c6",
        "58065ea514a214818555f2eb",
        "580653cccbfa7d81497fe7ee",
        "5806529c868f85812eb9f2ca",
        "58065e8014a214818555f296",
        "580655cc11337e81519b54ae",
        "58065d292418ec817d098a14",
        "58065438cbfa7d81497fe89c",
        "580537843ca7247be13fe48b",
        "580657f32a4f8e8160c49c6e",
        "580653d8cbfa7d81497fe80a",
        "580651e9868f85812eb9f20c",
        "580537863ca7247be13fe4f3",
        "5806554c11337e81519b541b",
        "58065ef914a214818555f386",
        "5806551411337e81519b53e1",
        "58064fac9e84498120e7cbfe",
        "5806556f11337e81519b5442",
        "580658132a4f8e8160c49cbd",
        "58065acb29169f816f05d1cc",
        "5806555811337e81519b5423",
        "580652f3868f85812eb9f381",
        "58065ce22418ec817d0989b2",
        "58065d502418ec817d098a4a",
        "5806575a2a4f8e8160c49b5e",
        "58065407cbfa7d81497fe857",
        "58065adb29169f816f05d1d6",
        "5806437951275a805bf3f1e9",
        "580657682a4f8e8160c49b6b",
        "58065ee014a214818555f365",
        "58065303868f85812eb9f3a6",
        "5806551311337e81519b53dc",
        "58065ed514a214818555f355",
        "580537843ca7247be13fe47c",
        "58064e047c476280f8b331a8",
        "58064e61a05fd98101c6723d",
        "58065235868f85812eb9f296",
        "58064dfe7c476280f8b3319f",
        "580537833ca7247be13fe470",
        "58064e067c476280f8b331af",
        "58065d502418ec817d098a52",
        "58065254868f85812eb9f2bb",
        "58065416cbfa7d81497fe874",
        "5806547ccbfa7d81497fe91d",
        "580655cc11337e81519b54a3",
        "58065400cbfa7d81497fe84d",
        "58065439cbfa7d81497fe8a9",
        "580537573ca7247be13fe423",
        "58064d95af05f980ef9eaabd",
        "58065ea514a214818555f2f5",
        "580652c6868f85812eb9f335",
        "58065415cbfa7d81497fe863",
        "58065d432418ec817d098a34",
        "580651ce868f85812eb9f1ec",
        "58065180868f85812eb9f196",
        "5806555811337e81519b5422",
        "58065426cbfa7d81497fe881",
        "58065214868f85812eb9f25c",
        "58065254868f85812eb9f2a3",
        "580653cccbfa7d81497fe7f0",
        "58065acb29169f816f05d1c8",
        "58064e6ca05fd98101c67263",
        "5806547ccbfa7d81497fe917",
        "58064ea62120e2810a5e031b",
        "580655b711337e81519b54a0",
        "58065aa129169f816f05d1b8",
        "580653eecbfa7d81497fe835",
        "58065ec714a214818555f328",
        "580655cc11337e81519b54ad",
        "580653ffcbfa7d81497fe839",
        "580537853ca7247be13fe4b4",
        "580657992a4f8e8160c49bb6",
        "580653accbfa7d81497fe797",
        "580651ce868f85812eb9f1e6",
        "580537853ca7247be13fe4b9",
        "580657fd2a4f8e8160c49c81",
        "58065d372418ec817d098a2b",
        "5806547ccbfa7d81497fe91a",
        "58065415cbfa7d81497fe862",
        "58064d9caf05f980ef9eaaca",
        "58065d292418ec817d098a05",
        "580657f12a4f8e8160c49c5c",
        "58065ce12418ec817d0989ac",
        "58064e097c476280f8b331b3",
        "580652c7868f85812eb9f339",
        "58065b1a29169f816f05d1ef",
        "5806556f11337e81519b544f",
        "58065b5829169f816f05d20d",
        "580651e8868f85812eb9f207",
        "580657762a4f8e8160c49b73",
        "58065438cbfa7d81497fe899",
        "580653accbfa7d81497fe7a1",
        "58065438cbfa7d81497fe898",
        "58064f0bcd5dd981118aa27f",
        "58064ec62120e2810a5e032e",
        "580655cc11337e81519b54ac",
        "58065400cbfa7d81497fe849",
        "58065ed414a214818555f343",
        "58065ab629169f816f05d1bd",
        "580652c6868f85812eb9f332",
        "5806408a6dcddf8010f371da",
        "580657e12a4f8e8160c49c41",
        "58065234868f85812eb9f28a",
        "58065e9714a214818555f2d1",
        "58064f23cd5dd981118aa2c0",
        "5806546acbfa7d81497fe8f5",
        "58064d78af05f980ef9eaa8a",
        "5806558e11337e81519b5474",
        "58064e5ca05fd98101c67233",
        "580651d0868f85812eb9f1f4",
        "580651bf868f85812eb9f1ba",
        "580657f32a4f8e8160c49c7a",
        "58065416cbfa7d81497fe86f",
        "580651e9868f85812eb9f20e",
        "58065e7214a214818555f27e",
        "580537843ca7247be13fe4ac",
        "580651fa868f85812eb9f232",
        "5806549ccbfa7d81497fe946",
        "5806558111337e81519b545b",
        "58065aca29169f816f05d1c4",
        "5806522c868f85812eb9f27e",
        "58064cd15564f580e70fc3ae",
        "580653ffcbfa7d81497fe83e",
        "58065160868f85812eb9f16f",
        "580657f32a4f8e8160c49c7c",
        "5806437951275a805bf3f1e8",
        "580537853ca7247be13fe4b6",
        "58065d622418ec817d098a68",
        "5806578f2a4f8e8160c49b9d",
        "58065213868f85812eb9f255",
        "580657f32a4f8e8160c49c80",
        "58065459cbfa7d81497fe8e2",
        "58064f13cd5dd981118aa29e",
        "5806539ccbfa7d81497fe782",
        "58065d622418ec817d098a6c",
        "580655cd11337e81519b54af",
        "58065d622418ec817d098a67",
        "58065d1c2418ec817d0989ee",
        "58064e61a05fd98101c67238",
        "58065234868f85812eb9f28c",
        "58065e7214a214818555f27f",
        "580657e12a4f8e8160c49c4d",
        "580537863ca7247be13fe4f2",
        "580653bfcbfa7d81497fe7d2",
        "5806546ccbfa7d81497fe90a",
        "58064d73af05f980ef9eaa7c",
        "58065407cbfa7d81497fe850",
        "58065165868f85812eb9f182",
        "58064eb72120e2810a5e0322",
        "5806548dcbfa7d81497fe931",
        "580653decbfa7d81497fe815",
        "5806554c11337e81519b5417",
        "58064f30cd5dd981118aa2e0",
        "580653d8cbfa7d81497fe802",
        "580651f9868f85812eb9f221",
        "580657992a4f8e8160c49bb5",
        "58065213868f85812eb9f256",
        "5806556311337e81519b543b",
        "580657672a4f8e8160c49b66",
        "5806578f2a4f8e8160c49b93",
        "580537833ca7247be13fe471",
        "58065ed414a214818555f345",
        "58065e8014a214818555f2a8",
        "58065a9029169f816f05d1ab",
        "58065ef914a214818555f384",
        "58064f23cd5dd981118aa2be",
        "58065304868f85812eb9f3b9",
        "58064fa99e84498120e7cbf6",
        "58065407cbfa7d81497fe856",
        "580655ce11337e81519b54c4",
        "580652f2868f85812eb9f37a",
        "58064e64a05fd98101c67240",
        "58064fa39e84498120e7cbe2",
        "58065254868f85812eb9f2a5",
        "58065de314a214818555f253",
        "58065439cbfa7d81497fe8a6",
        "5806555811337e81519b5425",
        "580537863ca7247be13fe4f9",
        "5806555811337e81519b542b",
        "58064fa89e84498120e7cbf2",
        "58065d1d2418ec817d0989f0",
        "580657f32a4f8e8160c49c7e",
        "58064d7aaf05f980ef9eaa90",
        "58064d7eaf05f980ef9eaa93",
        "58064e067c476280f8b331b0",
        "580651fa868f85812eb9f22e",
        "58065ec714a214818555f335",
        "58064df47c476280f8b33167",
        "58065181868f85812eb9f1a5",
        "58065d622418ec817d098a6a",
        "58065416cbfa7d81497fe86b",
        "580653cccbfa7d81497fe7eb",
        "58064fa89e84498120e7cbef",
        "5806522b868f85812eb9f276",
        "58064f2acd5dd981118aa2d4",
        "5806437851275a805bf3f1e5",
        "58064f26cd5dd981118aa2d0",
        "58065ef914a214818555f387",
        "5806529d868f85812eb9f2e2",
        "58065d0a2418ec817d0989d6",
        "58064d97af05f980ef9eaac4",
        "580657fd2a4f8e8160c49c87",
        "58065400cbfa7d81497fe847",
        "580537853ca7247be13fe4ec",
        "5806548dcbfa7d81497fe939",
        "58065e7214a214818555f279",
        "5806546acbfa7d81497fe901",
        "580652b5868f85812eb9f31d",
        "5806578f2a4f8e8160c49b95",
        "5806408a6dcddf8010f371e0",
        "5806584b2a4f8e8160c49ccf",
        "580653accbfa7d81497fe79a",
        "58065ee114a214818555f371",
        "5806522a868f85812eb9f263",
        "5806584c2a4f8e8160c49cde",
        "580537853ca7247be13fe4de",
        "580657f32a4f8e8160c49c6d",
        "5806556f11337e81519b5446",
        "5806579b2a4f8e8160c49bc3",
        "580657452a4f8e8160c49b49",
        "58065a4429169f816f05d185",
        "580655cd11337e81519b54b0",
        "580655cc11337e81519b54a4",
        "58065391cbfa7d81497fe76f",
        "58065388cbfa7d81497fe767",
        "5806529c868f85812eb9f2c8",
        "5806578f2a4f8e8160c49b99",
        "580653b5cbfa7d81497fe7b2",
        "580657f22a4f8e8160c49c69",
        "58065181868f85812eb9f1a4",
        "58065e9714a214818555f2d2",
        "5806547ccbfa7d81497fe916",
        "580657832a4f8e8160c49b83",
        "58064fa29e84498120e7cbdf",
        "58064d7caf05f980ef9eaa91",
        "580652a6868f85812eb9f2ec",
        "5806574f2a4f8e8160c49b5b",
        "58065165868f85812eb9f17a",
        "580537853ca7247be13fe4e7",
        "5806522c868f85812eb9f282",
        "58065165868f85812eb9f180",
        "58064d97af05f980ef9eaac1",
        "5806529b868f85812eb9f2c0",
        "58064e68a05fd98101c67250",
        "58065b2c29169f816f05d1fc",
        "580537853ca7247be13fe4ef",
        "58065ef914a214818555f383",
        "58064f9b9e84498120e7cbc7",
        "58064df77c476280f8b33178",
        "5806408b6dcddf8010f371e4",
        "5806579a2a4f8e8160c49bbd",
        "580653d8cbfa7d81497fe7fb",
        "580651ea868f85812eb9f210",
        "58064d73af05f980ef9eaa7d",
        "58065a6829169f816f05d19c",
        "58065aa129169f816f05d1b7",
        "58065d372418ec817d098a2f",
        "580658132a4f8e8160c49cae",
        "5806522b868f85812eb9f26a",
        "58065d502418ec817d098a4f",
        "580655cd11337e81519b54b3",
        "5806559f11337e81519b5482",
        "58065d622418ec817d098a66",
        "58065d362418ec817d098a1e",
        "580651e8868f85812eb9f1fb",
        "58065d292418ec817d0989fd",
        "5806579a2a4f8e8160c49bb7",
        "580657342a4f8e8160c49b3d",
        "58064d9caf05f980ef9eaacd",
        "580657912a4f8e8160c49ba3",
        "58064f00cd5dd981118aa276",
        "580651c1868f85812eb9f1ce",
        "580652e8868f85812eb9f368",
        "580652c8868f85812eb9f34f",
        "5806529b868f85812eb9f2c3",
        "580651cf868f85812eb9f1f0",
        "58065ec714a214818555f31f",
        "580652e8868f85812eb9f365",
        "5806559e11337e81519b5481",
        "580657ff2a4f8e8160c49c9d",
        "58065152868f85812eb9f154",
        "580658132a4f8e8160c49cb5",
        "58065e7214a214818555f277",
        "580651ce868f85812eb9f1e4",
        "58065447cbfa7d81497fe8d4",
        "58065439cbfa7d81497fe8af",
        "580655cd11337e81519b54b1",
        "580537853ca7247be13fe4be",
        "58065a0c29169f816f05d181",
        "58064d71af05f980ef9eaa76",
        "58065388cbfa7d81497fe764",
        "58064e74a05fd98101c6726c",
        "5806559f11337e81519b5487",
        "58064fab9e84498120e7cbfa",
        "58065e8014a214818555f299",
        "58065e0314a214818555f25e",
        "580651e9868f85812eb9f209",
        "580657e32a4f8e8160c49c51",
        "5806547ccbfa7d81497fe90f",
        "58065ab629169f816f05d1ba",
        "580652a7868f85812eb9f2f8",
        "58065446cbfa7d81497fe8c6",
        "580657e12a4f8e8160c49c45",
        "58065aa129169f816f05d1b6",
        "580651e8868f85812eb9f1fd",
        "5806456254027480830ccd6e",
        "5806522c868f85812eb9f283",
        "58064e66a05fd98101c67244",
        "580652f4868f85812eb9f397",
        "58064f2acd5dd981118aa2da",
        "580537843ca7247be13fe492",
        "58065d432418ec817d098a3b",
        "5806556f11337e81519b544b",
        "580657f12a4f8e8160c49c5d",
        "580651f9868f85812eb9f21f",
        "58065d752418ec817d098a88",
        "580653accbfa7d81497fe79c",
        "5806548dcbfa7d81497fe93b",
        "58065181868f85812eb9f1ad",
        "58065d622418ec817d098a61",
        "58065d362418ec817d098a17",
        "58064e6ba05fd98101c67260",
        "580537853ca7247be13fe4d3",
        "58065ae829169f816f05d1da",
        "58065e8014a214818555f2aa",
        "580652e8868f85812eb9f36d",
        "58064d91af05f980ef9eaaaa",
        "58065426cbfa7d81497fe887",
        "58064eab2120e2810a5e031d",
        "58064d7eaf05f980ef9eaa95",
        "58065b2b29169f816f05d1f9",
        "580537843ca7247be13fe4ad",
        "58064d77af05f980ef9eaa82",
        "58065235868f85812eb9f299",
        "58065b3629169f816f05d20b",
        "58065ef814a214818555f379",
        "58065417cbfa7d81497fe878",
        "580655cd11337e81519b54b5",
        "580537853ca7247be13fe4eb",
        "580653c1cbfa7d81497fe7dd",
        "5806545acbfa7d81497fe8e9",
        "58064cd15564f580e70fc3af",
        "58065e6814a214818555f269",
        "5806549ccbfa7d81497fe951",
        "5806548dcbfa7d81497fe929",
        "58065235868f85812eb9f29c",
        "5806575a2a4f8e8160c49b64",
        "58065303868f85812eb9f3a2",
        "58065a9f29169f816f05d1af",
        "58064f26cd5dd981118aa2c8",
        "580651ce868f85812eb9f1eb",
        "58064df57c476280f8b33168",
        "58065407cbfa7d81497fe85a",
        "58065e0d14a214818555f260",
        "580653cccbfa7d81497fe7f2",
        "580652a7868f85812eb9f2f2",
        "58064d6faf05f980ef9eaa73",
        "580651ce868f85812eb9f1e2",
        "580537843ca7247be13fe485",
        "58065459cbfa7d81497fe8d5",
        "58065445cbfa7d81497fe8bd",
        "5806529c868f85812eb9f2d2",
        "5806578f2a4f8e8160c49b8b",
        "58065e9714a214818555f2cb",
        "58064fa09e84498120e7cbd8",
        "5806575a2a4f8e8160c49b63",
    ]

}



module.exports = mainService;
