webpackJsonp([0],{"03YH":function(t,s){},"Zj/k":function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var a={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{attrs:{id:"stk-tick"}},[e("div",{staticClass:"toolbar"},[e("div",{staticClass:"date-container"},[e("div",{staticClass:"button"},[t._v("前一天")]),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.state.date,expression:"state.date"}],staticClass:"date-input",attrs:{type:"text"},domProps:{value:t.state.date},on:{input:function(s){s.target.composing||t.$set(t.state,"date",s.target.value)}}}),t._v(" "),e("div",{staticClass:"button"},[t._v("后一天")])]),t._v(" "),e("div",{staticClass:"stock-container"},[e("div",[t._v("ts_code:")]),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.state.ts_code,expression:"state.ts_code"}],staticClass:"stock-input",attrs:{type:"text"},domProps:{value:t.state.ts_code},on:{input:function(s){s.target.composing||t.$set(t.state,"ts_code",s.target.value)}}})]),t._v(" "),e("div",{staticClass:"submit-container"},[e("div",{staticClass:"button",on:{click:t.submit}},[t._v("确定")])])]),t._v(" "),e("div",{staticClass:"stk-container"},[e("table",[e("tbody",t._l(t.state.dataArr,function(s,a){return e("tr",{key:a},[e("td",[t._v(" "+t._s(s.time)+" ")]),t._v(" "),e("td",[t._v(" "+t._s(s.price)+" ")]),t._v(" "),e("td",[t._v(" "+t._s(s.direction)+" ")]),t._v(" "),e("td",[t._v(" "+t._s(s.count)+" ")]),t._v(" "),e("td",[t._v(" "+t._s(s.bp1)+" / "+t._s(s.bq1)),e("br"),t._v(t._s(s.bp2)+" / "+t._s(s.bq2)),e("br"),t._v(t._s(s.bp3)+" / "+t._s(s.bq3)),e("br"),t._v(t._s(s.bp4)+" / "+t._s(s.bq4)),e("br"),t._v(t._s(s.bp5)+" / "+t._s(s.bq5))]),t._v(" "),e("td",[t._v(" "+t._s(s.sp5)+" / "+t._s(s.sq5)),e("br"),t._v(t._s(s.sp4)+" / "+t._s(s.sq4)),e("br"),t._v(t._s(s.sp3)+" / "+t._s(s.sq3)),e("br"),t._v(t._s(s.sp2)+" / "+t._s(s.sq2)),e("br"),t._v(t._s(s.sp1)+" / "+t._s(s.sq1)+" ")])])}),0)]),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:t.state.dataArr.length,expression:"state.dataArr.length"}],staticClass:"button",on:{click:t.loadMore}},[t._v("加载更多")])])])},staticRenderFns:[]};var i=e("VU/8")({data:function(){return{}},computed:{state:function(){return this.$store.state.stk_tick}},mounted:function(){this.$store.dispatch("getTradeDate",{})},methods:{submit:function(){this.$store.dispatch("getDatas")},loadMore:function(){this.$store.dispatch("loadMore")}}},a,!1,function(t){e("03YH")},"data-v-4fa85b8a",null);s.default=i.exports}});