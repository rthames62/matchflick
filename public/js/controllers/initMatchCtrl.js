function initMatch($scope, $sce, mainService, $timeout){
  $scope.recommendMovieForInitMatch = function(){
    $scope.recommendedMovies = mainService.recommendMoviesForMatch;
    return $scope.recommendedMovies;
  }
  $scope.getRecommendedMovieForInitMatch = function(){
    $scope.recommendedMovie = mainService.getRecommendedMovieForInitMatch();
    console.log("scope recommended", $scope.recommendedMovie);
    if($scope.recommendedMovie){
      $scope.trailerUrl = $sce.trustAsHtml(`<iframe width="560" height="315" src="https://www.youtube.com/embed/${$scope.recommendedMovie.videos[0].key}" frameborder="0" allowfullscreen></iframe>`);
      return $scope.recommendedMovie;
    } else {
      $timeout(function(){
        $scope.recommendedMovie = mainService.getRecommendedMovieForInitMatch();
        // $scope.trailerUrl = $sce.trustAsHtml(`<iframe width="560" height="315" src="https://www.youtube.com/embed/${$scope.recommendedMovie.videos[0].key}" frameborder="0" allowfullscreen></iframe>`);
        console.log("bout to finish", $scope.recommendedMovie);
        return $scope.recommendedMovie;
      }, 200)
    }
  }
  $scope.writerFilter = function(item){
    return item === "writing"
  }

  $scope.directorFilter = function(item){
    return item === "director"
  }

  $scope.addToRatedOne = function(movie){
    mainService.addToRatedOne(movie);
    $scope.recommendedMovie = $scope.getRecommendedMovieForInitMatch();
    return $scope.recommendedMovie;
  }

  $scope.addToRatedTwo = function(movie){
    mainService.addToRatedTwo(movie);
    $scope.recommendedMovie = $scope.getRecommendedMovieForInitMatch();
    return $scope.recommendedMovie;
  }

  $scope.addToRatedThree = function(movie){
    mainService.addToRatedThree(movie);
    $scope.recommendedMovie = $scope.getRecommendedMovieForInitMatch();
    return $scope.recommendedMovie;
  }

  $scope.addToRatedFour = function(movie){
    mainService.addToRatedFour(movie);
    $scope.recommendedMovie = $scope.getRecommendedMovieForInitMatch();
    return $scope.recommendedMovie;
  }

  $scope.addToRatedFive = function(movie){
    mainService.addToRatedFive(movie);
    $scope.recommendedMovie = $scope.getRecommendedMovieForInitMatch();
    return $scope.recommendedMovie;
  }

  $scope.addToUnseen = function(movie){
    mainService.addToUnseen(movie);
    $scope.recommendedMovie = $scope.getRecommendedMovieForInitMatch();
    return $scope.recommendedMovie;
  }

  $scope.addToWatchlist = function(movie){
    mainService.addToWatchlist(movie);
    $("span.watchlist").on("click", function(){
      $("span.watchlist").css("color", "#FC7100")
    })
  }


  $scope.recommendMovieForInitMatch();
  $scope.getRecommendedMovieForInitMatch();
}

module.exports = initMatch;
