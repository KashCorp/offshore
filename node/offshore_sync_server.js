
/**************************************************************************
	
	Offshore Sync Server

	dependencies are not versioned: run 'npm install' in offshore/node/

**************************************************************************/

var io = require('socket.io').listen(3700);

var master,
	currentPano = "";

io.set('log level',1);

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
		console.log(data)
		socket.broadcast.emit('fn',data);
	})

	
})