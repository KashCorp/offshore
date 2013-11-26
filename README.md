offshore
========

#### Non-versioned directories

…which you will need: `audio/`, and `videos/` if you want to run *Offshore* without an Internet connection.

#### Using optional modules

URL Arguments: `http://www.path.to/offshore/` + `?arg1` + `?arg2` + …

** External Control ** `?master` or `?slave`  
One master can control many slave instances.

** Autopilot ** `?autopilot`  
*Offshore* will navigate on its own, in a sort of screensaver mode, after a timeout.

** Use local files ** `?local`  
Force *Offshore* to use local media resources. You’ll need `videos/` for this to work.



#### Main JS files

1. **`panoLoader.js`** 

	Two stage opening preloader.
	Handles url arguments, to enable external control modules.

2. **`pano-functions.js`**  
	
	Pano load sequence, framerunner (RAF function).

3. **`master-functions.js`**
	
	Most functionality is here.

4. **`external-control.js`**  

	External Control and Autopilot modules.



#### DOM Structure

* `index.php`
	* `<iframe> all_panos.php`
		* `<iframe> overlays`
		
		
