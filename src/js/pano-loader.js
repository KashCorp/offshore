/**************************************************************************

  Pano Loader

    Two stage preloader:

    1. Opening Loader -> loads the prologue scene

    2. Preloader -> loads the remaining panos

**************************************************************************/

// GLOBAL MODULE OBJECTS
var master,
    extcontrol, // external control via node js server
    autopilot;  // autopilot via


var openingloader = function() {
  return new Promise(function(resolve, reject){

    var cdn = 'offshore_panos/';

    var loaderArray = [];

    loaderArray.push(cdn + "prologue_pano_l.jpg");
    loaderArray.push(cdn + "prologue_pano_f.jpg");
    loaderArray.push(cdn + "prologue_pano_r.jpg");
    loaderArray.push(cdn + "prologue_pano_b.jpg");
    loaderArray.push(cdn + "prologue_pano_u.jpg");
    loaderArray.push(cdn + "prologue_pano_d.jpg");

    $('body').append('<div id="panoDownloadStatus"></div>');
    $('body').append('<div id="panoDownloadStatusText"></div>');

    $('#panoDownloadStatusText').html('Building OFFSHORE opening scene : ');

    var loader = new PxLoader();
    var increment = window.innerWidth / loaderArray.length

    for(var i=0; i < loaderArray.length; i++) {
      var pxImage = new PxLoaderImage(loaderArray[i]);
      loader.add(pxImage);
    }

    loader.addProgressListener(function(e) {
      $('#panoDownloadStatus').css('width', e.completedCount * increment)
      var progressPercent = Math.floor(e.completedCount / e.totalCount * 100)
      $('#panoDownloadStatusText').html('Building OFFSHORE opening scene : ' + progressPercent + '% complete.')
    });

    loader.addCompletionListener(function(){
      $('#panoDownloadStatusText').remove();
      $('#panoDownloadStatus').remove();
      resolve();
    });

    loader.start();
  });
}


var preloader = function() {

  isPreloaded = true;

  /*
  var cdn = 'http://51feb41d8c5706a8e6e7-4b718bfe00f3e21e7ec454784bd539a2.r98.cf2.rackcdn.com/';
  if(master.isIOS) cdn = 'http://51feb41d8c5706a8e6e7-4b718bfe00f3e21e7ec454784bd539a2.r98.cf2.rackcdn.com/512/';
  */

  var cdn = 'offshore_panos/';
  if(master.isIOS) cdn = 'offshore_panos/512/';

  var loaderArray = [];

  loaderArray.push(cdn + "helicopter_pano_l.jpg");
  loaderArray.push(cdn + "helicopter_pano_f.jpg");
  loaderArray.push(cdn + "helicopter_pano_r.jpg");
  loaderArray.push(cdn + "helicopter_pano_b.jpg");
  loaderArray.push(cdn + "helicopter_pano_u.jpg");
  loaderArray.push(cdn + "helicopter_pano_d.jpg");
  loaderArray.push(cdn + "platform_pano_l.jpg");
  loaderArray.push(cdn + "platform_pano_f.jpg");
  loaderArray.push(cdn + "platform_pano_r.jpg");
  loaderArray.push(cdn + "platform_pano_b.jpg");
  loaderArray.push(cdn + "platform_pano_u.jpg");
  loaderArray.push(cdn + "platform_pano_d.jpg");
  loaderArray.push(cdn + "lowerplatform_pano_l.jpg");
  loaderArray.push(cdn + "lowerplatform_pano_f.jpg");
  loaderArray.push(cdn + "lowerplatform_pano_r.jpg");
  loaderArray.push(cdn + "lowerplatform_pano_b.jpg");
  loaderArray.push(cdn + "lowerplatform_pano_u.jpg");
  loaderArray.push(cdn + "lowerplatform_pano_d.jpg");
  loaderArray.push(cdn + "chemicalroom_pano_l.jpg");
  loaderArray.push(cdn + "chemicalroom_pano_f.png");
  loaderArray.push(cdn + "chemicalroom_pano_r.jpg");
  loaderArray.push(cdn + "chemicalroom_pano_b.jpg");
  loaderArray.push(cdn + "chemicalroom_pano_u.jpg");
  loaderArray.push(cdn + "chemicalroom_pano_d.jpg");
  loaderArray.push(cdn + "controlroom_pano_l.jpg");
  loaderArray.push(cdn + "controlroom_pano_f.jpg");
  loaderArray.push(cdn + "controlroom_pano_r.jpg");
  loaderArray.push(cdn + "controlroom_pano_b.png");
  loaderArray.push(cdn + "controlroom_pano_u.jpg");
  loaderArray.push(cdn + "controlroom_pano_d.jpg");
  loaderArray.push(cdn + "hallway_pano_l.jpg");
  loaderArray.push(cdn + "hallway_pano_f.jpg");
  loaderArray.push(cdn + "hallway_pano_r.png");
  loaderArray.push(cdn + "hallway_pano_b.jpg");
  loaderArray.push(cdn + "hallway_pano_u.png");
  loaderArray.push(cdn + "hallway_pano_d.jpg");
  loaderArray.push(cdn + "subhangar_pano_l.jpg");
  loaderArray.push(cdn + "subhangar_pano_f.png");
  loaderArray.push(cdn + "subhangar_pano_r.png");
  loaderArray.push(cdn + "subhangar_pano_b.jpg");
  loaderArray.push(cdn + "subhangar_pano_u.jpg");
  loaderArray.push(cdn + "subhangar_pano_d.jpg");
  loaderArray.push(cdn + "interiorsub_pano_l.jpg");
  loaderArray.push(cdn + "interiorsub_pano_f.jpg");
  loaderArray.push(cdn + "interiorsub_pano_r.png");
  loaderArray.push(cdn + "interiorsub_pano_b.jpg");
  loaderArray.push(cdn + "interiorsub_pano_u.jpg");
  loaderArray.push(cdn + "interiorsub_pano_d.jpg");
  loaderArray.push(cdn + "theatre_pano_l.jpg");
  loaderArray.push(cdn + "theatre_pano_f.jpg");
  loaderArray.push(cdn + "theatre_pano_r.jpg");
  loaderArray.push(cdn + "theatre_pano_b.jpg");
  loaderArray.push(cdn + "theatre_pano_u.jpg");
  loaderArray.push(cdn + "theatre_pano_d.jpg");
  loaderArray.push(cdn + "boat_pano_l.jpg");
  loaderArray.push(cdn + "boat_pano_f.jpg");
  loaderArray.push(cdn + "boat_pano_r.jpg");
  loaderArray.push(cdn + "boat_pano_b.jpg");
  loaderArray.push(cdn + "boat_pano_u.jpg");
  loaderArray.push(cdn + "boat_pano_d.jpg");

  $('body').append('<div id="panoDownloadStatus"></div>')
  $('body').append('<div id="panoDownloadStatusText"></div>')

  $('#panoDownloadStatusText').html('Building SPARTAN 208 : ')

  var loader = new PxLoader();

  var increment = window.innerWidth / loaderArray.length;

  for(var i = 0; i < loaderArray.length; i++) {
    var pxImage = new PxLoaderImage(loaderArray[i]);
    loader.add(pxImage);
  }

  loader.addProgressListener(function(e) {

    $('.breadcrumb').css('display', 'none')
    $('.breadcrumb').css('bottom', -40)

    //$('.breadcrumb').css('opacity', 0)

     $('#panoDownloadStatus').css('width', e.completedCount * increment)

     var progressPercent = Math.floor(e.completedCount / e.totalCount * 100)

     $('#panoDownloadStatusText').html('Building SPARTAN 208 : ' + progressPercent + '% complete.')
  });

  loader.addCompletionListener(function() {

    $('#panoDownloadStatusText').css('display', 'none')

    $('#panoDownloadStatus').animate({'bottom': '-40px'}, 500, function() {
      $('#panoDownloadStatus').css('display', 'block')
      $('.breadcrumb').css('display', 'block')
      $(".breadcrumb").animate({'bottom': '0'})
    })

    pano.krpano.call("oninterrupt(break);looktohotspot(LOGO,90,tween(easeOutQuad,4));")

  })

  loader.start();

}



// STARTS THE EXPERIENCE
openingloader().then(function(){
  console.log('opening loader complete');

  if(globals.config.extControlMaster)
    extcontrol = new ExtControl("master", globals.config.extControlUrl);
  else if(globals.config.extControlSlave)
    extcontrol = new ExtControl("slave", globals.config.extControlUrl);

  if(globals.config.autopilot)
    autopilot = new Autopilot();

  audiomaster.loadAudio( 'Drone_1_norm', 'basetrack', 1, 0 );

  master = new masterFunctions();
  master.init();
  master.build_navbar();
  master.check_start();

  pano.init()

  $('#wrapper').fadeIn(2000);
})











