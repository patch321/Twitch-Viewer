var streams = ["casiodorus", "ESL_SC2", "patch3211", "comster404", "OgamingSC2", "witwix", "rorsheck", "riotgamesru", "FCCOKC"];
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
			//GET NUMBER OF VIEWERS AND ONLINE STATUS
			url = "https://wind-bow.gomix.me/twitch-api/streams/" + user.name;
			
			$.ajax({
				type: "GET",
				url: url,
				async: false,
				dataType: "json",
				success: function(dude){
					user.viewers = dude.stream.viewers;
					user.isOnline = true;
				}
			});
			if(!user.viewers){
				//USER IS OFFLINE
				user.viewers = 0;
				user.isOnline = false;
			}
			displayStreamerInfo(user);
		}
	});

	function displayStreamerInfo(data){
		console.log(data.display_name + "!!!");
		//DISPLAY USER'S PROFILE PICTURE
		if(data.logo === undefined){
			//USER DOES NOT EXIST!
			data.isActive = false;
			html += '<a href="https://www.twitch.tv/' + data.name + '" class="list-group-item disabled"><img class="profile-pic" src="';
			html += 'https://img.clipartfest.com/5e9c58d9fa1aa44523a113686006795c_red-not-sign-transparent-clip-x-clipart-transparent_300-300.png">';
		} else if(data.logo === null){
			//USER HAD DEFAULT PROFILE PIC
			html += '<a href="https://www.twitch.tv/' + data.name + '" class="list-group-item"><img class="profile-pic" src="';
			html += 'https://static-cdn.jtvnw.net/jtv_user_pictures/xarth/404_user_70x70.png">';
		} else {
			//USER HAS CUSTOMER PROFILE PIC
			html += '<a href="https://www.twitch.tv/' + data.name + '" class="list-group-item"><img class="profile-pic" src="';
			html += data.logo + '"">';
		}

		//DISPLAY NAME, VIEWERS, AND ONLINE STATUS
		html += '<h3>' + streamer + '</h3><span class="badge viewers-badge"><span class="glyphicon glyphicon-eye-open text-left">';
		html += '</span>' + data.viewers + '</span><span class="status-badge badge">';
		if(data.isOnline){
			html += '<span class="glyphicon glyphicon-ok-sign"></span><p class="text-right">ONLINE</p></span>';
			html += "<h5 class='text-center'>" + data.game + "</h5></a>";
		} else{
			html += '<span class="glyphicon glyphicon-remove-sign"></span><p class="text-right">OFFLINE</p></span></a>';
		}
		if(!data.isActive){
			html += "<h5 class='text-center'>ERROR 404</h5></a>";
		}
	}
});

$("ul").append(html);