
/**************************************************************************

	External Control Module

		to enable:
			offshore/?master -> one master
			offshore/?slave  -> many slaves

	   (the logic for loading extcontrol is in panoLoader.js)

**************************************************************************/

var extcontrol = false;

var ExtControl = function(_role, _id){

	var that = this;

	var krpano,
		socket;

	var $info = $('#node-connection-info'), // on screen info text
		infotimeout;

	this.role = _role; // "master" or "slave"
	this.id   = _id;

	this.sync_data = { "panX" : 0, "panY" : 0, "fov" : 0 } // krpano view

	this.voiceCurrentTime = 0; // hallway voice progress


	// ********************************************************
	// Socket

	$.getScript('js/lib/socket.io.js', function(){

		var url = "192.168.1.240";
		if(globals.config.extControlUrl) url = globals.config.extControlUrl;

		console.log('http://'+url+':3700')
		socket = io.connect('http://'+url+':3700');

		// ********************************************************
		// Setup
		// establish role with node server

		socket.on('connect',function(){

			if(infotimeout) clearTimeout(infotimeout)
			$info.fadeOut(500,function(){

				$info.html('Node connected as '+_role)
				$info.fadeIn(500)

				if(infotimeout) clearTimeout(infotimeout)
				infotimeout = setTimeout(function() { $info.fadeOut() }, 3000);
			})

			if(_role === 'master') {
				console.log('>>> SOCKET connected: MASTER')
				socket.emit('Hi I am the master', {
					'currentPano': globalPano,
					'overlayOpen' : master.overlayOpen
				});

			}
			else if(_role === 'slave') {
				console.log('>>> SOCKET connected: SLAVE')
				socket.emit('Hi I am a slave');

				$('.pan-directions').hide();
		    	pano.panDirectionsShown = true;

			}
		})

		socket.on('disconnect',function(){
			console.log('>>> SOCKET disconnected.')

			if(infotimeout) clearTimeout(infotimeout)
			infotimeout = setTimeout(function() {
				$info.html('Node server connection lost')
				$info.fadeIn(500)
			}, 2000);


		})

		socket.on('message',function(data){
			console.log('message: '+data)
		})


		// ********************************************************
		// Master

		that.sync_view = function(){ socket.emit('sync_view', that.sync_data); }

		that.hashChange         = function(data){ socket.emit('hashChange', data); }

		that.fn = function(data){ socket.emit('fn', data); }

		// that.walkthrough   = function(data){ socket.emit('walkthrough',   data); }

		// // overlays
		// that.skype         = function(data){ socket.emit('skype',         data); }
		// that.turn	       = function(data){ socket.emit('turn',          data); } // all books


		// ********************************************************
		// Slave

		if(that.role === 'slave') {

			socket.on('sync_view',function(data){
				that.sync_data = data;
			})

			socket.on('hashChange', function(data){
				console.log('SOCKET -> received hash change: '+data.hash)
				parent.location.hash = data.hash
			})

			// ********************************************************

			socket.on('fn', function(data){

				console.log(data)

				switch(data.fn) {

					// Video Player
					case 'openVideoPlayer':
						videoPlayer(data.group, data.playerFadeTransition);
						break;

					case 'switchVideo':
						switchVideo(data._id, data._text);
						break;

					case 'closeVideoPlayer':
						closeVideoPlayer();
						break;

					case 'videoPlayerUI':
						videoPlayerUI[data.action](data);
						break;



					// Overlays
					case 'loadOverlay':
						master.loadOverlay(data.overlayURL);
						break;

					case 'closeOverlay':
						master.closeOverlay(data._URL);
						break;


					// Walkthrough
					case 'walkthrough':
						console.log('SOCKET -> received walkthrough data')

						var w = false;
						if(pano.walkthrough)          w = pano.walkthrough;
						else if(pano.panoWalkthrough) w = pano.panoWalkthrough

						if(w) {
							if(data.action === 'setPercent') w.setPercent(data.percent)
							else if(data.action === 'play')  w.play();
							else if(data.action === 'pause') w.pause();
						}

						break;

					// Skype Overlay
					case 'skype':
						var s = false;
						var urlarray = $('#overlay_frame')[0].contentWindow.location.pathname.split('/');

						if(urlarray[urlarray.length-1] === 'skype.html')
							s = $('#overlay_frame')[0].contentWindow;

						if(s){

							if(data.action === 'switchVid')
								s.switchVid(data.src)
							else if(data.action === 'closeVid')
								s.stopVid()
						}

						break;

					// Book Overlays
					case 'turn':
						var t = $('#overlay_frame')[0].contentWindow;

						if(data.direction === 'next')      t.next()
						else if(data.direction === 'prev') t.prev()

						break;



					// XML Functions & Misc
					case 'loadAFXPano':
						loadAFXPano( data._file, data._start );
						break;

					case 'loadUnderWater':
						loadUnderWater(data._id);
						break;

					case 'startDrilling':
						startDrilling(data.stopping);
						break;

					case 'zoomOut':
						zoomOut();
						break;

					case 'corexit':
						corexit();
						break;

					case 'voiceCurrentTime':
						that.voiceCurrentTime = data.time;
						console.log('that.voiceCurrentTime: '+'\t'+that.voiceCurrentTime)
						break;

				}

			})



			// ********************************************************
			// socket.on('walkthrough',  function(data){

			// 	console.log('SOCKET -> received walkthrough data')

			// 	var w = false;
			// 	if(pano.walkthrough)          w = pano.walkthrough;
			// 	else if(pano.panoWalkthrough) w = pano.panoWalkthrough

			// 	if(w) {
			// 		if(data.action === 'setPercent') w.setPercent(data.percent)
			// 		else if(data.action === 'play')  w.play();
			// 		else if(data.action === 'pause') w.pause();
			// 	}

			// })


			// ********************************************************
			// socket.on('skype', function(data){

			// 	var s = false;
			// 	var urlarray = $('#overlay_frame')[0].contentWindow.location.pathname.split('/');

			// 	if(urlarray[urlarray.length-1] === 'skype.html')
			// 		s = $('#overlay_frame')[0].contentWindow;

			// 	if(s){

			// 		if(data.action === 'switchVid')
			// 			s.switchVid(data.src)
			// 		else if(data.action === 'closeVid')
			// 			s.stopVid()
			// 	}

			// })

			// ********************************************************
			socket.on('turn', function(data){

				var t = $('#overlay_frame')[0].contentWindow;

				if(data.direction === 'next')      t.next()
				else if(data.direction === 'prev') t.prev()

			})

		}


	})

	// ********************************************************
	this.krpanoloaded = function(){
		if(krpano) return;

		krpano = document.getElementById("krpanoObject");

		if(krpano == null) {
			setTimeout(that.krpanoloaded, 1000);
			return;
		}

		if(that.role === 'slave') krpano.set('autorotate.enabled',false);
	}


}









/**************************************************************************

	Autopilot Module

		to enable:
		offshore/?autopilot

		can be combined with external control but only as master.

		3 logic blocks:
		- lookto
		- wait
		- switch pano


**************************************************************************/

var Autopilot = function(){

	var that = this;
	this.active = false;

	var krpano;

	var $warning = $('#autopilot-warning');

	console.log('++ AUTOPILOT ++ Initialized')


	// ********************************************************
	this.krpanoloaded = function(){
		if(krpano) return;

		krpano = document.getElementById("krpanoObject");

		if(krpano == null) {
			setTimeout(that.krpanoloaded, 1000);
			return;
		}
	}


	// ********************************************************
	// activation timer

	var timeout_time = 30 * 1000; // time to wait after user input before re-activating the autopilot

	this.timeout = null;

	this.reset_timeout = function(){
		that.deactivate();

		if(that.timeout) clearTimeout(that.timeout);

		if(!master.overlayOpen) // don't go to autopilot when we're in a book
			that.timeout = setTimeout(that.activate, timeout_time);
	}

	$(window).on('mousemove.autopilot',   that.reset_timeout);
	$(window).on('touchstart',			  that.reset_timeout);
	$('video').on('timeupdate.autopilot', that.reset_timeout);

	function rand(low, high){
		var u = Math.random();
		return (1-u)*low + u*high;
	}


	// ********************************************************
	// Activate

	this.activate = function(){
		if(that.active) return;
		that.active = true;

		console.log('AUTOPILOT activate')

		$warning.fadeIn(500);

		$('.pan-directions').fadeOut(500);
		krpano.set('autorotate.enabled',false);

		that.lookto();
	}

	// ********************************************************
	// Deactivate

	this.deactivate = function(){
		if(!that.active) return;
		that.active = false;

		console.log('AUTOPILOT deactivate')

		$warning.fadeOut(500);

		if(wait_timeout) clearTimeout(wait_timeout);

	}



	// ********************************************************
	// Autopilot Logic

	var num_looks = 0, // how many times we have looked around the current pano
		max_looks = 3; // look around this many times before moving to the next pano

	// var panos = [ // predefined order to how the autopilot navigates the rig
	// 	'helicopter', 'platform', 'lowerplatform', 'sequence_shaftway', 'hallway',
	// 	'sequence_passage_controlroom', 'controlroom', 'hallway',
	// 	'sequence_passage_chemicalroom', 'chemicalroom', 'hallway',
	// 	'sequence_passage_theatre', 'theatre', 'subhangar', 'theatre', 'hallway',
	// 	'lowerplatform', 'sequence_outside_stairs_down', 'boat', 'lowerplatform', 'platform'
	// ];

	// predefined order to how the autopilot navigates the rig
	// iPad version: no sequences (the videos don't autoplay/work)

	var panos = [
		'helicopter', 'platform', 'lowerplatform', 'hallway',
		'controlroom', 'hallway',
		'chemicalroom', 'hallway',
		'theatre', 'subhangar', 'theatre', 'hallway',
		'lowerplatform', 'boat', 'lowerplatform', 'platform'
	];

	this.pano_index = false;

	var wait_timeout; // timeout in between actions, clear to stop autopilot logic chain


	// ********************************************************
	// Pan

	this.lookto = function(advance){

		if(typeof advance === 'undefined') advance = true;

		// console.log('AUTOPILOT lookto (num_looks: '+num_looks+')')

		// Activate Walkthrough
		if(pano.walkthrough) {

			pano.walkthrough.play();
			num_looks = 0;
			that.pano_index ++;

		// Look around the scene
		} else {

			$('.pan-directions').fadeOut(500);
			krpano.set('autorotate.enabled',false);

			var origin = {
				panX : krpano.get('view.hlookat'), // 0—360
				panY : krpano.get('view.vlookat'), // -45—20 (0 is horizontal)
				fov  : krpano.get('view.fov')      // 60–120 (90 is normal)
			}

			var dest = {
				panX : origin.panX + ( rand(-1,1) > 0 ? rand(-270,-90) : rand(90,270) ) ,
				panY : rand(-20,20),
				fov  : origin.fov /* + rand(-270,270) */
			}

			// make our lookto() calls slower if we're looking further. base duration 3s.

			var normalized_val = ( Math.abs(origin.panX - dest.panX) - 90 ) / 180;

			var duration = 2 + 2*normalized_val;

			// breakable lookto()
			if(krpano)
				krpano.call("oninterrupt(break);lookto("+dest.panX+","+dest.panY+","+dest.fov+",tween(easeInOutQuad,"+duration+"));");

			num_looks++;

		}



		// advance
		if(advance) {
			wait_timeout = setTimeout(function() {

				if(num_looks > max_looks)
					that.wait(that.switchPano);
				else
					that.wait(that.lookto);

			}, duration*1000);
		}

	}

	// ********************************************************
	// Pause

	this.wait = function(callback){

		var duration = rand(1,2);

		// console.log('AUTOPILOT Wait for '+duration+'s')

		wait_timeout = setTimeout(function() {
			if(callback) if(typeof callback === 'function') callback();
		}, duration*1000);

	}

	// ********************************************************
	// Switch Pano

	this.switchPano = function(){

		// console.log('AUTOPILOT switchPano')

		// calculate pano_index so we can start the autopilot in any room
		if(!that.pano_index || master.globalPano != panos[that.pano_index]) {
			that.pano_index = panos.indexOf(master.globalPano);
			if(that.pano_index < 0) {
				if(master.globalPano === 'submarine') that.pano_index = panos.indexOf('subhangar') - 1
				else that.pano_index = 0;
			}
		}

		console.log('AUTOPILOT '+panos[that.pano_index]+ '('+that.pano_index+') -> '+panos[that.pano_index+1]+ '('+(that.pano_index+1)+')')

		num_looks = 0;

		if(panos[that.pano_index+1]) {
			zoom_and_change_pano(panos[that.pano_index], panos[that.pano_index+1])
			that.pano_index += 1;
		} else {
			zoom_and_change_pano(panos[that.pano_index], panos[0])
			that.pano_index = 0;
		}

		that.wait(that.lookto);

	}








	this.reset_timeout();


}




