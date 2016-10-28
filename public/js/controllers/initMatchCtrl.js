function initMatch($scope, $sce, mainService, $timeout){
  $scope.initLoading = false;
  $scope.initCounterShow = false;
  $scope.initCounter = mainService.initCounter;

  $scope.recommendMovieForInitMatch = function(){
    $scope.recommendedMovies = mainService.recommendMoviesForMatch;
    return $scope.recommendedMovies;
  }
  $scope.getRecommendedMovieForInitMatch = function(){
    $scope.recommendedMovie = mainService.getRecommendedMovieForInitMatch();
    if($scope.recommendedMovie){
      $scope.trailerUrl = $sce.trustAsHtml(`<iframe width="560" height="315" src="https://www.youtube.com/embed/${$scope.recommendedMovie.videos[0].key}" frameborder="0" allowfullscreen></iframe>`);
      return $scope.recommendedMovie;
    } else {
      $timeout(function(){
        $scope.recommendedMovie = mainService.getRecommendedMovieForInitMatch();
        // $scope.trailerUrl = $sce.trustAsHtml(`<iframe width="560" height="315" src="https://www.youtube.com/embed/${$scope.recommendedMovie.videos[0].key}" frameborder="0" allowfullscreen></iframe>`);
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
    mainService.removeFromMatchQueue(movie._id);
    mainService.addToRatedOne(movie);
    $scope.recommendedMovie = $scope.getRecommendedMovieForInitMatch();
    $scope.initLoading = mainService.initLoading;
    $scope.initCounter = mainService.initCounter;
    return $scope.recommendedMovie;
  }

  $scope.addToRatedTwo = function(movie){
    mainService.removeFromMatchQueue(movie._id);
    mainService.addToRatedTwo(movie);
    $scope.recommendedMovie = $scope.getRecommendedMovieForInitMatch();
    $scope.initLoading = mainService.initLoading;
    $scope.initCounter = mainService.initCounter;
    return $scope.recommendedMovie;
  }

  $scope.addToRatedThree = function(movie){
    mainService.removeFromMatchQueue(movie._id);
    mainService.addToRatedThree(movie);
    $scope.recommendedMovie = $scope.getRecommendedMovieForInitMatch();
    $scope.initLoading = mainService.initLoading;
    $scope.initCounter = mainService.initCounter;
    return $scope.recommendedMovie;
  }

  $scope.addToRatedFour = function(movie){
    mainService.removeFromMatchQueue(movie._id);
    mainService.addToRatedFour(movie);
    $scope.recommendedMovie = $scope.getRecommendedMovieForInitMatch();
    $scope.initLoading = mainService.initLoading;
    $scope.initCounter = mainService.initCounter;
    return $scope.recommendedMovie;
  }

  $scope.addToRatedFive = function(movie){
    mainService.removeFromMatchQueue(movie._id);
    mainService.addToRatedFive(movie);
    $scope.recommendedMovie = $scope.getRecommendedMovieForInitMatch();
    $scope.initLoading = mainService.initLoading;
    $scope.initCounter = mainService.initCounter;
    return $scope.recommendedMovie;
  }

  $scope.addToUnseen = function(movie){
    mainService.removeFromMatchQueue(movie._id);
    mainService.addToUnseen(movie);
    $scope.recommendedMovie = $scope.getRecommendedMovieForInitMatch();
    return $scope.recommendedMovie;
  }

  $scope.addToWatchlist = function(movie){
    mainService.addToWatchlist(movie);
    // $("span.watchlist").on("click", function(){
    //   $("span.watchlist").css("color", "#FC7100")
    // })
    // $(this).parent().siblings("div.added-to-watchlist").fadeIn("slow");
    // setTimeout(function(){
    //   console.log("help");
    //   $(that).parent().siblings("div.added-to-watchlist").fadeOut("slow");
    // }, 2000)
  }


  $scope.recommendMovieForInitMatch();
  $scope.getRecommendedMovieForInitMatch();
}

module.exports = initMatch;
