function mainService($http, $location, $timeout){
  let currentUser = {};
  let currentUserFbId = "";
  let topFive = [];
  let myThis = this;
  let recommendMoviesForMatch = [];
  let initCounter = 0;
  const omdbUrl = "https://api.themoviedb.org/3/"
  const omdbKey = "550&api_key=be7c9a53bfd40a5a3d9aa3c4cf99b5c9";

  this.getFbCurrentUser = function(){
    return $http.get("/api/facebook").then(function(response){
      let results = response.data;
      $http.get("/api/users").then(function(userResponse){
        let found = false;
        userResponse.data.map(function(x, i){
          if(x.facebookId == results.id){
            currentUser = x;
            found = true;
          }
        })
        if(!found){
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
            initRecommended : []
          };
          currentUserFbId = results.id;
          postCurrentUser(currentUser);
        }
      })
      return response.data;
    })
  }

  this.addToTopFive = function(obj) {

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
        postMovieToDB(movieObj);
        if(currentUser.topFive.length < 5){
            currentUser.topFive.push(movieObj);
            topFive = currentUser.topFive;
            $http.post(`/api/user/${currentUser._id}/topFive`, movieObj);
        }

        if(currentUser.topFive.length === 5){
          let movieIds = recommendMovieForInitMatch();
          movieIds = movieIds.slice(0, 2);
          let recommendMoviesArr = [];
          currentUser.initRecommended = [];
          movieIds.forEach(function(x, i){
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
              postMovieToDB(movieObj);
              currentUser.initRecommended.push(movieObj);
              $http.post(`/api/user/${currentUser._id}/initRec`, movieObj);
              myThis.recommendMoviesForMatch = [];
              myThis.recommendMoviesForMatch = currentUser.initRecommended;
            })
          })
        }
        return topFive;
    })
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
      if(currentUser.initialized === false && currentUser.topFive.length > 0){
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
    let movie = [];
    movie = currentUser.initRecommended[initCounter];
    initCounter++;
    return movie;
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
    return $http.post("/api/movies", obj);
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
