/*
  krpano ThreeJS example plugin
  - use three.js inside krpano
  - with stereo-rendering and WebVR support
  - with 3d object hit-testing (onover, onout, onup, ondown, onclick) and mouse cursor handling

  ** modified to play videos **

*/

function krpanoplugin() {
  var local  = this;
  var krpano = null;
  var device = null;
  var plugin = null;
  var threeJSOBJ = null
  var renderTrigger = null

  console.log("starting still pano")

  var video, videoImage, videoImageContext, videoTexture;

  var vidsrc = false;

  local.registerplugin = function(krpanointerface, pluginpath, pluginobject) {
    krpano = krpanointerface;
    device = krpano.device;
    plugin = pluginobject;

    console.log(plugin)



    plugin.load = function(_cdn, _imgsrc){

      startThreeJS()
      
    }



    if (krpano.version < "1.19") {
      krpano.trace(3,"ThreeJS plugin - krpano version too old (min. 1.19)");
      return;
    }

    if (!device.webgl) {
      // show warning
      krpano.trace(2,"ThreeJS plugin - WebGL required");
      return;
    }

    krpano.debugmode = true;
    krpano.trace(0, "ThreeJS krpano plugin");

  }

  local.unloadplugin = function() {

    // deregister krpano events
    krpano.set("events[__threejs__].keep", false);
    krpano.set("events[__threejs__].onviewchange", false);
    krpano.set("events[__threejs__].onviewchanged", false);


  }

  local.onresize = function(width, height) {
    return false;
  }

  // adjust relative url path
  function resolve_url_path(url) {
    if (url.charAt(0) != "/" && url.indexOf("://") < 0){
      url = krpano.parsepath("%CURRENTXML%/" + url);
    }
    return url;
  }



  // helper
  var M_RAD = Math.PI / 180.0;

  // ThreeJS/krpano objects
  var renderer = null;
  var scene = null;
  var camera = null;
  var stereocamera = null;
  var camera_hittest_raycaster = null;
  var krpano_panoview = null;
  var krpano_panoview_euler = null;
  var krpano_projection = new Float32Array(16);   // krpano projection matrix
  var krpano_depthbuffer_scale = 1.0001;        // depthbuffer scaling (use ThreeJS defaults: znear=0.1, zfar=2000)
  var krpano_depthbuffer_offset = -0.2;

  function startThreeJS(){

    // create the ThreeJS WebGL renderer, but use the WebGL context from krpano
    renderer = new THREE.WebGLRenderer({canvas: krpano.webGL.canvas, context: krpano.webGL.context, alpha: true});
    renderer.autoClear = false;
    renderer.setPixelRatio(1);  // krpano handles the pixel ratio scaling
    renderer.sortObjects = false
    renderer.setClearColor(0xffffff, 0);

    // restore the krpano WebGL settings (for correct krpano rendering)
    restore_krpano_WebGL_state();

    // use the krpano onviewchanged event as render-frame callback (this event will be directly called after the krpano pano rendering)
    krpano.set("events[__threejs__].keep", true);
    krpano.set("events[__threejs__].onviewchange", adjust_krpano_rendering);  // correct krpano view settings before the rendering
    krpano.set("events[__threejs__].onviewchanged", render_frame);

    // enable continuous rendering (that means render every frame, not just when the view has changed)
    krpano.view.continuousupdates = true;



    // basic ThreeJS objects
    scene = new THREE.Scene();
    camera = new THREE.Camera();
    stereocamera = new THREE.Camera();
    krpano_panoview_euler = new THREE.Euler();

    // build the ThreeJS scene (start adding custom code there)

    console.log('startThreeJS')
    build_scene();
  }

  var gl = null

  function restore_krpano_WebGL_state(){
    var gl = krpano.webGL.context;

    gl.disable(gl.DEPTH_TEST);
    gl.cullFace(gl.FRONT);
    gl.frontFace(gl.CCW);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.activeTexture(gl.TEXTURE0);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
    gl.pixelStorei(gl.UNPACK_ALIGNMENT, 4);
  }


  function restore_ThreeJS_WebGL_state()
  {
    var gl = krpano.webGL.context;

    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.enable(gl.CULL_FACE);
    gl.cullFace(gl.BACK);
    gl.clearDepth(1);
    gl.clear(gl.DEPTH_BUFFER_BIT);

    renderer.resetGLState();
  }


  function krpano_projection_matrix(sw,sh, zoom, xoff,yoff)
  {
    var m = krpano_projection;

    var pr = device.pixelratio;
    sw = pr / (sw*0.5);
    sh = pr / (sh*0.5);

    m[0]  = zoom*sw;    m[1]  = 0;          m[2]  = 0;                          m[3]  = 0;
    m[4]  = 0;          m[5]  = -zoom*sh;   m[6]  = 0;                          m[7]  = 0;
    m[8]  = xoff;       m[9]  = -yoff*sh;   m[10] = krpano_depthbuffer_scale;   m[11] = 1;
    m[12] = 0;          m[13] = 0;          m[14] = krpano_depthbuffer_offset;  m[15] = 1;
  }


  function update_camera_matrix(camera) {
    var m = krpano_projection;
    camera.projectionMatrix.set(m[0],m[4],m[8],m[12], m[1],m[5],m[9],m[13], m[2],m[6],m[10],m[14], m[3],m[7],m[11],m[15]);
  }


  function adjust_krpano_rendering() {
    if (krpano.view.fisheye != 0.0) {
      // disable the fisheye distortion, ThreeJS objects can't be rendered with it
      krpano.view.fisheye = 0.0;
    }

    var webvr_plugin = krpano.get("plugin[webvr]");
    if (webvr_plugin) {
      // disable the MobileVR fisheye distortion
      if (webvr_plugin.mobilevr_lens_dist != 0.0) {
        //console.log(webvr_plugin.mobilevr_lens_dist )
        // use a hardcoded alternative fov for the moment
        webvr_plugin.mobilevr_lens_fov  = 88.0;
        webvr_plugin.mobilevr_lens_dist = 0.0;
      }
    }
  }

  var sceneTrigger=null

  function render_frame()
  {
    var gl = krpano.webGL.context;
    var vr = krpano.webVR && krpano.webVR.enabled ? krpano.webVR : null;

    //console.log(vr)

    var sw = gl.drawingBufferWidth;
    var sh = gl.drawingBufferHeight;


    // setup WebGL for ThreeJS
    restore_ThreeJS_WebGL_state();

    // set the camera/view rotation
    krpano_panoview = krpano.view.getState(krpano_panoview);  // the 'krpano_panoview' object will be created and cached inside getState()
    krpano_panoview_euler.set(-krpano_panoview.v * M_RAD, (krpano_panoview.h-90) * M_RAD, krpano_panoview.r * M_RAD, "YXZ");
    camera.quaternion.setFromEuler(krpano_panoview_euler);
    camera.updateMatrixWorld(true);

    // set the camera/view projection
    krpano_projection_matrix(sw,sh, krpano_panoview.z, 0, krpano_panoview.yf);
    update_camera_matrix(camera);



    // render the scene

    //console.log(krpano.display.stereo)

    if (krpano.display.stereo == false)
    {
      // normal rendering
      console.log('mono')
      renderer.setViewport(0,0, sw,sh);
      renderer.render(scene, camera);
    }
    else
    {
      // stereo / VR rendering
      sw *= 0.5;  // use half screen width

      var stereo_scale = 0.05;
      var stereo_offset = Number(krpano.display.stereooverlap);

      // use a different camera for stereo rendering to keep the normal one for hit-testing
      stereocamera.quaternion.copy(camera.quaternion);
      stereocamera.updateMatrixWorld(true);

      // render left eye
      var eye_offset = -0.03;
      krpano_projection_matrix(sw,sh, krpano_panoview.z-20, stereo_offset, krpano_panoview.yf);



      if (vr)
      {

        eye_offset = vr.eyetranslt(1);            // get the eye offset (from the WebVR API)
        vr.prjmatrix(1, krpano_projection);         // replace the projection matrix (with the one from WebVR)
        krpano_projection[10] = krpano_depthbuffer_scale ; // adjust the depthbuffer scaling
        krpano_projection[14] = krpano_depthbuffer_offset;
      }

      // add the eye offset
      krpano_projection[12] = krpano_projection[0] * -eye_offset * stereo_scale;

      update_camera_matrix(stereocamera);
      renderer.setViewport(0,0, sw,sh);
      renderer.render(scene, stereocamera);

      // render right eye
      eye_offset = +0.03;
      krpano_projection[8] = -stereo_offset;  // mod the projection matrix (only change the stereo offset)

      if (vr)
      {
        eye_offset = vr.eyetranslt(2);            // get the eye offset (from the WebVR API)
        vr.prjmatrix(2, krpano_projection);         // replace the projection matrix (with the one from WebVR)
        krpano_projection[10] = krpano_depthbuffer_scale ;  // adjust the depthbuffer scaling
        krpano_projection[14] = krpano_depthbuffer_offset;


      }

      // add the eye offset
      krpano_projection[12] = krpano_projection[0] * - eye_offset * stereo_scale;

      update_camera_matrix(stereocamera);
      renderer.setViewport(sw,0, sw,sh);
      renderer.render(scene, stereocamera);

    }

    // important - restore the krpano WebGL state for correct krpano rendering
    restore_krpano_WebGL_state();
  }



  // -----------------------------------------------------------------------
  // ThreeJS User Content - START HERE

  var clock = null;
  var animatedobjects = [];
  var box = null;

  // add a krpano hotspot like handling for the 3d objects
  function assign_object_properties(obj, name, properties)
  {
    // set defaults (krpano hotspot like properties)
    if (properties          === undefined)  properties         = {};
    if (properties.name     === undefined)  properties.name    = name;
    if (properties.ath      === undefined)  properties.ath     = 0;
    if (properties.atv      === undefined)  properties.atv     = 0;
    if (properties.depth    === undefined)  properties.depth   = 1000;
    if (properties.scale    === undefined)  properties.scale   = 1;
    if (properties.zorder   === undefined)  properties.zorder   = 1;
    if (properties.rx       === undefined)  properties.rx      = 0;
    if (properties.ry       === undefined)  properties.ry      = 0;
    if (properties.rz       === undefined)  properties.rz      = 0;
    if (properties.rorder   === undefined)  properties.rorder  = "YXZ";
    if (properties.enabled  === undefined)  properties.enabled = true;
    if (properties.capture  === undefined)  properties.capture = true;
    if (properties.onover   === undefined)  properties.onover  = null;
    if (properties.onout    === undefined)  properties.onout   = null;
    if (properties.ondown   === undefined)  properties.ondown  = null;
    if (properties.onup     === undefined)  properties.onup    = null;
    if (properties.onclick  === undefined)  properties.onclick = null;
    properties.pressed  = false;
    properties.hovering = false;

    obj.properties = properties;

    update_object_properties(obj);
  }


  function update_object_properties(obj) {

    var p = obj.properties;


    var px = p.depth * Math.cos(p.atv * M_RAD)*Math.cos((180-p.ath) * M_RAD);
    var py = p.depth * Math.sin(p.atv * M_RAD);
    var pz = p.depth * Math.cos(p.atv * M_RAD)*Math.sin((180-p.ath) * M_RAD);
    obj.position.set(px,py,pz);

    obj.rotation.set(p.rx*M_RAD, p.ry*M_RAD, p.rz*M_RAD, p.rorder);

    obj.scale.set(p.scale, p.scale, p.scale);

    obj.updateMatrix();
  }


  function load_object_json(url, animated, properties, donecall) {
    url = resolve_url_path(url);

    var loader = new THREE.JSONLoader();
    loader.load(url, function (geometry, materials)
    {
      var material = materials[0];

      if (animated)
      {
        material.morphTargets = true;
        material.morphNormals = true;
        geometry.computeMorphNormals();
      }

      geometry.computeVertexNormals();

      var obj = new THREE.MorphAnimMesh(geometry, material);

      if (animated)
      {
        obj.duration = 1000;
        obj.time = 0;
        obj.matrixAutoUpdate = false;

        animatedobjects.push(obj);
      }

      assign_object_properties(obj, url, properties);

      scene.add( obj );

      if(donecall) donecall(obj);

    });
  }



  /**************************************************************************

    ######  ##   ## #### ##    ######
    ##   ## ##   ##  ##  ##    ##   ##
    ######  ##   ##  ##  ##    ##   ##
    ##   ## ##   ##  ##  ##    ##   ##
    ######   #####  #### ##### ######

  **************************************************************************/

  function build_scene() {


    //     console.log('building scene')

    // var urls = [
    //     'offshore_panos/interiorsub_pano_l.jpg', 'offshore_panos/interiorsub_pano_r.png',
    //     'offshore_panos/interiorsub_pano_u.jpg', 'offshore_panos/interiorsub_pano_d.jpg',
    //     'offshore_panos/interiorsub_pano_f.jpg', 'offshore_panos/interiorsub_pano_b.jpg'
    //   ];

    // var reflectionCube = THREE.ImageUtils.loadTextureCube( urls );
    
    // reflectionCube.format = THREE.RGBFormat;
    // reflectionCube.flipY = true
    // console.log(reflectionCube)
    
    // var cubeMaterial1 = new THREE.MeshLambertMaterial( { color: 0xffffff, envMap: reflectionCube } )

    //     // Skybox

    // var shader = THREE.ShaderLib[ "cube" ];

    // shader.uniforms[ "tCube" ].value = reflectionCube;

    // console.log(shader)

    // var material = new THREE.ShaderMaterial( {

    //   fragmentShader: shader.fragmentShader,
    //   vertexShader: shader.vertexShader,
    //   uniforms: shader.uniforms,
    //   depthWrite: false,
    //   side: THREE.DoubleSide,
    //   transparent: true

    // } )

    // material.alphaTest = 0.5

    // console.log(material)

    // var geometry = new THREE.BoxGeometry( 100, 100, 100 );
    // geometry.applyMatrix( new THREE.Matrix4().makeScale( -1, 1, 1 ) );

    // var mesh = new THREE.Mesh( geometry, material );
    
    // scene.add( mesh );
    var geometry = new THREE.SphereGeometry( 1500, 60, 40 );
        //geometry.applyMatrix( new THREE.Matrix4().makeScale( -1, 1, 1 ) );
        var texture = THREE.ImageUtils.loadTexture('offshore_panos/pano_inside_sub_sphere.png')
        texture.minFilter = THREE.LinearFilter;
        texture.flipY = false
        var material   = new THREE.MeshBasicMaterial( { map : texture , transparent: true, side: THREE.DoubleSide } );

        material.depthTest = true
        material.depthWrite = true
        mesh = new THREE.Mesh( geometry, material );
        scene.add( mesh );
        assign_object_properties(mesh, "mesh", {ath:0, atv:0, depth: 0, zorder:0, alpha: .01, capture: true});
        update_object_properties(mesh);


  }

  var ended = function(){
    krpano.call(plugin.onvideocomplete);
  }

  var play = function(){
    console.log('play');
  }

  var pause = function(){
    console.log('pause');
    video.pause();
  }


  
}