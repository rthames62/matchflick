function matchCtrl($scope, $http, $sce, $timeout, mainService){

  $scope.done = mainService.done;
  $scope.loading = false;

  $scope.$watch("done", function(newValue, oldValue){
    if (newValue === 1) {
    }
  }, true)

  $scope.getInitMatchQueue = function(){
    mainService.getInitMatchQueue().then(function(response){
      $http.get(`http://www.omdbapi.com/?i=${response.imdbId}&tomatoes=true`).then(function(results){
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
    $scope.loading = true;
    mainService.removeFromMatchQueue(movie._id);
    mainService.getInitMatchQueue().then(function(response){
      $http.get(`http://www.omdbapi.com/?i=${response.imdbId}&tomatoes=true`).then(function(results){
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
        $("span.watchlist").css("color", "#929292");
        $scope.loading = false;
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
    $scope.loading = true;
    mainService.removeFromMatchQueue(movie._id);
    mainService.getInitMatchQueue().then(function(response){
      $http.get(`http://www.omdbapi.com/?i=${response.imdbId}&tomatoes=true`).then(function(results){
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
        $("span.watchlist").css("color", "#929292");
        $scope.loading = false;
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
    $scope.loading = true;
    mainService.removeFromMatchQueue(movie._id);
    mainService.getInitMatchQueue().then(function(response){
      $http.get(`http://www.omdbapi.com/?i=${response.imdbId}&tomatoes=true`).then(function(results){
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
        $("span.watchlist").css("color", "#929292");
        $scope.loading = false;
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
    $scope.loading = true;
    mainService.removeFromMatchQueue(movie._id);
    mainService.getInitMatchQueue().then(function(response){
      $http.get(`http://www.omdbapi.com/?i=${response.imdbId}&tomatoes=true`).then(function(results){
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
        $("span.watchlist").css("color", "#929292");
        $scope.loading = false;
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
    $scope.loading = true;
    mainService.removeFromMatchQueue(movie._id);
    $scope.done = mainService.addToRatedFive(movie);
    mainService.getInitMatchQueue().then(function(response){
      $http.get(`http://www.omdbapi.com/?i=${response.imdbId}&tomatoes=true`).then(function(results){
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
        $("span.watchlist").css("color", "#929292");
        $scope.loading = false;
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
    $scope.loading = true;
    mainService.removeFromMatchQueue(movie._id);
    mainService.getInitMatchQueue().then(function(response){
      $http.get(`http://www.omdbapi.com/?i=${response.imdbId}&tomatoes=true`).then(function(results){
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
        $("span.watchlist").css("color", "#929292");
        $scope.loading = false;
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
    // let that = this;
    // $("span.watchlist").css("color", "#FC7100");
    // $("span.watchlist").parent().siblings("div.added-to-watchlist-match").fadeIn("slow");
    // setTimeout(function(){
    //   console.log("help");
    //   $("span.watchlist").parent().siblings("div.added-to-watchlist-match").fadeOut("slow");
    // }, 2000)
    // let that = this;
    // $(this).css("color", "#FC7100");
    // $(this).parent().siblings("div.added-to-watchlist-match").fadeIn("slow");
    // setTimeout(function(){
    //   console.log("help");
    //   $(that).parent().siblings("div.added-to-watchlist-match").fadeOut("slow");
    // }, 2000)
    mainService.addToWatchlist(movie);
  }

  $scope.getInitMatchQueue();

}

module.exports = matchCtrl;
