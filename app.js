var streams = ["cretetion", "patch3211", "RobotCaleb", "comster404", "OgamingSC2", "habathcx", "streamerhouse", "ThijsHS"];

streams.forEach(function(streamName) {
  //GET USER INFO
  $.getJSON(createURL("channels", streamName), function(data) {
      var isOnline, game, viewers, isActive,logo;
      var name = data.display_name !== null ? data.display_name : "channel";
      //GET USER LOGO
      if (data.logo === null) { logo = "https://static-cdn.jtvnw.net/jtv_user_pictures/xarth/404_user_70x70.png" }
      else if (data.logo === undefined) {
          logo = "https://img.clipartfest.com/5e9c58d9fa1aa44523a113686006795c_red-not-sign-transparent-clip-x-clipart-transparent_300-300.png";
          name = "Err 404: User Not Found";
      }
      else { logo = data.logo }
      $.getJSON(createURL("streams", streamName), function (data) {
          if (data.stream === null) {
            //User is offline
              isOnline = false;
              isActive = true;
            game = null;
            viewers = 0;
          } else if (data.stream === undefined) {
            //User does not exist
            name = "Error 404: Not Found";
            isOnline = false;
            var isActive = false;
            game = null;
            viewers = 0;
          } else {
              //User is streaming
              isActive = true;
            game = data.stream.game;
            isOnline = true;
            viewers = data.stream.viewers;
          }
          //BUILD HTML
          if (isActive == true){ html = '<a href="https://www.twitch.tv/' + name + '" class="list-group-item"><img class="profile-pic" src="';}
          else { html = '<a href="https://www.twitch.tv/' + name + '" class="list-group-item disabled"><img class="profile-pic" src="';}
      
      html += logo + '">';
      html += '<h3>' + name + '</h3><span class="badge viewers-badge"><span class="glyphicon glyphicon-eye-open text-left">';
      html += '</span>' + viewers + '</span><span class="status-badge badge">';
      if (isOnline) {
        html += '<span class="glyphicon glyphicon-ok-sign"></span><p class="text-right">ONLINE</p></span>';
        html += "<h5 class='text-center'>" + game + "</h5></a>";
      } else {
        html += '<span class="glyphicon glyphicon-remove-sign"></span><p class="text-right">OFFLINE</p></span></a>';
      }
      if (!isActive) {
        html += "<h5 class='text-center'>ERROR 404</h5></a>";
      }
      $("ul").append(html);

    });
  });
});

function createURL(type, name) {
  return 'https://wind-bow.gomix.me/twitch-api/' + type + '/' + name + '?callback=?';
}
