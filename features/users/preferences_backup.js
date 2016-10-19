postGenrePref(req, res){
  User.findById(req.params.id, function(error, user){
    if(error){
      return res.status(500).json(error);
    }
    if(user){
      if(user.preferences.genres.length === 0) {
        User.findByIdAndUpdate(req.params.id, {$push : {"preferences.genres" : req.body}}, function(err, updatedUser){
          // console.log("no genres", req.body.genreId);
          if(err){
            return res.status(500).json(err);
          } else {
            console.log("done7");
              return res.status(201).json(updatedUser);
          }
        })
      } else {
        let found = false;
        for (let i = 0; i < user.preferences.genres.length; i++) {
          console.log(user.preferences.genres[i].genreId, req.body.genreId);
          if(user.preferences.genres[i].genreId === req.body.genreId){
            console.log(user.preferences.genres[i].genreId, req.body.genreId);
            console.log("found genre", i, req.body.genreId);
            let updatedCount = user.preferences.genres[i].genreCount += 1;
            let updatedScore = user.preferences.genres[i].genreScore += req.body.genreScore;
            console.log("updated count and score", updatedScore, updatedCount);
            user.preferences.genres[i] = {
              "genreName" : req.body.genreName,
              "genreScore" : updatedScore / updatedCount,
              "genreTotalScore" : updatedScore,
              "genreCount" : updatedCount,
              "genreId" : req.body.genreId
            }

            User.findByIdAndUpdate(req.params.id, {$set : {"preferences.genres" : user.preferences.genres}}, function(err, updatedUser){
              if(err){
                // console.log("err2");
                return res.status(500).json(err);
              } else {
                console.log("done7");
                  return res.status(201).json(updatedUser);
              }
            })
            found = true;
            break;
          }
        }
        if(!found) {
          User.findByIdAndUpdate(req.params.id, {$push : {"preferences.genres" : req.body}}, function(err, updatedUser){
            // console.log("no match", req.body.genreId);
            if(err){
              return res.status(500).json(err);
            } else {
              console.log("done7");
                return res.status(201).json(updatedUser);
            }
          })
        }
      }
    }
})
},
postLeadActorPref(req, res){
User.findById(req.params.id, function(error, user){
  if(error){
    return res.status(500).json(error);
  }
  if(user){
    if(user.preferences.leadActors.length === 0) {
      User.findByIdAndUpdate(req.params.id, {$push : {"preferences.leadActors" : req.body}}, function(err, updatedUser){
        if(err){
          return res.status(500).json(err);
        } else {
          console.log("done6");
            return res.status(201).json(updatedUser);
        }
      })
    } else {
      let found = false;
      for (let i = 0; i < user.preferences.leadActors.length; i++) {
        if(user.preferences.leadActors[i].castId === req.body.castId){
          let updatedCount = user.preferences.leadActors[i].leadActorCount += 1;
          let updatedScore = user.preferences.leadActors[i].leadActorScore += req.body.leadActorScore;
          user.preferences.leadActors[i] = {
            "leadActorName" : req.body.leadActorName,
            "leadActorScore" : updatedScore / updatedCount,
            "leadActorTotalScore" : updatedScore,
            "leadActorCount" : updatedCount,
            "castId" : req.body.castId
          }

          User.findByIdAndUpdate(req.params.id, {$set : {"preferences.leadActors" : user.preferences.leadActors}}, function(err, updatedUser){
            if(err){
              return res.status(500).json(err);
            } else {
              console.log("done6");
                return res.status(201).json(updatedUser);
            }
          })
          found = true;
          break;
        }
      }
      if(!found) {
        User.findByIdAndUpdate(req.params.id, {$push : {"preferences.leadActors" : req.body}}, function(err, updatedUser){
          if(err){
            return res.status(500).json(err);
          } else {
            console.log("done6");
              return res.status(201).json(updatedUser);
          }
        })
      }
    }
  }
})
},
postDirectorPref(req, res){
User.findById(req.params.id, function(error, user){
  if(error){
    return res.status(500).json(error);
  }
  if(user){
    if(user.preferences.directors.length === 0) {
      User.findByIdAndUpdate(req.params.id, {$push : {"preferences.directors" : req.body}}, function(err, updatedUser){
        if(err){
          return res.status(500).json(err);
        } else {
          console.log("done5");
            return res.status(201).json(updatedUser);
        }
      })
    } else {
      let found = false;
      for (let i = 0; i < user.preferences.directors.length; i++) {
        if(user.preferences.directors[i].crewId === req.body.crewId){
          let updatedCount = user.preferences.directors[i].directorCount += 1;
          let updatedScore = user.preferences.directors[i].directorScore += req.body.directorScore;
          user.preferences.directors[i] = {
            "directorName" : req.body.directorName,
            "directorScore" : updatedScore / updatedCount,
            "directorTotalScore" : updatedScore,
            "directorCount" : updatedCount,
            "crewId" : req.body.crewId
          }

          User.findByIdAndUpdate(req.params.id, {$set : {"preferences.directors" : user.preferences.directors}}, function(err, updatedUser){
            if(err){
              return res.status(500).json(err);
            } else {
              console.log("done5");
                return res.status(201).json(updatedUser);
            }
          })
          found = true;
          break;
        }
      }
      if(!found) {
        User.findByIdAndUpdate(req.params.id, {$push : {"preferences.directors" : req.body}}, function(err, updatedUser){
          if(err){
            return res.status(500).json(err);
          } else {
            console.log("done5");
              return res.status(201).json(updatedUser);
          }
        })
      }
    }
  }
})
},
postProducerPref(req, res){
User.findById(req.params.id, function(error, user){
  if(error){
    return res.status(500).json(error);
  }
  if(user){
    if(user.preferences.producers.length === 0) {
      User.findByIdAndUpdate(req.params.id, {$push : {"preferences.producers" : req.body}}, function(err, updatedUser){
        if(err){
          return res.status(500).json(err);
        } else {
          console.log("done4");
            return res.status(201).json(updatedUser);
        }
      })
    } else {
      let found = false;
      for (let i = 0; i < user.preferences.producers.length; i++) {
        if(user.preferences.producers[i].crewId === req.body.crewId){
          let updatedCount = user.preferences.producers[i].producerCount += 1;
          let updatedScore = user.preferences.producers[i].producerScore += req.body.producerScore;
          user.preferences.producers[i] = {
            "producerName" : req.body.producerName,
            "producerScore" : updatedScore / updatedCount,
            "producerCountScore" : updatedScore,
            "producerCount" : updatedCount,
            "crewId" : req.body.crewId
          }

          User.findByIdAndUpdate(req.params.id, {$set : {"preferences.producers" : user.preferences.producers}}, function(err, updatedUser){
            if(err){
              return res.status(500).json(err);
            } else {
              console.log("done4");
                return res.status(201).json(updatedUser);
            }
          })
          found = true;
          break;
        }
      }
      if(!found) {
        User.findByIdAndUpdate(req.params.id, {$push : {"preferences.producers" : req.body}}, function(err, updatedUser){
          if(err){
            return res.status(500).json(err);
          } else {
            console.log("done4");
              return res.status(201).json(updatedUser);
          }
        })
      }
    }
  }
})
},
postWriterPref(req, res){
User.findById(req.params.id, function(error, user){
  if(error){
    return res.status(500).json(error);
  }
  if(user){
    if(user.preferences.writers.length === 0) {
      User.findByIdAndUpdate(req.params.id, {$push : {"preferences.writers" : req.body}}, function(err, updatedUser){
        if(err){
          return res.status(500).json(err);
        } else {
          console.log("done3");
            return res.status(201).json(updatedUser);
        }
      })
    } else {
      let found = false;
      for (let i = 0; i < user.preferences.writers.length; i++) {
        if(user.preferences.writers[i].crewId === req.body.crewId){
          let updatedCount = user.preferences.writers[i].writerCount += 1;
          let updatedScore = user.preferences.writers[i].writerScore += req.body.writerScore;
          user.preferences.writers[i] = {
            "writerName" : req.body.writerName,
            "writerScore" : updatedScore / updatedCount,
            "writerTotalScore" : updatedScore,
            "writerCount" : updatedCount,
            "crewId" : req.body.crewId
          }

          User.findByIdAndUpdate(req.params.id, {$set : {"preferences.writers" : user.preferences.writers}}, function(err, updatedUser){
            if(err){
              return res.status(500).json(err);
            } else {
              console.log("done3");
                return res.status(201).json(updatedUser);
            }
          })
          found = true;
          break;
        }
      }
      if(!found) {
        User.findByIdAndUpdate(req.params.id, {$push : {"preferences.writers" : req.body}}, function(err, updatedUser){
          if(err){
            return res.status(500).json(err);
          } else {
            console.log("done3");
              return res.status(201).json(updatedUser);
          }
        })
      }
    }
  }
})
},
postKeywordPref(req, res){
User.findById(req.params.id, function(error, user){
  if(error){
    return res.status(500).json(error);
  }
  if(user){
    if(user.preferences.keywords.length === 0) {
      User.findByIdAndUpdate(req.params.id, {$push : {"preferences.keywords" : req.body}}, function(err, updatedUser){
        if(err){
          return res.status(500).json(err);
        } else {
          console.log("done2");
            return res.status(201).json(updatedUser);
        }
      })
    } else {
      let found = false;
      for (let i = 0; i < user.preferences.keywords.length; i++) {
        if(user.preferences.keywords[i].keywordId === req.body.keywordId){
          let updatedCount = user.preferences.keywords[i].keywordCount += 1;
          let updatedScore = user.preferences.keywords[i].keywordScore += req.body.keywordScore;
          user.preferences.keywords[i] = {
            "keywordName" : req.body.keywordName,
            "keywordScore" : updatedScore / updatedCount,
            "keywordTotalScore" : updatedScore,
            "keywordCount" : updatedCount,
            "keywordId" : req.body.keywordId
          }

          User.findByIdAndUpdate(req.params.id, {$set : {"preferences.keywords" : user.preferences.keywords}}, function(err, updatedUser){
            if(err){
              return res.status(500).json(err);
            } else {
              console.log("done2");
                return res.status(201).json(updatedUser);
            }
          })
          found = true;
          break;
        }
      }
      if(!found) {
        User.findByIdAndUpdate(req.params.id, {$push : {"preferences.keywords" : req.body}}, function(err, updatedUser){
          if(err){
            return res.status(500).json(err);
          } else {
            console.log("done2");
              return res.status(201).json(updatedUser);
          }
        })
      }
    }
  }
})
},
postDecadePref(req, res){
User.findById(req.params.id, function(error, user){
  if(error){
    return res.status(500).json(error);
  }
  if(user){
    if(user.preferences.decades.length === 0) {
      User.findByIdAndUpdate(req.params.id, {$push : {"preferences.decades" : req.body}}, function(err, updatedUser){
        if(err){
          return res.status(500).json(err);
        } else {
          console.log("done1");
            return res.status(201).json(updatedUser);
        }
      })
    } else {
      let found = false;
      for (let i = 0; i < user.preferences.decades.length; i++) {
        if(user.preferences.decades[i].decadeName === req.body.decadeName){
          let updatedCount = user.preferences.decades[i].decadeCount += 1;
          let updatedScore = user.preferences.decades[i].decadeScore += req.body.decadeScore;
          user.preferences.decades[i] = {
            "decadeName" : req.body.decadeName,
            "decadeScore" : updatedScore / updatedCount,
            "decadeTotalScore" : updatedScore,
            "decadeCount" : updatedCount
          }

          User.findByIdAndUpdate(req.params.id, {$set : {"preferences.decades" : user.preferences.decades}}, function(err, updatedUser){
            if(err){
              return res.status(500).json(err);
            } else {
              console.log("done1");
                return res.status(201).json(updatedUser);
            }
          })
          found = true;
          break;
        }
      }
      if(!found) {
        User.findByIdAndUpdate(req.params.id, {$push : {"preferences.decades" : req.body}}, function(err, updatedUser){
          if(err){
            return res.status(500).json(err);
          } else {
            console.log("done1");
              return res.status(201).json(updatedUser);
          }
        })
      }
    }
  }
})
}
