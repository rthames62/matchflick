const movieCtrl = require('./movieCtrl');

module.exports = function(app){
  app.post("/api/movies", movieCtrl.postMovie);
  app.get("/api/movies", movieCtrl.getMovies);
  app.get("/api/movies/:id", movieCtrl.getMovie);
  app.get("/api/genres", movieCtrl.getMoviesByGenre);
}
