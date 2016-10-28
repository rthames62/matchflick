const express = require('express');
const json = require('body-parser').json;
const session = require('express-session');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const config = require('./config.js');
const mongoose = require("mongoose");
const mongoUri = config.mongoUri.url;
const $ = require('jquery');
const jquery = require('jquery');
const AWS = require('aws-sdk');

const app = express();
const port = 80;

app.use(express.static(`${__dirname}/public`));
// app.use(json({limit: '50mb'}));
app.use(json({limit: '50mb'}));
// app.use(cors());
require("./masterRoutes.js")(app);
mongoose.connect(mongoUri);
mongoose.connection.once("open", function(){console.log("connected to db");});
app.use(session({secret : config.mySecrets.secret}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new FacebookStrategy({
  clientID : config.facebook.clientID,
  clientSecret : config.facebook.secret,
  callbackURL : config.facebook.cbUrl,
  profileFields : ["id", "name", "gender", "link", "email", "location", "cover", "friends", "friendlists", "picture"]
}, function(token, refreshToken, profile, done){
  return done(null, profile);
}));

function loggedIn(req, res, next){
  if(req.user){
    console.log("go to next");
    next();
  } else {
    console.log("redirect");
    res.redirect("/");
  }
}

// app.get('/auth/facebook', ensureLoggedIn('/'), routes.loggedin);
app.get("/auth/facebook", passport.authenticate("facebook"));
app.get("/auth/facebook/callback", passport.authenticate("facebook", {
  successRedirect : "/#/loading",
  failureRedirect : "/"
}));

passport.serializeUser(function(user, done){
  console.log("serialize");
  done(null, user);
});

passport.deserializeUser(function(user, done){
  console.log("deserialize");
  done(null, user);
});

app.get("/api/facebook", loggedIn, function(req, res, next){
  console.log(req.user);
  res.send(req.user);
})

app.listen(port, function(){console.log(`Listening on port ${port}`);})
