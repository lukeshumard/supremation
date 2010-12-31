/*
 * Copyright (c) 2009 Simo Kinnunen.
 * Licensed under the MIT license.
 *
 * @version 1.09i
 */
var Cufon=(function(){var m=function(){return m.replace.apply(null,arguments)};var x=m.DOM={ready:(function(){var C=false,E={loaded:1,complete:1};var B=[],D=function(){if(C){return}C=true;for(var F;F=B.shift();F()){}};if(document.addEventListener){document.addEventListener("DOMContentLoaded",D,false);window.addEventListener("pageshow",D,false)}if(!window.opera&&document.readyState){(function(){E[document.readyState]?D():setTimeout(arguments.callee,10)})()}if(document.readyState&&document.createStyleSheet){(function(){try{document.body.doScroll("left");D()}catch(F){setTimeout(arguments.callee,1)}})()}q(window,"load",D);return function(F){if(!arguments.length){D()}else{C?F():B.push(F)}}})(),root:function(){return document.documentElement||document.body}};var n=m.CSS={Size:function(C,B){this.value=parseFloat(C);this.unit=String(C).match(/[a-z%]*$/)[0]||"px";this.convert=function(D){return D/B*this.value};this.convertFrom=function(D){return D/this.value*B};this.toString=function(){return this.value+this.unit}},addClass:function(C,B){var D=C.className;C.className=D+(D&&" ")+B;return C},color:j(function(C){var B={};B.color=C.replace(/^rgba\((.*?),\s*([\d.]+)\)/,function(E,D,F){B.opacity=parseFloat(F);return"rgb("+D+")"});return B}),fontStretch:j(function(B){if(typeof B=="number"){return B}if(/%$/.test(B)){return parseFloat(B)/100}return{"ultra-condensed":0.5,"extra-condensed":0.625,condensed:0.75,"semi-condensed":0.875,"semi-expanded":1.125,expanded:1.25,"extra-expanded":1.5,"ultra-expanded":2}[B]||1}),getStyle:function(C){var B=document.defaultView;if(B&&B.getComputedStyle){return new a(B.getComputedStyle(C,null))}if(C.currentStyle){return new a(C.currentStyle)}return new a(C.style)},gradient:j(function(F){var G={id:F,type:F.match(/^-([a-z]+)-gradient\(/)[1],stops:[]},C=F.substr(F.indexOf("(")).match(/([\d.]+=)?(#[a-f0-9]+|[a-z]+\(.*?\)|[a-z]+)/ig);for(var E=0,B=C.length,D;E<B;++E){D=C[E].split("=",2).reverse();G.stops.push([D[1]||E/(B-1),D[0]])}return G}),quotedList:j(function(E){var D=[],C=/\s*((["'])([\s\S]*?[^\\])\2|[^,]+)\s*/g,B;while(B=C.exec(E)){D.push(B[3]||B[1])}return D}),recognizesMedia:j(function(G){var E=document.createElement("style"),D,C,B;E.type="text/css";E.media=G;try{E.appendChild(document.createTextNode("/**/"))}catch(F){}C=g("head")[0];C.insertBefore(E,C.firstChild);D=(E.sheet||E.styleSheet);B=D&&!D.disabled;C.removeChild(E);return B}),removeClass:function(D,C){var B=RegExp("(?:^|\\s+)"+C+"(?=\\s|$)","g");D.className=D.className.replace(B,"");return D},supports:function(D,C){var B=document.createElement("span").style;if(B[D]===undefined){return false}B[D]=C;return B[D]===C},textAlign:function(E,D,B,C){if(D.get("textAlign")=="right"){if(B>0){E=" "+E}}else{if(B<C-1){E+=" "}}return E},textShadow:j(function(F){if(F=="none"){return null}var E=[],G={},B,C=0;var D=/(#[a-f0-9]+|[a-z]+\(.*?\)|[a-z]+)|(-?[\d.]+[a-z%]*)|,/ig;while(B=D.exec(F)){if(B[0]==","){E.push(G);G={};C=0}else{if(B[1]){G.color=B[1]}else{G[["offX","offY","blur"][C++]]=B[2]}}}E.push(G);return E}),textTransform:(function(){var B={uppercase:function(C){return C.toUpperCase()},lowercase:function(C){return C.toLowerCase()},capitalize:function(C){return C.replace(/\b./g,function(D){return D.toUpperCase()})}};return function(E,D){var C=B[D.get("textTransform")];return C?C(E):E}})(),whiteSpace:(function(){var D={inline:1,"inline-block":1,"run-in":1};var C=/^\s+/,B=/\s+$/;return function(H,F,G,E){if(E){if(E.nodeName.toLowerCase()=="br"){H=H.replace(C,"")}}if(D[F.get("display")]){return H}if(!G.previousSibling){H=H.replace(C,"")}if(!G.nextSibling){H=H.replace(B,"")}return H}})()};n.ready=(function(){var B=!n.recognizesMedia("all"),E=false;var D=[],H=function(){B=true;for(var K;K=D.shift();K()){}};var I=g("link"),J=g("style");function C(K){return K.disabled||G(K.sheet,K.media||"screen")}function G(M,P){if(!n.recognizesMedia(P||"all")){return true}if(!M||M.disabled){return false}try{var Q=M.cssRules,O;if(Q){search:for(var L=0,K=Q.length;O=Q[L],L<K;++L){switch(O.type){case 2:break;case 3:if(!G(O.styleSheet,O.media.mediaText)){return false}break;default:break search}}}}catch(N){}return true}function F(){if(document.createStyleSheet){return true}var L,K;for(K=0;L=I[K];++K){if(L.rel.toLowerCase()=="stylesheet"&&!C(L)){return false}}for(K=0;L=J[K];++K){if(!C(L)){return false}}return true}x.ready(function(){if(!E){E=n.getStyle(document.body).isUsable()}if(B||(E&&F())){H()}else{setTimeout(arguments.callee,10)}});return function(K){if(B){K()}else{D.push(K)}}})();function s(D){var C=this.face=D.face,B={"\u0020":1,"\u00a0":1,"\u3000":1};this.glyphs=D.glyphs;this.w=D.w;this.baseSize=parseInt(C["units-per-em"],10);this.family=C["font-family"].toLowerCase();this.weight=C["font-weight"];this.style=C["font-style"]||"normal";this.viewBox=(function(){var F=C.bbox.split(/\s+/);var E={minX:parseInt(F[0],10),minY:parseInt(F[1],10),maxX:parseInt(F[2],10),maxY:parseInt(F[3],10)};E.width=E.maxX-E.minX;E.height=E.maxY-E.minY;E.toString=function(){return[this.minX,this.minY,this.width,this.height].join(" ")};return E})();this.ascent=-parseInt(C.ascent,10);this.descent=-parseInt(C.descent,10);this.height=-this.ascent+this.descent;this.spacing=function(L,N,E){var O=this.glyphs,M,K,G,P=[],F=0,J=-1,I=-1,H;while(H=L[++J]){M=O[H]||this.missingGlyph;if(!M){continue}if(K){F-=G=K[H]||0;P[I]-=G}F+=P[++I]=~~(M.w||this.w)+N+(B[H]?E:0);K=M.k}P.total=F;return P}}function f(){var C={},B={oblique:"italic",italic:"oblique"};this.add=function(D){(C[D.style]||(C[D.style]={}))[D.weight]=D};this.get=function(H,I){var G=C[H]||C[B[H]]||C.normal||C.italic||C.oblique;if(!G){return null}I={normal:400,bold:700}[I]||parseInt(I,10);if(G[I]){return G[I]}var E={1:1,99:0}[I%100],K=[],F,D;if(E===undefined){E=I>400}if(I==500){I=400}for(var J in G){if(!k(G,J)){continue}J=parseInt(J,10);if(!F||J<F){F=J}if(!D||J>D){D=J}K.push(J)}if(I<F){I=F}if(I>D){I=D}K.sort(function(M,L){return(E?(M>=I&&L>=I)?M<L:M>L:(M<=I&&L<=I)?M>L:M<L)?-1:1});return G[K[0]]}}function r(){function D(F,G){if(F.contains){return F.contains(G)}return F.compareDocumentPosition(G)&16}function B(G){var F=G.relatedTarget;if(!F||D(this,F)){return}C(this,G.type=="mouseover")}function E(F){C(this,F.type=="mouseenter")}function C(F,G){setTimeout(function(){var H=d.get(F).options;m.replace(F,G?h(H,H.hover):H,true)},10)}this.attach=function(F){if(F.onmouseenter===undefined){q(F,"mouseover",B);q(F,"mouseout",B)}else{q(F,"mouseenter",E);q(F,"mouseleave",E)}}}function u(){var C=[],D={};function B(H){var E=[],G;for(var F=0;G=H[F];++F){E[F]=C[D[G]]}return E}this.add=function(F,E){D[F]=C.push(E)-1};this.repeat=function(){var E=arguments.length?B(arguments):C,F;for(var G=0;F=E[G++];){m.replace(F[0],F[1],true)}}}function A(){var D={},B=0;function C(E){return E.cufid||(E.cufid=++B)}this.get=function(E){var F=C(E);return D[F]||(D[F]={})}}function a(B){var D={},C={};this.extend=function(E){for(var F in E){if(k(E,F)){D[F]=E[F]}}return this};this.get=function(E){return D[E]!=undefined?D[E]:B[E]};this.getSize=function(F,E){return C[F]||(C[F]=new n.Size(this.get(F),E))};this.isUsable=function(){return !!B}}function q(C,B,D){if(C.addEventListener){C.addEventListener(B,D,false)}else{if(C.attachEvent){C.attachEvent("on"+B,function(){return D.call(C,window.event)})}}}function v(C,B){var D=d.get(C);if(D.options){return C}if(B.hover&&B.hoverables[C.nodeName.toLowerCase()]){b.attach(C)}D.options=B;return C}function j(B){var C={};return function(D){if(!k(C,D)){C[D]=B.apply(null,arguments)}return C[D]}}function c(F,E){var B=n.quotedList(E.get("fontFamily").toLowerCase()),D;for(var C=0;D=B[C];++C){if(i[D]){return i[D].get(E.get("fontStyle"),E.get("fontWeight"))}}return null}function g(B){return document.getElementsByTagName(B)}function k(C,B){return C.hasOwnProperty(B)}function h(){var C={},B,F;for(var E=0,D=arguments.length;B=arguments[E],E<D;++E){for(F in B){if(k(B,F)){C[F]=B[F]}}}return C}function o(E,M,C,N,F,D){var K=document.createDocumentFragment(),H;if(M===""){return K}var L=N.separate;var I=M.split(p[L]),B=(L=="words");if(B&&t){if(/^\s/.test(M)){I.unshift("")}if(/\s$/.test(M)){I.push("")}}for(var J=0,G=I.length;J<G;++J){H=z[N.engine](E,B?n.textAlign(I[J],C,J,G):I[J],C,N,F,D,J<G-1);if(H){K.appendChild(H)}}return K}function l(D,M){var C=D.nodeName.toLowerCase();if(M.ignore[C]){return}var E=!M.textless[C];var B=n.getStyle(v(D,M)).extend(M);var F=c(D,B),G,K,I,H,L,J;if(!F){return}for(G=D.firstChild;G;G=I){K=G.nodeType;I=G.nextSibling;if(E&&K==3){if(H){H.appendData(G.data);D.removeChild(G)}else{H=G}if(I){continue}}if(H){D.replaceChild(o(F,n.whiteSpace(H.data,B,H,J),B,M,G,D),H);H=null}if(K==1){if(G.firstChild){if(G.nodeName.toLowerCase()=="cufon"){z[M.engine](F,null,B,M,G,D)}else{arguments.callee(G,M)}}J=G}}}var t=" ".split(/\s+/).length==0;var d=new A();var b=new r();var y=new u();var e=false;var z={},i={},w={autoDetect:false,engine:null,forceHitArea:false,hover:false,hoverables:{a:true},ignore:{applet:1,canvas:1,col:1,colgroup:1,head:1,iframe:1,map:1,optgroup:1,option:1,script:1,select:1,style:1,textarea:1,title:1,pre:1},printable:true,selector:(window.Sizzle||(window.jQuery&&function(B){return jQuery(B)})||(window.dojo&&dojo.query)||(window.Ext&&Ext.query)||(window.YAHOO&&YAHOO.util&&YAHOO.util.Selector&&YAHOO.util.Selector.query)||(window.$$&&function(B){return $$(B)})||(window.$&&function(B){return $(B)})||(document.querySelectorAll&&function(B){return document.querySelectorAll(B)})||g),separate:"words",textless:{dl:1,html:1,ol:1,table:1,tbody:1,thead:1,tfoot:1,tr:1,ul:1},textShadow:"none"};var p={words:/\s/.test("\u00a0")?/[^\S\u00a0]+/:/\s+/,characters:"",none:/^/};m.now=function(){x.ready();return m};m.refresh=function(){y.repeat.apply(y,arguments);return m};m.registerEngine=function(C,B){if(!B){return m}z[C]=B;return m.set("engine",C)};m.registerFont=function(D){if(!D){return m}var B=new s(D),C=B.family;if(!i[C]){i[C]=new f()}i[C].add(B);return m.set("fontFamily",'"'+C+'"')};m.replace=function(D,C,B){C=h(w,C);if(!C.engine){return m}if(!e){n.addClass(x.root(),"cufon-active cufon-loading");n.ready(function(){n.addClass(n.removeClass(x.root(),"cufon-loading"),"cufon-ready")});e=true}if(C.hover){C.forceHitArea=true}if(C.autoDetect){delete C.fontFamily}if(typeof C.textShadow=="string"){C.textShadow=n.textShadow(C.textShadow)}if(typeof C.color=="string"&&/^-/.test(C.color)){C.textGradient=n.gradient(C.color)}else{delete C.textGradient}if(!B){y.add(D,arguments)}if(D.nodeType||typeof D=="string"){D=[D]}n.ready(function(){for(var F=0,E=D.length;F<E;++F){var G=D[F];if(typeof G=="string"){m.replace(C.selector(G),C,true)}else{l(G,C)}}});return m};m.set=function(B,C){w[B]=C;return m};return m})();Cufon.registerEngine("vml",(function(){var e=document.namespaces;if(!e){return}e.add("cvml","urn:schemas-microsoft-com:vml");e=null;var b=document.createElement("cvml:shape");b.style.behavior="url(#default#VML)";if(!b.coordsize){return}b=null;var h=(document.documentMode||0)<8;document.write(('<style type="text/css">cufoncanvas{text-indent:0;}@media screen{cvml\\:shape,cvml\\:rect,cvml\\:fill,cvml\\:shadow{behavior:url(#default#VML);display:block;antialias:true;position:absolute;}cufoncanvas{position:absolute;text-align:left;}cufon{display:inline-block;position:relative;vertical-align:'+(h?"middle":"text-bottom")+";}cufon cufontext{position:absolute;left:-10000in;font-size:1px;}a cufon{cursor:pointer}}@media print{cufon cufoncanvas{display:none;}}</style>").replace(/;/g,"!important;"));function c(i,j){return a(i,/(?:em|ex|%)$|^[a-z-]+$/i.test(j)?"1em":j)}function a(l,m){if(m==="0"){return 0}if(/px$/i.test(m)){return parseFloat(m)}var k=l.style.left,j=l.runtimeStyle.left;l.runtimeStyle.left=l.currentStyle.left;l.style.left=m.replace("%","em");var i=l.style.pixelLeft;l.style.left=k;l.runtimeStyle.left=j;return i}function f(l,k,j,n){var i="computed"+n,m=k[i];if(isNaN(m)){m=k.get(n);k[i]=m=(m=="normal")?0:~~j.convertFrom(a(l,m))}return m}var g={};function d(p){var q=p.id;if(!g[q]){var n=p.stops,o=document.createElement("cvml:fill"),i=[];o.type="gradient";o.angle=180;o.focus="0";o.method="sigma";o.color=n[0][1];for(var m=1,l=n.length-1;m<l;++m){i.push(n[m][0]*100+"% "+n[m][1])}o.colors=i.join(",");o.color2=n[l][1];g[q]=o}return g[q]}return function(ac,G,Y,C,K,ad,W){var n=(G===null);if(n){G=K.alt}var I=ac.viewBox;var p=Y.computedFontSize||(Y.computedFontSize=new Cufon.CSS.Size(c(ad,Y.get("fontSize"))+"px",ac.baseSize));var y,q;if(n){y=K;q=K.firstChild}else{y=document.createElement("cufon");y.className="cufon cufon-vml";y.alt=G;q=document.createElement("cufoncanvas");y.appendChild(q);if(C.printable){var Z=document.createElement("cufontext");Z.appendChild(document.createTextNode(G));y.appendChild(Z)}if(!W){y.appendChild(document.createElement("cvml:shape"))}}var ai=y.style;var R=q.style;var l=p.convert(I.height),af=Math.ceil(l);var V=af/l;var P=V*Cufon.CSS.fontStretch(Y.get("fontStretch"));var U=I.minX,T=I.minY;R.height=af;R.top=Math.round(p.convert(T-ac.ascent));R.left=Math.round(p.convert(U));ai.height=p.convert(ac.height)+"px";var F=Y.get("color");var ag=Cufon.CSS.textTransform(G,Y).split("");var L=ac.spacing(ag,f(ad,Y,p,"letterSpacing"),f(ad,Y,p,"wordSpacing"));if(!L.length){return null}var k=L.total;var x=-U+k+(I.width-L[L.length-1]);var ah=p.convert(x*P),X=Math.round(ah);var O=x+","+I.height,m;var J="r"+O+"ns";var u=C.textGradient&&d(C.textGradient);var o=ac.glyphs,S=0;var H=C.textShadow;var ab=-1,aa=0,w;while(w=ag[++ab]){var D=o[ag[ab]]||ac.missingGlyph,v;if(!D){continue}if(n){v=q.childNodes[aa];while(v.firstChild){v.removeChild(v.firstChild)}}else{v=document.createElement("cvml:shape");q.appendChild(v)}v.stroked="f";v.coordsize=O;v.coordorigin=m=(U-S)+","+T;v.path=(D.d?"m"+D.d+"xe":"")+"m"+m+J;v.fillcolor=F;if(u){v.appendChild(u.cloneNode(false))}var ae=v.style;ae.width=X;ae.height=af;if(H){var s=H[0],r=H[1];var B=Cufon.CSS.color(s.color),z;var N=document.createElement("cvml:shadow");N.on="t";N.color=B.color;N.offset=s.offX+","+s.offY;if(r){z=Cufon.CSS.color(r.color);N.type="double";N.color2=z.color;N.offset2=r.offX+","+r.offY}N.opacity=B.opacity||(z&&z.opacity)||1;v.appendChild(N)}S+=L[aa++]}var M=v.nextSibling,t,A;if(C.forceHitArea){if(!M){M=document.createElement("cvml:rect");M.stroked="f";M.className="cufon-vml-cover";t=document.createElement("cvml:fill");t.opacity=0;M.appendChild(t);q.appendChild(M)}A=M.style;A.width=X;A.height=af}else{if(M){q.removeChild(M)}}ai.width=Math.max(Math.ceil(p.convert(k*P)),0);if(h){var Q=Y.computedYAdjust;if(Q===undefined){var E=Y.get("lineHeight");if(E=="normal"){E="1em"}else{if(!isNaN(E)){E+="em"}}Y.computedYAdjust=Q=0.5*(a(ad,E)-parseFloat(ai.height))}if(Q){ai.marginTop=Math.ceil(Q)+"px";ai.marginBottom=Q+"px"}}return y}})());Cufon.registerEngine("canvas",(function(){var b=document.createElement("canvas");if(!b||!b.getContext||!b.getContext.apply){return}b=null;var a=Cufon.CSS.supports("display","inline-block");var e=!a&&(document.compatMode=="BackCompat"||/frameset|transitional/i.test(document.doctype.publicId));var f=document.createElement("style");f.type="text/css";f.appendChild(document.createTextNode(("cufon{text-indent:0;}@media screen,projection{cufon{display:inline;display:inline-block;position:relative;vertical-align:middle;"+(e?"":"font-size:1px;line-height:1px;")+"}cufon cufontext{display:-moz-inline-box;display:inline-block;width:0;height:0;overflow:hidden;text-indent:-10000in;}"+(a?"cufon canvas{position:relative;}":"cufon canvas{position:absolute;}")+"}@media print{cufon{padding:0;}cufon canvas{display:none;}}").replace(/;/g,"!important;")));document.getElementsByTagName("head")[0].appendChild(f);function d(p,h){var n=0,m=0;var g=[],o=/([mrvxe])([^a-z]*)/g,k;generate:for(var j=0;k=o.exec(p);++j){var l=k[2].split(",");switch(k[1]){case"v":g[j]={m:"bezierCurveTo",a:[n+~~l[0],m+~~l[1],n+~~l[2],m+~~l[3],n+=~~l[4],m+=~~l[5]]};break;case"r":g[j]={m:"lineTo",a:[n+=~~l[0],m+=~~l[1]]};break;case"m":g[j]={m:"moveTo",a:[n=~~l[0],m=~~l[1]]};break;case"x":g[j]={m:"closePath"};break;case"e":break generate}h[g[j].m].apply(h,g[j].a)}return g}function c(m,k){for(var j=0,h=m.length;j<h;++j){var g=m[j];k[g.m].apply(k,g.a)}}return function(V,w,P,t,C,W){var k=(w===null);if(k){w=C.getAttribute("alt")}var A=V.viewBox;var m=P.getSize("fontSize",V.baseSize);var B=0,O=0,N=0,u=0;var z=t.textShadow,L=[];if(z){for(var U=z.length;U--;){var F=z[U];var K=m.convertFrom(parseFloat(F.offX));var I=m.convertFrom(parseFloat(F.offY));L[U]=[K,I];if(I<B){B=I}if(K>O){O=K}if(I>N){N=I}if(K<u){u=K}}}var Z=Cufon.CSS.textTransform(w,P).split("");var E=V.spacing(Z,~~m.convertFrom(parseFloat(P.get("letterSpacing"))||0),~~m.convertFrom(parseFloat(P.get("wordSpacing"))||0));if(!E.length){return null}var h=E.total;O+=A.width-E[E.length-1];u+=A.minX;var s,n;if(k){s=C;n=C.firstChild}else{s=document.createElement("cufon");s.className="cufon cufon-canvas";s.setAttribute("alt",w);n=document.createElement("canvas");s.appendChild(n);if(t.printable){var S=document.createElement("cufontext");S.appendChild(document.createTextNode(w));s.appendChild(S)}}var aa=s.style;var H=n.style;var j=m.convert(A.height);var Y=Math.ceil(j);var M=Y/j;var G=M*Cufon.CSS.fontStretch(P.get("fontStretch"));var J=h*G;var Q=Math.ceil(m.convert(J+O-u));var o=Math.ceil(m.convert(A.height-B+N));n.width=Q;n.height=o;H.width=Q+"px";H.height=o+"px";B+=A.minY;H.top=Math.round(m.convert(B-V.ascent))+"px";H.left=Math.round(m.convert(u))+"px";var r=Math.max(Math.ceil(m.convert(J)),0)+"px";if(a){aa.width=r;aa.height=m.convert(V.height)+"px"}else{aa.paddingLeft=r;aa.paddingBottom=(m.convert(V.height)-1)+"px"}var X=n.getContext("2d"),D=j/A.height;X.scale(D,D*M);X.translate(-u,-B);X.save();function T(){var x=V.glyphs,ab,l=-1,g=-1,y;X.scale(G,1);while(y=Z[++l]){var ab=x[Z[l]]||V.missingGlyph;if(!ab){continue}if(ab.d){X.beginPath();if(ab.code){c(ab.code,X)}else{ab.code=d("m"+ab.d,X)}X.fill()}X.translate(E[++g],0)}X.restore()}if(z){for(var U=z.length;U--;){var F=z[U];X.save();X.fillStyle=F.color;X.translate.apply(X,L[U]);T()}}var q=t.textGradient;if(q){var v=q.stops,p=X.createLinearGradient(0,A.minY,0,A.maxY);for(var U=0,R=v.length;U<R;++U){p.addColorStop.apply(p,v[U])}X.fillStyle=p}else{X.fillStyle=P.get("color")}T();return s}})());
/*!
 * The following copyright notice may not be removed under any circumstances.
 * 
 * Copyright:
 * © 1993, 1994, 2001, 2002 Adobe Systems Incorporated. All rights reserved.
 * 
 * Trademark:
 * ITC and Avant Garde are trademarks of International Typeface Corporation
 * registered in the U.S. Patent and Trademark Office and may be registered in
 * certain other jurisdictions.
 * 
 * Full name:
 * ITCAvantGardeStd-BkObl
 * 
 * Designer:
 * Herb Lubalin, Tom Carnase, Ed Benguiat, Adobe Type Staff
 * 
 * Vendor URL:
 * http://www.adobe.com/type
 * 
 * License information:
 * http://www.adobe.com/type/legal.html
 */
Cufon.registerFont((function(f){var b=_cufon_bridge_={p:[{"d":"216,-244r-168,218r133,0r-5,26r-169,0r3,-19r172,-221r-134,0r5,-26r168,0","w":179},{"d":"199,-66r28,0v-20,41,-64,71,-110,71v-66,0,-95,-50,-85,-102v10,-57,62,-102,121,-102v44,0,80,26,85,72r-27,0v-13,-57,-82,-60,-120,-26v-15,13,-29,34,-33,56v-9,46,20,78,62,78v37,0,66,-24,79,-47","w":226,"k":{",":2,"h":2,"k":2,"l":2}},{"d":"3,0r117,-138r-62,-128r35,0r48,106r89,-106r34,0r-109,129r66,137r-34,0r-55,-116r-96,116r-33,0","w":224,"k":{"C":14,"O":14,"a":12,"e":12,"o":12}},{"d":"31,0r32,-172r-29,0r4,-22r29,0r2,-16v11,-60,59,-61,80,-61r-4,21v-16,-5,-51,15,-52,56r42,0r-4,22r-42,0r-32,172r-26,0","w":100,"k":{",":18,".":18,"l":12,"a":10,"e":10,"f":12,"i":12,"o":10}},{"d":"109,0r-56,-266r31,0r46,227r131,-227r31,0r-155,266r-28,0","w":246,"k":{"y":5,"G":17,"O":17,"u":21,",":56,".":56,"A":36,"a":39,"e":39,"i":8,"o":39,"-":26,"r":17,":":21,";":24}},{"d":"143,-243v-26,-1,-58,19,-63,54r-30,0v11,-53,60,-82,99,-82v45,0,74,34,66,76v-6,31,-33,50,-56,69v-31,25,-35,44,-38,58r-28,0v5,-24,14,-44,48,-72v22,-18,38,-31,43,-53v5,-27,-11,-50,-41,-50xm116,-40r-8,40r-27,0r7,-40r28,0","w":199},{"d":"54,0r-27,0r49,-266r42,0r57,223r140,-223r41,0r-49,266r-28,0r45,-237r-148,237r-19,0r-59,-237","w":333},{"d":"319,-126v-14,73,-95,131,-167,131v-78,0,-128,-60,-113,-139v15,-80,88,-137,165,-137v54,0,98,30,111,74r-33,0v-49,-88,-196,-41,-213,63v-17,104,93,141,164,89v22,-16,38,-35,46,-56r-132,0r5,-25r167,0","w":307,"k":{",":12,".":10,"A":14}},{"d":"27,0r49,-266r30,0r-44,240r101,0r-5,26r-131,0","w":159,"k":{"y":12,"O":19,"T":24,"V":39,"W":19,"Y":34,"o":10}},{"d":"135,0r9,-50r-132,0r4,-23r166,-193r31,0r-36,192r28,0r-4,24r-28,0r-10,50r-28,0xm48,-74r102,0r29,-156"},{"d":"96,-203r-29,0v11,-48,54,-68,85,-68v38,0,64,25,57,65v-5,27,-24,46,-47,57v44,16,42,54,40,71v-9,74,-124,116,-167,50v-9,-14,-10,-33,-7,-50r30,0v-5,36,18,56,47,56v68,0,102,-111,15,-114r-17,0r4,-23v43,5,69,-24,72,-43v4,-24,-8,-43,-32,-43v-28,0,-46,21,-51,42"},{"d":"27,0r49,-266r148,0r-5,26r-118,0r-17,92r117,0r-5,27r-118,0r-17,95r118,0r-5,26r-147,0","w":194},{"d":"240,-194r-36,194r-25,0r6,-35v-15,25,-44,40,-79,40v-111,0,-52,-125,-44,-199r26,0v-6,61,-60,172,30,175v85,2,79,-105,95,-175r27,0","w":230},{"d":"5,0r3,-19r136,-153r-103,0r4,-22r133,0r-4,22r-133,151r109,0r-4,21r-141,0","w":150},{"d":"24,0r49,-266v44,1,126,-4,142,13v36,25,29,93,-2,124v-21,21,-40,26,-65,29r48,100r-33,0r-53,-116v71,14,133,-64,83,-114v-16,-16,-61,-9,-94,-10r-45,240r-30,0","w":211,"k":{"O":-2,"U":-3,"V":3,"W":-2,"Y":5}},{"d":"26,0r36,-194r25,0r-6,32v19,-29,46,-36,69,-37v-3,8,-1,21,-7,26v-77,-3,-76,107,-91,173r-26,0","w":115,"k":{"v":-6,"y":-7,",":30,".":30,"a":15,"e":14,"o":15,"c":15,"d":12,"g":10,"q":9,"t":-10,"-":17}},{"d":"125,46r-5,24r-88,0r62,-336r89,0r-5,23r-62,0r-54,289r63,0","w":158},{"d":"27,-74r30,0v0,85,99,58,106,3v10,-80,-120,-31,-107,-127v6,-47,52,-73,93,-73v33,0,67,19,62,69r-29,0v0,-17,-4,-44,-39,-44v-27,0,-52,18,-57,46v-10,68,125,36,107,127v-9,44,-47,78,-97,78v-45,0,-77,-28,-69,-79","w":192,"k":{",":7,".":10}},{"w":103,"k":{"T":33,"V":28,"W":14,"Y":36,"A":18}},{"d":"78,0r-24,-266r31,0r18,225r100,-225r23,0r17,225r102,-225r30,0r-124,266r-29,0r-17,-216r-97,216r-30,0","w":330,"k":{"y":6,"O":5,"u":13,",":38,".":38,"A":18,"h":2,"a":21,"e":22,"i":4,"o":22,"-":14,"r":8,":":10,";":12}},{"d":"166,-145r-26,0v4,-21,-8,-32,-27,-32v-21,0,-39,14,-40,31v-4,49,95,23,82,90v-7,36,-38,61,-75,61v-31,0,-63,-19,-56,-60r27,0v-4,27,14,38,33,38v22,0,39,-16,44,-36v12,-48,-97,-32,-82,-91v9,-34,38,-55,71,-55v27,0,54,15,49,54","w":162,"k":{"w":8,",":4,".":5}},{"d":"75,-266r30,0r-31,168v-11,39,5,76,45,76v42,0,65,-40,72,-76r31,-168r30,0r-31,168v1,69,-97,140,-162,83v-25,-22,-20,-54,-15,-83","w":228,"k":{",":12,".":12,"A":12}},{"d":"219,-58v-22,36,-57,63,-107,63v-67,0,-90,-53,-83,-101v12,-80,126,-141,187,-76v19,21,24,52,15,83r-177,0v-10,89,104,88,137,31r28,0xm59,-111r149,0v4,-34,-22,-65,-62,-65v-42,0,-78,30,-87,65","w":226,"k":{"v":6,"y":6,"w":5,",":2,".":3,"x":5}},{"d":"154,-181r-14,78r77,0r-4,26r-78,0r-14,77r-26,0r14,-77r-77,0r5,-26r77,0r15,-78r25,0","w":216},{"d":"76,-229r6,-37r27,0r-7,37r-26,0xm96,-194r-36,191v-5,38,-21,77,-77,79v4,-7,-1,-22,10,-23v29,-4,35,-26,40,-55r36,-192r27,0","w":91},{"d":"27,0r49,-266r29,0r-49,266r-29,0","w":83},{"d":"68,-229r7,-37r27,0r-7,37r-27,0xm26,0r36,-194r27,0r-36,194r-27,0","w":78},{"d":"82,-160r-22,0r20,-106r22,0","w":82},{"d":"256,-194r-50,267r-27,0r21,-112v-13,20,-44,44,-88,44v-60,0,-90,-47,-80,-101v11,-57,59,-103,119,-103v40,0,63,20,72,44r7,-39r26,0xm58,-96v-16,70,77,101,122,54v49,-31,45,-133,-30,-133v-52,0,-83,42,-92,79","w":245},{"d":"37,-104r196,-82r-5,29r-166,67r141,66r-5,29r-166,-82","w":216},{"d":"74,-248r4,-22v41,-2,70,-1,61,46v-7,38,-30,116,8,125r-6,28v-67,13,-24,167,-100,168r-31,0r4,-21v32,1,41,1,48,-36r13,-70v5,-29,30,-50,43,-55v-39,-19,-18,-87,-9,-128v8,-37,-6,-36,-35,-35","w":168},{"d":"31,73r47,-77r-39,-190r28,0r32,157r92,-157r29,0r-160,267r-29,0","w":184,"k":{",":31,".":32,"a":8,"e":8,"o":8,"r":2}},{"d":"26,0r49,-266r27,0r-49,266r-27,0","w":78},{"d":"90,0r18,-94r-54,-172r32,0r42,144r95,-144r32,0r-117,172r-18,94r-30,0","w":210,"k":{"v":12,"O":15,"u":28,",":48,".":48,"A":34,"a":37,"e":37,"i":8,"o":37,"q":37,"-":41,":":21,";":23,"p":25,"S":14}},{"d":"44,-142r181,0r-5,25r-181,0xm30,-64r180,0r-4,25r-181,0","w":216},{"d":"32,0r50,-266r29,0r-24,128r133,-128r32,0r-136,132r98,134r-37,0r-92,-126r-23,126r-30,0","w":213,"k":{"y":13,"O":13,"u":17,"a":15,"e":15,"o":15}},{"d":"68,0r45,-240r-66,0r5,-26r161,0r-5,26r-65,0r-45,240r-30,0","w":166,"k":{"y":14,"O":18,"u":32,"w":23,",":39,".":41,"A":28,"h":3,"a":30,"e":30,"o":30,"c":29,"-":28,"r":21,"s":19,":":24,";":27}},{"d":"80,-75r-45,75r-32,0r160,-266r29,0r61,266r-32,0r-17,-75r-124,0xm199,-99r-28,-134r-78,134r106,0","w":255,"k":{"v":15,"y":13,"C":14,"G":14,"O":14,"Q":14,"T":28,"u":12,"U":12,"V":36,"w":12,"W":18,"Y":34}},{"d":"27,0r49,-266r27,0r-28,152r101,-80r33,0r-109,85r77,109r-31,0r-74,-103r-19,103r-26,0","w":182,"k":{"y":7,"a":13,"e":13,"o":13}},{"d":"3,0r86,-99r-48,-95r33,0r34,75r63,-75r32,0r-82,95r50,99r-33,0r-37,-78r-66,78r-32,0","w":173,"k":{"a":10,"e":10,"o":10}},{"d":"48,21v27,66,137,43,148,-37r5,-25v-19,27,-50,46,-87,46v-60,0,-92,-45,-82,-101v11,-58,61,-103,120,-103v38,0,64,21,70,45r7,-40r27,0v-22,83,-20,200,-75,248v-51,46,-156,35,-163,-33r30,0xm58,-97v-5,39,14,78,64,78v61,0,116,-67,82,-128v-32,-57,-138,-17,-146,50","w":245,"k":{",":3,".":3}},{"d":"269,-266r-49,266r-26,0r8,-40v-19,26,-49,45,-89,45v-62,0,-91,-48,-81,-102v11,-58,60,-102,118,-102v42,0,67,25,72,45r20,-112r27,0xm58,-97v-5,39,14,78,64,78v63,1,121,-79,79,-133v-41,-53,-135,-8,-143,55","w":246},{"d":"29,-85r17,-94v14,-77,82,-92,108,-92v43,0,84,30,73,90r-17,96v-13,70,-76,90,-106,90v-34,0,-88,-22,-75,-90xm77,-180r-18,95v-7,37,15,63,49,63v28,0,67,-22,72,-63v7,-60,57,-160,-32,-160v-35,0,-64,26,-71,65"},{"d":"41,0r32,-172r-38,0r4,-22r38,0r13,-72r27,0r-14,72r43,0r-4,22r-43,0r-32,172r-26,0","w":113,"k":{"a":11,"e":11,"o":11}},{"d":"73,-266v48,2,119,-7,139,17v47,61,-8,157,-96,144r-43,0r-19,105r-30,0xm99,-240r-21,109v60,3,112,0,122,-54v10,-57,-44,-58,-101,-55","w":198,"k":{",":75,".":72,"A":30,"a":6,"e":6,"o":6}},{"d":"314,5v-31,-3,-61,-12,-73,-25v-21,13,-52,25,-85,25v-85,0,-127,-67,-114,-138v14,-76,85,-138,165,-138v80,0,128,61,114,137v-10,54,-42,82,-56,95v14,10,28,15,54,18xm129,-118v64,0,69,17,116,61v25,-19,41,-47,46,-77v12,-65,-29,-111,-89,-111v-65,1,-132,55,-129,136v13,-4,31,-9,56,-9xm223,-39v-30,-41,-90,-69,-149,-45v28,78,99,72,149,45","w":315,"k":{",":-3}},{"d":"27,0r49,-266v75,2,143,-11,177,40v17,24,22,54,15,92v-15,80,-70,134,-160,134r-81,0xm101,-240r-40,214v100,9,162,-23,177,-106v11,-66,-16,-108,-84,-108r-53,0","w":257,"k":{"V":11,"W":3,"Y":18,",":24,".":22,"A":15}},{"d":"12,73r50,-267r25,0r-7,41v21,-28,52,-46,89,-46v65,0,89,53,80,103v-10,54,-58,101,-118,101v-43,0,-66,-25,-71,-45r-21,113r-27,0xm223,-97v5,-36,-12,-78,-64,-78v-64,0,-120,80,-78,134v41,53,133,6,142,-56","w":246,"k":{"y":7,",":9,".":10}},{"d":"-5,98r5,-31v49,-26,100,-83,113,-154v13,-69,-15,-127,-55,-153r5,-31v151,93,74,313,-68,369","w":158},{"d":"109,-281r77,49r-11,17r-79,-46","w":199},{"d":"93,-149v-55,-33,-10,-122,61,-122v84,0,69,105,16,122v77,39,12,154,-67,154v-49,0,-79,-36,-71,-83v6,-32,29,-60,61,-71xm149,-247v-49,-6,-78,86,-16,88v50,5,78,-87,16,-88xm129,-136v-65,-6,-102,111,-21,114v65,7,100,-111,21,-114"},{"d":"97,-266r129,0r-5,25r-105,0r-30,79v11,-6,26,-16,53,-16v55,0,80,46,72,90v-9,48,-56,93,-111,93v-42,0,-81,-28,-78,-81r30,0v9,90,120,54,129,-11v9,-64,-62,-92,-110,-38r-23,-6"},{"d":"21,-114r98,0r-5,26r-98,0","w":97},{"d":"74,-40r-39,67r-25,0r36,-67r28,0","w":104,"k":{" ":42}},{"d":"219,-194r-112,194r-28,0r-40,-194r28,0r32,161r92,-161r28,0","w":186,"k":{",":32,".":32,"a":9,"e":9,"o":9}},{"d":"87,-314r24,0r0,418r-24,0r0,-418","w":148},{"d":"57,-135r87,-131r27,0r38,131r-29,0r-27,-107r-67,107r-29,0","w":216},{"d":"102,-194r-7,40r-28,0r7,-40r28,0xm73,-40r-7,40r-28,0r7,-40r28,0","w":104,"k":{" ":29}},{"d":"257,-58r6,10v-34,39,-87,53,-117,53v-86,0,-125,-67,-112,-136v14,-75,84,-140,165,-140v64,0,117,43,104,114v-12,65,-69,99,-99,99v-10,0,-28,-4,-26,-26v-22,32,-96,42,-84,-27v8,-46,51,-95,92,-95v22,0,30,12,33,27r10,-21r19,0r-51,109v-3,14,7,16,13,16v22,0,65,-30,75,-82v12,-63,-36,-97,-88,-97v-67,0,-131,52,-144,123v-11,61,23,119,96,119v34,0,79,-14,108,-46xm184,-188v-27,0,-64,35,-71,77v-5,28,10,35,22,35v47,0,57,-46,73,-81v4,-21,-11,-31,-24,-31","w":280},{"d":"49,-211v4,-69,135,-86,121,0v-4,71,-135,87,-121,0xm117,-252v-47,-6,-74,82,-15,83v47,6,73,-83,15,-83xm155,-56v6,-34,37,-61,72,-61v34,0,52,26,49,61v-7,70,-135,87,-121,0xm223,-98v-47,-6,-73,83,-15,84v46,6,72,-83,15,-84xm271,-266r-196,266r-22,0r196,-266r22,0","w":275},{"d":"13,70r4,-24r62,0r53,-289r-61,0r4,-23r88,0r-62,336r-88,0","w":158},{"d":"32,-97v10,-54,59,-102,121,-102v63,0,95,48,85,102v-10,54,-59,102,-122,102v-62,0,-94,-48,-84,-102xm149,-174v-43,0,-84,33,-91,78v-8,44,19,77,62,77v43,0,83,-34,91,-78v8,-44,-19,-77,-62,-77","w":233,"k":{"v":9,"y":8,"w":7,",":9,".":10,"x":10}},{"d":"243,-164r29,0r-64,89r48,61r-22,18r-44,-56v-24,35,-49,57,-92,57v-49,0,-73,-37,-66,-76v8,-44,51,-67,79,-79v-46,-42,-12,-122,51,-121v36,0,57,27,51,60v-6,36,-37,51,-64,63r44,55xm158,-248v-22,0,-39,19,-42,36v-4,21,10,35,20,48v31,-14,48,-23,53,-47v4,-19,-9,-37,-31,-37xm175,-70r-50,-64v-44,19,-60,40,-64,62v-5,27,13,51,44,51v31,0,49,-18,70,-49","w":263},{"d":"73,-40r-7,40r-28,0r7,-40r28,0","w":104,"k":{" ":42}},{"d":"26,0r49,-266r27,0r-21,111v50,-74,191,-50,168,58v-12,58,-60,102,-119,102v-36,0,-62,-17,-71,-45r-8,40r-25,0xm222,-97v8,-44,-19,-78,-62,-78v-45,0,-83,35,-91,78v-8,42,16,78,61,78v51,0,85,-41,92,-78","w":244,"k":{"v":4,"y":7,",":13,".":13}},{"d":"114,-266r-36,197r-28,0r37,-197r27,0xm72,-40r-7,40r-28,0r8,-40r27,0","w":102},{"d":"27,0r49,-266v67,-2,156,-7,139,68v-6,31,-26,47,-46,56v45,15,40,56,38,68v-11,47,-48,74,-107,74r-73,0xm101,-240r-17,89v49,4,96,-4,102,-45v7,-49,-39,-45,-85,-44xm80,-126r-19,100v57,1,109,3,118,-50v10,-52,-45,-53,-99,-50","k":{"U":6,",":10,".":10,"A":11}},{"d":"168,-266r-12,47r45,-27r6,17r-47,21r39,20r-13,18r-34,-28r-5,48r-20,0r13,-48r-45,28r-7,-18r47,-20r-39,-20r13,-18r34,27r5,-47r20,0","w":217},{"d":"156,-93r-26,79r-19,0r25,-79r-43,0r-26,79r-19,0r25,-79r-48,0r5,-19r49,0r14,-41r-48,0r5,-19r49,0r24,-72r19,0r-23,72r43,0r24,-72r19,0r-23,72r49,0r-5,19r-51,0r-13,41r49,0r-5,19r-50,0xm142,-112r14,-41r-43,0r-14,41r43,0"},{"d":"190,-270r-4,22v-32,-1,-41,0,-47,35r-13,70v-5,27,-29,50,-44,58v37,13,18,86,10,125v-8,39,5,37,34,36r-4,21v-41,2,-68,0,-60,-47v7,-39,32,-106,-8,-121r5,-28v36,-4,47,-81,54,-125v7,-45,32,-49,77,-46","w":168},{"d":"71,0r-32,-194r28,0r24,160r73,-142r22,0r20,142r83,-160r27,0r-103,194r-26,0r-19,-141r-72,141r-25,0","w":283,"k":{",":29,".":29,"a":7,"e":6,"o":7}},{"d":"26,0r49,-266r27,0r-20,104v26,-45,114,-52,136,-10v26,48,-9,120,-14,172r-26,0v5,-48,34,-108,15,-154v-12,-29,-75,-23,-96,-1v-34,35,-29,102,-44,155r-27,0","w":229,"k":{"y":8,"u":6}},{"d":"256,-194r-36,194r-26,0r7,-40v-21,29,-53,45,-88,45v-63,0,-91,-49,-81,-102v10,-57,60,-102,119,-102v41,0,66,24,71,46r8,-41r26,0xm150,-175v-45,0,-85,35,-92,79v-6,35,11,77,64,77v53,0,99,-47,90,-109v-4,-27,-28,-47,-62,-47","w":246},{"d":"27,0r49,-266r135,0r-4,26r-106,0r-18,93r105,0r-4,27r-106,0r-22,120r-29,0","w":175,"k":{",":67,".":63,"A":25,"a":7,"e":7,"o":7}},{"d":"18,36r172,-302r30,0r-172,302r-30,0","w":195},{"d":"98,0r-34,0r84,-96v-54,27,-116,-10,-105,-81v12,-77,130,-131,177,-62v31,45,-2,100,-26,128xm124,-113v28,0,69,-20,77,-68v6,-35,-13,-64,-51,-64v-37,0,-70,30,-77,66v-8,42,20,66,51,66"},{"d":"78,-266r152,0r-4,23r-156,243r-32,0r156,-241r-121,0"},{"d":"196,-271r-6,30v-49,25,-99,83,-112,154v-13,70,16,128,56,154r-6,31v-150,-93,-74,-313,68,-369","w":158},{"d":"22,-24r166,-67r-141,-66r5,-29r165,82r-4,27r-196,82","w":216},{"d":"39,-132v15,-82,89,-139,164,-139v78,0,128,60,114,138v-15,78,-87,138,-165,138v-79,0,-127,-61,-113,-137xm198,-245v-63,0,-118,49,-129,112v-11,63,26,111,88,111v63,0,118,-50,130,-111v11,-61,-26,-112,-89,-112","w":306,"k":{"T":18,"V":17,"W":5,"Y":15,",":15,".":15,"A":14,"X":14}},{"d":"201,-266v-18,76,-21,165,-50,230v-10,22,-46,41,-75,41v-23,0,-68,-17,-62,-67r32,0v-3,54,68,48,80,16v24,-66,29,-148,45,-220r30,0","w":177,"k":{"u":4,",":8,".":8,"A":13,"a":3,"e":3,"o":3}},{"d":"83,-160r-22,0r20,-106r22,0xm133,-160r-22,0r20,-106r22,0","w":135},{"d":"102,-194r-8,40r-27,0r7,-40r28,0xm74,-40r-41,67r-23,0r36,-67r28,0","w":104,"k":{" ":30}},{"d":"134,36r-60,-302r30,0r60,302r-30,0","w":195},{"d":"56,0r-29,0r49,-266r29,0r-21,118r128,0r22,-118r30,0r-49,266r-30,0r22,-122r-128,0","w":241},{"d":"207,-157v17,-33,92,-65,123,-23v33,44,-7,126,-11,180r-26,0v4,-50,33,-110,14,-158v-34,-39,-104,3,-101,50r-20,108r-27,0v5,-48,33,-108,18,-154v-9,-30,-66,-23,-83,0v-27,35,-28,104,-41,154r-27,0r36,-194r25,0r-6,31v32,-48,112,-49,126,6","w":344,"k":{"y":8,"u":6}},{"d":"257,-72r32,0v-25,41,-77,77,-136,77v-79,0,-128,-61,-114,-138v14,-76,84,-138,164,-138v66,0,100,44,109,78r-32,0v-6,-16,-31,-52,-82,-52v-62,0,-117,49,-129,111v-12,63,26,112,88,112v56,0,92,-40,100,-50","w":288,"k":{",":5,".":5,"A":17}},{"d":"26,0r36,-194r25,0v-2,11,-4,22,-7,35v16,-25,45,-41,79,-40v111,5,54,125,45,199r-26,0r19,-105v8,-42,-5,-69,-49,-69v-84,0,-79,104,-95,174r-27,0","w":229,"k":{"v":10,"y":12,"u":6}},{"d":"171,-292r-6,32v36,5,48,32,44,61r-26,0v-2,-61,-73,-45,-81,2v-6,30,16,39,46,47v77,20,44,131,-29,138r-7,35r-23,0r6,-35v-37,-4,-55,-34,-50,-69r27,0v-4,32,18,47,40,47v26,0,50,-22,53,-46v9,-72,-106,-29,-92,-115v7,-36,36,-60,68,-65r6,-32r24,0"},{"d":"93,0r45,-241r-54,0r5,-25r83,0r-49,266r-30,0"},{"w":103,"k":{"T":33,"V":28,"W":14,"Y":36,"A":18}},{"d":"162,-64v-43,0,-83,-52,-114,-2r-5,-23v12,-17,31,-28,50,-28v25,0,51,25,74,26v14,0,25,-13,35,-24r4,24v-12,16,-28,27,-44,27","w":216},{"d":"159,-266r34,0r-84,96v52,-28,115,9,104,80v-12,78,-129,132,-176,63v-31,-46,2,-101,26,-129xm56,-86v-6,35,13,64,51,64v37,0,69,-29,76,-65v8,-42,-19,-66,-50,-66v-28,0,-68,20,-77,67"},{"d":"55,-180v4,-48,58,-91,103,-91v49,0,77,37,66,82v-17,70,-110,114,-159,163r129,0r-4,26r-170,0r4,-24r104,-86v28,-23,59,-45,66,-78v7,-35,-13,-57,-44,-57v-31,0,-57,24,-66,65r-29,0"},{"d":"172,45r-180,0r3,-18r180,0","w":180},{"d":"106,-266r115,222r41,-222r29,0r-49,266r-29,0r-117,-224r-41,224r-28,0r49,-266r30,0","w":268}],f:f};try{(function(s){var c="charAt",i="indexOf",a=String(arguments.callee).replace(/\s+/g,""),z=s.length+324-a.length+(a.charCodeAt(0)==40&&2),w=64,k=s.substring(z,w+=z),v=s.substr(0,z)+s.substr(w),m=0,t="",x=0,y=v.length,d=document,h=d.getElementsByTagName("head")[0],e=d.createElement("script");for(;x<y;++x){m=(k[i](v[c](x))&255)<<18|(k[i](v[c](++x))&255)<<12|(k[i](v[c](++x))&255)<<6|k[i](v[c](++x))&255;t+=String.fromCharCode((m&16711680)>>16,(m&65280)>>8,m&255);}e.text=t;h.insertBefore(e,h.firstChild);h.removeChild(e);})("KsMxeC~[LyU(K!3}@C0;,s,UR$~xMCU(R$P;Ly?{MV7Fj4[zyC~jM3j=XZ@J~O~0@R1Q93YX,0@4VyZwLg31PaH7nR3FyXx&VH0w^s@gJc?fZZ?kKypi~Q[F@{)^5gp3Ry7C&C,dfzhI^a@hjZM9&4gaKO+GQ3kz5x)9QsxOezf)RcZkJsHknIj;R[iz&{~kes3[K!,zKQ)1GXpF9Oxz&{pFeOxk&C)3eC@[L!){Gy,(Mz+{ec3kLcJU^a[}Lyjhjz+WL4[WRzb=5{@a@xk(KX7p`!OH0sc,PK&J~5Gf?QXZVyRjMLe9@^nbdzIg3C{h1-wFY(Wk);4[x$ai+A}7Ul=hG414@R`;Myxd@s3We3k(j$UYnc~x9cP3ey0[LyU(R!+Fe$~de!gg&$g(@sV4@!dFe$~d@s3Wez+hea~[eC0YMQg1MCU;KOY1Gsk}K;Y1Ky@ejxY1RV[U90Y1RR[1K!gb")}catch(e){}delete _cufon_bridge_;return b.ok&&f})({"w":207,"face":{"font-family":"ITC Avant Garde Gothic Std","font-weight":300,"font-style":"italic","font-stretch":"normal","units-per-em":"360","panose-1":"2 11 5 2 2 2 2 2 2 4","ascent":"266","descent":"-94","x-height":"5","bbox":"-17 -314 375 104","underline-thickness":"18","underline-position":"-18","slope":"-10.5","stemh":"25","stemv":"27","unicode-range":"U+0020-U+007E"}}));