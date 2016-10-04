const User = require('./User.js');

module.exports = {
  postUser(req, res){
    new User(req.body).save(function(error, response){
      if(error){
        return res.status(500).json(error);
      } else {
        return res.json(response);
      }
    })
  },
  getUsers(req, res){
    User.find({}, function(error, response){
      if(error){
        return res.status(500).json(error);
      } else {
        return res.json(response);
      }
    })
  },
  getUser(req, res){
    User.findById(req.params.id, function(error, response){
      if(error){
        return res.status(500).json(error);
      }
      return res.status(201).json(response);
    })
  },
  currentUser(req, res){
    res.send(req.user);
  }
}
