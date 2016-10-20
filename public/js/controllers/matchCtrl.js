function matchCtrl($scope, $http, $sce, $timeout, mainService){

  $scope.done = mainService.done;

  $scope.$watch("done", function(newValue, oldValue){
    console.log(newValue, oldValue);
    if (newValue === 1) {
      console.log("yay");
    }
  }, true)

  $scope.getInitMatchQueue = function(){
    mainService.getInitMatchQueue().then(function(response){
      $http.get(`http://www.omdbapi.com/?i=${response.imdbId}&tomatoes=true`).then(function(results){
        console.log("ratings", results);
        $scope.awards = results.data.Awards;
        $scope.imdbMetascore = results.data.Metascore;
        $scope.imdbRating = results.data.imdbRating;
        $scope.imdbVotes = results.data.imdbVotes;
        $scope.tomatoRating = results.data.tomatoRating;
        $scope.tomatoReviews = results.data.tomatoReviews;
        $scope.tomatoUserRating = results.data.tomatoUserRating;
        $scope.tomatoUserReviews = results.data.tomatoUserReviews;
        if($scope.tomatoRating > 5){
          $scope.tomatoClass = "rt-fresh";
        } else {
          $scope.tomatoClass = "rt-rotten";
        }
      })
      $scope.recommendedMovie = response;
      if($scope.recommendedMovie){
        if ($scope.recommendedMovie.videos.length > 0) {
            $scope.trailerUrl = $sce.trustAsHtml(`<iframe width="560" height="315" src="https://www.youtube.com/embed/${$scope.recommendedMovie.videos[0].key}" frameborder="0" allowfullscreen></iframe>`);
        }
        console.log($scope.recommendedMovie);
        return $scope.recommendedMovie;
      } else {
        $timeout(function(){
          $scope.recommendedMovie = mainService.getInitMatchQueue();
          // $scope.trailerUrl = $sce.trustAsHtml(`<iframe width="560" height="315" src="https://www.youtube.com/embed/${$scope.recommendedMovie.videos[0].key}" frameborder="0" allowfullscreen></iframe>`);
          return $scope.recommendedMovie;
        }, 200)
      }
    })
  }

  $scope.addToRatedOne = function(movie){
    mainService.removeFromMatchQueue(movie._id);
    mainService.getInitMatchQueue().then(function(response){
      $http.get(`http://www.omdbapi.com/?i=${response.imdbId}&tomatoes=true`).then(function(results){
        console.log("ratings", results);
        $scope.awards = results.data.Awards;
        $scope.imdbMetascore = results.data.Metascore;
        $scope.imdbRating = results.data.imdbRating;
        $scope.imdbVotes = results.data.imdbVotes;
        $scope.tomatoRating = results.data.tomatoRating;
        $scope.tomatoReviews = results.data.tomatoReviews;
        $scope.tomatoUserRating = results.data.tomatoUserRating;
        $scope.tomatoUserReviews = results.data.tomatoUserReviews;
        if($scope.tomatoRating > 5){
          $scope.tomatoClass = "rt-fresh";
        } else {
          $scope.tomatoClass = "rt-rotten";
        }
      })
      $scope.recommendedMovie = response;
      if($scope.recommendedMovie){
        if ($scope.recommendedMovie.videos.length > 0) {
            $scope.trailerUrl = $sce.trustAsHtml(`<iframe width="560" height="315" src="https://www.youtube.com/embed/${$scope.recommendedMovie.videos[0].key}" frameborder="0" allowfullscreen></iframe>`);
        }
        console.log($scope.recommendedMovie);
        return $scope.recommendedMovie;
      } else {
        $timeout(function(){
          $scope.recommendedMovie = mainService.getInitMatchQueue();
          // $scope.trailerUrl = $sce.trustAsHtml(`<iframe width="560" height="315" src="https://www.youtube.com/embed/${$scope.recommendedMovie.videos[0].key}" frameborder="0" allowfullscreen></iframe>`);
          return $scope.recommendedMovie;
        }, 200)
      }
    })
    mainService.addToRatedOne(movie);
    // return $scope.recommendedMovie;
  }

  $scope.addToRatedTwo = function(movie){
    mainService.removeFromMatchQueue(movie._id);
    mainService.getInitMatchQueue().then(function(response){
      $http.get(`http://www.omdbapi.com/?i=${response.imdbId}&tomatoes=true`).then(function(results){
        console.log("ratings", results);
        $scope.awards = results.data.Awards;
        $scope.imdbMetascore = results.data.Metascore;
        $scope.imdbRating = results.data.imdbRating;
        $scope.imdbVotes = results.data.imdbVotes;
        $scope.tomatoRating = results.data.tomatoRating;
        $scope.tomatoReviews = results.data.tomatoReviews;
        $scope.tomatoUserRating = results.data.tomatoUserRating;
        $scope.tomatoUserReviews = results.data.tomatoUserReviews;
        if($scope.tomatoRating > 5){
          $scope.tomatoClass = "rt-fresh";
        } else {
          $scope.tomatoClass = "rt-rotten";
        }
      })
      $scope.recommendedMovie = response;
      if($scope.recommendedMovie){
        if ($scope.recommendedMovie.videos.length > 0) {
            $scope.trailerUrl = $sce.trustAsHtml(`<iframe width="560" height="315" src="https://www.youtube.com/embed/${$scope.recommendedMovie.videos[0].key}" frameborder="0" allowfullscreen></iframe>`);
        }
        console.log($scope.recommendedMovie);
        return $scope.recommendedMovie;
      } else {
        $timeout(function(){
          $scope.recommendedMovie = mainService.getInitMatchQueue();
          // $scope.trailerUrl = $sce.trustAsHtml(`<iframe width="560" height="315" src="https://www.youtube.com/embed/${$scope.recommendedMovie.videos[0].key}" frameborder="0" allowfullscreen></iframe>`);
          return $scope.recommendedMovie;
        }, 200)
      }
    })
    mainService.addToRatedTwo(movie);
  }

  $scope.addToRatedThree = function(movie){
    mainService.removeFromMatchQueue(movie._id);
    mainService.getInitMatchQueue().then(function(response){
      $http.get(`http://www.omdbapi.com/?i=${response.imdbId}&tomatoes=true`).then(function(results){
        console.log("ratings", results);
        $scope.awards = results.data.Awards;
        $scope.imdbMetascore = results.data.Metascore;
        $scope.imdbRating = results.data.imdbRating;
        $scope.imdbVotes = results.data.imdbVotes;
        $scope.tomatoRating = results.data.tomatoRating;
        $scope.tomatoReviews = results.data.tomatoReviews;
        $scope.tomatoUserRating = results.data.tomatoUserRating;
        $scope.tomatoUserReviews = results.data.tomatoUserReviews;
        if($scope.tomatoRating > 5){
          $scope.tomatoClass = "rt-fresh";
        } else {
          $scope.tomatoClass = "rt-rotten";
        }
      })
      $scope.recommendedMovie = response;
      if($scope.recommendedMovie){
        if ($scope.recommendedMovie.videos.length > 0) {
            $scope.trailerUrl = $sce.trustAsHtml(`<iframe width="560" height="315" src="https://www.youtube.com/embed/${$scope.recommendedMovie.videos[0].key}" frameborder="0" allowfullscreen></iframe>`);
        }
        console.log($scope.recommendedMovie);
        return $scope.recommendedMovie;
      } else {
        $timeout(function(){
          $scope.recommendedMovie = mainService.getInitMatchQueue();
          // $scope.trailerUrl = $sce.trustAsHtml(`<iframe width="560" height="315" src="https://www.youtube.com/embed/${$scope.recommendedMovie.videos[0].key}" frameborder="0" allowfullscreen></iframe>`);
          return $scope.recommendedMovie;
        }, 200)
      }
    })
    mainService.addToRatedThree(movie);
  }

  $scope.addToRatedFour = function(movie){
    mainService.removeFromMatchQueue(movie._id);
    mainService.getInitMatchQueue().then(function(response){
      $http.get(`http://www.omdbapi.com/?i=${response.imdbId}&tomatoes=true`).then(function(results){
        console.log("ratings", results);
        $scope.awards = results.data.Awards;
        $scope.imdbMetascore = results.data.Metascore;
        $scope.imdbRating = results.data.imdbRating;
        $scope.imdbVotes = results.data.imdbVotes;
        $scope.tomatoRating = results.data.tomatoRating;
        $scope.tomatoReviews = results.data.tomatoReviews;
        $scope.tomatoUserRating = results.data.tomatoUserRating;
        $scope.tomatoUserReviews = results.data.tomatoUserReviews;
        if($scope.tomatoRating > 5){
          $scope.tomatoClass = "rt-fresh";
        } else {
          $scope.tomatoClass = "rt-rotten";
        }
      })
      $scope.recommendedMovie = response;
      if($scope.recommendedMovie){
        if ($scope.recommendedMovie.videos.length > 0) {
            $scope.trailerUrl = $sce.trustAsHtml(`<iframe width="560" height="315" src="https://www.youtube.com/embed/${$scope.recommendedMovie.videos[0].key}" frameborder="0" allowfullscreen></iframe>`);
        }
        console.log($scope.recommendedMovie);
        return $scope.recommendedMovie;
      } else {
        $timeout(function(){
          $scope.recommendedMovie = mainService.getInitMatchQueue();
          // $scope.trailerUrl = $sce.trustAsHtml(`<iframe width="560" height="315" src="https://www.youtube.com/embed/${$scope.recommendedMovie.videos[0].key}" frameborder="0" allowfullscreen></iframe>`);
          return $scope.recommendedMovie;
        }, 200)
      }
    })
    mainService.addToRatedFour(movie);
  }

  $scope.addToRatedFive = function(movie){
    mainService.removeFromMatchQueue(movie._id);
    $scope.done = mainService.addToRatedFive(movie);
    mainService.getInitMatchQueue().then(function(response){
      $http.get(`http://www.omdbapi.com/?i=${response.imdbId}&tomatoes=true`).then(function(results){
        console.log("ratings", results);
        $scope.awards = results.data.Awards;
        $scope.imdbMetascore = results.data.Metascore;
        $scope.imdbRating = results.data.imdbRating;
        $scope.imdbVotes = results.data.imdbVotes;
        $scope.tomatoRating = results.data.tomatoRating;
        $scope.tomatoReviews = results.data.tomatoReviews;
        $scope.tomatoUserRating = results.data.tomatoUserRating;
        $scope.tomatoUserReviews = results.data.tomatoUserReviews;
        if($scope.tomatoRating > 5){
          $scope.tomatoClass = "rt-fresh";
        } else {
          $scope.tomatoClass = "rt-rotten";
        }
      })
      $scope.recommendedMovie = response;
      if($scope.recommendedMovie){
        if ($scope.recommendedMovie.videos.length > 0) {
            $scope.trailerUrl = $sce.trustAsHtml(`<iframe width="560" height="315" src="https://www.youtube.com/embed/${$scope.recommendedMovie.videos[0].key}" frameborder="0" allowfullscreen></iframe>`);
        }
        console.log($scope.recommendedMovie);
        return $scope.recommendedMovie;
      } else {
        $timeout(function(){
          $scope.recommendedMovie = mainService.getInitMatchQueue();
          // $scope.trailerUrl = $sce.trustAsHtml(`<iframe width="560" height="315" src="https://www.youtube.com/embed/${$scope.recommendedMovie.videos[0].key}" frameborder="0" allowfullscreen></iframe>`);
          return $scope.recommendedMovie;
        }, 200)
      }
    })
  }

  $scope.addToUnseen = function(movie){
    mainService.removeFromMatchQueue(movie._id);
    mainService.getInitMatchQueue().then(function(response){
      $http.get(`http://www.omdbapi.com/?i=${response.imdbId}&tomatoes=true`).then(function(results){
        console.log("ratings", results);
        $scope.awards = results.data.Awards;
        $scope.imdbMetascore = results.data.Metascore;
        $scope.imdbRating = results.data.imdbRating;
        $scope.imdbVotes = results.data.imdbVotes;
        $scope.tomatoRating = results.data.tomatoRating;
        $scope.tomatoReviews = results.data.tomatoReviews;
        $scope.tomatoUserRating = results.data.tomatoUserRating;
        $scope.tomatoUserReviews = results.data.tomatoUserReviews;
        if($scope.tomatoRating > 5){
          $scope.tomatoClass = "rt-fresh";
        } else {
          $scope.tomatoClass = "rt-rotten";
        }
      })
      $scope.recommendedMovie = response;
      if($scope.recommendedMovie){
        console.log($scope.recommendedMovie);
        console.log($scope.recommendedMovie.popularity);
        console.log($scope.recommendedMovie.language);
        if ($scope.recommendedMovie.videos.length > 0) {
            $scope.trailerUrl = $sce.trustAsHtml(`<iframe width="560" height="315" src="https://www.youtube.com/embed/${$scope.recommendedMovie.videos[0].key}" frameborder="0" allowfullscreen></iframe>`);
        }
        return $scope.recommendedMovie;
      } else {
        $timeout(function(){
          $scope.recommendedMovie = mainService.getInitMatchQueue();
          // $scope.trailerUrl = $sce.trustAsHtml(`<iframe width="560" height="315" src="https://www.youtube.com/embed/${$scope.recommendedMovie.videos[0].key}" frameborder="0" allowfullscreen></iframe>`);
          return $scope.recommendedMovie;
        }, 200)
      }
    })
    mainService.addToUnseen(movie);
  }

  $scope.addToWatchlist = function(movie){
    mainService.addToWatchlist(movie);
    $("span.watchlist").on("click", function(){
      $("span.watchlist").css("color", "#FC7100")
    })
  }

  $scope.getInitMatchQueue();

}

module.exports = matchCtrl;
