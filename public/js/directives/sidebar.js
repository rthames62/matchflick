import sidebarCtrl from "../controllers/sidebarCtrl.js"

function sidebarDirective(){
  return {
    templateUrl : "../../views/directives/sidebar.html",
    controller : sidebarCtrl
  }
}

module.exports = sidebarDirective;
