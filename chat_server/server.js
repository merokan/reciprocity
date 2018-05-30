var express = require("express");
var path = require("path");
var app = express();

var server = app.listen(8000, function() {
 console.log("listening on port 8000");
})

var io = require("socket.io").listen(server)

var feed = [
	{user: 'Reciprocity Bot', message:"<p>You can chat with fellow Reciprocity users!</p>"}
];

io.sockets.on("connection", function(socket){
	console.log("Socket is working!");
	console.log(socket.id)
	// io.emit("welcome", {userId: socket.id});

	socket.emit("feed", {messageFeed: feed})

	socket.on("welcome", function(data) {
		console.log("Welcome info", data);
		io.emit("welcome_message", { name: data.user.name});
	})

	socket.on("send_message", function(data){
		console.log(data);
		feed.push(data.message);
		io.emit("message", {message: data.message});
	})
});