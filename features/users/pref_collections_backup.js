postGenrePref(req, res){
  Genre.find({"genreId" : req.body.genreId}, function(error, response){
    if(response.length > 0){
      let updatedScore = response[0].genreTotalScore += req.body.genreTotalScore;
      let updatedCount = response[0].genreCount += 1;
      let updatedObj = {
        genreScore : updatedScore / updatedCount,
        genreTotalScore : updatedScore,
        genreCount : updatedCount
      }
      Genre.findByIdAndUpdate(response[0]._id, updatedObj, function(err, resp){
        if(err){
          return res.status(500).json(err);
        } else {
          return res.status(201).json(resp);
        }
      })
    } else {
      new Genre(req.body).save(function(err, resp){
        if(err){
          return res.status(500).json(err);
        } else {
          User.findByIdAndUpdate(req.params.id, {$addToSet : {"preferences.genres" : resp._id}}, function(er, re){
            if(er){
              return res.status(500).json(er);
            } else {
              return res.status(201).json(resp);
            }
          })
          // return res.status(201).json(resp);
        }
      })
    }
  })
},
postActorPref(req, res){
  Actor.find({"castId" : req.body.castId}, function(error, response){
    console.log(req.body);
    console.log(response);
    if(response.length > 0){
      console.log("found");
      let updatedScore = response[0].actorTotalScore += req.body.actorTotalScore;
      let updatedCount = response[0].actorCount += 1;
      let updatedObj = {
        actorScore : updatedScore / updatedCount,
        actorTotalScore : updatedScore,
        actorCount : updatedCount
      }
      Actor.findByIdAndUpdate(response[0]._id, updatedObj, function(err, resp){
        if(err){
          // console.log(err);
          return res.status(500).json(err);
        } else {
          return res.status(201).json(resp);
        }
      })
    } else {
      console.log("crew new");
      console.log(req.body);
      new Actor(req.body).save(function(err, resp){
        if(err){
          console.log("error");
          console.log(err);
          return res.status(500).json(err);
        } else {
          User.findByIdAndUpdate(req.params.id, {$addToSet : {"preferences.actors" : resp._id}}, function(er, re){
            if(er){
              // console.log(er);
              return res.status(500).json(er);
            } else {
              return res.status(201).json(resp);
            }
          })
          // return res.status(201).json(resp);
        }
      })
    }
  })
},
postDecadePref(req, res){
  Decade.find({"decadeName" : req.body.decadeName}, function(error, response){
    if(response.length > 0){
      let updatedScore = response[0].decadeTotalScore += req.body.decadeTotalScore;
      let updatedCount = response[0].decadeCount += 1;
      let updatedObj = {
        decadeScore : updatedScore / updatedCount,
        decadeTotalScore : updatedScore,
        decadeCount : updatedCount
      }
      Decade.findByIdAndUpdate(response[0]._id, updatedObj, function(err, resp){
        if(err){
          return res.status(500).json(err);
        } else {
          return res.status(201).json(resp);
        }
      })
    } else {
      new Decade(req.body).save(function(err, resp){
        if(err){
          return res.status(500).json(err);
        } else {
          User.findByIdAndUpdate(req.params.id, {$addToSet : {"preferences.decades" : resp._id}}, function(er, re){
            if(er){
              return res.status(500).json(er);
            } else {
              return res.status(201).json(resp);
            }
          })
        }
      })
    }
  })
},
postDirectorPref(req, res){
  Director.find({"crewId" : req.body.crewId}, function(error, response){
    if(response.length > 0){
      let updatedScore = response[0].directorTotalScore += req.body.directorTotalScore;
      let updatedCount = response[0].directorCount += 1;
      let updatedObj = {
        directorScore : updatedScore / updatedCount,
        directorTotalScore : updatedScore,
        directorCount : updatedCount
      }
      Director.findByIdAndUpdate(response[0]._id, updatedObj, function(err, resp){
        if(err){
          return res.status(500).json(err);
        } else {
          return res.status(201).json(resp);
        }
      })
    } else {
      new Director(req.body).save(function(err, resp){
        if(err){
          return res.status(500).json(err);
        } else {
          User.findByIdAndUpdate(req.params.id, {$addToSet : {"preferences.directors" : resp._id}}, function(er, re){
            if(er){
              return res.status(500).json(er);
            } else {
              return res.status(201).json(resp);
            }
          })
        }
      })
    }
  })
},
postKeywordPref(req, res){
  Keyword.find({"keywordId" : req.body.keywordId}, function(error, response){
    if(response.length > 0){
      let updatedScore = response[0].keywordTotalScore += req.body.keywordTotalScore;
      let updatedCount = response[0].keywordCount += 1;
      let updatedObj = {
        keywordScore : updatedScore / updatedCount,
        keywordTotalScore : updatedScore,
        keywordCount : updatedCount
      }
      Keyword.findByIdAndUpdate(response[0]._id, updatedObj, function(err, resp){
        if(err){
          return res.status(500).json(err);
        } else {
          return res.status(201).json(resp);
        }
      })
    } else {
      new Keyword(req.body).save(function(err, resp){
        if(err){
          return res.status(500).json(err);
        } else {
          User.findByIdAndUpdate(req.params.id, {$addToSet : {"preferences.keywords" : resp._id}}, function(er, re){
            if(er){
              return res.status(500).json(er);
            } else {
              return res.status(201).json(resp);
            }
          })
        }
      })
    }
  })
},
postProducerPref(req, res){
  Producer.find({"crewId" : req.body.crewId}, function(error, response){
    if(response.length > 0){
      let updatedScore = response[0].producerTotalScore += req.body.producerTotalScore;
      let updatedCount = response[0].producerCount += 1;
      let updatedObj = {
        producerScore : updatedScore / updatedCount,
        producerTotalScore : updatedScore,
        producerCount : updatedCount
      }
      Producer.findByIdAndUpdate(response[0]._id, updatedObj, function(err, resp){
        if(err){
          return res.status(500).json(err);
        } else {
          console.log("update producer success");
          return res.status(201).json(resp);
        }
      })
    } else {
      new Producer(req.body).save(function(err, resp){
        if(err){
          return res.status(500).json(err);
        } else {
          User.findByIdAndUpdate(req.params.id, {$addToSet : {"preferences.producers" : resp._id}}, function(er, re){
            if(er){
              return res.status(500).json(er);
            } else {
              console.log("new producer success");
              return res.status(201).json(resp);
            }
          })
        }
      })
    }
  })
},
postWriterPref(req, res){
  Writer.find({"crewId" : req.body.crewId}, function(error, response){
    if(response.length > 0){
      let updatedScore = response[0].writerTotalScore += req.body.writerTotalScore;
      let updatedCount = response[0].writerCount += 1;
      let updatedObj = {
        writerScore : updatedScore / updatedCount,
        writerTotalScore : updatedScore,
        writerCount : updatedCount
      }
      Writer.findByIdAndUpdate(response[0]._id, updatedObj, function(err, resp){
        if(err){
          return res.status(500).json(err);
        } else {
          console.log("update writer success");
          return res.status(201).json(resp);
        }
      })
    } else {
      new Writer(req.body).save(function(err, resp){
        if(err){
          return res.status(500).json(err);
        } else {
          User.findByIdAndUpdate(req.params.id, {$addToSet : {"preferences.writers" : resp._id}}, function(er, re){
            if(er){
              return res.status(500).json(er);
            } else {
              console.log("new writer success");
              return res.status(201).json(resp);
            }
          })
        }
      })
    }
  })
}
