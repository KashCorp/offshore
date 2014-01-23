/**************************************************************************
	
	Audio Mixer

	Contents:
		Utility Functions
		Mix
		Track

**************************************************************************/

;(function(window, undefined){
	
	console.log("LOADED MIX")

	var Mix, 
		Track, 
		debounce,
		on,
		off,
		trigger,
		solo,
		unsolo,
		log10,
		noWebAudio = true,
		body = document.getElementsByTagName('body')[0],
		isIOS = navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false;

	/**************************************************************************
		
		Utility Functions
	
	**************************************************************************/

	debounce = function(func, wait) {
	    var timeout;
	    return function() {
	        var context = this, args = arguments,
	        later = function() {
	            timeout = null;
	            func.apply(context, args);
	        };
	        clearTimeout(timeout);
	        timeout = setTimeout(later, wait);
	    };
	};
	
	//~~~~~~~~~~~~~~~~~~~~~~~~~
	// Utility function for binding events
	on = function( type, callback ){
		this.events[type] = this.events[type] || [];
		this.events[type].push( callback );
	};
	
	//~~~~~~~~~~~~~~~~~~~~~~~~~
	// Utility function for removing all events of a given type
	off = function( type ){
		this.events[type] = [];
	};
	
	//~~~~~~~~~~~~~~~~~~~~~~~~~
	// Utility function for trigger events
	trigger = function( type ){
		//console.log(type)
		if ( !this.events[type] ) return;
		var args = Array.prototype.slice.call(arguments, 1);
		for (var i = 0, l = this.events[type].length; i < l;  i++)
			if ( typeof this.events[type][i] == 'function' ) 
				this.events[type][i].apply(this, args);
	};
	





	/**************************************************************************
		
		Mix
	
	**************************************************************************/
	
	
	Mix = function(opts){

		this.tracks = [];
		this.gain =  1;
		this.events = {};
		this.lookup = {};
		this.noWebAudio = noWebAudio;


		var track1, track2, track3;

		track1 = new Track('basetrack', {}, this);
		this.tracks.push( track1 );
		this.lookup['basetrack'] = track1;

		track2 = new Track('overlay_01', {}, this);
		this.tracks.push( track2 );
		this.lookup['overlay_01'] = track2;

		track3 = new Track('overlay_02', {'nolooping':true}, this);
		this.tracks.push( track3 );
		this.lookup['overlay_02'] = track3;

		console.log(this.tracks)
		console.log(this.lookup)
	}


	// Mix.prototype.initMix = function(startTime){

	//   	this.startTime = startTime;
	// 	var defaults = {};	

	// 	this.on('load', function(){
	// 		var total = this.tracks.length;
	// 		this.loaded += 1;
	// 		if ( total == this.loaded ){
	// 			this.ready = true;
	// 			this.trigger('ready');
	// 		}
	// 	});
	// }

	
	//~~~~~~~~~~~~~~~~~~~~~~~~~
	// create a new track OR load new source into an existing track

	Mix.prototype.createTrack = function(name, opts){

		var track = this.lookup[name];
		if(!track) return;

		// if track already exists, just change its source
		track.loadDOM(opts.source)
		return track;

		// console.log('[A] creating new track')

		// // otherwise create a new track
		// track = new Track(name, opts, this);
		
		// this.tracks.push( track );
		// this.lookup[name] = track;
		// return track;
		
	};


	//~~~~~~~~~~~~~~~~~~~~~~~~~
	// Don't actually remove the track, just set its source to null.

	Mix.prototype.removeTrack = function(name){

		console.log("[A] removing track " + name)

		var track = this.lookup[name];
		track.pause();
		track.get('element').src = null;
		track.set('source',null);
		track.ready = false;

		console.log(track)

	};

	Mix.prototype.clear = function(){
		console.log('[A] MIX Clear X')

		var total = this.tracks.length;

		for ( var i = 0; i < total; i++ ) {
			var track = this.tracks[i];
			var el = this.tracks[i].get('element');

			track.pause();
			el.src = null;
			el.volume = 1;
			track.set('source',null);
			track.ready = false;
		}

	}

	Mix.prototype.play = function(){

		console.log('[A] MIX Play >')

		if(this.lookup['basetrack'])  this.lookup['basetrack'].play();
		if(this.lookup['overlay_01']) this.lookup['overlay_01'].play();
		this.playing = true;

		// var total = this.tracks.length;
		// this.playing = true;
		// for ( var i = 0; i < total; i++ ) {
		// 	this.tracks[i].play();
		// }
	}


	//~~~~~~~~~~~~~~~~~~~~~~~~~
	// Pause all tracks

	Mix.prototype.pause = function(){
		var total = this.tracks.length;
		this.playing = false;
		for ( var i = 0; i < total; i++ )
			if ( this.tracks[i].ready ) this.tracks[i].pause();
	};

	//~~~~~~~~~~~~~~~~~~~~~~~~~
	// Set Master gain

	Mix.prototype.setGain = function( gain ){
		var total = this.tracks.length;
		this.gain = gain;
		for ( var i = 0; i < total; i++ )
			this.tracks[i].gain( gain );
	};


	//~~~~~~~~~~~~~~~~~~~~~~~~~
	// Utility Functions
	//~~~~~~~~~~~~~~~~~~~~~~~~~

	Mix.prototype.getTrack = function(name){
		return this.lookup[name];
	};

	Mix.prototype.createTrackZero = function(name, opts){
		//if ( !name || this.lookup[name] ) return;
		var track = new Track(name, opts, this);
		
		this.tracks[0] =  track;
		this.lookup[name] = track;
		return track;
		
	};	
	
	Mix.prototype.extend = function(){
		var output = {}, args = arguments, l = args.length;
		for ( var i = 0; i < l; i++ )		
			for ( var key in args[i] )
				if ( args[i].hasOwnProperty(key) )
					output[key] = args[i][key];
		return output;
	};

	Mix.prototype.on = function(){
		on.apply(this, arguments);
	};
	
	Mix.prototype.off = function(){
		off.apply(this, arguments);
	};
		
	Mix.prototype.trigger = function(){
		trigger.apply(this, arguments);
	}

	Mix.prototype.getGain = function( ){
		return this.gain;
	};








	/**************************************************************************
		
		Track
	
	**************************************************************************/

	Track = function(name, opts, mix){

		this.options = Mix.prototype.extend.call(this, defaults, opts || {});
		this.name = name;
		this.events = {};
		this.ready = false; // source is loaded and ready to play

		this.set('mix', mix);
		this.set('muted', false);
		this.set('soloed', false);
		this.set('currentTime', 0);
		this.set('nolooping', this.options.nolooping);
		this.set('start', this.options.start);		

		var self = this,
			defaults = {
				gain:  0, 
				pan:   0, 
				start: 0,
				nolooping: false
			};

		self.set('element',document.getElementById(name))

		if(!self.get('element')) {
			console.warn('couldn’t find audio element with id '+name)
			return;
		}

		// Can play event
		self.get('element').addEventListener('canplaythrough', function(e) {

			// if(!self.get('element').src) return;
			console.log("[A] " + name + " LOADED : " + self.get('element').src)

			self.ready = true;
			self.get('mix').trigger('load', self);

		}, false)

		// Ended -> loop event
		self.get('element').addEventListener('ended',function(e){
			if(self.nolooping) return;

			console.log("[A] " + name + ' looping ' + self.get('element').src);

			var el = self.get('element');

			el.currentTime = 0;
			el.play();
		}, false)

		// this.loadDOM( self.get('source') )
					
 	}

	//~~~~~~~~~~~~~~~~~~~~~~~~~
	// load new source
 	Track.prototype.loadDOM = function( source ){

 		var self = this;

		self.ready = false;

 		if(!source) return;

 		console.log("[A] loadDom " + self.name + ' --> ' + source)

		self.get('element').src = source;
		self.get('element').load();
		self.get('element').play();

		console.log(self.get('element'))


	}



	Track.prototype.loadBuffer = function( source ){
 
	};



	Track.prototype.play = function(){
		
		// if(!this.ready) return
		// console.log(this.name + ' >')
		this.options.element.play();
	};


	Track.prototype.pause = function(){
		if(!this.ready) return
			
		console.log(this.name + ' ||')
		this.options.element.pause();
	};
	




	//~~~~~~~~~~~~~~~~~~~~~~~~~
	// Utilities
	//~~~~~~~~~~~~~~~~~~~~~~~~~

	Track.prototype.on = function(){
		on.apply(this, arguments);
	};
	
	//~~~~~~~~~~~~~~~~~~~~~~~~~
	// Unind all events of a given type from a Track instance
	Track.prototype.off = function(){
		off.apply(this, arguments);
	};
	
	//~~~~~~~~~~~~~~~~~~~~~~~~~
	// Trigger events on a Track instance
	Track.prototype.trigger = function(){
		trigger.apply(this, arguments);
	}
	
	Track.prototype.trigger = function(){
		trigger.apply(this, arguments);
	}
		  
	Track.prototype.get = function(prop){
		return this.options[prop];
	};
	
	//~~~~~~~~~~~~~~~~~~~~~~~~~
	// Set a property value for a Track instance
	Track.prototype.set = function(prop, val){
		if ( typeof val === 'undefined' ) return;
		this.options[prop] = val;
		return this.options[prop];
	};
	

	Track.prototype.pan = function(val){
		if(noWebAudio) return
		if ( typeof val !== 'undefined' ) 
			this.get('panner').setPosition(val, 0, .1);
		this.set('pan', val)
		return this.get('pan') || 0;
	};
	

	Track.prototype.gain = function(val, override){

		if(!this.ready || !this.options.element) return;

		if(!val) {
			if(this.options.element) return this.options.element.volume;
			else  					 return 0;
		}

		if(val < 0.5) {
			console.log('gain < 0.5 ==> MUTE')
			this.options.element.pause()
		} else {
			console.log('gain > 0.5 ==> UNMUTE')

			if (val > 1) { val = 1; }
			this.options.element.volume = val;

			this.options.element.play()
		}


		



		return;

		// else{
		// 	var min = 0, max = 1, master = this.get('mix').gain;
		// 	if ( typeof val !== 'undefined' && val >= min && val <= max ){
		// 		this.set('gain', val);
		// 		if ( !override ) this.set('gainCache', val);
		// 		if ( !this.get('_muted') || override ) this.get('gainNode').gain.value = val * master;
		// 	}
		// 	return this.get('gain') || this.get('gainNode').gain.value;		
		// }

	};
		
	//~~~~~~~~~~~~~~~~~~~~~~~~~
	// Return a reference to the Track instance's parent Mix (no setter)
	Track.prototype.mix = function(){
		return this.get('mix');
	}





	
	window.Mix = Mix; // install Mix object in global scope
	
}(window));
