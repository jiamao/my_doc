(function(e){function t(t){for(var o,u,c=t[0],s=t[1],a=t[2],l=0,d=[];l<c.length;l++)u=c[l],Object.prototype.hasOwnProperty.call(r,u)&&r[u]&&d.push(r[u][0]),r[u]=0;for(o in s)Object.prototype.hasOwnProperty.call(s,o)&&(e[o]=s[o]);f&&f(t);while(d.length)d.shift()();return i.push.apply(i,a||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],o=!0,u=1;u<n.length;u++){var s=n[u];0!==r[s]&&(o=!1)}o&&(i.splice(t--,1),e=c(c.s=n[0]))}return e}var o={},r={app:0},i=[];function u(e){return c.p+"js/"+({}[e]||e)+"."+{"chunk-d65d79d4":"099188de"}[e]+".js"}function c(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.e=function(e){var t=[],n=r[e];if(0!==n)if(n)t.push(n[2]);else{var o=new Promise((function(t,o){n=r[e]=[t,o]}));t.push(n[2]=o);var i,s=document.createElement("script");s.charset="utf-8",s.timeout=120,c.nc&&s.setAttribute("nonce",c.nc),s.src=u(e);var a=new Error;i=function(t){s.onerror=s.onload=null,clearTimeout(l);var n=r[e];if(0!==n){if(n){var o=t&&("load"===t.type?"missing":t.type),i=t&&t.target&&t.target.src;a.message="Loading chunk "+e+" failed.\n("+o+": "+i+")",a.name="ChunkLoadError",a.type=o,a.request=i,n[1](a)}r[e]=void 0}};var l=setTimeout((function(){i({type:"timeout",target:s})}),12e4);s.onerror=s.onload=i,document.head.appendChild(s)}return Promise.all(t)},c.m=e,c.c=o,c.d=function(e,t,n){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)c.d(n,o,function(t){return e[t]}.bind(null,o));return n},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="",c.oe=function(e){throw console.error(e),e};var s=window["webpackJsonp"]=window["webpackJsonp"]||[],a=s.push.bind(s);s.push=t,s=s.slice();for(var l=0;l<s.length;l++)t(s[l]);var f=a;i.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"56d7":function(e,t,n){"use strict";n.r(t);var o=n("7b01"),r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{class:{show:e.isshow},attrs:{id:"app",title:e.message}},[n("Comment",{attrs:{items:e.items}})],1)},i=[],u={data(){return{isshow:!0,message:"test",items:[{content:"msg 1",user:"fefe"},{content:"msg2",user:"tong"}]}},components:{Comment:()=>n.e("chunk-d65d79d4").then(n.bind(null,"0065"))}},c=u,s=(n("fffb"),n("d7b3")),a=Object(s["a"])(c,r,i,!1,null,null,null),l=a.exports,f={install:function(e,t){e.myGlobalMethod=function(){console.log(t)},e.directive("my-directive",{bind(e,t,n,o){console.log(e,o),console.log("my-directive",t,n)}}),e.mixin({created:function(){this.init()},methods:{init:function(){console.log("mixin init")}}}),e.prototype.$myMethod=function(e){console.log(e)}}};o["a"].use(f),o["a"].config.productionTip=!1,o["a"].config.devtools=!0,new o["a"]({render:e=>e(l)}).$mount("#app")},b121:function(e,t,n){},fffb:function(e,t,n){"use strict";var o=n("b121"),r=n.n(o);r.a}});
//# sourceMappingURL=app.f3c9ea1c.js.map