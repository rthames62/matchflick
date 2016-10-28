function gsCtrl($scope, $timeout, mainService){
  $scope.reachFive = true;
  $scope.queryFavMovies = function(query){
    mainService.queryFavMovies(query).then(function(response){
      $('div.search-results').addClass('show');
      $('body').on('click', function(event){
        $('div.search-results').removeClass('show');
      });
      $scope.favMovieResults = response;
      return $scope.favMovieResults;
    })
  }
  $scope.addToTopFive = function(movie){
    $scope.reachFive = true;
    mainService.addToTopFive(movie).then(function(response){
      $scope.topFive = response;
      if($scope.topFive.length === 5){
        mainService.postInitRec();
      }
      $scope.searchQuery = "";
      $scope.reachFive = mainService.reachFive($scope.topFive);
      return $scope.topFive;
    })

    // return $scope.topFive;
  }
  $scope.getTopFive = function(){
      $scope.topFive = [];
      $scope.topFive = mainService.getTopFive();
      if($scope.topFive.length < 5){
        $scope.reachFive = true;
      } else {
        $scope.reachFive = false;
      }
      return $scope.topFive;
  }
  $scope.removeFromTopFive = function(movie){
    $scope.topFive = mainService.removeFromTopFive(movie);
    $scope.reachFive = true;
    return $scope.topFive;
  }

  $timeout(function(){
    $scope.getTopFive();
  },50)
}

module.exports = gsCtrl;
