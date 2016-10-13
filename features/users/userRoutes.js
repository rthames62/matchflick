const userCtrl = require('./userCtrl');

module.exports = function(app){
  app.post("/api/users", userCtrl.postUser);
  app.get("/api/users", userCtrl.getUsers);
  app.get("/api/users/:id", userCtrl.getUser);
  app.get("/api/users/fb/:fb", userCtrl.getUserByFbId);
  app.get("/api/currentuser", userCtrl.currentUser);
  app.post("/api/user/:id/topFive", userCtrl.postTopFive);
  app.post("/api/user/:id/initRec", userCtrl.postInitRec);
  app.post("/api/user/:id/ratedOne", userCtrl.postRatedOne);
  app.post("/api/user/:id/ratedTwo", userCtrl.postRatedTwo);
  app.post("/api/user/:id/ratedThree", userCtrl.postRatedThree);
  app.post("/api/user/:id/ratedFour", userCtrl.postRatedFour);
  app.post("/api/user/:id/ratedFive", userCtrl.postRatedFive);
  app.post("/api/user/:id/unseenMovies", userCtrl.postUnseenMovie);
  app.post("/api/user/:id/watchlist", userCtrl.postToWatchlist);
  app.post("/api/user/:id/genrePref", userCtrl.postGenrePref);
  app.post("/api/user/:id/leadActorPref", userCtrl.postLeadActorPref);
  app.post("/api/user/:id/directorPref", userCtrl.postDirectorPref);
  app.post("/api/user/:id/producerPref", userCtrl.postProducerPref);
  app.post("/api/user/:id/writerPref", userCtrl.postWriterPref);
  app.post("/api/user/:id/keywordPref", userCtrl.postKeywordPref);
  app.post("/api/user/:id/decadePref", userCtrl.postDecadePref);
  app.put("/api/user/:id/topfive/", userCtrl.deleteFromTopFive);
  app.put("/api/user/:id", userCtrl.updateUser);
}
