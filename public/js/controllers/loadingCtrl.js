function loadingCtrl($scope, mainService){
  $scope.loading = function(){
    return mainService.loading();
  }
  $scope.test = "hi";
  $scope.getFbCurrentUser = function(){
      mainService.getFbCurrentUser().then(function(response){
        $scope.currentUser = response;
        return $scope.currentUser;
      })
  }

  $scope.getFbCurrentUser();
  $scope.loading();
}

module.exports = loadingCtrl;
