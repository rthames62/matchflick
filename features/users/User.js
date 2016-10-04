const mongoose = require('mongoose');

const User = new mongoose.Schema({
  firstName : {type : String, required : true, trim : true},
  lastName : {type : String, required : true, trim : true},
  email : {type : String, trim : true},
  facebookId : {type : String, required : true, trim : true, unique : true},
  gender : {type : String, enum : ["Male", "Female"]},
  profileUrl : {type : String, trim : true},
  location : {type : String, trim : true},
  coverPhotoUrl : {type : String, trim : true},
  profilePictureUrl : {type : String, trim : true}
})

module.exports = mongoose.model("User", User);
