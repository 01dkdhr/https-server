webpackJsonp([3],{"2mV7":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=a("gNcp"),n={};r.keys().forEach(function(t){"./index.js"!==t&&(n[t.replace(/(\.\/|\.js)/g,"")]=r(t).default)}),e.default=n},NHnr:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=a("bOdI"),n={data:function(){return{curRouterName:"home"}},computed:{},methods:{},watch:a.n(r)()({},"$route",function(){this.curRouterName=this.$router.currentRoute.name})},s={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"navigator"}},[e("router-link",{class:{active:"home"==this.curRouterName},attrs:{to:"home",tag:"li"}},[this._v("\n    Home\n  ")]),this._v(" "),e("router-link",{class:{active:"stk-tick"==this.curRouterName},attrs:{to:"stk-tick",tag:"li"}},[this._v("\n    stk tick\n  ")])],1)},staticRenderFns:[]};var o={name:"App",components:{navigator:a("VU/8")(n,s,!1,function(t){a("UakP")},"data-v-8c7a908a",null).exports},data:function(){return{}}},i={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("navigator"),this._v(" "),e("keep-alive",[e("router-view")],1)],1)},staticRenderFns:[]};var p=a("VU/8")(o,i,!1,function(t){a("sIzz")},null,null).exports;Vue.use(VueRouter);var c=new VueRouter({mode:"history",scrollBehavior:function(t,e,a){return t.hash?{selector:t.hash}:{x:0,y:0}},routes:[{path:"/",redirect:"/home"},{path:"/home",name:"home",component:function(t){return a.e(1).then(function(){var e=[a("H6Vf")];t.apply(null,e)}.bind(this)).catch(a.oe)}},{path:"/stk-tick",name:"stk-tick",component:function(t){return a.e(0).then(function(){var e=[a("Zj/k")];t.apply(null,e)}.bind(this)).catch(a.oe)}}]});c.beforeEach(function(t,e,a){document.title="Dusky-"+t.name,a()});var u=c,d=a("2mV7");Vue.use(Vuex);var l=new Vuex.Store({modules:d.default,strict:!1});Vue.config.productionTip=!1,new Vue({el:"#app",router:u,store:l,components:{App:p},template:"<App/>"})},UakP:function(t,e){},gNcp:function(t,e,a){var r={"./home.js":"xQAn","./index.js":"2mV7","./stk_tick.js":"xFVd"};function n(t){return a(s(t))}function s(t){var e=r[t];if(!(e+1))throw new Error("Cannot find module '"+t+"'.");return e}n.keys=function(){return Object.keys(r)},n.resolve=s,t.exports=n,n.id="gNcp"},sIzz:function(t,e){},xFVd:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});for(var r=a("fZjL"),n=a.n(r),s=a("mvHQ"),o=a.n(s),i=a("M4fF"),p=a.n(i),c=[[" 09:1"," 09:2"," 09:3"],[" 09:4"],[" 09:5"],[" 10:0"],[" 10:1"],[" 10:2"],[" 10:3"],[" 10:4"],[" 10:5"],[" 11:0"],[" 11:1"],[" 11:2"," 11:30"],[" 13:0"],[" 13:1"],[" 13:2"],[" 13:3"],[" 13:4"],[" 13:5"],[" 14:0"],[" 14:1"],[" 14:2"],[" 14:3"],[" 14:4"],[" 14:5"," 15:0"]],u=0;u<c.length;++u)c[u]=encodeURIComponent(o()(c[u]));var d={date:"",ts_code:localStorage.ts_code||"",dataArr:[],time_filter:c[0]},l={updateState:function(t,e){n()(e).forEach(function(a){a in t&&(t[a]=e[a])})}},f={getDatas:function(t){var e=t.commit,a=t.state;a.ts_code&&a.date&&(localStorage.setItem("ts_code",a.ts_code),axios.get("/api/stock/stk-tick",{params:{ts_code:a.ts_code,date:a.date,time_filter:a.time_filter}}).then(function(t){if(t.data.result&&t.data.result.length){var r=t.data.result.split("\r\n"),n=p.a.cloneDeep(a.dataArr);r.forEach(function(t){if(t&&t.split){var e=null;n.length&&(e=n[n.length-1]);var a,r=t.split(",");n.push({time:r[2].split(" ")[1],price:parseFloat(r[3]).toFixed(2),count:r[4],sum:r[5],amount:r[6],direction:(a=parseFloat(r[3]).toFixed(2),e?a>e.price?1:a<e.price?-1:0:0),bp1:parseFloat(r[8]).toFixed(2),bp2:parseFloat(r[9]).toFixed(2),bp3:parseFloat(r[10]).toFixed(2),bp4:parseFloat(r[11]).toFixed(2),bp5:parseFloat(r[12]).toFixed(2),sp1:parseFloat(r[13]).toFixed(2),sp2:parseFloat(r[14]).toFixed(2),sp3:parseFloat(r[15]).toFixed(2),sp4:parseFloat(r[16]).toFixed(2),sp5:parseFloat(r[17]).toFixed(2),bq1:parseInt(r[18]),bq1Change:s("b",parseFloat(r[8]).toFixed(2),parseInt(r[18])),bq2:parseInt(r[19]),bq2Change:s("b",parseFloat(r[9]).toFixed(2),parseInt(r[19])),bq3:parseInt(r[20]),bq3Change:s("b",parseFloat(r[10]).toFixed(2),parseInt(r[20])),bq4:parseInt(r[21]),bq4Change:s("b",parseFloat(r[11]).toFixed(2),parseInt(r[21])),bq5:parseInt(r[22]),bq5Change:s("b",parseFloat(r[12]).toFixed(2),parseInt(r[22])),sq1:parseInt(r[23]),sq1Change:s("s",parseFloat(r[13]).toFixed(2),parseInt(r[23])),sq2:parseInt(r[24]),sq2Change:s("s",parseFloat(r[14]).toFixed(2),parseInt(r[24])),sq3:parseInt(r[25]),sq3Change:s("s",parseFloat(r[15]).toFixed(2),parseInt(r[25])),sq4:parseInt(r[26]),sq4Change:s("s",parseFloat(r[16]).toFixed(2),parseInt(r[26])),sq5:parseInt(r[27]),sq5Change:s("s",parseFloat(r[17]).toFixed(2),parseInt(r[27]))})}function s(t,a,r){if(!e)return 0;var n="b"==t?["bp1","bp2","bp3","bp4","bp5"]:["sp1","sp2","sp3","sp4","sp5"],s="b"==t?["bq1","bq2","bq3","bq4","bq5"]:["sq1","sq2","sq3","sq4","sq5"];if("b"==t&&a>e.bp1)return r;if("s"==t&&a<e.sp1)return r;for(var o=0;o<5;++o)if(e[n[o]]==a)return r-e[s[o]];return 0}}),e("updateState",{dataArr:n})}}).catch(function(t){console.log("getDatas err: "+t)}))},getTradeDate:function(t,e){var a=t.dispatch,r=t.commit,n=(t.state,e.date),s=e.type;axios.get("/api/stock/trade-date",{params:{date:n,type:s}}).then(function(t){r("updateState",{date:t.data.result,dataArr:[],time_filter:c[0]}),a("getDatas")}).catch(function(t){console.log("getTradeDate err: "+t)})},loadMore:function(t){var e=t.dispatch,a=t.state,r=c.indexOf(a.time_filter);r!=c.length-1&&(a.time_filter=c[r+1],e("getDatas"))},preTradeDay:function(t){var e=t.dispatch,a=t.state;a.date&&e("getTradeDate",{date:a.date,type:"pre"})},nextTradeDay:function(t){var e=t.dispatch,a=t.state;a.date&&e("getTradeDate",{date:a.date,type:"next"})},setTimeFilter:function(t,e){var a=t.commit,r=t.dispatch,n=e.index;a("updateState",{time_filter:c[n],dataArr:[]}),r("getDatas")}};e.default={state:d,mutations:l,actions:f}},xQAn:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.default={state:{},mutations:{},actions:{}}}},["NHnr"]);