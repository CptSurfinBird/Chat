var userName = null;
var timer = null;

$(document).ready(function(){
	$("#lblStatus").html("Not connected");
	$("#btnPost").attr('disabled', true);
});

function login(){
	userName = $("#txtUsername").val();
	if(userName=="")return;
	$("#loginArea").hide();

	$("#lblStatus").html("Connected as "+userName);
	$("#btnPost").attr('disabled', false);

	timer = setInterval(getMessages, 5000);

	getMessages();
}

function postMessage(){
	var message = $("#txtMessage").val();
	if(message=="")return;

  $.ajax({
    method: "POST",
    url: "http://127.0.0.1:3000/api/postMessage",
    dataType: 'json',
    data: {username: userName, message: message}
  })
  .success(function (data) {
		$(".chatMessage").remove();
		$("#txtMessage").val("");

		$.each(data,function(index,item){
			displayMessage(item.username,item.body);
		});

		$("#lblStatus").html("Last updated: "+new Date);
  })
	.error(function (err) {
		$("#lblStatus").html("Error sending message");
	})
}

function getMessages(){
	$("#lblStatus").html("Getting messages...");
	$(".chatMessage").remove();

	  $.ajax({
	    method: "GET",
	    url: "http://127.0.0.1:3000/api/getMessages",
	    dataType: 'json',
	    data: {}
	  })
	  .success(function (data) {
			$.each(data,function(index,item){
				displayMessage(item.username,item.body);
			});
			$("#lblStatus").html("Last updated: "+new Date);
	  })
		.error(function (err) {
			$("#lblStatus").html("Error getting messages");
		})
}

function displayMessage(user,msg){
	var element = $("<tr class=\"chatMessage\">")
		.append($("<td>"+user+"</td>"))
		.append($("<td>"+msg+"</td>"));

		element.insertBefore( "#postingArea" );
}

//Event listeners
$("#btnLogin").click(function(){
	login();
});
$("#btnPost").click(function(){
	postMessage();
});
