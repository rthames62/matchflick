import angular from "angular";
import uiRouter from "angular-ui-router";

//HTML
import "./views/home.html";
import "./views/login.html";
import "./views/sign-up.html";
import "./views/dashboard.html";

//CSS
import "./css/reset.css";
import "./css/main.css";

//Controllers
import loginCtrl from "./js/controllers/loginCtrl.js";
import dashboardCtrl from "./js/controllers/dashboardCtrl.js";

//Services
import mainService from "./js/services/mainService.js"

//Directives
import navbarDirective from "./js/directives/navbar.js";
import sidebarDirective from "./js/directives/sidebar.js";
import dashNavDirective from "./js/directives/dashNav.js";

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
})
.service("mainService", mainService)
.directive("navbar", navbarDirective)
.directive("sidebar", sidebarDirective)
.directive("dashnav", dashNavDirective)
