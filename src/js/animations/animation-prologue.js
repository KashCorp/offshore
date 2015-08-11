// animation for the circling helicopter in the prologue
var THREEANIM = {

	customVars: {
		angle:0,
		posX1:null,
		posZ1: null,
		r: 500
	},

	objInit: function(_mesh,_camera){

		audiomaster.loadAudio( '../audio/chopper','chopper',.01,-1)
		THREEANIM.mesh = _mesh;
		THREEANIM.camera = _camera
	},


	objKill: function(){
		console.log('farewell')
		audiomaster.mix.getTrack('chopper').gain(0)
		audiomaster.mix.removeTrack('chopper')
	},

	objAnim: function(){

		 THREEANIM.customVars.r -= 0.01

			if(THREEANIM.customVars.angle < 360){
				THREEANIM.customVars.angle += .1
			} else{
				THREEANIM.customVars.angle = 0
			}

			if (THREEANIM.mesh)
			{

				THREEANIM.customVars.posX1 = THREEANIM.customVars.r * Math.cos(THREEANIM.customVars.angle * Math.PI / 180)
	    		THREEANIM.customVars.posZ1 = THREEANIM.customVars.r * Math.sin(THREEANIM.customVars.angle * Math.PI / 180)
	    		THREEANIM.mesh.lookAt( THREEANIM.camera.position)

	    		audiomaster.mix.getTrack('chopper').pan3d(THREEANIM.customVars.posX1 * .01,THREEANIM.customVars.posZ1* .01)
	    		THREEANIM.mesh.position.set(THREEANIM.customVars.posX1, -100,THREEANIM.customVars.posZ1)
			}

	}

}
