var pano_master = function(){
  var pano = $('#panocontainer').attr('class');
  var masterPath = "http://projects.heliozilla.com/offshore_dev",
      targetContainer = "panocontainer",
      xmlLoc = masterPath + "/xml/" + pano + ".xml?nocache="+Math.random()*5,
      swfLoc = masterPath + "/js/lib/krpano/krpano.swf"
  console.log(xmlLoc)
  var viewer = createPanoViewer({swf:swfLoc, id:"krpanoObject", target:"panocontainer"});
  viewer.addVariable("xml", xmlLoc); 
  //viewer.useHTML5("always")
  viewer.addParam("wmode","transparent");
  viewer.passQueryParameters();
  this.viewer = viewer
 

  viewer.embed();

  var krpano = document.getElementById("krpanoObject");
    this.changescene = function(scene) {
    
    var krpano = document.getElementById("krpanoObject");
    if (!krpano || !krpano.get)
    {
      // krpano not there or not ready
      return "";
    }


    krpano.call("loadscene(" + scene + ", null, MERGE, BLEND(1));");
  }


  return krpano;
}

var pano = new pano_master();

/*$(window).load(function(){  
  $.address.change(function(event){
    var sceneLink = event.value.substr(1);
    if (sceneLink != ""){
      pano.changescene(sceneLink);
    } else {
      pano.changescene('platform')
    }
  });
})*/