function favoritesCtrl($scope, $state, mainService){

  $scope.getTopFive = function(){
    $scope.topFive = mainService.getTopFive();
    return $scope.topFive;
  }

  $scope.getRatedFive = function(){
    $scope.ratedFive = mainService.getRatedFive();
    return $scope.ratedFive;
  }

  $scope.getRatedFour = function(){
    $scope.ratedFour = mainService.getRatedFour();
    return $scope.ratedFour;
  }

  $scope.getRatedThree = function(){
    $scope.ratedThree = mainService.getRatedThree();
    return $scope.ratedThree;
  }

  $scope.getTopFive();
  $scope.getRatedFive();
  $scope.getRatedFour();
  $scope.getRatedThree();
}

module.exports = favoritesCtrl;
