const userCtrl = require('./userCtrl');

module.exports = function(app){
  app.post("/api/users", userCtrl.postUser);
  app.get("/api/users", userCtrl.getUsers);
  app.get("/api/users/:id", userCtrl.getUser);
  app.get("/api/currentuser", userCtrl.currentUser);
  app.post("/api/user/:id/topFive", userCtrl.postTopFive);
  app.post("/api/user/:id/initRec", userCtrl.postInitRec);
  app.put("/api/user/:id/topfive/", userCtrl.deleteFromTopFive);
}
