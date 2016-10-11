import angular from "angular";
import uiRouter from "angular-ui-router";

//HTML
import "./views/home.html";
import "./views/login.html";
import "./views/sign-up.html";
import "./views/dashboard.html";
import "./views/get-started.html";
import "./views/favorite-movies.html";
import "./views/init.html";
import "./views/congratulations.html";
import "./views/loading.html";
import "./views/instructions.html";

//CSS
import "./css/reset.css";
import "./css/main.css";

//Controllers
import mainCtrl from "./js/controllers/mainCtrl.js";
import loginCtrl from "./js/controllers/loginCtrl.js";
import dashboardCtrl from "./js/controllers/dashboardCtrl.js";
import gsCtrl from "./js/controllers/gsCtrl.js";
import loadingCtrl from "./js/controllers/loadingCtrl.js";
import initMatchCtrl from "./js/controllers/initMatchCtrl.js";

//Services
import mainService from "./js/services/mainService.js"

//Directives
import navbarDirective from "./js/directives/navbar.js";
import sidebarDirective from "./js/directives/sidebar.js";
import dashNavDirective from "./js/directives/dashNav.js";
import favSearchResults from "./js/directives/favSearchResults.js";
import enterSubmit from "./js/directives/enterSubmit.js";
import trashMovie from "./js/directives/trashMovie.js";
import ratings from "./js/directives/ratings.js";
import movieDetails from "./js/directives/movieDetails.js";
import showMovieDetails from "./js/directives/showMovieDetails.js";

angular.module("MatchFlick", [uiRouter])
.config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise("/")
  $stateProvider
    .state("home", {
      url : "/",
      templateUrl : "./views/home.html"
    })
    .state("signup", {
      url : "/signup",
      templateUrl : "./views/sign-up.html"
    })
    .state("dashboard", {
      url : "/dashboard",
      templateUrl : "./views/dashboard.html",
      controller : dashboardCtrl
    })
    .state("gettingStarted", {
      url : "/getting-started",
      templateUrl : "./views/get-started.html",
      controller : gsCtrl
    })
    .state("favoriteMovies", {
      url : "/getting-started/favorites",
      templateUrl : "./views/favorites.html",
      controller : gsCtrl
    })
    .state("initMatch", {
      url : "/getting-started/match",
      templateUrl : "./views/init.html",
      controller : initMatchCtrl
    })
    .state("initCongrats", {
      url : "/getting-started/congratulations",
      templateUrl : "./views/congratulations.html",
      controller : gsCtrl
    })
    .state("loading", {
      url : "/loading",
      templateUrl : "./views/loading.html",
      controller : loadingCtrl
    })
    .state("instructions", {
      url : "/getting-started/match/instructions",
      templateUrl : "./views/instructions.html",
      controller : gsCtrl
    })
})
.controller("mainCtrl", mainCtrl)
.service("mainService", mainService)
.directive("navbar", navbarDirective)
.directive("sidebar", sidebarDirective)
.directive("dashnav", dashNavDirective)
.directive("favSearchResults", favSearchResults)
.directive("enterSubmit", enterSubmit)
.directive("trashMovie", trashMovie)
.directive("ratings", ratings)
.directive("movieDetails", movieDetails)
.directive("showMovieDetails", showMovieDetails)
