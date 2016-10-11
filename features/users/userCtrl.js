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
  },
  postTopFive(req, res){
    User.findByIdAndUpdate(req.params.id, {$push : {"topFive" : req.body}}, function(error, response){
      if(error){
        return res.status(500).json(error);
      }
      return res.status(201).json(response);
    })
  },
  postInitRec(req, res){
    User.findByIdAndUpdate(req.params.id, {$push : {"initRecommended" : req.body}}, function(error, response){
      if(error){
        return res.status(500).json(error);
      }
      return res.status(201).json(response);
    })
  },
  deleteFromTopFive(req, res){
    User.update({_id : req.params.id}, {$pull : {"topFive" : req.body}}, function(error, response){
      if(error){
        return res.status(500).json(error);
      }
      return res.status(201).json(response);
    })
  }
}
