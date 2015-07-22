/*

   #####  ##   ##  ######   #### ######
  ##      ##   ## ##    ## ##      ##
  ##  ### ####### ##    ##  ####   ##
  ##   ## ##   ## ##    ##     ##  ##
   #####  ##   ##  ######  #####   ##

  set master.ghostBuster or master.overlayOpen to disable ghosts

*/

var ghostFunctions = function(canvasid,name,imageNumber) {

  filePathPre = globals.cdn_imgseq // 'video/video_clips/'
  //filePathPre = 'video/newtransitions/'

  function zeroes(num, length) {
    var str = '' + num;
    while (str.length < length) {
      str = '0' + str;
    }
    return str;
  }

  function map(value, min1, max2, min2, max2) {
      return min2 + (max2 - min2) * ((value - min1) / (max2 - min1));
  }

  var that = this,
      w, h;

  var canvas = document.getElementById(canvasid);
  canvas.width  = 320
  canvas.height = 180;


  this.resize = function(){
    w = globals.resize.contain.w;
    h = globals.resize.contain.h;
    canvas.style.width = w + 'px'
    canvas.style.height = h + 'px'
  }
  globals.debouncedResize();


  var context = canvas.getContext('2d');

  var imageSrc;
  var playHead = 1;
  var ghostTimeout;



  this.killGhost = function(){

    console.log('killing ghost')

    clearTimeout(ghostTimeout)

    context.clearRect(0, 0,320,180);

  }

  this.imageSequencer = function(){
    // console.log('ghost imageSequencer')

    if(master.ghostBuster || master.overlayOpen) {

      // console.log("ghosts BUSTED")
      $('#'+ canvasid).css('display','none')
      canvas.style.opacity = 0
      context.clearRect(0, 0,320,180);

    } else {

       // console.log('wooooooooooooo')

      $('#'+ canvasid).css('display','block')
          imageSrc = filePathPre + name + zeroes(playHead,4)+".png";

          var img = new Image();
          img.src = imageSrc

            context.clearRect ( 0 , 0 , w , h );
            canvas.style.opacity = (Math.random()*.2) + 0.1

            that.playHead = playHead;
            img.onload = function(){

            context.drawImage(img, 0, 0,320,180);

            if(playHead < imageNumber){
              playHead++
              } else{
              playHead =  1
              }


              //requestAnimationFrame(that.imageSequencer);
        }
    }

          ghostTimeout = setTimeout(function() {
          that.imageSequencer()
          }, 1000 / 8);


   } //imageSequencer

   // preload
   this.preload = function(){
    console.log('preloading '+imageNumber+' ghost images')

    var i = 1;

    var img = new Image()

    img.src = filePathPre + name + zeroes(imageNumber,5)+".png";

    img.onload = function(){
      i+=2;
      img.src = filePathPre + name + zeroes(imageNumber,5)+".png";
    }
   }


}