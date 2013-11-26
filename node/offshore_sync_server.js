
/**************************************************************************
	
	Offshore Node Server

**************************************************************************/

// app
var express = require("express"),
	app = express(),
	port = 3700,
	sio = require('socket.io'),
	io = sio.listen( app.listen(port) );


var master,
	slaves = [];

var currentPano = "";

io.sockets.on('connection',function(socket){

	socket.on('message',function(data){
		console.log('message from id '+socket.id);
		console.log(data)

		io.sockets.socket(socket.id).send('hey '+socket.id); // confirmation message
	})


	// ********************************************************
	// Setup

	socket.on('Hi I am the master',function(data){
		master = socket.id;
		console.log('New master: '+master);

		currentPano = data.currentPano;

		// make sure slaves are reset
		socket.broadcast.emit('fn', { 'fn': 'closeOverlay', '_URL': data.currentPano })
		socket.broadcast.emit('fn', { 'fn': 'closeVideoPlayer' })
		socket.broadcast.emit('hashChange', {'hash': currentPano});
	})

	socket.on('Hi I am a slave',function(){

		// make sure we're on the same pano as the master
		io.sockets.socket(socket.id).emit('hashChange', { 'hash':currentPano });

	})



	// ********************************************************
	// Actions

	socket.on('sync_view', function(data){ 
		socket.broadcast.emit('sync_view', data);
	});
	
	socket.on('hashChange',function(data){ 
		currentPano = data.hash;
		socket.broadcast.emit('hashChange', data);
	});

	socket.on('fn',function(data){ 
		socket.broadcast.emit('fn',data);
	})


	// socket.on('open_video_player',  function(data){ socket.broadcast.emit('open_video_player', data ) });
	// socket.on('switch_video',       function(data){ socket.broadcast.emit('switch_video', data ) });
	// socket.on('close_video_player', function(data){ socket.broadcast.emit('close_video_player', '' ) });
	// socket.on('video_player',       function(data){ socket.broadcast.emit('video_player', data ) });

	// socket.on('loadOverlay',  function(data){ socket.broadcast.emit('loadOverlay', data) });
	// socket.on('closeOverlay', function(data){ socket.broadcast.emit('closeOverlay',data) });

	// socket.on('loadAFXPano',  function(data){ socket.broadcast.emit('loadAFXPano', data) })

	// socket.on('walkthrough',  function(data){ socket.broadcast.emit('walkthrough', data) })

	// socket.on('skype',  function(data){ socket.broadcast.emit('skype', data) })
	// socket.on('turn',   function(data){ socket.broadcast.emit('turn',  data) })

	
})