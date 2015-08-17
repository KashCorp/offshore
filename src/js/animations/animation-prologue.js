// animation for the circling helicopter in the prologue
var THREEANIM = {

	customVars: {
		angle:0,
		posX1:null,
		posZ1: null,
		r: 500
	},

	objInit: function(_mesh,_camera,_scene){

		audiomaster.loadAudio( '../audio/chopper','chopper',.01,-1)

		_mesh.position.y = -100.2;
		_mesh.position.x = 1.0;
		_mesh.position.z = 2.0;
		_mesh.scale.set(-1, -1, 1);

		_mesh.traverse( function ( child ) {
			if ( child instanceof THREE.Mesh ) {
				child.scale.set(3, 3, 3);
				child.material.color.setRGB (0.4, 0.4, 0.4);
			}
		});

		

		var directionalLight = new THREE.DirectionalLight(0xb6c1c1);
		directionalLight.position.x = 0.5;
		directionalLight.position.y = -300;
		directionalLight.position.z = -1;
		directionalLight.position.normalize();
		_scene.add( directionalLight );
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
