/**************************************************************************
	
	External Control Module

		enable by loading /?role?id

		ie: offshore/?master?12345 + offshore/?slave?12345


**************************************************************************/

var extcontrol;

var ExtControl = function(_role, _id){

	var that = this;

	var krpano;

	this.role = _role; // "master" or "slave"
	this.id   = _id;

	console.log('_role: '+'\t'+_role)
	console.log('_id: '+'\t'+_id)


	this.krpanoloaded = function(){
		krpano = document.getElementById("krpanoObject");
	}


	// ********************************************************
	// Camera Movement

	this.look = {

		cache : {
			horiz : 0,  // -180 to +180
			vert  : 0,  // -90 to +90
			fov   : 90 // field of view
		},

		touches : {},

		actionDown : function(e){
			// send to socket
			console.log('actionDown')
		},

		actionUp : function(e){
			// send to socket
			console.log('actionUp')
		},

		actionMove : function(e){
			// send to socket
			console.log('actionMove')
		},

		pan : function(_direction, _in){
			// send to socket
			console.log('pan '+_direction+" "+_in)
		}

	}

	// ********************************************************
	// Actions



}
