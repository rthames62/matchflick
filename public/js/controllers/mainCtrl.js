function mainCtrl($scope, $location, mainService){
  $scope.initCounterShow = true;
  $scope.getFbCurrentUser = function(){
      mainService.getFbCurrentUser().then(function(response){
        $scope.currentUser = response;
        console.log($scope.currentUser);
        return $scope.currentUser;
      })
  }

  $scope.getFbCurrentUser();
}

module.exports = mainCtrl;
