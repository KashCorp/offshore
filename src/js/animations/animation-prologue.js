		// animate objects

var THREEANIM = {

	customVars: {
		angle:0,
		posX1:null,
		posZ1: null
	},

	objInit: function(_mesh,_camera){

		console.log(_mesh)
		THREEANIM.mesh = _mesh;
		THREEANIM.camera = _camera
	},

	objAnim: function(){

			if(THREEANIM.customVars.angle < 360){
				THREEANIM.customVars.angle += .1
			} else{
				THREEANIM.ustomVars.angle = 0
			}

			if (THREEANIM.mesh)
			{

				THREEANIM.customVars.posX1 = 500 * Math.cos(THREEANIM.customVars.angle * Math.PI / 180)
	    		THREEANIM.customVars.posZ1 = 500 * Math.sin(THREEANIM.customVars.angle * Math.PI / 180)
	    		THREEANIM.mesh.lookAt( THREEANIM.camera.position)
	    		THREEANIM.mesh.position.set(THREEANIM.customVars.posX1, -100,THREEANIM.customVars.posZ1)
			}
	
	}
	
}
