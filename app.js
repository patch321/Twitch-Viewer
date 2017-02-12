var streams = ["casiodorus", "ESL_SC2", "patch3211", "comster404", "OgamingSC2"];
var url = "";
var game = "",
name = "",
viewers = "",
logoURL = "",
isOnline = false,
isActive = true,
html = "";

streams.forEach(function(streamer){
	

	//GET USER INFO
	url = "https://wind-bow.gomix.me/twitch-api/channels/" + streamer;
	$.ajax({
		type: "GET",
		url: url,
		async: false,
		dataType: "json",
		success: function(user){
			streamer = user;
			url = "https://wind-bow.gomix.me/twitch-api/streams/" + streamer.name;
			$.ajax({
				type: "GET",
				url: url,
				async: false,
				dataType: "json",
				success: function(dude){
					streamer.viewers = dude.stream.viewers;
					streamer.isOnline = true;
				}
			});
			if(!streamer.viewers){
				streamer.viewers = 0;
				streamer.isOnline = false;
			}
			displayStreamerInfo(streamer);
		}
	});
	function displayStreamerInfo(data){
		console.log(data.display_name + "!!!");
		html = html + '<a href="https://www.twitch.tv/' + data.name + '" class="list-group-item"><img class="profile-pic" src="';
		//DISPLAY USER'S PROFILE PICTURE
		if(data.logo === undefined){
			//USER DOES NOT EXIST!
			html = html + 'https://img.clipartfest.com/5e9c58d9fa1aa44523a113686006795c_red-not-sign-transparent-clip-x-clipart-transparent_300-300.png">';
		} else if(data.logo === null){
			html = html + 'https://static-cdn.jtvnw.net/jtv_user_pictures/xarth/404_user_70x70.png">';
		} else {
			html = html + data.logo + '"">';
		}
		if(data.views == undefined){
			data.views = 0;
		}
		html = html + '<h3>' + data.display_name + '</h3><span class="badge viewers-badge"><span class="glyphicon glyphicon-eye-open text-left">';
		html = html + '</span>' + data.viewers + '</span><span class="status-badge badge">';
		if(data.isOnline){
			html = html + '<span class="glyphicon glyphicon-ok-sign"></span><p class="text-right">ONLINE</p></span></a>';
		} else{
			html = html + '<span class="glyphicon glyphicon-remove-sign"></span><p class="text-right">OFFLINE</p></span></a>';
			//set "disabled" class
		}
	}
});

$("ul").append(html);