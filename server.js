var express = require('express');
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

http.listen(3000, function () {
    console.log('listening on *:3000');
});
// var server = http.createServer(app);
// var app = express.createServer();

// app.use(express.bodyParse());
app.use(express.static("public"));
io.on('connection',function(socket){
	socket.on('join',function(name){
		socket.nickname = name;
		socket.broadcast.emit("announcement",name+"join in our chat!");
	});
	socket.on('text',function(text,fn){
		socket.broadcast.emit("text",socket.nickname,text,new Date());
		fn(new Date());
	});
})