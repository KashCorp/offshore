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



		var spline = new THREE.SplineCurve3([
		    new THREE.Vector3(-100,  -100, 400),
		    new THREE.Vector3(  100, -100, 0 ),
		    new THREE.Vector3( -400,  -200, -400),
		    new THREE.Vector3(-100,  -100, 400),
		    new THREE.Vector3(-100,  -100, 400)
		]);

		_mesh.scale.set(-1, -1, -1);

		var oldP, newP


		var startLoop = function(){
		THREEANIM.camera_tween = new TWEEN.Tween( {p:0} )
			.to( { p: 1}, 20000 )
			.onUpdate( function() {	

  				newP = spline.getPoint(this.p);
    			//rotation = spline.getTangent(this.p);

    			if(audiomaster.mix.getTrack('chopper')){

    				audiomaster.mix.getTrack('chopper').pan3d(newP.x * .01,newP.z* .01)

    			}
    			
				
				if(oldP)
	    			_mesh.position.set(oldP.x, oldP.y,oldP.z)

	    		_mesh.lookAt( newP)
	    		oldP = newP
	    		//_mesh.rotation.set(rotation.x , rotation.y+ (90 * Math.PI / 180),rotation.z)
    			
			})
			.start()
			.onComplete(startLoop)

		}

		startLoop()

						
		

		_mesh.traverse( function ( child ) {
			if ( child instanceof THREE.Mesh ) {
				child.scale.set(.5, .5, .5);
				child.material.side = THREE.doubleSide
				child.material.color.setRGB (0.1, 0.1, 0.1);
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
		THREEANIM.camera_tween.stop()
		if(audiomaster.mix.getTrack('chopper')){
		audiomaster.mix.getTrack('chopper').gain(0)
		//audiomaster.mix.removeTrack('chopper')			
		}

	},

	objAnim: function(){

		TWEEN.update()

		 // THREEANIM.customVars.r -= 0.01

			// if(THREEANIM.customVars.angle < 360){
			// 	THREEANIM.customVars.angle += .1
			// } else{
			// 	THREEANIM.customVars.angle = 0
			// }

			// if (THREEANIM.mesh)
			// {

			// 	THREEANIM.customVars.posX1 = THREEANIM.customVars.r * Math.cos(THREEANIM.customVars.angle * Math.PI / 180)
	  //   		THREEANIM.customVars.posZ1 = THREEANIM.customVars.r * Math.sin(THREEANIM.customVars.angle * Math.PI / 180)
	  //   		THREEANIM.mesh.lookAt( THREEANIM.camera.position)

	    	
			// }

	}

}

