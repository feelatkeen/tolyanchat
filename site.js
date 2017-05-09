var options = {
	//что
};
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.set('view engine', 'ejs');

app.get('/',function(req,res){
	res.sendFile(__dirname + '/index.html');
});
io.on('connection', function(socket){
	console.log('новый мемер пришел!');
	socket.on('chat msg', function(msg){
		console.log(msg);
		socket.broadcast.emit('chat msg', msg);
		socket.emit('chat msg', msg);
	});
	socket.on('buddyjoined', function(naemm){
		console.log(naemm + " зашел!");
		socket.broadcast.emit('buddyjoined', naemm);
		socket.emit('buddyjoined', naemm);
	});
	socket.on('stickname', function(naemm){
		console.log(naemm + " скинул стикер!");
		socket.broadcast.emit('stickname', naemm);
		socket.emit('stickname', naemm);
	});
	socket.on('sticker', function(stickimg){
		console.log("ссылка на изображение " + stickimg);
		socket.broadcast.emit('sticker', stickimg);
		socket.emit('sticker', stickimg);
	});
	socket.on('disconnect',function(){
		console.log('мемер ушел...')
	});
});
http.listen(3000, function(){
	console.log("Слушаю вас на порту 3000");
});