(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7731c92c"],{"057f":function(t,e,r){var n=r("fc6a"),o=r("241c").f,i={}.toString,a="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],s=function(t){try{return o(t)}catch(e){return a.slice()}};t.exports.f=function(t){return a&&"[object Window]"==i.call(t)?s(t):o(n(t))}},"082b":function(t,e,r){},"159b":function(t,e,r){var n=r("da84"),o=r("fdbc"),i=r("17c2"),a=r("9112");for(var s in o){var c=n[s],u=c&&c.prototype;if(u&&u.forEach!==i)try{a(u,"forEach",i)}catch(l){u.forEach=i}}},"17c2":function(t,e,r){"use strict";var n=r("b727").forEach,o=r("a640"),i=r("ae40"),a=o("forEach"),s=i("forEach");t.exports=a&&s?[].forEach:function(t){return n(this,t,arguments.length>1?arguments[1]:void 0)}},"25f0":function(t,e,r){"use strict";var n=r("6eeb"),o=r("825a"),i=r("d039"),a=r("ad6d"),s="toString",c=RegExp.prototype,u=c[s],l=i((function(){return"/a/b"!=u.call({source:"a",flags:"b"})})),f=u.name!=s;(l||f)&&n(RegExp.prototype,s,(function(){var t=o(this),e=String(t.source),r=t.flags,n=String(void 0===r&&t instanceof RegExp&&!("flags"in c)?a.call(t):r);return"/"+e+"/"+n}),{unsafe:!0})},4160:function(t,e,r){"use strict";var n=r("23e7"),o=r("17c2");n({target:"Array",proto:!0,forced:[].forEach!=o},{forEach:o})},"45fc":function(t,e,r){"use strict";var n=r("23e7"),o=r("b727").some,i=r("a640"),a=r("ae40"),s=i("some"),c=a("some");n({target:"Array",proto:!0,forced:!s||!c},{some:function(t){return o(this,t,arguments.length>1?arguments[1]:void 0)}})},"4de4":function(t,e,r){"use strict";var n=r("23e7"),o=r("b727").filter,i=r("1dde"),a=r("ae40"),s=i("filter"),c=a("filter");n({target:"Array",proto:!0,forced:!s||!c},{filter:function(t){return o(this,t,arguments.length>1?arguments[1]:void 0)}})},6591:function(t,e,r){},7085:function(t,e,r){"use strict";var n=r("ac7b"),o=r.n(n);o.a},"746f":function(t,e,r){var n=r("428f"),o=r("5135"),i=r("e538"),a=r("9bf2").f;t.exports=function(t){var e=n.Symbol||(n.Symbol={});o(e,t)||a(e,t,{value:i.f(t)})}},"96cf":function(t,e,r){var n=function(t){"use strict";var e,r=Object.prototype,n=r.hasOwnProperty,o="function"===typeof Symbol?Symbol:{},i=o.iterator||"@@iterator",a=o.asyncIterator||"@@asyncIterator",s=o.toStringTag||"@@toStringTag";function c(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{c({},"")}catch(D){c=function(t,e,r){return t[e]=r}}function u(t,e,r,n){var o=e&&e.prototype instanceof v?e:v,i=Object.create(o.prototype),a=new k(n||[]);return i._invoke=x(t,r,a),i}function l(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(D){return{type:"throw",arg:D}}}t.wrap=u;var f="suspendedStart",d="suspendedYield",h="executing",p="completed",m={};function v(){}function y(){}function g(){}var b={};b[i]=function(){return this};var w=Object.getPrototypeOf,C=w&&w(w($([])));C&&C!==r&&n.call(C,i)&&(b=C);var _=g.prototype=v.prototype=Object.create(b);function P(t){["next","throw","return"].forEach((function(e){c(t,e,(function(t){return this._invoke(e,t)}))}))}function O(t,e){function r(o,i,a,s){var c=l(t[o],t,i);if("throw"!==c.type){var u=c.arg,f=u.value;return f&&"object"===typeof f&&n.call(f,"__await")?e.resolve(f.__await).then((function(t){r("next",t,a,s)}),(function(t){r("throw",t,a,s)})):e.resolve(f).then((function(t){u.value=t,a(u)}),(function(t){return r("throw",t,a,s)}))}s(c.arg)}var o;function i(t,n){function i(){return new e((function(e,o){r(t,n,e,o)}))}return o=o?o.then(i,i):i()}this._invoke=i}function x(t,e,r){var n=f;return function(o,i){if(n===h)throw new Error("Generator is already running");if(n===p){if("throw"===o)throw i;return L()}r.method=o,r.arg=i;while(1){var a=r.delegate;if(a){var s=S(a,r);if(s){if(s===m)continue;return s}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(n===f)throw n=p,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n=h;var c=l(t,e,r);if("normal"===c.type){if(n=r.done?p:d,c.arg===m)continue;return{value:c.arg,done:r.done}}"throw"===c.type&&(n=p,r.method="throw",r.arg=c.arg)}}}function S(t,r){var n=t.iterator[r.method];if(n===e){if(r.delegate=null,"throw"===r.method){if(t.iterator["return"]&&(r.method="return",r.arg=e,S(t,r),"throw"===r.method))return m;r.method="throw",r.arg=new TypeError("The iterator does not provide a 'throw' method")}return m}var o=l(n,t.iterator,r.arg);if("throw"===o.type)return r.method="throw",r.arg=o.arg,r.delegate=null,m;var i=o.arg;return i?i.done?(r[t.resultName]=i.value,r.next=t.nextLoc,"return"!==r.method&&(r.method="next",r.arg=e),r.delegate=null,m):i:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,m)}function E(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function j(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function k(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(E,this),this.reset(!0)}function $(t){if(t){var r=t[i];if(r)return r.call(t);if("function"===typeof t.next)return t;if(!isNaN(t.length)){var o=-1,a=function r(){while(++o<t.length)if(n.call(t,o))return r.value=t[o],r.done=!1,r;return r.value=e,r.done=!0,r};return a.next=a}}return{next:L}}function L(){return{value:e,done:!0}}return y.prototype=_.constructor=g,g.constructor=y,y.displayName=c(g,s,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"===typeof t&&t.constructor;return!!e&&(e===y||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,g):(t.__proto__=g,c(t,s,"GeneratorFunction")),t.prototype=Object.create(_),t},t.awrap=function(t){return{__await:t}},P(O.prototype),O.prototype[a]=function(){return this},t.AsyncIterator=O,t.async=function(e,r,n,o,i){void 0===i&&(i=Promise);var a=new O(u(e,r,n,o),i);return t.isGeneratorFunction(r)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},P(_),c(_,s,"Generator"),_[i]=function(){return this},_.toString=function(){return"[object Generator]"},t.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){while(e.length){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},t.values=$,k.prototype={constructor:k,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(j),!t)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0],e=t.completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var r=this;function o(n,o){return s.type="throw",s.arg=t,r.next=n,o&&(r.method="next",r.arg=e),!!o}for(var i=this.tryEntries.length-1;i>=0;--i){var a=this.tryEntries[i],s=a.completion;if("root"===a.tryLoc)return o("end");if(a.tryLoc<=this.prev){var c=n.call(a,"catchLoc"),u=n.call(a,"finallyLoc");if(c&&u){if(this.prev<a.catchLoc)return o(a.catchLoc,!0);if(this.prev<a.finallyLoc)return o(a.finallyLoc)}else if(c){if(this.prev<a.catchLoc)return o(a.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return o(a.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,m):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),m},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),j(r),m}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;j(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,r,n){return this.delegate={iterator:$(t),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=e),m}},t}(t.exports);try{regeneratorRuntime=n}catch(o){Function("r","regeneratorRuntime = r")(n)}},"9d23":function(t,e,r){"use strict";var n=r("6591"),o=r.n(n);o.a},a4d3:function(t,e,r){"use strict";var n=r("23e7"),o=r("da84"),i=r("d066"),a=r("c430"),s=r("83ab"),c=r("4930"),u=r("fdbf"),l=r("d039"),f=r("5135"),d=r("e8b5"),h=r("861d"),p=r("825a"),m=r("7b0b"),v=r("fc6a"),y=r("c04e"),g=r("5c6c"),b=r("7c73"),w=r("df75"),C=r("241c"),_=r("057f"),P=r("7418"),O=r("06cf"),x=r("9bf2"),S=r("d1e7"),E=r("9112"),j=r("6eeb"),k=r("5692"),$=r("f772"),L=r("d012"),D=r("90e3"),M=r("b622"),T=r("e538"),G=r("746f"),R=r("d44e"),I=r("69f3"),A=r("b727").forEach,F=$("hidden"),N="Symbol",B="prototype",J=M("toPrimitive"),Y=I.set,z=I.getterFor(N),W=Object[B],X=o.Symbol,Z=i("JSON","stringify"),q=O.f,H=x.f,K=_.f,Q=S.f,U=k("symbols"),V=k("op-symbols"),tt=k("string-to-symbol-registry"),et=k("symbol-to-string-registry"),rt=k("wks"),nt=o.QObject,ot=!nt||!nt[B]||!nt[B].findChild,it=s&&l((function(){return 7!=b(H({},"a",{get:function(){return H(this,"a",{value:7}).a}})).a}))?function(t,e,r){var n=q(W,e);n&&delete W[e],H(t,e,r),n&&t!==W&&H(W,e,n)}:H,at=function(t,e){var r=U[t]=b(X[B]);return Y(r,{type:N,tag:t,description:e}),s||(r.description=e),r},st=u?function(t){return"symbol"==typeof t}:function(t){return Object(t)instanceof X},ct=function(t,e,r){t===W&&ct(V,e,r),p(t);var n=y(e,!0);return p(r),f(U,n)?(r.enumerable?(f(t,F)&&t[F][n]&&(t[F][n]=!1),r=b(r,{enumerable:g(0,!1)})):(f(t,F)||H(t,F,g(1,{})),t[F][n]=!0),it(t,n,r)):H(t,n,r)},ut=function(t,e){p(t);var r=v(e),n=w(r).concat(pt(r));return A(n,(function(e){s&&!ft.call(r,e)||ct(t,e,r[e])})),t},lt=function(t,e){return void 0===e?b(t):ut(b(t),e)},ft=function(t){var e=y(t,!0),r=Q.call(this,e);return!(this===W&&f(U,e)&&!f(V,e))&&(!(r||!f(this,e)||!f(U,e)||f(this,F)&&this[F][e])||r)},dt=function(t,e){var r=v(t),n=y(e,!0);if(r!==W||!f(U,n)||f(V,n)){var o=q(r,n);return!o||!f(U,n)||f(r,F)&&r[F][n]||(o.enumerable=!0),o}},ht=function(t){var e=K(v(t)),r=[];return A(e,(function(t){f(U,t)||f(L,t)||r.push(t)})),r},pt=function(t){var e=t===W,r=K(e?V:v(t)),n=[];return A(r,(function(t){!f(U,t)||e&&!f(W,t)||n.push(U[t])})),n};if(c||(X=function(){if(this instanceof X)throw TypeError("Symbol is not a constructor");var t=arguments.length&&void 0!==arguments[0]?String(arguments[0]):void 0,e=D(t),r=function(t){this===W&&r.call(V,t),f(this,F)&&f(this[F],e)&&(this[F][e]=!1),it(this,e,g(1,t))};return s&&ot&&it(W,e,{configurable:!0,set:r}),at(e,t)},j(X[B],"toString",(function(){return z(this).tag})),j(X,"withoutSetter",(function(t){return at(D(t),t)})),S.f=ft,x.f=ct,O.f=dt,C.f=_.f=ht,P.f=pt,T.f=function(t){return at(M(t),t)},s&&(H(X[B],"description",{configurable:!0,get:function(){return z(this).description}}),a||j(W,"propertyIsEnumerable",ft,{unsafe:!0}))),n({global:!0,wrap:!0,forced:!c,sham:!c},{Symbol:X}),A(w(rt),(function(t){G(t)})),n({target:N,stat:!0,forced:!c},{for:function(t){var e=String(t);if(f(tt,e))return tt[e];var r=X(e);return tt[e]=r,et[r]=e,r},keyFor:function(t){if(!st(t))throw TypeError(t+" is not a symbol");if(f(et,t))return et[t]},useSetter:function(){ot=!0},useSimple:function(){ot=!1}}),n({target:"Object",stat:!0,forced:!c,sham:!s},{create:lt,defineProperty:ct,defineProperties:ut,getOwnPropertyDescriptor:dt}),n({target:"Object",stat:!0,forced:!c},{getOwnPropertyNames:ht,getOwnPropertySymbols:pt}),n({target:"Object",stat:!0,forced:l((function(){P.f(1)}))},{getOwnPropertySymbols:function(t){return P.f(m(t))}}),Z){var mt=!c||l((function(){var t=X();return"[null]"!=Z([t])||"{}"!=Z({a:t})||"{}"!=Z(Object(t))}));n({target:"JSON",stat:!0,forced:mt},{stringify:function(t,e,r){var n,o=[t],i=1;while(arguments.length>i)o.push(arguments[i++]);if(n=e,(h(e)||void 0!==t)&&!st(t))return d(e)||(e=function(t,e){if("function"==typeof n&&(e=n.call(this,t,e)),!st(e))return e}),o[1]=e,Z.apply(null,o)}})}X[B][J]||E(X[B],J,X[B].valueOf),R(X,N),L[F]=!0},a630:function(t,e,r){var n=r("23e7"),o=r("4df4"),i=r("1c7e"),a=!i((function(t){Array.from(t)}));n({target:"Array",stat:!0,forced:a},{from:o})},a640:function(t,e,r){"use strict";var n=r("d039");t.exports=function(t,e){var r=[][t];return!!r&&n((function(){r.call(null,e||function(){throw 1},1)}))}},ac7b:function(t,e,r){},ad6d:function(t,e,r){"use strict";var n=r("825a");t.exports=function(){var t=n(this),e="";return t.global&&(e+="g"),t.ignoreCase&&(e+="i"),t.multiline&&(e+="m"),t.dotAll&&(e+="s"),t.unicode&&(e+="u"),t.sticky&&(e+="y"),e}},b64b:function(t,e,r){var n=r("23e7"),o=r("7b0b"),i=r("df75"),a=r("d039"),s=a((function(){i(1)}));n({target:"Object",stat:!0,forced:s},{keys:function(t){return i(o(t))}})},b733:function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return t.isThereRoom&&!t.configurationGame.isFinished?r("div",{staticClass:"container my-5"},[r("button",{staticClass:"btn btn-primary timer",on:{click:t.stopPlayTimer}},[r("timer",{attrs:{running:t.running,restart:t.restart,currentDate:t.currentDate},on:{"update:running":function(e){t.running=e},"update:restart":function(e){t.restart=e},"update:currentDate":function(e){t.currentDate=e},"update:current-date":function(e){t.currentDate=e},timeChange:t.onTimeChange}})],1),r("button",{staticClass:"ml-2 btn btn-primary magic-link",on:{click:t.copy}},[t._v("Copiar link")]),r("input",{ref:"magicLink",attrs:{type:"hidden"},domProps:{value:t.$store.state.pennyModule.magigLink}}),r("h1",{staticClass:"text-center"},[t._v("Ronda "+t._s(t.configurationGame.actualRoundIndex+1))]),r("p",[t._v(" Deben mover lotes de "+t._s(t.configurationGame.rounds[t.configurationGame.actualRoundIndex].sizeLot)+" "+t._s(t.configurationGame.rounds[t.configurationGame.actualRoundIndex].sizeLot>1?"monedas":"moneda")+" hasta haber movido todas las monedas de su lugar ")]),r("div",{staticClass:"row no-gutters"},t._l(t.configurationGame.players,(function(e,n){return r("div",{key:n,staticClass:"col-12 col-sm"},[r("player-zone",{attrs:{id:n,start:0===n,end:n===t.configurationGame.players.length-1,player:e,previousPlayer:0!==n?t.configurationGame.players[n-1]:null,totalCoins:t.configurationGame.coins,roundCoins:t.configurationGame.rounds[t.configurationGame.actualRoundIndex].sizeLot,distribution:t.distribution},on:{"update:player":function(t){e=t},playerMoveCoins:t.onPlayerMoveCoins,firstSelectionDone:t.onFirstSelectionDone}})],1)})),0),t.showModal&&!t.currentPlayer?r("div",[r("transition",{attrs:{name:"modal"}},[r("form-player",{attrs:{showModal:t.showModal},on:{"update:showModal":function(e){t.showModal=e},"update:show-modal":function(e){t.showModal=e}}})],1)],1):t._e()]):r("div",[r("button",{staticClass:"btn btn-primary",on:{click:t.viewResults}},[t._v("Ver resultados")])])},o=[];r("a4d3"),r("4de4"),r("4160"),r("e439"),r("dbb4"),r("b64b"),r("159b");function i(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function a(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function s(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?a(Object(r),!0).forEach((function(e){i(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var c=r("2f62"),u=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"card h-100"},[r("div",{staticClass:"card-header"},[r("strong",[t._v(t._s(t.player.name))]),t._v(" - Jugador #"+t._s(t.id+1)+" ")]),r("div",{staticClass:"card-body"},[t.canPlay?r("div",t._l(t.distribution.rows,(function(e){return r("div",{key:e},t._l(t.distribution.cols,(function(n){return r("coin",{key:n,ref:"coin"+e+n,refInFor:!0,class:{"ml-2":1!==n},attrs:{info:{col:n,row:e,player:t.player},received:t.receivedFromPreviousPlayer(e,n),moved:t.isMoved(e,n),canBePressed:t.canPressMoreCoins},on:{selection:function(r){return t.onCoinSelection(e,n)},deselection:function(r){return t.onCoinDeselection(e,n)}}})})),1)})),0):r("div",[t._m(0)]),r("div",{staticClass:"mt-3"},[t.canPlay&&!t.canPressMoreCoins&&t.player.id===t.$store.state.pennyModule.currentPlayer?r("button",{staticClass:"btn btn-primary",attrs:{type:"primary"},on:{click:t.moveCoins}},[t._v("Mover lote")]):t._e()])])])},l=[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"text-center mt-5"},[r("div",{staticClass:"spinner-border text-warning",attrs:{role:"status"}}),r("p",[t._v(" Esperando monedas... ")])])}];r("99af"),r("45fc");function f(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function d(t){if(Array.isArray(t))return f(t)}r("e01a"),r("d28b"),r("a630"),r("d3b7"),r("3ca3"),r("ddb0");function h(t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}r("fb6a"),r("b0c0"),r("25f0");function p(t,e){if(t){if("string"===typeof t)return f(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?f(t,e):void 0}}function m(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function v(t){return d(t)||h(t)||p(t)||m()}r("96cf");function y(t,e,r,n,o,i,a){try{var s=t[i](a),c=s.value}catch(u){return void r(u)}s.done?e(c):Promise.resolve(c).then(n,o)}function g(t){return function(){var e=this,r=arguments;return new Promise((function(n,o){var i=t.apply(e,r);function a(t){y(i,n,o,a,s,"next",t)}function s(t){y(i,n,o,a,s,"throw",t)}a(void 0)}))}}var b=function(){var t=this,e=t.$createElement,r=t._self._c||e;return!t.moved&&t.received?r("div",{staticClass:"rounded-circle bg-warning coin border",class:{pressed:t.isPressed,moved:t.moved,"click-disabled":!t.isCurrentPlayer||!t.running},on:{click:t.press}}):t._e()},w=[],C={name:"Coin",props:["received","canBePressed","moved","info"],data:function(){return{isPressed:!1}},computed:s(s({},Object(c["b"])({running:"getTimerRunning"})),{},{isCurrentPlayer:function(){return this.info.player.id===this.$store.state.pennyModule.currentPlayer}}),methods:{press:function(){var t=this;if(this.isPressed)return this.$emit("deselection"),void(this.isPressed=!1);(this.canBePressed||this.info.player.selectedCoins.some((function(e){return e.row===t.info.row&&e.col===t.info.col})))&&(this.$emit("selection"),this.isPressed=!0)}},watch:{"$store.state.pennyModule.moveCoin":{handler:function(){var t=this.$store.state.pennyModule.moveCoin;t.row===this.info.row&&t.col===this.info.col&&t.playerId===this.info.player.id&&this.press()}}}},_=C,P=(r("ff62"),r("2877")),O=Object(P["a"])(_,b,w,!1,null,"1943476d",null),x=O.exports,S={name:"PlayerZone",components:{Coin:x},props:["id","start","end","distribution","player","previousPlayer","totalCoins","roundCoins"],data:function(){return{movedCoins:[],firstSelectionDone:!1}},computed:{canPressMoreCoins:function(){return this.player.selectedCoins.length<this.roundCoins},canPlay:function(){var t=this.start&&this.player.movedCoins.length<this.totalCoins,e=null!==this.previousPlayer&&this.previousPlayer.movedCoins.length&&this.player.movedCoins.length<this.totalCoins;return t||e}},methods:{onCoinSelection:function(t,e){this.player.selectedCoins.length||this.firstSelectionDone||(this.firstSelectionDone=!0,this.$emit("firstSelectionDone"));var r=this.player.selectedCoins.some((function(r){return r.row===t&&r.col===e}));r||this.$store.dispatch("socket_move_coin",{coordinateX:t,coordinateY:e,type:"select"})},onCoinDeselection:function(t,e){var r=this.player.selectedCoins.some((function(r){return r.row===t&&r.col===e}));r&&this.$store.dispatch("socket_move_coin",{coordinateX:t,coordinateY:e,type:"deselect"})},isMoved:function(t,e){return this.player.movedCoins.some((function(r){return r.row===t&&r.col===e}))},moveCoins:function(){var t=this;return g(regeneratorRuntime.mark((function e(){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$store.dispatch("socket_move_coins");case 2:r=[].concat(v(t.player.selectedCoins),v(t.player.movedCoins)),t.$emit("playerMoveCoins",{playerIndex:t.id,movedCoins:r}),r.length===t.totalCoins&&(t.firstSelectionDone=!1);case 5:case"end":return e.stop()}}),e)})))()},receivedFromPreviousPlayer:function(t,e){return null===this.previousPlayer||this.previousPlayer.movedCoins.some((function(r){return r.row===t&&r.col===e}))}}},E=S,j=(r("9d23"),Object(P["a"])(E,u,l,!1,null,"68ee6462",null)),k=j.exports,$=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[t.running||!t.running&&!t.currentDate?r("p",{staticClass:"mb-0"},[t._v(t._s(t._f("formatTime")(t.hours))+":"+t._s(t._f("formatTime")(t.minutes))+":"+t._s(t._f("formatTime")(t.seconds)))]):0!==t.currentDate?r("p",{staticClass:"mb-0"},[t._v("Pausado")]):t._e()])},L=[],D={name:"Timer",props:["running","restart","currentDate"],computed:{hours:function(){return Math.floor(this.currentDate/36e5%24)},minutes:function(){return Math.floor(this.currentDate/6e4%60)},seconds:function(){return Math.floor(this.currentDate/1e3%60)}},watch:{restart:function(){this.$emit("update:currentDate",0)}},filters:{formatTime:function(t){return t<10?"0"+t:t}},mounted:function(){var t=this;setInterval((function(){t.running&&(t.$emit("update:currentDate",t.currentDate+1e3),t.$emit("timeChange",{millis:t.currentDate,seconds:t.seconds,minutes:t.minutes,hours:t.hours}))}),1e3)}},M=D,T=Object(P["a"])(M,$,L,!1,null,"5f764bc2",null),G=T.exports,R=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"modal-mask"},[r("div",{staticClass:"modal-wrapper"},[r("div",{staticClass:"modal-dialog"},[r("div",{staticClass:"modal-content"},[r("div",{staticClass:"modal-header"},[r("h2",{staticClass:"modal-title"},[t._v("Ingresar")]),r("button",{staticClass:"close",attrs:{type:"button","aria-label":"close"},on:{click:t.close}},[r("span",{attrs:{"aria-hidden":"true"}},[t._v("×")])])]),r("div",{staticClass:"modal-body"},[r("p",[t._v("Identifíquese para participar en el juego")]),r("div",{staticClass:"form-group"},[r("label",{attrs:{for:"namePlayer"}},[t._v("Nombre")]),r("input",{directives:[{name:"model",rawName:"v-model",value:t.name,expression:"name"}],staticClass:"form-control",attrs:{id:"namePlayer",type:"text",placeholder:"Introduce tu nombre"},domProps:{value:t.name},on:{input:function(e){e.target.composing||(t.name=e.target.value)}}})])]),r("div",{staticClass:"modal-footer"},[r("button",{staticClass:"btn btn-secondary",attrs:{type:"button"},on:{click:t.close}},[t._v("Cancelar")]),r("button",{staticClass:"btn btn-primary",attrs:{type:"button"},on:{click:t.joinGame}},[t._v("Entrar")])])])])])])},I=[],A={props:{showModal:{type:Boolean,default:!0}},data:function(){return{name:null}},methods:{joinGame:function(){this.$store.dispatch("socket_join_room",{name:this.name,roomId:this.$route.params.id}),this.$emit("update:showModal",!1)},close:function(){this.$emit("update:showModal",!1)}}},F=A,N=(r("7085"),Object(P["a"])(F,R,I,!1,null,null,null)),B=N.exports,J={name:"Board",data:function(){return{currentDate:0,distribution:{rows:5,cols:4},actualTime:null,showModal:!0,currentPlayer:this.$store.getters["getCurrentPlayer"]}},computed:s(s({},Object(c["b"])({isThereRoom:"isThereRoom",configurationGame:"getGame",running:"getTimerRunning",restart:"getTimerRestart"})),{},{isLastRound:function(){return this.configurationGame.actualRoundIndex===this.configurationGame.rounds.length-1}}),methods:{copy:function(){var t=this.$refs.magicLink;t.setAttribute("type","text"),t.select(),document.execCommand("copy"),t.setAttribute("type","hidden"),this.$store.commit("SOCKET_SHOW_NOTIFY",{notify:{show:!0,title:"Enlace copiado",message:"El enlace se ha copiado con éxito"}})},onPlayerMoveCoins:function(t){var e=t.movedCoins,r=t.playerIndex;e.length===this.configurationGame.coins&&this.$store.dispatch("socket_save_result",{time:this.actualTime,type:"finish"}),r===this.configurationGame.players.length-1&&e.length===this.configurationGame.coins&&this.isLastRound&&this.$store.dispatch("socket_end_game")},viewResults:function(){this.$router.push({name:"result",params:{id:this.$store.getters["getRoomId"]}})},onTimeChange:function(t){this.actualTime=t},onFirstSelectionDone:function(){this.$store.dispatch("socket_save_result",{time:this.actualTime,type:"init"})},stopPlayTimer:function(){this.$store.dispatch("socket_start_counter"),0==this.currentDate&&this.$store.dispatch("socket_init_round")}},components:{PlayerZone:k,Timer:G,FormPlayer:B},beforeCreate:function(){this.$store.dispatch("get_room_by_id",this.$route.params.id)}},Y=J,z=(r("fb73"),Object(P["a"])(Y,n,o,!1,null,"1cc22f2c",null));e["default"]=z.exports},d1e9:function(t,e,r){},d28b:function(t,e,r){var n=r("746f");n("iterator")},dbb4:function(t,e,r){var n=r("23e7"),o=r("83ab"),i=r("56ef"),a=r("fc6a"),s=r("06cf"),c=r("8418");n({target:"Object",stat:!0,sham:!o},{getOwnPropertyDescriptors:function(t){var e,r,n=a(t),o=s.f,u=i(n),l={},f=0;while(u.length>f)r=o(n,e=u[f++]),void 0!==r&&c(l,e,r);return l}})},e01a:function(t,e,r){"use strict";var n=r("23e7"),o=r("83ab"),i=r("da84"),a=r("5135"),s=r("861d"),c=r("9bf2").f,u=r("e893"),l=i.Symbol;if(o&&"function"==typeof l&&(!("description"in l.prototype)||void 0!==l().description)){var f={},d=function(){var t=arguments.length<1||void 0===arguments[0]?void 0:String(arguments[0]),e=this instanceof d?new l(t):void 0===t?l():l(t);return""===t&&(f[e]=!0),e};u(d,l);var h=d.prototype=l.prototype;h.constructor=d;var p=h.toString,m="Symbol(test)"==String(l("test")),v=/^Symbol\((.*)\)[^)]+$/;c(h,"description",{configurable:!0,get:function(){var t=s(this)?this.valueOf():this,e=p.call(t);if(a(f,t))return"";var r=m?e.slice(7,-1):e.replace(v,"$1");return""===r?void 0:r}}),n({global:!0,forced:!0},{Symbol:d})}},e439:function(t,e,r){var n=r("23e7"),o=r("d039"),i=r("fc6a"),a=r("06cf").f,s=r("83ab"),c=o((function(){a(1)})),u=!s||c;n({target:"Object",stat:!0,forced:u,sham:!s},{getOwnPropertyDescriptor:function(t,e){return a(i(t),e)}})},e538:function(t,e,r){var n=r("b622");e.f=n},fb6a:function(t,e,r){"use strict";var n=r("23e7"),o=r("861d"),i=r("e8b5"),a=r("23cb"),s=r("50c4"),c=r("fc6a"),u=r("8418"),l=r("b622"),f=r("1dde"),d=r("ae40"),h=f("slice"),p=d("slice",{ACCESSORS:!0,0:0,1:2}),m=l("species"),v=[].slice,y=Math.max;n({target:"Array",proto:!0,forced:!h||!p},{slice:function(t,e){var r,n,l,f=c(this),d=s(f.length),h=a(t,d),p=a(void 0===e?d:e,d);if(i(f)&&(r=f.constructor,"function"!=typeof r||r!==Array&&!i(r.prototype)?o(r)&&(r=r[m],null===r&&(r=void 0)):r=void 0,r===Array||void 0===r))return v.call(f,h,p);for(n=new(void 0===r?Array:r)(y(p-h,0)),l=0;h<p;h++,l++)h in f&&u(n,l,f[h]);return n.length=l,n}})},fb73:function(t,e,r){"use strict";var n=r("082b"),o=r.n(n);o.a},ff62:function(t,e,r){"use strict";var n=r("d1e9"),o=r.n(n);o.a}}]);
//# sourceMappingURL=chunk-7731c92c.de395aad.js.map