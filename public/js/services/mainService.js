function mainService($http, $location, $timeout, $q){
  let currentUser = {};
  let currentUserFbId = "";
  let topFive = [];
  let myThis = this;
  let recommendMoviesForMatch = [];
  let initCounter = 0;
  let currentMovie;
  const omdbUrl = "https://api.themoviedb.org/3/"
  const omdbKey = "550&api_key=be7c9a53bfd40a5a3d9aa3c4cf99b5c9";

  this.getFbCurrentUser = function(){
    return $http.get("/api/facebook").then(function(response){
      let results = response.data;
      $http.get(`/api/users/fb/${results.id}`).then(function(userResponse){
        // console.log(userResponse);
        if(userResponse.data.length > 0){
          currentUser = userResponse.data[0];
          // console.log("current user", currentUser);
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
    return $http.get(`${omdbUrl}movie/${obj.id}?${omdbKey}&append_to_response=videos,images,credits,recommendations,keywords,similar`)
    .then(function(response) {
        let results = response.data;
        let movieObj = {
          movieTitle : results.title,
          description : results.overview,
          popularity : results.popularity,
          posterUrl : `http://image.tmdb.org/t/p/w500/${results.poster_path}`,
          releaseDate : results.release_date,
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
          similar : results.similar.results
        }
        if(currentUser.topFive.length < 5){
            // postMovieToDB(movieObj);
            $http.post("/api/movies", movieObj).then(function(response){
              let addedMovie = response.data;
              console.log("added movie", addedMovie);
              currentUser.topFive.push(addedMovie);
              topFive = currentUser.topFive;
              $http.post(`/api/user/${currentUser._id}/topFive`, addedMovie);

              dfd.resolve(topFive);
            });
            // currentUser.topFive.push(addedMovie);
            // topFive = currentUser.topFive;
            // $http.post(`/api/user/${currentUser._id}/topFive`, addedMovie);
        }
        // postGenrePref(movieObj, 3);
        // postLeadActorPref(movieObj, 3);
        // postDirectorPref(movieObj, 3);
        // postProducerPref(movieObj, 3);
        // postWriterPref(movieObj, 3);
        // postKeywordPref(movieObj, 3);
        // postDecadePref(movieObj, 3);
          // console.log("chicken", topFive);
          // return topFive;
          return dfd.promise;
    })
  }

  this.postInitRec = function(){
    let dfd = $q.defer();
    let movieIds = recommendMovieForInitMatch();
    console.log("movieIds", movieIds);
    movieIds = movieIds.slice(0, 40);
    let recommendMoviesArr = [];
    currentUser.initRecommended = [];
    movieIds.forEach(function(x, i){
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
              y.profile_path = "http://localhost:8080/images/no-picture.png"
            } else {
              y.profile_path = `http://image.tmdb.org/t/p/w500/${y.profile_path}`
            }
          })
          movieObj.movieCast.forEach(function(y){
            if(!y.profile_path){
              y.profile_path = "http://localhost:8080/images/no-picture.png"
            } else {
              y.profile_path = `http://image.tmdb.org/t/p/w500/${y.profile_path}`
            }
          })
          // currentUser.initRecommended.push(movieObj);
          $http.post("/api/movies", movieObj).then(function(response){
            console.log();
            currentUser.initRecommended.push(response.data);
            $http.post(`/api/user/${currentUser._id}/initRec`, {_id : response.data._id});
            myThis.recommendMoviesForMatch = currentUser.initRecommended;
          });
          dfd.resolve(myThis.recommendMoviesForMatch)
          // console.log("rec movies arr", myThis.recommendMoviesForMatch);
          console.log("CU rec movies arr", currentUser.initRecommended);
        })
      } else {
        console.log("found duplicate");
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
    $timeout(function(){
      if(currentUser.initialized === false && currentUser.topFive.length === 5){
        $location.path("/getting-started/match")
      } else if(currentUser.initialized === false && currentUser.topFive.length > 0){
        $location.path("/getting-started/favorites")
      } else if(currentUser.initialized === false){
        $location.path("/getting-started")
      } else {
        $location.path("/dashboard")
      }
    }, 1000)
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
      initCounter = currentUser.ratedMoviesOne.length + currentUser.ratedMoviesTwo.length + currentUser.ratedMoviesThree.length + currentUser.ratedMoviesFour.length + currentUser.ratedMoviesFive.length + currentUser.unseenMovies.length;
      let toTwenty = currentUser.ratedMoviesOne.length + currentUser.ratedMoviesTwo.length + currentUser.ratedMoviesThree.length + currentUser.ratedMoviesFour.length + currentUser.ratedMoviesFive.length;

      if(toTwenty < 20 && initCounter < 100){
        currentMovie = currentUser.initRecommended[initCounter];
        console.log("counter", initCounter);
        return currentMovie;
      } else {
        currentUser.initialized = true;
        $http.put(`/api/user/${currentUser._id}`, {initialized : true});
        $location.path("/getting-started/congratulations")
      }
    }
  }

  this.addToRatedOne = function(obj){
    currentUser.ratedMoviesOne.push(obj);
    $http.post(`/api/user/${currentUser._id}/ratedOne`, {_id : obj._id});
    postGenrePref(obj, -2);
    postLeadActorPref(obj, -2);
    postDirectorPref(obj, -2);
    postProducerPref(obj, -2);
    postWriterPref(obj, -2);
    postKeywordPref(obj, -2);
    postDecadePref(obj, -2);
  }

  this.addToRatedTwo = function(obj){
    currentUser.ratedMoviesOne.push(obj);
    $http.post(`/api/user/${currentUser._id}/ratedTwo`, {_id : obj._id});
    postGenrePref(obj, -1);
    postLeadActorPref(obj, -1);
    postDirectorPref(obj, -1);
    postProducerPref(obj, -1);
    postWriterPref(obj, -1);
    postKeywordPref(obj, -1);
    postDecadePref(obj, -1);
  }

  this.addToRatedThree = function(obj){
    currentUser.ratedMoviesOne.push(obj);
    $http.post(`/api/user/${currentUser._id}/ratedThree`, {_id : obj._id});
    postGenrePref(obj, 1);
    postLeadActorPref(obj, 1);
    postDirectorPref(obj, 1);
    postProducerPref(obj, 1);
    postWriterPref(obj, 1);
    postKeywordPref(obj, 1);
    postDecadePref(obj, 1);
  }

  this.addToRatedFour = function(obj){
    currentUser.ratedMoviesOne.push(obj);
    $http.post(`/api/user/${currentUser._id}/ratedFour`, {_id : obj._id});
    postGenrePref(obj, 2);
    postLeadActorPref(obj, 2);
    postDirectorPref(obj, 2);
    postProducerPref(obj, 2);
    postWriterPref(obj, 2);
    postKeywordPref(obj, 2);
    postDecadePref(obj, 2);
  }

  this.addToRatedFive = function(obj){
    currentUser.ratedMoviesOne.push(obj);
    $http.post(`/api/user/${currentUser._id}/ratedFive`, {_id : obj._id});
    postGenrePref(obj, 3);
    postLeadActorPref(obj, 3);
    postDirectorPref(obj, 3);
    postProducerPref(obj, 3);
    postWriterPref(obj, 3);
    postKeywordPref(obj, 3);
    postDecadePref(obj, 3);
  }

  this.addToUnseen = function(obj){
    currentUser.unseenMovies.push(obj);
    $http.post(`/api/user/${currentUser._id}/unseenMovies`, {_id : obj._id});
  }

  this.addToWatchlist = function(obj){
    currentUser.watchlist.push(obj);
    $http.post(`/api/user/${currentUser._id}/watchlist`, {_id : obj._id});
  }

// **********************************************************
//  HELPER FUNCTIONS
// **********************************************************


  function postCurrentUser(obj){
    return $http.post("/api/users", obj).then(function(response){
      currentUser = response.data;
      return response;
    });
  }

  function postMovieToDB(obj){
    return $http.post("/api/movies", obj).then(function(response){
      console.log("responsedddd", response);
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
      console.log("2", myThis.recommendMoviesForMatch);
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
          return arr[i].release_dates[0].certification;
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
        genreScore : score,
        genreId : x.id
      }

      $http.post(`/api/user/${currentUser._id}/genrePref`, transferObj);
    })
  }

  function postLeadActorPref(obj, score){
    let transferObj = {};

    for (var i = 0; i < 6; i++) {
      transferObj = {
        leadActorName : obj.movieCast[i].name,
        leadActorScore : score,
        castId : obj.movieCast[i].id
      }
      $http.post(`/api/user/${currentUser._id}/leadActorPref`, transferObj);
    }
  }

  function postDirectorPref(obj, score){
    let transferObj = {};

    obj.crew.forEach(function(x){
      if(x.job === "Director"){
        transferObj = {
          directorName : x.name,
          directorScore : score,
          crewId : x.id
        }

        $http.post(`/api/user/${currentUser._id}/directorPref`, transferObj);
      }
    })
  }

  function postProducerPref(obj, score){
    let transferObj = {};

    obj.crew.forEach(function(x){
      if(x.job === "Producer"){
        transferObj = {
          producerName : x.name,
          producerScore : score,
          crewId : x.id
        }

        $http.post(`/api/user/${currentUser._id}/producerPref`, transferObj);
      }
    })
  }

  function postWriterPref(obj, score){
    let transferObj = {};

    obj.crew.forEach(function(x){
      if(x.department === "Writing"){
        transferObj = {
          writerName : x.name,
          writerScore : score,
          crewId : x.id
        }

        $http.post(`/api/user/${currentUser._id}/writerPref`, transferObj);
      }
    })
  }

  function postKeywordPref(obj, score){
    let transferObj = {};

    obj.keywords.forEach(function(x){
        transferObj = {
          keywordName : x.name,
          keywordScore : score,
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
        decadeScore : score
      }
      return $http.post(`/api/user/${currentUser._id}/decadePref`, transferObj);
    } else if(year >= 2000 && year <= 2009){
      transferObj = {
        decadeName : "2000s",
        decadeScore : score
      }
      return $http.post(`/api/user/${currentUser._id}/decadePref`, transferObj);
    } else if(year >= 1990 && year <= 1999){
      transferObj = {
        decadeName : "1990s",
        decadeScore : score
      }
      return $http.post(`/api/user/${currentUser._id}/decadePref`, transferObj);
    } else if(year >= 1980 && year <= 1989){
      transferObj = {
        decadeName : "1980s",
        decadeScore : score
      }
      return $http.post(`/api/user/${currentUser._id}/decadePref`, transferObj);
    } else if(year >= 1970 && year <= 1979){
      transferObj = {
        decadeName : "1970s",
        decadeScore : score
      }
      return $http.post(`/api/user/${currentUser._id}/decadePref`, transferObj);
    } else if(year >= 1960 && year <= 1969){
      transferObj = {
        decadeName : "1960s",
        decadeScore : score
      }
      return $http.post(`/api/user/${currentUser._id}/decadePref`, transferObj);
    } else if(year >= 1950 && year <= 1959){
      transferObj = {
        decadeName : "1950s",
        decadeScore : score
      }
      return $http.post(`/api/user/${currentUser._id}/decadePref`, transferObj);
    } else if(year >= 1940 && year <= 1949){
      transferObj = {
        decadeName : "1940s",
        decadeScore : score
      }
      return $http.post(`/api/user/${currentUser._id}/decadePref`, transferObj);
    } else if(year >= 1930 && year <= 1939){
      transferObj = {
        decadeName : "1930s",
        decadeScore : score
      }
      return $http.post(`/api/user/${currentUser._id}/decadePref`, transferObj);
    }
  }

  // function generateScores(arr){
  //   let allRecommended = [];
  //   arr.forEach(function(x, i){
  //     $http.get("/api/movies").then(function(response){
  //       if()
  //     })
  //   })
  // }

}

module.exports = mainService;
