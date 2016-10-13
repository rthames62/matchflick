const Movie = require('./Movie.js');

module.exports = {
  // postMovie(req, res){
  //   new Movie(req.body).save(function(error, response){
  //     if(error){
  //       return res.status(500).json(error);
  //     } else {
  //       return res.json(response);
  //     }
  //   })
  // },
  postMovie(req, res){
    Movie.find({omdbId : req.body.omdbId}, function(error, response){
      if(response.length > 0){
        console.log("already there");
        res.send(response[0]);
      } else {
        new Movie(req.body).save(function(err, resp){
          console.log("create new");
          if(err){
            console.log("error");
            return res.status(500).json(err);
          } else {
            console.log("response");
            return res.json(resp);
          }
        })
      }
    })
  },
  getMovies(req, res){
    Movie.find({}, function(error, response){
      if(error){
        return res.status(500).json(error);
      } else {
        return res.json(response);
      }
    })
  },
  getMovie(req, res){
    Movie.findById(req.params.id, function(error, response){
      if(error){
        return res.status(500).json(error);
      } else {
        return res.json(response);
      }
    })
  }
}
