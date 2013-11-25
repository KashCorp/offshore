
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

	this.role = _role; // "master" or "slave"
	this.id   = _id;

	console.log('EXTERNAL CONTROL')
	console.log('_role: '+'\t'+_role)
	console.log('_id: '+'\t'+_id)

	this.sync_data = {
		"panX" : 0,
		"panY" : 0,
		"fov"  : 0
	}


	// ********************************************************
	// Socket

	$.getScript('js/lib/socket.io.js',function(){
		
		socket = io.connect('http://192.168.1.240:3700');
		that.socket = socket; // External socket access for debugging

		// ********************************************************
		// Setup
		// establish role with node server

		socket.on('connect',function(){
			if(_role === 'master') {
				console.log('Socket connected. Role: MASTER')
				socket.emit('Hi I am the master', { 
					'currentPano': globalPano, 
					'overlayOpen' : master.overlayOpen
				});
			}
			else if(_role === 'slave') {
				console.log('Socket connected. Role: SLAVE')
				socket.emit('Hi I am a slave');

				$('.pan-directions').hide();
		    	pano.panDirectionsShown = true;
			} 
		})

		socket.on('disconnect',function(){
			console.log('Socket disconnected.')
		})

		socket.on('message',function(data){
			console.log('message: '+data)
		})


		// ********************************************************
		// Master

		that.sync_view = function(){ socket.emit('sync_view', that.sync_data); }

		that.open_video_player  = function(data){ socket.emit('open_video_player',  data); }
		that.switch_video       = function(data){ socket.emit('switch_video',       data); }
		that.close_video_player = function(data){ socket.emit('close_video_player', ''  ); }
		that.video_player       = function(data){ socket.emit('video_player',       data); } // ui actions

		that.hashChange         = function(data){ socket.emit('hashChange', data); }

		that.loadOverlay   = function(data){ socket.emit('loadOverlay',   data); }
		that.closeOverlay  = function(data){ socket.emit('closeOverlay',  data); }

		that.loadAFXPano   = function(data){ socket.emit('loadAFXPano',   data); }

		that.walkthrough   = function(data){ socket.emit('walkthrough',   data); }

		that.skype         = function(data){ socket.emit('skype',         data); }


		// ********************************************************
		// Slave

		if(that.role === 'slave') {

			socket.on('sync_view',function(data){
				that.sync_data = data;
				// if(master.overlayOpen) closeVideoPlayer();
			})

			socket.on('open_video_player',  function(data){ 
				console.log('SOCKET open_video_player')
				videoPlayer(data.group, data.playerFadeTransition); 
			})
			socket.on('close_video_player', function(data){ closeVideoPlayer(); });
			socket.on('switch_video', 		function(data){ switchVideo(data._id, data._text); });
			socket.on('video_player', 		function(data){ videoPlayerFunctions[data.action](data); })

			socket.on('hashChange', function(data){
				console.log('SOCKET -> received hash change: '+data.hash)
				parent.location.hash = data.hash
			})

			socket.on('loadOverlay',  function(data){ master.loadOverlay(data.overlayURL); })
			socket.on('closeOverlay', function(data){ master.closeOverlay(data._URL); })

			socket.on('loadAFXPano',  function(data){ loadAFXPano( data._file, data._start ); })

			socket.on('walkthrough',  function(data){

				console.log('SOCKET -> received walkthrough data')

				var w = false;
				if(pano.walkthrough)          w = pano.walkthrough;
				else if(pano.panoWalkthrough) w = pano.panoWalkthrough

				if(w) {
					if(data.action === 'setPercent') w.setPercent(data.percent)
					else if(data.action === 'play')  w.play();
					else if(data.action === 'pause') w.pause();	
				}
				
			})

			socket.on('skype', function(data){

				console.log('skype')

				var s = false;
				var urlarray = $('#overlay_frame')[0].contentWindow.location.pathname.split('/');

				if(urlarray[urlarray.length-1] === 'skype.html') 
					s = $('#overlay_frame')[0].contentWindow;

				if(s){
					console.log('s exists')

					if(data.action === 'switchVid')
						s.switchVid(data.src)
					else if(data.action === 'closeVid')
						s.stopVid()
				}

			})
		}
		


	})


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


**************************************************************************/

var Autopilot = function(){

	var that = this;
	this.active = false;

	var krpano;

	var $warning = $('#autopilot-warning');


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

	var timeout_time = 5 * 60 * 1000; // time in minutes to wait after user input before re-activating the autopilot
	timeout_time = 3000;

	this.timeout = null;

	this.reset_timeout = function(){
		that.deactivate();

		if(that.timeout) clearTimeout(that.timeout);
		that.timeout = setTimeout(that.activate, timeout_time);		
	}

	$(window).on('mousemove.autopilot',   that.reset_timeout);
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
		max_looks = 3; // look around this many times before moving on

	var panos = [ // predefined order to how the autopilot navigates the rig
		'helicopter', 'platform', 'lowerplatform', 'sequence_shaftway', 'hallway', 
		'sequence_passage_controlroom', 'controlroom', 'hallway',
		'sequence_passage_chemicalroom', 'chemicalroom', 'hallway',
		'sequence_passage_theatre', 'theatre', 'subhangar', 'theatre', 'hallway',
		'lowerplatform', 'platform'
	];
	var pano_index;

	var wait_timeout; // timeout in between actions, clear to stop autopilot logic chain


	// ********************************************************
	// Pan

	this.lookto = function(advance){

		if(typeof advance === 'undefined') advance = true;

		console.log('AUTOPILOT lookto (num_looks: '+num_looks+')')

		// Activate Walkthrough
		if(pano.walkthrough) {

			pano.walkthrough.play();
			num_looks = 0;
			pano_index ++;

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

			// make our lookto() calls slower if we're looking further. base duration 4s.
			var duration = 2 + ( (270 - Math.abs(origin.panX - dest.panX) ) / 135 * 3 )

			// console.log(origin)
			// console.log(dest)
			// console.log('duration: '+'\t'+duration)

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

		console.log('AUTOPILOT Wait for '+duration+'s')

		wait_timeout = setTimeout(function() {
			if(callback) if(typeof callback === 'function') callback();
		}, duration*1000);
		
	}

	// ********************************************************
	// Switch Pano

	this.switchPano = function(){

		console.log('AUTOPILOT switchPano')

		// calculate pano_index so we can start the autopilot in any room
		if(!pano_index || master.globalPano != panos[pano_index]) {
			pano_index = panos.indexOf(master.globalPano);
			if(pano_index < 0) {
				if(master.globalPano === 'submarine') pano_index = panos.indexOf('subhangar') - 1
				else pano_index = 0;
			}	
		}

		console.log('current pano: '+pano_index+' '+panos[pano_index])

		num_looks = 0;

		if(panos[pano_index+1]) {
			zoom_and_change_pano(panos[pano_index], panos[pano_index+1])
			pano_index += 1;
		} else {
			zoom_and_change_pano(panos[pano_index], panos[0])
			pano_index = 0;
		}

		that.wait(that.lookto);

	}








	this.reset_timeout();


}




