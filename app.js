var streams = ["casiodorus", "ESL_SC2", "comster404", "OgamingSC2", "witwix", "rorsheck", "riotgamesru", "FCCOKC"];
var url = "";
var game = "",
displayName = "",
viewers = "",
logoURL = "",
isOnline = false,
isActive = true,
html = "";

streams.forEach(function (stream) {
  function createURL(type, streamer){
    return "https://wind-bow.gomix.me/twitch-api/" + type + "/" + streamer + '?callback=?';
  }
  var user = "";
  //GET USER INFO
  $.getJSON(createURL("streams",stream), function(data){
    console.log("Success!");
    if(data.stream === null){
      //User is Offline
      user.isOnline = false;
      user.isActive = true;
    }else if (data.stream ===undefined){
      //User does not exist
      user.isOnline = false;
      user.isActive = false;
      user.viewers = 0;
    }else{
      //User is Online
      user.isOnline = true;
      user.viewers = data.stream.viewers;
    }
    $.getJSON(createURL("channels", stream), function(data){
      user.logoURL = data.logo != null ? data.logo : "https://img.clipartfest.com/5e9c58d9fa1aa44523a113686006795c_red-not-sign-transparent-clip-x-clipart-transparent_300-300.png";
      user.displayName = data.display_name != null ? data.display_name : "ERROR 404";
    });
  });
  displayStreamerInfo(user);
});


function displayStreamerInfo(user){
  console.log(user.displayName + "!!!");
  //DISPLAY USER'S PROFILE PICTURE
  html = '<a href="https://www.twitch.tv/' + user.displayName + '" class="list-group-item "><img class="profile-pic" src="';
  html += user.logoURL + '">';

  //DISPLAY NAME, VIEWERS, AND ONLINE STATUS
  html += '<h3>' + user.displayName + '</h3><span class="badge viewers-badge"><span class="glyphicon glyphicon-eye-open text-left">';
  html += '</span>' + user.viewers + '</span><span class="status-badge badge">';
  if(user.isOnline){
    html += '<span class="glyphicon glyphicon-ok-sign"></span><p class="text-right">ONLINE</p></span>';
    html += "<h5 class='text-center'>" + user.game + "</h5></a>";
  } else{
    html += '<span class="glyphicon glyphicon-remove-sign"></span><p class="text-right">OFFLINE</p></span></a>';
  }
  if(!user.isActive){
    html += "<h5 class='text-center'>ERROR 404</h5></a>";
  }
  $("ul").append(html);
}
