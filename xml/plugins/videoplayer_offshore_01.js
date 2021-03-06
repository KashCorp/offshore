
/* krpanoJS 1.0.8.15 videoplayer plugin (build 2012-10-05) */
var krpanoplugin = function () {
    function l() {
        if (b) if (j) {
                b.airplay = "allow";
                b["x-webkit-airplay"] = "allow"
            } else {
                b.airplay = "deny";
                b["x-webkit-airplay"] = "deny";
                b.airplay = "disallow";
                b["x-webkit-airplay"] = "disallow"
            }
    }
    function o(c) {
        var f = c.split("|");
        if (f.length > 1) {
            if (i == null) {
                i = "";
                var g = document.createElement("video");
                if (!(g === null || g === undefined)) if (g.canPlayType !== undefined) {
                        var d = g.canPlayType("video/ogg");
                        if (d.match(/maybe|probably/i)) i += "ogg";
                        d = g.canPlayType("video/webm");
                        if (d.match(/maybe|probably/i)) i +=
                                "webm";
                        d = g.canPlayType("video/mp4");
                        if (d.match(/maybe|probably/i)) i += "mp4"
                    } else i += "mp4"
            }
            g = f.length;
            if (i.indexOf("mp4") >= 0) for (d = 0; d < g; d++) {
                    var h = String(f[d]).toLowerCase();
                    if (h.indexOf(".mp4") > 0 || h.indexOf(".m4v") > 0 || h.indexOf(".mpeg4") > 0 || h.indexOf(".mpeg") > 0 || h.indexOf(".mpg") > 0) {
                        c = f[d];
                        break
                    }
            } else if (i.indexOf("webm") >= 0) for (d = 0; d < g; d++) {
                    h = String(f[d]).toLowerCase();
                    if (h.indexOf(".webm") > 0) {
                        c = f[d];
                        break
                    }
            } else if (i.indexOf("ogg") >= 0) for (d = 0; d < g; d++) {
                    h = String(f[d]).toLowerCase();
                    if (h.indexOf(".ogg") >
                        0 || h.indexOf(".ogv") > 0) {
                        c = f[d];
                        break
                    }
            } else c = f[0]
        }
        return c
    }
    function m(c) {
        if (!(c == undefined || c == null || c == "" || String(c).toLowerCase() == "null")) {
            c = o(c);
            var f = unescape(e.parsePath(c));
            if (a && b) {
                a.havevideosize = false;
                a.isvideoready = false;
                a.iscomplete = false;
                a.ispaused = true;
                a.videourl = c;
                a.parsedurl = f;
                a.volume = 0 
                if (a.posterurl) {
                    var g = unescape(e.parsePath(a.posterurl)),
                        d = document.createElement("img");
                    d.addEventListener("error", function () {
                        e.trace(3, "loading of " + g + " failed!")
                    }, false);
                    d.addEventListener("load", function () {
                        k(d.naturalWidth,
                            d.naturalHeight);
                        d = null
                    }, false);
                    d.src = g;
                    b.poster = g
                } else if (e.isphone || e.ispad) k(320, 240);
                b.src = f;
                if (a.pausedonstart) b.pause();
                else {
                    b.autoplay = "autoplay";
                    b.play()
                } if (a.loop) if (e._isrealdesktop == false && e.iosversion < "5") a._simulateloop = true;
                    else b.loop = "loop";
                if (a.html5controls) b.controls = "controls";
                b.load()
            }
        }
    }
    function n() {
        if (a && b) {
            if (a.iscomplete) try {
                    b.currentTime = 0
            } catch (c) {}
            b.play();
            a.ispaused = false
        }
    }
    function p() {
        if (a && b) {
            b.pause();
            a.ispaused = true
        }
    }
    function q() {
        if (a && b) {
            try {
                b.currentTime = 0;
                b.pause()
            } catch (c) {}
            a.ispaused =
                true
        }
    }
    function r() {
        if (a && b) {
            a.havevideosize = false;
            a.isvideoready = false;
            a.iscomplete = false;
            a.ispaused = true;
            try {
                a.videourl = null;
                a.parsedurl = null;
                b.src = null
            } catch (c) {}
        }
    }
    function s() {
        if (a && b) if (b.playing == true || b.playing === undefined && a.ispaused == false) {
                b.pause();
                a.ispaused = true
            } else {
                b.play();
                a.ispaused = false
            }
    }
    function t(c) {
        if (a && b) try {
                b.currentTime = c
        } catch (f) {}
    }
    function u() {
        b && b.videoWidth > 0 && b.videoHeight > 0 && k()
    }
    function v() {
        b && b.videoWidth > 0 && b.videoHeight > 0 && k()
    }
    function k(c, f) {
        if (a && b) if (a.havevideosize ==
                false) {
                a.totaltime = b.duration;
                c && f ? a.registercontentsize(c, f) : a.registercontentsize(b.videoWidth, b.videoHeight);
                a.havevideosize = true;
                a.isvideoready = true;
                e.call(a.onvideoready, a)
            }
    }
    function w() {
        if (a && b) {
            a.ispaused = false;
            e.view.haschanged = true
        }
    }
    function x() {
        if (a && b) {
            a.ispaused = true;
            e.call(a.onvideopaused, a)
        }
    }
    function y() {
        if (a && b) {
            a.time = b.currentTime;
            a.totaltime = b.duration
        }
    }
    function z() {
        if (e && a) if (b && a.loop && a._simulateloop) b.play();
            else {
                a.iscomplete = true;
                e.call(a.onvideocomplete, a)
            }
    }
    function A() {
        if (e &&
            a && b) {
            var c = null;
            c = b.error ? b.error.code : 0;
            (c = c == 1 ? "video loading aborted" : c == 2 ? "network loading error" : c == 3 ? "video decoding failed" : c == 4 ? "loading video failed" : "unknown error") && e.trace(3, a.parsedurl + " - " + c + "!")
        }
    }
    var e = null,
        a = null,
        b = null,
        j = false;
    this.registerplugin = function (c, f, g) {
        e = c;
        a = g;
        if (e.version < "1.0.8.14" || e.build < "2011-07-25") e.trace(3, "videoplayer plugin - too old krpano version (min. 1.0.8.14)");
        else {
            a.registerattribute("videourl", null);
            a.registerattribute("altvideourl", null);
            a.registerattribute("posterurl",
                null);
            a.registerattribute("pausedonstart", false);
            a.registerattribute("loop", false);
            a.registerattribute("html5controls", false);
            a.registerattribute("volume", 0);
            a.registerattribute("airplay", j, function (d) {
                j = typeof d == "boolean" ? d : "yesontrue1".indexOf(String(d).toLowerCase()) >= 0;
                l()
            }, function () {
                return j
            });
            a.registerattribute("ispaused", false);
            a.registerattribute("iscomplete", false);
            a.registerattribute("isvideoready", false);
            a.registerattribute("havevideosize", false);
            a.registerattribute("time", 0);
            a.registerattribute("totaltime",
                0);
            a.registerattribute("loadedbytes", 0);
            a.registerattribute("totalbytes", 0);
            a.registerattribute("onvideoready", null);
            a.registerattribute("onvideocomplete", null);
            a.registerattribute("onvideopaused", null);
            a.registerattribute("onunsupported", null);
            a.registerattribute("playvideo", m);
            a.registerattribute("closevideo", r);
            a.registerattribute("stop", q);
            a.registerattribute("pause", p);
            a.registerattribute("play", n);
            a.registerattribute("resume", n);
            a.registerattribute("togglepause", s);
            a.registerattribute("seek",
                t);
            b = document.createElement("video");
            l();
            if (!b || !b.play || !b.pause) {
                b = null;
                c = a.onunsupported;
                c == null || c == "" || String(c).toLowerCase() == "null" ? e.trace(2, "videoplayer plugin - HTML5 video is not supported by this browser!") : e.call(c, a)
            } else {
                b.style.backgroundColor = "#000000";
                b.style.width = "100%";
                b.style.height = "100%";
                b.onselectstart = function () {
                    return false
                };
                b.addEventListener("loadedmetadata", u, false);
                b.addEventListener("loadeddata", v, false);
                b.addEventListener("timeupdate", y, false);
                b.addEventListener("play",
                    w, false);
                b.addEventListener("pause", x, false);
                b.addEventListener("ended", z, false);
                b.addEventListener("error", A, false);
                b.addEventListener("touchstart", function (d) {
                    d.preventDefault()
                }, true);
                m(a.altvideourl ? a.altvideourl : a.videourl);
                a.sprite.appendChild(b)
            }
        }
    };
    this.unloadplugin = function () {
        try {
            a && a.sprite && b && a.sprite.removeChild(b)
        } catch (c) {}
        e = a = b = null
    };
    var i = null
};