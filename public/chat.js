$(document).ready(function(){
	
	console.log("test");
	var socket = io.connect();
	socket.on("connect",function(){
		socket.on("announcement",function(msg){
		var appendDiv = $("<div></div>");
			$("#message").append(appendDiv);
			appendDiv.append(msg);
			console.log("announcement:",msg);
		});
		socket.emit("join",prompt("What's your name?"));
	});
	$("#formMessage").submit(function(){
			console.log("asdf");
			var appendDiv = $("<div></div>");
			$("#message").append(appendDiv);
			appendDiv.append("me:"+""+$("#text").val());
			socket.emit("text",$("#text").val(),function(date){
			appendDiv.addClass('confirmed');
			var t = new Date(date);
			appendDiv.prepend( t.getHours()+":"+t.getMinutes()+":"+t.getSeconds()+"<br/>");
		});
		$("#text").val("");
		return false;
	});
	socket.on("text",function(from,msg,date){
			console.log(date);
			var appendDiv = $("<div></div>");
			$("#message").append(appendDiv);
			var t = new Date(date);
			appendDiv.prepend( t.getHours()+":"+t.getMinutes()+":"+t.getSeconds()+"<br/>");
			appendDiv.append(from+":"+msg+"</div>");
			console.log("message:",msg);

		});
})