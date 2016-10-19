const User = require('./User.js');
const Movie = require('../movies/Movie.js');

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
  getUserByFbId(req, res){
    User.find({facebookId : req.params.fb})
      .populate("initRecommended")
      .populate("ratedMoviesOne")
      .populate("ratedMoviesTwo")
      .populate("ratedMoviesThree")
      .populate("ratedMoviesFour")
      .populate("ratedMoviesFive")
      .populate("unseenMovies")
      .populate("watchlist")
      .exec(function(error, response){
          if(error){
              return res.status(500).json(error);
            } else {
                return res.status(201).json(response);
            }
      })
  },
  updateUser(req, res){
    User.findByIdAndUpdate(req.params.id, req.body, function(error, response){
      if(error){
        return res.status(500).json(error);
      } else {
          return res.status(201).json(response);
      }
    })
  },
  getUser(req, res){
    User.findById(req.params.id)
      .populate("initRecommended")
      .populate("ratedMoviesOne")
      .populate("ratedMoviesTwo")
      .populate("ratedMoviesThree")
      .populate("ratedMoviesFour")
      .populate("ratedMoviesFive")
      .populate("unseenMovies")
      .populate("watchlist")
      .populate("matchQueue")
      .exec(function(error, response){
          if(error){
              return res.status(500).json(error);
            } else {
                return res.status(201).json(response);
            }
      })
  },
  currentUser(req, res){
    res.send(req.user);
  },
  postTopFive(req, res){
    User.findByIdAndUpdate(req.params.id, {$push : {"topFive" : req.body}}, function(error, response){
      if(error){
        return res.status(500).json(error);
      } else {
          return res.status(201).json(response);
      }
    })
  },
  postInitRec(req, res){
    User.findByIdAndUpdate(req.params.id, {$addToSet : {"initRecommended" : req.body}}, function(error, response){
      if(error){
        return res.status(500).json(error);
      } else {
          return res.status(201).json(response);
      }
    })
  },
  postMatchQueue(req, res){
    User.findByIdAndUpdate(req.params.id, {$addToSet : {"matchQueue" : req.body}}, function(error, response){
      if(error){
        console.log("I AM already there");
        return res.status(500).json(error);
      } else {
          console.log("added");
          console.log(req.body._id);
          return res.status(201).json(response);
      }
    })
  },
  postRatedOne(req, res){
    User.findByIdAndUpdate(req.params.id, {$addToSet : {"ratedMoviesOne" : req.body}}, function(error, response){
      if(error){
        return res.status(500).json(error);
      } else {
          return res.status(201).json(response);
      }
    })
  },
  postRatedTwo(req, res){
    User.findByIdAndUpdate(req.params.id, {$addToSet : {"ratedMoviesTwo" : req.body}}, function(error, response){
      if(error){
        return res.status(500).json(error);
      } else {
          return res.status(201).json(response);
      }
    })
  },
  postRatedThree(req, res){
    User.findByIdAndUpdate(req.params.id, {$addToSet : {"ratedMoviesThree" : req.body}}, function(error, response){
      if(error){
        return res.status(500).json(error);
      } else {
          return res.status(201).json(response);
      }
    })
  },
  postRatedFour(req, res){
    User.findByIdAndUpdate(req.params.id, {$addToSet : {"ratedMoviesFour" : req.body}}, function(error, response){
      if(error){
        return res.status(500).json(error);
      } else {
          return res.status(201).json(response);
      }
    })
  },
  postRatedFive(req, res){
    User.findByIdAndUpdate(req.params.id, {$addToSet : {"ratedMoviesFive" : req.body}}, function(error, response){
      if(error){
        return res.status(500).json(error);
      } else {
          return res.status(201).json(response);
      }
    })
  },
  postUnseenMovie(req, res){
    User.findByIdAndUpdate(req.params.id, {$addToSet : {"unseenMovies" : req.body}}, function(error, response){
      if(error){
        return res.status(500).json(error);
      } else {
          return res.status(201).json(response);
      }
    })
  },
  postToWatchlist(req, res){
    User.findByIdAndUpdate(req.params.id, {$addToSet : {"watchlist" : req.body}}, function(error, response){
      if(error){
        return res.status(500).json(error);
      } else {
          return res.status(201).json(response);
      }
    })
  },
  deleteFromTopFive(req, res){
    User.update({_id : req.params.id}, {$pull : {"topFive" : req.body}}, function(error, response){
      if(error){
        return res.status(500).json(error);
      }
      return res.status(201).json(response);
    })
  },
  getGenresByScore(req, res){
    User.findById(req.params.id)
      .populate("preferences.genres")
      .exec(function(error, response){
          if(error){
              return res.status(500).json(error);
            } else {
                let sortedByScore = sortByScore(response.preferences.genres, "genreTotalScore");
                return res.status(201).json(sortedByScore);
            }
      })
  },
  getActorsByScore(req, res){
    User.findById(req.params.id, function(error, response){
      if(error){
          return res.status(500).json(error);
        } else {
            let newArr = pushAndFlatten(response.preferences.actors.toObject())
            let sortedByScore = sortByScore(newArr, "actorTotalScore");
            return res.status(201).json(sortedByScore);
        }
    })
  },
  getDirectorsByScore(req, res){
    User.findById(req.params.id, function(error, response){
      if(error){
          return res.status(500).json(error);
        } else {
            let newArr = pushAndFlatten(response.preferences.directors.toObject())
            let sortedByScore = sortByScore(newArr, "directorTotalScore");
            return res.status(201).json(sortedByScore);
        }
    })
  },
  getProducersByScore(req, res){
    User.findById(req.params.id, function(error, response){
      if(error){
          return res.status(500).json(error);
        } else {
            let newArr = pushAndFlatten(response.preferences.producers.toObject())
            let sortedByScore = sortByScore(newArr, "producerTotalScore");
            return res.status(201).json(sortedByScore);
        }
    })
  },
  getWritersByScore(req, res){
    User.findById(req.params.id, function(error, response){
      if(error){
          return res.status(500).json(error);
        } else {
            let newArr = pushAndFlatten(response.preferences.writers.toObject())
            let sortedByScore = sortByScore(newArr, "writerTotalScore");
            return res.status(201).json(sortedByScore);
        }
    })
  },
  getKeywordsByScore(req, res){
    User.findById(req.params.id, function(error, response){
      if(error){
          return res.status(500).json(error);
        } else {
            let newArr = pushAndFlatten(response.preferences.keywords.toObject())
            let sortedByScore = sortByScore(newArr, "keywordTotalScore");
            return res.status(201).json(sortedByScore);
        }
    })
  },
  getDecadesByScore(req, res){
    User.findById(req.params.id)
      .populate("preferences.decades")
      .exec(function(error, response){
          if(error){
              return res.status(500).json(error);
            } else {
                let sortedByScore = sortByScore(response.preferences.decades, "decadeTotalScore");
                return res.status(201).json(sortedByScore);
            }
      })
  },
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
                return res.status(201).json(updatedUser);
            }
          })
        } else {
          let found = false;
          for (let i = 0; i < user.preferences.genres.length; i++) {
            if(user.preferences.genres[i].genreId === req.body.genreId){
              let updatedCount = user.preferences.genres[i].genreCount += 1;
              let updatedScore = user.preferences.genres[i].genreTotalScore += req.body.genreTotalScore;
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
                  return res.status(201).json(updatedUser.preferences.genres);
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
  postActorPref(req, res){
  User.findById(req.params.id, function(error, user){
    let firstLetter = checkForNum(req.body.actorName);
    let arr = user.preferences.actors[firstLetter];
    if(error){
      return res.status(500).json(error);
    }
    if(user){
      if(arr.length === 0) {
        User.findByIdAndUpdate(req.params.id, {$push : {[`preferences.actors.${firstLetter}`] : req.body}}, function(err, updatedUser){
          if(err){
            return res.status(500).json(err);
          } else {
            return res.status(201).json(updatedUser);
          }
        })
      } else {
        let found = false;
        for (let i = 0; i < arr.length; i++) {
          if(arr[i].castId === req.body.castId){
            let updatedCount = arr[i].actorCount += 1;
            let updatedScore = arr[i].actorTotalScore += req.body.actorTotalScore;
            arr[i] = {
              "actorName" : arr[i].actorName,
              "actorScore" : updatedScore / updatedCount,
              "actorTotalScore" : updatedScore,
              "actorCount" : updatedCount,
              "castId" : arr[i].castId
            }

            User.findByIdAndUpdate(req.params.id, {$set : {[`preferences.actors.${firstLetter}`] : arr}}, function(err, updatedUser){
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
          User.findByIdAndUpdate(req.params.id, {$push : {[`preferences.actors.${firstLetter}`] : req.body}}, function(err, updatedUser){
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
  let firstLetter = checkForNum(req.body.directorName);
  let arr = user.preferences.directors[firstLetter];
  if(error){
    return res.status(500).json(error);
  }
  if(user){
    if(arr.length === 0) {
      User.findByIdAndUpdate(req.params.id, {$push : {[`preferences.directors.${firstLetter}`] : req.body}}, function(err, updatedUser){
        if(err){
          return res.status(500).json(err);
        } else {
          return res.status(201).json(updatedUser);
        }
      })
    } else {
      let found = false;
      for (let i = 0; i < arr.length; i++) {
        if(arr[i].crewId === req.body.crewId){
          let updatedCount = arr[i].directorCount += 1;
          let updatedScore = arr[i].directorTotalScore += req.body.directorTotalScore;
          arr[i] = {
            "directorName" : arr[i].directorName,
            "directorScore" : updatedScore / updatedCount,
            "directorTotalScore" : updatedScore,
            "directorCount" : updatedCount,
            "crewId" : arr[i].crewId
          }

          User.findByIdAndUpdate(req.params.id, {$set : {[`preferences.directors.${firstLetter}`] : arr}}, function(err, updatedUser){
            if(err){
              return res.status(500).json(err);
            } else {
              console.log("done5");
                return res.status(201).json(updatedUser.preferences.directors);
            }
          })
          found = true;
          break;
        }
      }
      if(!found) {
        User.findByIdAndUpdate(req.params.id, {$push : {[`preferences.directors.${firstLetter}`] : req.body}}, function(err, updatedUser){
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
postKeywordPref(req, res){
User.findById(req.params.id, function(error, user){
  let firstLetter = checkForNum(req.body.keywordName);
  let arr = user.preferences.keywords[firstLetter];
  console.log("woorrrdddd", req.body.keywordName);
  console.log("first letterrrrrr", firstLetter);
  if(error){
    return res.status(500).json(error);
  }
  if(user){
    // console.log("araayyyyyyyy", arr);
    if(arr.length === 0) {
      User.findByIdAndUpdate(req.params.id, {$push : {[`preferences.keywords.${firstLetter}`] : req.body}}, function(err, updatedUser){
        if(err){
          return res.status(500).json(err);
        } else {
          return res.status(201).json(updatedUser);
        }
      })
    } else {
      let found = false;
      for (let i = 0; i < arr.length; i++) {
        if(arr[i].keywordId === req.body.keywordId){
          let updatedCount = arr[i].keywordCount += 1;
          let updatedScore = arr[i].keywordTotalScore += req.body.keywordTotalScore;
          arr[i] = {
            "keywordName" : arr[i].keywordName,
            "keywordScore" : updatedScore / updatedCount,
            "keywordTotalScore" : updatedScore,
            "keywordCount" : updatedCount,
            "keywordId" : arr[i].keywordId
          }

          User.findByIdAndUpdate(req.params.id, {$set : {[`preferences.keywords.${firstLetter}`] : arr}}, function(err, updatedUser){
            if(err){
              return res.status(500).json(err);
            } else {
              console.log("done4");
                return res.status(201).json(updatedUser.preferences.keywords);
            }
          })
          found = true;
          break;
        }
      }
      if(!found) {
        User.findByIdAndUpdate(req.params.id, {$push : {[`preferences.keywords.${firstLetter}`] : req.body}}, function(err, updatedUser){
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
postProducerPref(req, res){
User.findById(req.params.id, function(error, user){
  let firstLetter = checkForNum(req.body.producerName);
  let arr = user.preferences.producers[firstLetter];
  if(error){
    return res.status(500).json(error);
  }
  if(user){
    if(arr.length === 0) {
      User.findByIdAndUpdate(req.params.id, {$push : {[`preferences.producers.${firstLetter}`] : req.body}}, function(err, updatedUser){
        if(err){
          return res.status(500).json(err);
        } else {
          return res.status(201).json(updatedUser);
        }
      })
    } else {
      let found = false;
      for (let i = 0; i < arr.length; i++) {
        if(arr[i].crewId === req.body.crewId){
          let updatedCount = arr[i].producerCount += 1;
          let updatedScore = arr[i].producerTotalScore += req.body.producerTotalScore;
          arr[i] = {
            "producerName" : arr[i].producerName,
            "producerScore" : updatedScore / updatedCount,
            "producerTotalScore" : updatedScore,
            "producerCount" : updatedCount,
            "crewId" : arr[i].crewId
          }

          User.findByIdAndUpdate(req.params.id, {$set : {[`preferences.producers.${firstLetter}`] : arr}}, function(err, updatedUser){
            if(err){
              return res.status(500).json(err);
            } else {
              console.log("done3");
                return res.status(201).json(updatedUser.preferences.producers);
            }
          })
          found = true;
          break;
        }
      }
      if(!found) {
        User.findByIdAndUpdate(req.params.id, {$push : {[`preferences.producers.${firstLetter}`] : req.body}}, function(err, updatedUser){
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
postWriterPref(req, res){
User.findById(req.params.id, function(error, user){
  let firstLetter = checkForNum(req.body.writerName);
  let arr = user.preferences.writers[firstLetter];
  if(error){
    return res.status(500).json(error);
  }
  if(user){
    if(arr.length === 0) {
      User.findByIdAndUpdate(req.params.id, {$push : {[`preferences.writers.${firstLetter}`] : req.body}}, function(err, updatedUser){
        if(err){
          return res.status(500).json(err);
        } else {
          return res.status(201).json(updatedUser);
        }
      })
    } else {
      let found = false;
      for (let i = 0; i < arr.length; i++) {
        if(arr[i].crewId === req.body.crewId){
          let updatedCount = arr[i].writerCount += 1;
          let updatedScore = arr[i].writerTotalScore += req.body.writerTotalScore;
          arr[i] = {
            "writerName" : arr[i].writerName,
            "writerScore" : updatedScore / updatedCount,
            "writerTotalScore" : updatedScore,
            "writerCount" : updatedCount,
            "crewId" : arr[i].crewId
          }

          User.findByIdAndUpdate(req.params.id, {$set : {[`preferences.writers.${firstLetter}`] : arr}}, function(err, updatedUser){
            if(err){
              return res.status(500).json(err);
            } else {
              console.log("done2");
                return res.status(201).json(updatedUser.preferences.writers);
            }
          })
          found = true;
          break;
        }
      }
      if(!found) {
        User.findByIdAndUpdate(req.params.id, {$push : {[`preferences.writers.${firstLetter}`] : req.body}}, function(err, updatedUser){
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
          // console.log("no genres", req.body.genreId);
          if(err){
            return res.status(500).json(err);
          } else {
              return res.status(201).json(updatedUser);
          }
        })
      } else {
        let found = false;
        for (let i = 0; i < user.preferences.decades.length; i++) {
          if(user.preferences.decades[i].decadeId === req.body.decadeId){
            let updatedCount = user.preferences.decades[i].decadeCount += 1;
            let updatedScore = user.preferences.decades[i].decadeTotalScore += req.body.decadeTotalScore;
            user.preferences.decades[i] = {
              "decadeName" : req.body.decadeName,
              "decadeScore" : updatedScore / updatedCount,
              "decadeTotalScore" : updatedScore,
              "decadeCount" : updatedCount
            }

            User.findByIdAndUpdate(req.params.id, {$set : {"preferences.decades" : user.preferences.decades}}, function(err, updatedUser){
              if(err){
                // console.log("err2");
                return res.status(500).json(err);
              } else {
                console.log("done1");
                return res.status(201).json(updatedUser.preferences.decades);
              }
            })
            found = true;
            break;
          }
        }
        if(!found) {
          User.findByIdAndUpdate(req.params.id, {$push : {"preferences.decades" : req.body}}, function(err, updatedUser){
            // console.log("no match", req.body.genreId);
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
},
removeFromMatchQueue(req, res){
  User.findByIdAndUpdate(req.params.id, {$pull : {"matchQueue" : {$in : [req.body]}}}, {safe : true, upsert : true, new : true}, function(error, response){
    if (error) {
      console.log("error");
      // console.log(error);
      return res.status(500).json(error);
    } else {
      console.log("response");
      // console.log(response);
      return res.status(201).json(response.matchQueue);
    }
  })
}



} //end of object





// ******************************************************************************** //
// ******************************************************************************** //

// HELPER FUNCTIONS

// ******************************************************************************** //
// ******************************************************************************** //

function sortByScore(array, key) {
  return array.sort(function(a, b) {
      var y = a[key]; var x = b[key];
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  });
}

function pushAndFlatten(myObj){
	var newArr = [];
	for(var myProp in myObj){
		newArr.push(myObj[myProp])
	}
	newArr = [].concat.apply([], newArr);
	return [].concat.apply([], newArr);
}

function checkForNum(str){
	let first = str.slice(0,1);
	if(Number.isInteger(parseInt(first))){
		return "num";
	} else {
		return first.toLowerCase();
	}
}
