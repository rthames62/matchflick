function mainCtrl($scope, $location, mainService){
  console.log("hello from the top");
  $scope.initCounterShow = true;
  // $scope.test = "hi";
  // $scope.getFbCurrentUser = function(){
  //   console.log("from mainctrl");
  //     mainService.getFbCurrentUser().then(function(response){
  //       $scope.currentUser = response;
  //       return $scope.currentUser;
  //     })
  // }
  //
  // $scope.getFbCurrentUser();
}

module.exports = mainCtrl;
