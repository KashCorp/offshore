# offshore


## VR Version

You **must** use the `local` flag for the VR experience to work properly.


## Installation Version

This branch has standalone capability, and includes the optional modules and the node server.

#### Non-versioned directories

If you want to run *Offshore* without an Internet connection, you will need `audio/` and `videos/`.

#### Using optional modules

URL Arguments: `http://www.path.to/offshore/?arg1?arg2=val`

**External Control** `?master` or `?slave` AND `?url=192.168.x.xxx`
One master can control many slave instances.

**Autopilot** `?autopilot`
*Offshore* will navigate on its own, in a sort of screensaver mode, after a timeout.

**Use local files** `?local`
Force *Offshore* to use local media resources. You’ll need `videos/` for this to work.


#### Node Server

`node/offshore_sync_server.js`

Use with External Control module.



## App Structure


### Main JS files

1. **`panoLoader.js`**

	Two stage opening preloader.
	Handles url arguments, to enable external control modules.

2. **`pano-functions.js`**

	Pano load sequence, framerunner (RAF function).

3. **`master-functions.js`**

	Most functionality is here.

4. **`external-control.js`**

	External Control and Autopilot modules.



### DOM Structure

* `index.php`
	* `<iframe> all_panos.php`
		* `<iframe> overlays`

