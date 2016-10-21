function sidebarCtrl($scope, $http, mainService){

  $scope.test = "test";

  $scope.getCurrentPage = function(){
    $scope.currentPage = mainService.getCurrentPage();

    $("a#dashboard").removeClass("active");
    $("a#match").removeClass("active");
    $("a#recommendations").removeClass("active");
    $("a#favorites").removeClass("active");
    $("a#watchlist").removeClass("active");

    console.log($scope.currentPage.slice(0, 16), "/recommendations");

    if($scope.currentPage === "/dashboard"){
      $("a#dashboard").addClass("active");
    } else if ($scope.currentPage === "/match"){
      $("a#match").addClass("active");
    } else if ($scope.currentPage.slice(0, 16) === "/recommendations"){
      $("a#recommendations").addClass("active");
    } else if ($scope.currentPage === "/favorites"){
      $("a#favorites").addClass("active");
    } else if ($scope.currentPage === "/watchlist"){
      $("a#watchlist").addClass("active");
    } else if ($scope.currentPage === "/preferences"){
      $("a#preferences").addClass("active");
    }
  }

  $scope.getCurrentPage();
}

module.exports = sidebarCtrl;
