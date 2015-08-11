var router = (function(){
  var exports = {};

  var hashChange = function(){
    console.log('>>> hash change <<<')

    var hash = window.location.hash.slice(1);
    if(master.globalPano === hash) return false;

    // broadcast hash change, unless it’s vrvideo, which is handed
    // different (fn vrvideo)
    if(extcontrol) if(extcontrol.role === 'master' && hash !== 'vrvideo') {
      extcontrol.hashChange({ "hash": hash });
    }

    if (hash === "") {
      pano.loadPanoScene('prologue');
      return false;
    }

    $("#walking-canvas-pano").addClass('hide')

    pano.loadPanoScene(hash);
  }
  $(window).bind('hashchange', hashChange);

  exports.hashChange = hashChange;

  return exports;
}());
