// animation for the circling helicopter in the prologue
var THREEANIM = {

	customVars: {
		angle:0,
		posX1:null,
		posZ1: null,
		r: 400
	},

	objInit: function(_mesh,_camera,_scene){

		//audiomaster.loadAudio( '../audio/chopper','chopper',.01,-1)

		THREEANIM.mesh = _mesh

		var material = new THREE.MeshLambertMaterial( { color: 0x111111, shading: THREE.SmoothShading} );


		_mesh.traverse( function ( child ) {
			if ( child instanceof THREE.Mesh ) {
				child.scale.set(3, 3, 3);
				child.material= material;
			}
		});

		//_mesh.material = material

		var light = new THREE.PointLight( 0x9eb2b0, 2, 3000);
		light.position.set(0,800,0);
		_scene.add( light );

		_mesh.receiveShadow = true
		_mesh.castShadow = true

		_mesh.scale.set(-.5, -.5, .5);
		_mesh.position.set(0, 500,0)

		var directionalLight = new THREE.DirectionalLight(0xa8c1be,.8);
		_scene.add( directionalLight );

		directionalLight.position.set(1400 * Math.cos(90 * Math.PI / 180), -300, 1400 * Math.sin(90 * Math.PI / 180));
		THREEANIM.mesh = _mesh;
		THREEANIM.camera = _camera
		THREEANIM.light = directionalLight
	},


	objKill: function(){
		console.log('farewell')
		// audiomaster.mix.getTrack('chopper').gain(0)
		// audiomaster.mix.removeTrack('chopper')
	},

	objAnim: function(){

		 //THREEANIM.customVars.r += 0.11

		 // if(THREEANIM.mesh)

		 // THREEANIM.mesh.rotation.set(0, THREEANIM.customVars.r *  Math.PI / 180, 0)

			if(THREEANIM.customVars.angle < 360){
				THREEANIM.customVars.angle += .8
			} else{
				THREEANIM.customVars.angle = 0
			}

			if (THREEANIM.light)
			{

				THREEANIM.customVars.posX1 = THREEANIM.customVars.r * Math.cos(THREEANIM.customVars.angle * Math.PI / 180)
	    		THREEANIM.customVars.posZ1 = THREEANIM.customVars.r * Math.sin(THREEANIM.customVars.angle * Math.PI / 180)
	    		THREEANIM.light.position.set(THREEANIM.customVars.posX1, 300,THREEANIM.customVars.posZ1)
			}

	}

}
