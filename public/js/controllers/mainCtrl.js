function mainCtrl($scope, $location, mainService){
  $scope.initCounterShow = true;
  $scope.getFbCurrentUser = function(){
    console.log("from mainctrl");
      mainService.getFbCurrentUser().then(function(response){
        $scope.currentUser = response;
        return $scope.currentUser;
      })
  }

  $scope.getFbCurrentUser();
}

module.exports = mainCtrl;
