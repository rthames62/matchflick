const userCtrl = require('./userCtrl');

module.exports = function(app){
  app.post("/api/users", userCtrl.postUser);
  app.get("/api/users", userCtrl.getUsers);
  app.get("/api/users/:id", userCtrl.getUser);
  app.get("/api/currentuser", userCtrl.currentUser);
}
