function dashboardCtrl($scope, $http, mainService){

  $scope.discoverForMatch = function(){
    mainService.discoverForMatch();
  }

  $scope.getMoviesFromDiscover = function(){
    mainService.getMoviesFromDiscover();
  }

  $scope.getUserGenrePrefs = function(){
    mainService.getUserGenrePrefs().then(function(response){
      $scope.userGenrePrefs = response;
      return $scope.userGenrePrefs;
    })
  }

  $scope.getUserActorPrefs = function(){
    mainService.getUserActorPrefs().then(function(response){
      $scope.userActorPrefs = response;
      console.log($scope.userActorPrefs);
      return $scope.userActorPrefs;
    })
  }

  $scope.getUserDirectorPrefs = function(){
    mainService.getUserDirectorPrefs().then(function(response){
      $scope.userDirectorPrefs = response;
      return $scope.userDirectorPrefs;
    })
  }

  $scope.getUserProducerPrefs = function(){
    mainService.getUserProducerPrefs().then(function(response){
      $scope.userProducerPrefs = response;
      return $scope.userProducerPrefs;
    })
  }

  $scope.getUserWriterPrefs = function(){
    mainService.getUserWriterPrefs().then(function(response){
      $scope.userWriterPrefs = response;
      return $scope.userWriterPrefs;
    })
  }

  $scope.getUserKeywordPrefs = function(){
    mainService.getUserKeywordPrefs().then(function(response){
      $scope.userKeywordPrefs = response;
      return $scope.userKeywordPrefs;
    })
  }

  $scope.getUserDecadePrefs = function(){
    mainService.getUserDecadePrefs().then(function(response){
      $scope.userDecadePrefs = response;
      return $scope.userDecadePrefs;
    })
  }
}

module.exports = dashboardCtrl;
