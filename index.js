const express = require('express');
const json = require('body-parser').json;
const session = require('express-session');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const config = require('./config.js');
const mongoose = require("mongoose");
const mongoUri = "mongodb://localhost:27017/matchflick";

const app = express();
const port = 8080;

app.use(express.static(`${__dirname}/public`));

app.use(json());
// app.use(cors());
require("./masterRoutes.js")(app);
mongoose.connect(mongoUri);
mongoose.connection.once("open", function(){});
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

app.get("/auth/facebook", passport.authenticate("facebook"));
app.get("/auth/facebook/callback", passport.authenticate("facebook", {
  successRedirect : "/#/dashboard",
  failureRedirect : "/"
}));

passport.serializeUser(function(user, done){
  done(null, user);
});

passport.deserializeUser(function(obj, done){
  done(null, obj);
});

app.get("/api/facebook", function(req, res){
  res.send(req.user);
})

app.listen(port, function(){console.log(`Listening on port ${port}`);})
