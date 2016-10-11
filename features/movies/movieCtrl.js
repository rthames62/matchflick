const Movie = require('./Movie.js');

module.exports = {
  postMovie(req, res){
    new Movie(req.body).save(function(error, response){
      if(error){
        return res.status(500).json(error);
      } else {
        return res.json(response);
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
