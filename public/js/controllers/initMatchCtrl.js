function initMatch($scope, $sce, mainService){
  $scope.recommendMovieForInitMatch = function(){
    $scope.recommendedMovies = mainService.recommendMoviesForMatch;
    console.log("front end movie", $scope.recommendedMovies);
    return $scope.recommendedMovies;
  }
  $scope.getRecommendedMovieForInitMatch = function(){
    $scope.recommendedMovie = mainService.getRecommendedMovieForInitMatch();
    console.log("front end movie 2", $scope.recommendedMovie);
    $scope.trailerUrl = $sce.trustAsHtml(`<iframe width="560" height="315" src="https://www.youtube.com/embed/${$scope.recommendedMovie.videos[0].key}" frameborder="0" allowfullscreen></iframe>`);
    return $scope.recommendedMovie;
  }
  $scope.writerFilter = function(item){
    return item === "writing"
  }

  $scope.directorFilter = function(item){
    return item === "director"
  }


  $scope.recommendMovieForInitMatch();
  $scope.getRecommendedMovieForInitMatch();
}

module.exports = initMatch;
