/*
	krpano 1.19-pr3 ScrollArea Plugin (build 2015-08-04)
	http://krpano.com/plugins/scrollarea/
*/
var krpanoplugin=function(){function P(a){return"boolean"==typeof a?a:0<="yesontrue1".indexOf(String(a).toLowerCase())}function Z(a){if(a&&n&&aa){var c=n.timertick,h=0;0==Q&&(Q=c);var f=c-Q|0;Q=c;"wheel"==a.type?h=a.deltaY:"mousewheel"==a.type?h=-a.wheelDelta:"DOMMouseScroll"==a.type&&(h=a.detail);h=-h;500<f?R=1==a.deltaMode||0==h%20?0:1:66>f&&0==R&&0!=h%40&&6<Math.abs(h)&&(R=1);a.preventDefault();a.stopPropagation();0!=h&&(0==R?h=0>h?-5:5:(h/=20,-10>h?h=-10:10<h&&(h=10)),1==k?S(h*A,0):2==k?S(0,h*
y):3==k&&S(0,h*y))}}function u(a,c,h,f,b){var d=null;b=(!0===b?"remove":"add")+"EventListener";var e=T.browser.events;if(e.touch&&("down"==c?d=e.touchstart:"move"==c?d=e.touchmove:"up"==c&&(d=e.touchend),T.ie&&0==e.mouse&&("over"==c?d=e.pointerover?e.pointerover:"MSPointerOver":"out"==c&&(d=e.pointerout?e.pointerout:"MSPointerOut")),d))a[b](d,h,f);if(e.mouse&&("down"==c?d="mousedown":"move"==c?d="mousemove":"up"==c?d="mouseup":"over"==c?d="mouseover":"out"==c&&(d="mouseout"),d))a[b](d,h,f)}function fa(){if(b){var a=
b.sprite.parentNode;a&&(a=a.kobject)&&(a.maskchildren=!0,a.poschanged&&a.updatepluginpos(),ba=a,r=a.pixelwidth,t=a.pixelheight,isNaN(r)&&(r=0),isNaN(t)&&(t=0),D=0<r||0<t)}}function G(){d=Number(b.x);e=Number(b.y);isNaN(ca)&&(d=0);isNaN(da)&&(e=0)}function H(a){a=void 0===a?!1:a;1==(k&1)?b.x!=d&&(b.x=d,a=!0):d=0;2==(k&2)?b.y!=e&&(b.y=e,a=!0):e=0;!D||U[0]==v&&U[1]==w||(U[0]=v,U[1]=w,a=!0);if(a&&b&&D){a=r-v;var c=t-w,h=d,f=e;isNaN(h)&&(h=0);isNaN(f)&&(f=0);h+=a*p;f+=c*q;b.woverflow=-a;b.hoverflow=-c;
b.loverflow=Math.round((-h+E*a)*A);b.roverflow=Math.round((+h-(1-E)*a)*A);b.toverflow=Math.round((-f+F*c)*y);b.boverflow=Math.round((+f-(1-F)*c)*y);b.onscroll&&n.call(b.onscroll,b)}}function ga(a){for(;0<z.length&&!(100>=a-z[0].time);)z.shift()}function I(){fa();var a=String(b.align).toLowerCase();if(""==a||"null"==a)a="lefttop";y=A=1;q=p=.5;F=E=0;0<=a.indexOf("left")&&(p=E=0,A=1);0<=a.indexOf("top")&&(q=F=0,y=1);0<=a.indexOf("right")&&(E=1,p=0,A=-1);0<=a.indexOf("bottom")&&(F=1,q=0,y=-1)}function ha(a){I();
z=[];if(0==J)x=!1;else{u(window,"up",ia,!0);u(window,"move",ja,!0);var c=n.stagescale,b=a.changedTouches&&0<a.changedTouches.length?a.changedTouches[0]:a;a=b.pageX/c;c=b.pageY/c;x=!1;V=a;W=c;return!1}}function ka(a){(void 0===a.pointerType||4==a.pointerType||"mouse"==a.pointerType)&&ea&&(I(),0!=D&&(a=t-w,0>r-v||0>a))&&(K=!0,u(b.sprite,"move",la,!0),u(b.sprite,"out",ma,!0))}function la(a){K&&0==x&&ba&&(a=ba.getmouse(),X(a.x/r*b.pixelwidth,a.y/t*b.pixelheight,!0))}function ma(a){u(b.sprite,"move",la,
!0,!0);u(b.sprite,"out",ma,!0,!0);K=!1}function ja(a){if(0==J)return x=!1;var c=n.stagescale,b=a.changedTouches&&0<a.changedTouches.length?a.changedTouches[0]:a,f=b.pageX/c,c=b.pageY/c;0==x&&(k&1&&5<Math.abs(f-V)||k&2&&5<Math.abs(c-W))&&(B&&(g=l=0,B=!1),null!=m&&(clearInterval(m),m=null),x=!0,K=!1,V=f,W=c,G(),ca=d,da=e);x&&(a=a.timeStamp,ga(a),z.push({time:a,x:f,y:c}),d=ca+(f-V)*A,e=da+(c-W)*y,f=-(v-r),a=-(w-t),d+=f*p,e+=a*q,c=1/(1+C*C),d=0<f?d-(d-f*p)*c:d-(0<d?d:d<f?d-f:0)*c,e=0<a?e-(e-a*q)*c:e-
(0<e?e:e<a?e-a:0)*c,d-=f*p,e-=a*q,H());return!1}function ia(a){u(window,"up",ia,!0,!0);u(window,"move",ja,!0,!0);if(0==J)g=l=0,x=!1;else if(x){ga(a.timeStamp);if(1<z.length){a=z[0];var c=z[z.length-1],b=c.y-a.y,f=(c.time-a.time)*Y;l=(c.x-a.x)/f*A;g=b/f*y}else g=l=0;m=setInterval(L,1E3/60);x=!1}}function pa(){setTimeout(function(){fa();H(!0);null==m&&(m=setInterval(L,1E3/60))},100)}function L(){d+=l;e+=g;l*=M;g*=M;var a=0,c=0,b=-(v-r),f=-(w-t);d+=b*p;e+=f*q;0<b?a=d-b*p:B?a=d-na:d<b?a=d-b:0<d&&(a=d);
.1>a*a&&(a=0);0<f?c=e-f*q:B?c=e-oa:e<f?c=e-f:0<e&&(c=e);.1>c*c&&(c=0);d-=b*p;e-=f*q;0==(k&1)&&(l=a=0);0==(k&2)&&(g=c=0);0!=a&&(a*=-1,d+=a*(1-C),l=0>=a*l?l+a*N:a*O,l*=C);0!=c&&(c*=-1,e+=c*(1-C),g=0>=c*g?g+c*N:c*O,g*=C);0==a&&0==c&&.05>Math.sqrt(l*l+g*g)&&(B=!1,g=l=0,clearInterval(m),m=null);H()}function X(a,c,b){I();G();if(0==D)setTimeout(function(){X(a,c,b)},10);else{a=Number(a);isNaN(a)&&(a=0);c=Number(c);isNaN(c)&&(c=0);var f=r-v,g=t-w;a=E*v+a*A;c=F*w+c*y;a*=-1;c*=-1;a+=r/2;0<a&&(a=0);a<f&&(a=f);
c+=t/2;0<c&&(c=0);c<g&&(c=g);!0===b?(B=!0,na=a,oa=c,null==m&&(m=setInterval(L,1E3/60))):(f=-(v-r),g=-(w-t),a=0>f?a-f*p:0,c=0>g?c-g*q:0,d=a,e=c,H())}}function qa(a,c){X(a,c,!0)}function ra(){null!=m&&(clearInterval(m),m=null);K=x=!1;z=[];g=l=0;B=!1;G()}function S(a,c){B=!1;a=Number(a);isNaN(a)&&(a=0);c=Number(c);isNaN(c)&&(c=0);I();G();if(0!=D){var b=r-v,f=t-w,k=!1;0>b&&(d+=b*p,0<a&&0>d?(k=!0,l+=a):0>a&&d>b&&(k=!0,l+=a),d-=b*p);0>f&&(e+=f*q,0<c&&0>e?(k=!0,g+=c):0>c&&e>f&&(k=!0,g+=c),e-=f*q);k&&null==
m&&(m=setInterval(L,1E3/60))}}var n=null,b=null,T=null,k=3,v=0,w=0,U=[0,0],D=!1,ba=null,r=0,t=0,B=!1,na=0,oa=0,A=1,y=1,p=0,q=0,E=0,F=0,C=1,M=.95,N=.08,O=.15,Y=1/15,J=!0,aa=!0,x=!1,V=0,W=0,d=0,e=0,ca=0,da=0,m=null,z=[],l=0,g=0,K=!1,ea=!1;this.registerplugin=function(a,c,d){n=a;b=d;"1.18">n.version?(n.trace(3,"Scrollarea Plugin - too old krpano version (min. version 1.18)"),b=n=null):(T=n.device,b.registerattribute("direction","all",function(a){a=String(a).toLowerCase();k=0;k|=1*(0<=a.indexOf("h"));
k|=2*(0<=a.indexOf("v"));k|=3*(0<=a.indexOf("all"))},function(){return 3==(k&3)?"all":1==(k&1)?"h":"v"}),b.registerattribute("overscroll",C,function(a){C=0>a?0:1<a?1:a},function(){return C}),b.registerattribute("friction",M,function(a){M=Number(a)},function(){return M}),b.registerattribute("acceleration",N,function(a){N=Number(a)},function(){return N}),b.registerattribute("returnacceleration",O,function(a){O=Number(a)},function(){return O}),b.registerattribute("momentum",Y,function(a){Y=Number(a)},
function(){return Y}),b.registerattribute("onscroll",null),b.registerattribute("woverflow",0),b.registerattribute("hoverflow",0),b.registerattribute("loverflow",0),b.registerattribute("roverflow",0),b.registerattribute("toverflow",0),b.registerattribute("boverflow",0),b.registerattribute("draggable",!0,function(a){J=P(a)},function(){return J}),b.registerattribute("mwheel",!0,function(a){aa=P(a)},function(){return aa}),b.registerattribute("onhover_autoscrolling",!1,function(a){ea=P(a)},function(){return ea}),
b.registerattribute("csshardwareacceleration","auto"),b.setcenter=X,b.scrolltocenter=qa,b.stopscrolling=ra,b.scrollby=S,1==P(b.csshardwareacceleration)&&(b.sprite.style[T.browser.css.transform+"Style"]="preserve-3d"),b.sprite.addEventListener("DOMMouseScroll",Z,!0),b.sprite.addEventListener("mousewheel",Z,!0),b.sprite.addEventListener("wheel",Z,!0),u(b.sprite,"down",ha,!0),u(b.sprite,"over",ka,!0),n.set("events["+b.name+"_scrollarea].keep",!0),n.set("events["+b.name+"_scrollarea].onresize",pa))};
var Q=0,R=0;this.onresize=function(a,c){if(!n)return!1;v=a;w=c;var b;B=!1;I();G();if(0==D)b=!1;else{b=r-v;var f=t-w,g=!1;d+=b*p;if(0>b){if(0>d||d>b)g=!0}else 0!=d&&(g=!0);d-=b*p;e+=f*q;if(0>f){if(0>e||e>f)g=!0}else 0!=e&&(g=!0);e-=f*q;g&&null==m&&(m=setInterval(L,1E3/60));b=g}0==b&&H(!0);return!1};this.unloadplugin=function(){n&&b&&(n.set("events["+b.name+"_scrollarea].name",null),null!=m&&(clearInterval(m),m=null),u(b.sprite,"down",ha,!0,!0),u(b.sprite,"over",ka,!0,!0));n=b=null}};
