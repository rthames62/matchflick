const userRoutes = require("./features/users/userRoutes.js");

module.exports = function(app){
  userRoutes(app);
}
