const userRoutes = require("./features/users/userRoutes.js");
const movieRoutes = require("./features/movies/movieRoutes.js");

module.exports = function(app){
  userRoutes(app);
  movieRoutes(app);
}
