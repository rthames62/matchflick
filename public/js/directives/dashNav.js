import dashboardCtrl from "../controllers/dashboardCtrl.js"

function dashNav(){
  return {
    templateUrl : "../../views/directives/dashnav.html",
    controller : dashboardCtrl
  }
}

module.exports = dashNav;
