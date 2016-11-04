function loadingCtrl($scope, mainService){
  // $scope.loading = function(){
  //   return mainService.loading();
  // }
  $scope.userLoaded = mainService.userLoaded;

  $scope.test = "hi";
  $scope.getFbCurrentUser = function(){
      mainService.getFbCurrentUser().then(function(response){
        $scope.currentUser = response;
        return $scope.currentUser;
      })
  }

  $scope.$watch('userLoaded', function(newValue, oldValue){
    console.log("hello from watch");
    console.log(newValue, oldValue);
    if($scope.userLoaded){
      console.log("time to roll, TINY RICK");
    }
  })

  $scope.getFbCurrentUser();
  // $scope.loading();
}

module.exports = loadingCtrl;
