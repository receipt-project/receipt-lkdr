(function(e){function t(t){for(var n,i,s=t[0],u=t[1],c=t[2],p=0,h=[];p<s.length;p++)i=s[p],Object.prototype.hasOwnProperty.call(a,i)&&a[i]&&h.push(a[i][0]),a[i]=0;for(n in u)Object.prototype.hasOwnProperty.call(u,n)&&(e[n]=u[n]);l&&l(t);while(h.length)h.shift()();return o.push.apply(o,c||[]),r()}function r(){for(var e,t=0;t<o.length;t++){for(var r=o[t],n=!0,s=1;s<r.length;s++){var u=r[s];0!==a[u]&&(n=!1)}n&&(o.splice(t--,1),e=i(i.s=r[0]))}return e}var n={},a={app:0},o=[];function i(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,i),r.l=!0,r.exports}i.m=e,i.c=n,i.d=function(e,t,r){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(i.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)i.d(r,n,function(t){return e[t]}.bind(null,n));return r},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],u=s.push.bind(s);s.push=t,s=s.slice();for(var c=0;c<s.length;c++)t(s[c]);var l=u;o.push([0,"chunk-vendors"]),r()})({0:function(e,t,r){e.exports=r("cd49")},"190e":function(e,t,r){},"5c0b":function(e,t,r){"use strict";r("9c0c")},6074:function(e,t,r){"use strict";r("190e")},"70cb":function(e,t,r){"use strict";r.r(t);var n=r("5a0c"),a=r.n(n),o=r("7e21"),i=r.n(o),s=r("2a04"),u=r.n(s),c=r("1ac8"),l=r.n(c);a.a.extend(i.a),a.a.extend(u.a),a.a.extend(l.a)},7573:function(e,t,r){"use strict";r.r(t);var n=r("2b0e"),a=r("1321"),o=r.n(a);n["a"].use(o.a),n["a"].component("apexchart",o.a)},"9c0c":function(e,t,r){},bdeb:function(e,t,r){"use strict";r.r(t);var n=r("2b0e"),a=r("6b6d");n["a"].use(a["default"])},cd49:function(e,t,r){"use strict";r.r(t);r("e260"),r("e6cf"),r("cca6"),r("a79d");var n=r("2b0e"),a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-app",[r("v-app-bar",{attrs:{app:"",color:"primary",dark:""}},[r("div",{staticClass:"d-flex align-center"},[r("v-img",{staticClass:"shrink mr-2",attrs:{alt:"Vuetify Logo",contain:"",src:"https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png",transition:"scale-transition",width:"40"}}),r("v-toolbar-title",{staticClass:"mx-2"},[e._v("LKDR")])],1),r("v-btn",{attrs:{href:"/",text:""}},[r("span",[e._v("Home")])]),r("v-btn",{attrs:{href:"/#/legal",text:""}},[r("span",[e._v("Legal")])]),r("v-spacer"),r("v-btn",{attrs:{href:"https://github.com/receipt-project/receipt-lkdr",target:"_blank",text:""}},[r("v-icon",{staticClass:"mr-2"},[e._v("mdi-github")]),r("span",[e._v("GitHub")])],1)],1),r("v-main",[r("router-view")],1)],1)},o=[],i=r("d4ec"),s=r("262e"),u=r("2caf"),c=r("9ab4"),l=r("1b40"),p=r("b85c"),h=r("1da1"),f=r("bee2"),d=(r("96cf"),r("bc3a")),v=r.n(d),b=function e(t){Object(i["a"])(this,e),this.refreshToken=t.refreshToken,this.refreshTokenExpiresIn=t.refreshTokenExpiresIn||null,this.token=t.token||null,this.tokenExpireIn=t.tokenExpireIn||null},g=function(){function e(){Object(i["a"])(this,e)}return Object(f["a"])(e,[{key:"phone",get:function(){return localStorage.getItem("lkdr.phone")},set:function(t){e.setValueOrClear(t,"lkdr.phone")}},{key:"token",get:function(){return localStorage.getItem("lkdr.token")},set:function(t){e.setValueOrClear(t,"lkdr.token")}},{key:"refreshToken",get:function(){return localStorage.getItem("lkdr.refreshToken")},set:function(t){e.setValueOrClear(t,"lkdr.refreshToken")}}],[{key:"setValueOrClear",value:function(e,t){e?localStorage.setItem(t,e):localStorage.removeItem(t)}}]),e}(),k=new g,m=k,y=function e(){var t=this;Object(i["a"])(this,e),this.webclient=v.a.create({baseURL:"https://lkdr.nalog.ru/api/v1"}),this.auth={challenge:{sms:{start:function(){var e=Object(h["a"])(regeneratorRuntime.mark((function e(r){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.webclient.post("/auth/challenge/sms/start",r);case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)})));function r(t){return e.apply(this,arguments)}return r}(),verify:function(){var e=Object(h["a"])(regeneratorRuntime.mark((function e(r){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.webclient.post("/auth/challenge/sms/verify",r);case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)})));function r(t){return e.apply(this,arguments)}return r}()}},token:function(){var e=Object(h["a"])(regeneratorRuntime.mark((function e(r){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.webclient.post("/auth/token",r);case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)})));function r(t){return e.apply(this,arguments)}return r}()}},w={sourceDeviceId:"vpiiiB_crOBisv4cKpxyW",sourceType:"WEB",appVersion:"1.0.0",metaDetails:{userAgent:"Mozilla/5.0 AppleWebKit Chrome"}},O=function(){function e(t){var r=this;Object(i["a"])(this,e),this.user={profile:function(){var e=Object(h["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,r.webclient.get("/user/profile");case 2:return t=e.sent,e.abrupt("return",t.data);case 4:case"end":return e.stop()}}),e)})));function t(){return e.apply(this,arguments)}return t}()},this.token=t,this.webclient=v.a.create({baseURL:"https://lkdr.nalog.ru/api/v1",headers:{Authorization:"Bearer "+this.token}})}return Object(f["a"])(e,[{key:"receipt",value:function(){var e=Object(h["a"])(regeneratorRuntime.mark((function e(t){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.webclient.post("/receipt",t);case 2:return r=e.sent,e.abrupt("return",r.data);case 4:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"scan",value:function(){var e=Object(h["a"])(regeneratorRuntime.mark((function e(t){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.webclient.post("/scan",t);case 2:return r=e.sent,e.abrupt("return",r.data);case 4:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}()}]),e}(),x=function(){function e(){Object(i["a"])(this,e),this.token=m.token,this.refreshToken=m.refreshToken,this.authorized=!!this.token&&!!this.refreshToken,this.authInProgress=!1,this.onAuthStateChangedCallbacks=[],this.lkdrUnauthorizedApiClient=new y}return Object(f["a"])(e,[{key:"lkdrAuthorizedApiClient",get:function(){if(!this.token)throw"Not authorized: No token present: Use auth method.";return new O(this.token)}},{key:"auth",value:function(){var e=Object(h["a"])(regeneratorRuntime.mark((function e(){var t,r,n,a,o,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t=m.phone||prompt("Your number (79XXXXXXXXX)","")||"",t){e.next=3;break}return e.abrupt("return");case 3:return m.phone=t,e.next=6,this.lkdrUnauthorizedApiClient.auth.challenge.sms.start({phone:t});case 6:if(r=e.sent,n=r.challengeToken,a=prompt("SMS Code"),a){e.next=11;break}return e.abrupt("return");case 11:return e.prev=11,e.next=14,this.lkdrUnauthorizedApiClient.auth.challenge.sms.verify({challengeToken:n,phone:t,code:a,deviceInfo:w});case 14:return o=e.sent,console.log(JSON.stringify(o)),i=new b(o),this.token=i.token,m.token=i.token,this.refreshToken=i.refreshToken,m.refreshToken=i.refreshToken,this.authorized=!0,e.next=24,this.notifyAuthStateChanged();case 24:e.next=30;break;case 26:e.prev=26,e.t0=e["catch"](11),console.error(e.t0),alert("Could not auth");case 30:case"end":return e.stop()}}),e,this,[[11,26]])})));function t(){return e.apply(this,arguments)}return t}()},{key:"init",value:function(){var e=Object(h["a"])(regeneratorRuntime.mark((function e(){var t,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t=m.refreshToken,null==t){e.next=7;break}return e.next=4,this.lkdrUnauthorizedApiClient.auth.token({refreshToken:t,deviceInfo:w});case 4:return r=e.sent,m.token=r.token,e.abrupt("return");case 7:if(this.authInProgress=!0,this.authorized){e.next=13;break}return e.next=11,this.auth();case 11:e.next=13;break;case 13:this.authInProgress=!1;case 14:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"getAuth",value:function(){var e=Object(h["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(this.authorized){e.next=4;break}return e.abrupt("return",null);case 4:return e.t0=this.token,e.t1=m.phone,e.next=8,this.getTaxpayerPerson();case 8:return e.t2=e.sent,e.abrupt("return",{token:e.t0,phone:e.t1,taxpayerPerson:e.t2});case 10:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"getTaxpayerPerson",value:function(){var e=Object(h["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.lkdrAuthorizedApiClient.user.profile();case 2:return t=e.sent,e.abrupt("return",t.user.taxpayerPerson);case 4:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"logout",value:function(){var e=Object(h["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return this.token=null,m.token=null,this.refreshToken=null,m.refreshToken=null,m.phone=null,e.next=7,this.notifyAuthStateChanged();case 7:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"onAuthStateChanged",value:function(e){this.onAuthStateChangedCallbacks.push(e)}},{key:"notifyAuthStateChanged",value:function(){var e=Object(h["a"])(regeneratorRuntime.mark((function e(){var t,r,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:t=Object(p["a"])(this.onAuthStateChangedCallbacks),e.prev=1,t.s();case 3:if((r=t.n()).done){e.next=18;break}return n=r.value,e.prev=5,e.t0=n,e.next=9,this.getAuth();case 9:e.t1=e.sent,(0,e.t0)(e.t1),e.next=16;break;case 13:e.prev=13,e.t2=e["catch"](5),console.error(e.t2);case 16:e.next=3;break;case 18:e.next=23;break;case 20:e.prev=20,e.t3=e["catch"](1),t.e(e.t3);case 23:return e.prev=23,t.f(),e.finish(23);case 26:case"end":return e.stop()}}),e,this,[[1,20,23,26],[5,13]])})));function t(){return e.apply(this,arguments)}return t}()},{key:"getAxios",value:function(){if(!this.token)throw"Not authorized: No token present: Use init method.";return v.a.create({baseURL:"https://lkdr.nalog.ru/",headers:{Authorization:"Bearer "+this.token}})}}],[{key:"create",value:function(){return new e}}]),e}(),j=new x,_=j,R=function(e){Object(s["a"])(r,e);var t=Object(u["a"])(r);function r(){return Object(i["a"])(this,r),t.apply(this,arguments)}return r}(l["c"]);R=Object(c["a"])([Object(l["a"])({mounted:function(){_.init()}})],R);var T=R,C=T,S=(r("5c0b"),r("2877")),A=r("6544"),V=r.n(A),I=r("7496"),F=r("40dc"),D=r("8336"),L=r("132d"),E=r("adda"),z=r("f6c4"),B=r("2fa4"),P=r("2a7f"),M=Object(S["a"])(C,a,o,!1,null,null,null),U=M.exports;V()(M,{VApp:I["a"],VAppBar:F["a"],VBtn:D["a"],VIcon:L["a"],VImg:E["a"],VMain:z["a"],VSpacer:B["a"],VToolbarTitle:P["a"]});var X=r("9483");Object(X["a"])("".concat("/","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}});var N=r("8c4f"),$=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[e.person?r("span",[e._v(e._s(this.person.phone))]):e._e(),r("button",{on:{click:e.login}},[e._v("Login")]),r("button",{on:{click:e.logout}},[e._v("Logout")])])},H=[],J=function(e){Object(s["a"])(r,e);var t=Object(u["a"])(r);function r(){var e;return Object(i["a"])(this,r),e=t.apply(this,arguments),e.person=null,e}return Object(f["a"])(r,[{key:"login",value:function(){_.auth()}},{key:"logout",value:function(){_.logout()}}]),r}(l["c"]);J=Object(c["a"])([Object(l["a"])({mounted:function(){var e=this;_.onAuthStateChanged((function(t){return e.person=t.taxpayerPerson}))}})],J);var K=J,W=K,q=Object(S["a"])(W,$,H,!1,null,null,null),G=q.exports,Y=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-container",[r("v-row",[r("v-spacer"),r("v-col",[r("DatesSelector",{staticClass:"my-2",on:{changed:function(t){e.dayTo=t.dayTo,e.dayFrom=t.dayFrom}}})],1),r("v-spacer")],1),r("v-row",[r("v-col",[r("calendar-heatmap",{attrs:{values:e.heatMapData,"end-date":e.dayTo.toDate(),"tooltip-unit":"рублей"}})],1)],1),r("v-row",[r("v-col",[r("TreemapChart",{attrs:{brands:e.brands,"receipt-list":e.receiptListRanged}})],1)],1),r("v-row",[r("v-col",[r("v-simple-table",{scopedSlots:e._u([{key:"default",fn:function(){return[r("tbody",e._l(e.receiptListRanged,(function(t){return r("tr",{key:t.key},[r("td",[r("v-avatar",{attrs:{tile:""}},[r("img",{attrs:{src:e.getBrandImageForReceipt(t)}})])],1),r("td",[e._v(e._s(e.getBrandForReceipt(t)||t.kktOwner))]),r("td",[e._v(e._s(t.totalSum))]),r("td",[e._v(e._s(t.createdDate))])])})),0)]},proxy:!0}])})],1)],1)],1)},Q=[],Z=(r("4de4"),r("7db0"),r("b0c0"),r("d81d"),r("4e82"),function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("apexchart",{attrs:{type:"treemap",options:{chart:{height:500}},series:e.treemapData}})],1)}),ee=[],te=r("3835"),re=(r("159b"),r("4fad"),function(e){Object(s["a"])(r,e);var t=Object(u["a"])(r);function r(){var e;return Object(i["a"])(this,r),e=t.apply(this,arguments),e.receiptList=[],e.brands=[],e}return Object(f["a"])(r,[{key:"getBrandForReceipt",value:function(e){var t;return(null===(t=this.brands.find((function(t){return t.id==e.brandId})))||void 0===t?void 0:t.name)||null}},{key:"treemapData",get:function(){var e=this;if(!this.receiptList)return[];var t={};this.receiptList.forEach((function(r){var n=e.getBrandForReceipt(r)||r.kktOwner;t[n]=(t[n]||0)+parseFloat(r.totalSum||"0.0")}));for(var r=[],n=0,a=Object.entries(t);n<a.length;n++){var o=Object(te["a"])(a[n],2),i=o[0],s=o[1];r.push({x:i,y:s})}return[{data:r}]}}]),r}(l["c"]));Object(c["a"])([Object(l["b"])()],re.prototype,"receiptList",void 0),Object(c["a"])([Object(l["b"])()],re.prototype,"brands",void 0),re=Object(c["a"])([Object(l["a"])({})],re);var ne=re,ae=ne,oe=Object(S["a"])(ae,Z,ee,!1,null,null,null),ie=oe.exports,se=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"row"},[r("DatePicker",{attrs:{range:""},model:{value:e.datesRange,callback:function(t){e.datesRange=t},expression:"datesRange"}})],1)},ue=[],ce=r("5a0c"),le=r.n(ce),pe=function(e){Object(s["a"])(r,e);var t=Object(u["a"])(r);function r(){var e;return Object(i["a"])(this,r),e=t.apply(this,arguments),e.datesRange=null,e.dayFrom=le()().year(le()().year()-1),e.dayTo=le()(),e}return Object(f["a"])(r,[{key:"emitDates",value:function(){this.$emit("changed",{dayFrom:this.dayFrom,dayTo:this.dayTo})}}]),r}(l["c"]);pe=Object(c["a"])([Object(l["a"])({watch:{datesRange:function(e){e&&(this.dayFrom=le()(e[0]),this.dayTo=le()(e[1]),this.emitDates())}}})],pe);var he=pe,fe=he,de=(r("6074"),Object(S["a"])(fe,se,ue,!1,null,"48243f35",null)),ve=de.exports,be=function(e){Object(s["a"])(r,e);var t=Object(u["a"])(r);function r(){var e;return Object(i["a"])(this,r),e=t.apply(this,arguments),e.receiptList=[],e.brands=[],e.dayFrom=le()().year(le()().year()-1),e.dayTo=le()(),e}return Object(f["a"])(r,[{key:"receiptListRanged",get:function(){var e=this;return this.receiptList.filter((function(t){var r=le()(t.createdDate);return(r.isBefore(e.dayTo)||r==e.dayTo)&&(r.isAfter(e.dayFrom)||r==e.dayFrom)}))}},{key:"getBrandForReceipt",value:function(e){var t;return(null===(t=this.brands.find((function(t){return t.id==e.brandId})))||void 0===t?void 0:t.name)||null}},{key:"getBrandImageForReceipt",value:function(e){var t,r=null===(t=this.brands.find((function(t){return t.id==e.brandId})))||void 0===t?void 0:t.image;return null==r?null:"data:image/png;base64, "+r}},{key:"heatMapData",get:function(){var e,t=this.receiptListRanged.map((function(e){return{weekday:e.createdDate.substring(0,10),sum:parseFloat(e.totalSum)}})),r={},n=Object(p["a"])(t);try{for(n.s();!(e=n.n()).done;){var a=e.value,o=a.weekday;r[o]||(r[o]=0),r[o]+=a.sum}}catch(u){n.e(u)}finally{n.f()}var i=[];for(var s in r)i.push({date:s,count:Math.floor(r[s])});return i}},{key:"loadStats",value:function(){var e=Object(h["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,_.lkdrAuthorizedApiClient.receipt({limit:1e3,offset:0,dateFrom:"2020-07-01T00:00:00",dateTo:null,orderBy:"RECEIVE_DATE:DESC",inn:null});case 2:t=e.sent,this.brands=t.brands,this.receiptList=t.receipts.sort((function(e,t){return-e.createdDate.localeCompare(t.createdDate)}));case 5:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()}]),r}(l["c"]);be=Object(c["a"])([Object(l["a"])({components:{DatesSelector:ve,TreemapChart:ie},mounted:function(){var e=this;_.init(),_.getAuth()&&this.loadStats(),_.onAuthStateChanged((function(t){t&&e.loadStats()}))}})],be);var ge=be,ke=ge,me=r("8212"),ye=r("62ad"),we=r("a523"),Oe=r("0fd9"),xe=r("1f4f"),je=Object(S["a"])(ke,Y,Q,!1,null,null,null),_e=je.exports;V()(je,{VAvatar:me["a"],VCol:ye["a"],VContainer:we["a"],VRow:Oe["a"],VSimpleTable:xe["a"],VSpacer:B["a"]});var Re=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-container",[r("v-row",[r("v-col",[r("p",{staticClass:"mt-5"},[e._v(" Данное приложение является альтернативным пользовательским интерфейсом для сервиса "),r("a",{attrs:{href:"https://lkdr.nalog.ru"}},[e._v("Мои чеки")])]),r("p",[e._v(" Все данные хранятся и обрабатываются только в Вашем браузере. ")]),r("p",[e._v(" Данное приложение не передает данные никуда, кроме ФНС ("),r("a",{attrs:{href:"https://lkdr.nalog.ru"}},[e._v("lkdr.nalog.ru")]),e._v("). ")])])],1),r("v-row",[r("v-col",[r("p",{staticClass:"mt-5"},[e._v(" This application is an alternative user interface for the service "),r("a",{attrs:{href:"https://lkdr.nalog.ru"}},[e._v(" My receipts ")])]),r("p",[e._v(" All data is stored and processed only inside your browser. ")]),r("p",[e._v(" This application does not transfer data anywhere except the Federal Tax Service ("),r("a",{attrs:{href:"https://lkdr.nalog.ru"}},[e._v(" lkdr.nalog.ru ")]),e._v("). ")])])],1)],1)},Te=[],Ce={},Se=Object(S["a"])(Ce,Re,Te,!1,null,null,null),Ae=Se.exports;V()(Se,{VCol:ye["a"],VContainer:we["a"],VRow:Oe["a"]}),n["a"].use(N["a"]);var Ve=[{path:"/",name:"Home",component:_e},{path:"/me",name:"Me",component:G},{path:"/legal",name:"Legal",component:Ae}],Ie=new N["a"]({routes:Ve}),Fe=Ie,De=r("2f62");n["a"].use(De["a"]);var Le=new De["a"].Store({state:{},mutations:{},actions:{},modules:{}}),Ee=r("f309");n["a"].use(Ee["a"]);var ze=new Ee["a"]({});r("7573"),r("70cb"),r("e734"),r("bdeb"),n["a"].config.productionTip=!1,new n["a"]({router:Fe,store:Le,vuetify:ze,render:function(e){return e(U)}}).$mount("#app")},e734:function(e,t,r){"use strict";r.r(t);var n=r("2b0e"),a=r("ec45");r("411c");n["a"].use(a["a"])}});
//# sourceMappingURL=app.129bb115.js.map