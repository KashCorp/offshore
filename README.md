offshore
========

#### iPad App Version

This branch is intended to be run inside an iOS UIWebView. You'll need just the m4a/mp4 files in `audio/` and `video/`.

#### Differences from installation version

- no sound
- no walkthroughs in autopilot (videos can’t autoplay; breaks flow)

#### Using optional modules

URL Arguments: `http://www.path.to/offshore/?arg1?arg2=val`

**External Control** `?master` or `?slave` AND `?url=192.168.x.xxx`  
One master can control many slave instances.

**Autopilot** `?autopilot`  
*Offshore* will navigate on its own, in a sort of screensaver mode, after a timeout.

**Use local files** `?local`  
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
		
		
