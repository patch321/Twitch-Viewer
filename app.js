var streams = ["casiodorus", "ESL_SC2", "patch3211", "comster404", "OgamingSC2", "witwix", "rorsheck", "riotgamesru"];

streams.forEach(function(stream) {
  var profile = stream;
  //GET USER INFO
  $.getJSON(createURL("channels", stream), function(data) {
    //GET NUMBER OF VIEWERS AND ONLINE STATUS
    var isOnline, game;
    if (data.stream === null) {
      //User is offline
      isOnline = false;
      game = null;
    } else if (data.stream === undefined) {
      isOnline = false;
      var isActive = false;
      game = null;
    } else {
      game = data.stream.game;
      isOnline = true;
      var viewers = data.stream.viewers;
    }
    $.getJSON(createURL("streams", stream), function(data) {
      var logo = data.logo !== null ? data.logo : "https://img.clipartfest.com/5e9c58d9fa1aa44523a113686006795c_red-not-sign-transparent-clip-x-clipart-transparent_300-300.png";
      var name = data.display_name !== null ? data.display_name : "channel";
      //BUILD HTML
      html = '<a href="https://www.twitch.tv/' + name + '" class="list-group-item disabled"><img class="profile-pic" src="';
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
