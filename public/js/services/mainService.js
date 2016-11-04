import "./recMovies.js"
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
            currentUserFbId = results.id;
            postCurrentUser(currentUser);
          }
      })
      return response.data;
    })
  }

  // this.getFbCurrentUser = function(){
  //   return $http.get("/api/facebook").then(function(response){
  //     let results = response.data;
  //     $http.get("/api/users").then(function(userResponse){
  //       let found = false;
  //       userResponse.data.map(function(x, i){
  //         if(x.facebookId == results.id){
  //           currentUser = x;
  //           console.log("Current User", currentUser);
  //           found = true;
  //         }
  //       })
  //       if(!found){
  //         currentUser = {
  //           firstName : results._json.first_name,
  //           lastName : results._json.last_name,
  //           email : results._json.email,
  //           facebookId : results.id,
  //           profileUrl : results.profileUrl,
  //           location : results._json.location,
  //           coverPhotoUrl : results._json.cover.source,
  //           profilePictureUrl : results._json.picture.data.url,
  //           topFive : [],
  //           initRecommended : [],
  //           ratedMoviesOne : [],
  //           ratedMoviesTwo : [],
  //           ratedMoviesThree : [],
  //           ratedMoviesFour : [],
  //           ratedMoviesFive : [],
  //           unseenMovies : [],
  //           watchlist : []
  //         };
  //         currentUserFbId = results.id;
  //         postCurrentUser(currentUser);
  //       }
  //     })
  //     return response.data;
  //   })
  // }

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
    score.totalScore = score.actorScore + score.keywordScore + (score.directorScore / 1.5) + (score.producerScore / 1.5) + (score.writerScore / 1.5);

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

}



module.exports = mainService;
