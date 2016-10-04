function mainService($http){
  let currentUser = {};
  let currentUserFbId = "";

  this.getCurrentUser = function(){
    return $http.get(`/api/users/${currentUserFbId}`).then(function(response){
      console.log("my db", response.data[0]);
      return response.data[0];
    })
  }

  function getCurrentUser(){
    return $http.get("/api/facebook").then(function(response){
      console.log(response);
      let results = response.data;
      currentUser = {
        firstName : results._json.first_name,
        lastName : results._json.last_name,
        email : results._json.email,
        facebookId : results.id,
        profileUrl : results.profileUrl,
        location : results._json.location,
        coverPhotoUrl : results._json.cover.source,
        profilePictureUrl : results._json.picture.data.url
      };
      currentUserFbId = results.id;
      console.log(currentUser);
      postCurrentUser(currentUser);
      return response;
    })
  }

  function postCurrentUser(obj){
    $http.post("/api/users", obj)
  }

  if(!currentUser){
    getCurrentUser();
  }
}

module.exports = mainService;
