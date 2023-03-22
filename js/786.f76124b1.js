"use strict";(self["webpackChunkantd_vue2_admin"]=self["webpackChunkantd_vue2_admin"]||[]).push([[786],{94786:function(t,a,e){e.r(a),e.d(a,{default:function(){return p}});var i=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"dashboard-container"},[e("div",{staticClass:"cards-row"},[e("div",{staticClass:"card-wrapper"},[e("a-card",[e("div",{staticClass:"card-title"},[e("div",{staticClass:"title-text"},[t._v(t._s(t.cards[0].title))]),e("a-tooltip",[e("template",{slot:"title"},[t._v(" 提示信息 ")]),e("a-icon",{attrs:{type:"info-circle"}})],2)],1),e("p",{staticClass:"card-data"},[t._v(" "+t._s(t.dataSan(t.cards[0].data))+" ")]),e("ul",{staticClass:"trend-row"},[e("li",[t._v("周同比")]),e("li",{class:{up:t.cards[0].yoyWeek>=0,down:t.cards[0].yoyWeek<0}},[t._v(" "+t._s(t.cards[0].yoyWeek>=0?"▲":"▼")+" ")]),e("li",[t._v(" "+t._s(100*t.cards[0].yoyWeek+"%")+" ")]),e("li",[t._v("日环比")]),e("li",{class:{up:t.cards[0].yoyDaily>=0,down:t.cards[0].yoyDaily<0}},[t._v(" "+t._s(t.cards[0].yoyDaily>=0?"▲":"▼")+" ")]),e("li",[t._v(" "+t._s(100*t.cards[0].yoyDaily+"%")+" ")])])])],1),e("div",{staticClass:"card-wrapper"},[e("a-card",[e("div",{staticClass:"card-title"},[e("div",{staticClass:"title-text"},[t._v(t._s(t.cards[1].title))]),e("a-tooltip",[e("template",{slot:"title"},[t._v(" 提示信息 ")]),e("a-icon",{attrs:{type:"info-circle"}})],2)],1),e("p",{staticClass:"card-data"},[t._v(" "+t._s(t.dataSan(t.cards[1].data))+" ")]),e("div",{attrs:{id:"card-line-chart"}})])],1),e("div",{staticClass:"card-wrapper"},[e("a-card",[e("div",{staticClass:"card-title"},[e("div",{staticClass:"title-text"},[t._v(t._s(t.cards[2].title))]),e("a-tooltip",[e("template",{slot:"title"},[t._v(" 提示信息 ")]),e("a-icon",{attrs:{type:"info-circle"}})],2)],1),e("p",{staticClass:"card-data"},[t._v(" "+t._s(t.dataSan(t.cards[2].data))+" ")]),e("div",{attrs:{id:"card-bar-chart"}})])],1),e("div",{staticClass:"card-wrapper"},[e("a-card",[e("div",{staticClass:"card-title"},[e("div",{staticClass:"title-text"},[t._v(t._s(t.cards[3].title))]),e("a-tooltip",[e("template",{slot:"title"},[t._v(" 提示信息 ")]),e("a-icon",{attrs:{type:"info-circle"}})],2)],1),e("p",{staticClass:"card-data"},[t._v(t._s(100*t.cards[3].data)+"%")]),e("div",{staticClass:"progress-wrapper"},[e("a-progress",{attrs:{type:"circle",percent:100*t.cards[3].data,"show-info":!1,width:50}})],1)])],1),e("div",{staticClass:"card-wrapper"},[e("a-card",[e("div",{staticClass:"card-title"},[e("div",{staticClass:"title-text"},[t._v(t._s(t.cards[4].title))]),e("a-tooltip",[e("template",{slot:"title"},[t._v(" 提示信息 ")]),e("a-icon",{attrs:{type:"info-circle"}})],2)],1),e("p",{staticClass:"card-data"},[t._v(t._s(100*t.cards[4].data)+"%")]),e("a-progress",{staticStyle:{height:"50px"},attrs:{"stroke-linecap":"square",percent:100*t.cards[4].data,"show-info":!1}})],1)],1)]),e("div",{staticClass:"content-wrapper"},[e("div",{staticClass:"left"},[e("a-card",{staticClass:"data-report-wrapper",attrs:{title:"数据简报"}},t._l(t.reportData,(function(a){return e("div",{key:a.title,staticClass:"data-report-block"},[e("div",{staticClass:"data-report-block-title"},[t._v(" "+t._s(a.title)+" ")]),e("div",{staticClass:"data-report-block-data"},[t._v(" "+t._s(a.data)+" ")]),e("div",{class:{ascension:a.percent>=0,descension:a.percent<0}},[t._v(" "+t._s(a.percent>0?"+"+100*a.percent:""+100*a.percent)+" ")])])})),0),e("a-card",{attrs:{title:"业绩目标"}},[e("div",{attrs:{id:"achievement-chart"}})]),e("a-card",{attrs:{title:"销售预测"}},[e("div",{attrs:{id:"sale-chart"}})]),e("a-card",{attrs:{title:"销售漏斗"}},[e("div",{attrs:{id:"funnel-chart"}})])],1),e("div",{staticClass:"right"},[e("a-card",{attrs:{title:"销售排名"}},[e("a-table",{attrs:{columns:t.salesColumn,"data-source":t.salesData,pagination:!1},scopedSlots:t._u([{key:"rank",fn:function(a,i,s){return[e("div",{staticClass:"ranking",class:"rank"+(s+1)},[t._v(t._s(s+1))])]}},{key:"value",fn:function(a){return[e("span",[t._v(t._s(a.toFixed(2))+"万")])]}},{key:"percent",fn:function(t,a,i){return[e("a-progress",{class:"progress-"+(i+1),attrs:{percent:100*t}})]}}])})],1),e("a-card",{attrs:{title:"快捷菜单"}},[e("div",{staticClass:"icon-wrapper"},t._l(t.iconMenu,(function(a){return e("div",{key:a.icon,staticClass:"icon-block"},[e("svg-icon",{attrs:{"icon-id":a.icon}}),e("div",[t._v(t._s(a.name))])],1)})),0)]),e("a-card",{staticStyle:{height:"488px","overflow-y":"auto"},attrs:{title:"系统通知"}},[e("a",{attrs:{slot:"extra",href:"#"},slot:"extra"},[e("a-icon",{attrs:{type:"right-circle"}}),t._v(" 全部")],1),e("ul",{staticClass:"notice-list"},t._l(t.noticeList,(function(a,i){return e("li",{key:i},[e("div",{staticClass:"notice-title",on:{click:function(e){return e.preventDefault(),t.redirectTo(a)}}},[t._v(t._s(a.title))]),e("div",{staticClass:"notice-time"},[e("a-icon",{attrs:{type:"clock-circle"}}),e("span",[t._v(" "+t._s(a.postTime))])],1)])})),0)])],1)])])},s=[],r=e(65825),n=e(92332),l={name:"Dashboard3",data(){return{cards:[{title:"月销售金额(元)",data:12e4,yoyWeek:.12,yoyDaily:-.1},{title:"月回款金额(元)",data:1e5},{title:"本月成交订单",data:1e3},{title:"完成销售目标",data:.75},{title:"回款达成率",data:.8}],reportData:[],salesColumn:[{title:"排名",dataIndex:"rank",key:"rank",scopedSlots:{customRender:"rank"},align:"center",width:55},{title:"姓名",dataIndex:"name",key:"name",align:"center",width:80},{title:"销售金额",dataIndex:"value",key:"value",align:"center",scopedSlots:{customRender:"value"},width:90},{title:"完成目标",dataIndex:"percent",key:"percent",scopedSlots:{customRender:"percent"}}],salesData:[{name:"张小刚",value:100,percent:.9},{name:"李小红",value:90,percent:.8},{name:"王小明",value:80,percent:.7},{name:"周小伟",value:70,percent:.65},{name:"郭小涛",value:60,percent:.5},{name:"邵小婷",value:55,percent:.5},{name:"叶小福",value:50,percent:.5},{name:"郭千秋",value:45,percent:.5},{name:"姜小风",value:42,percent:.5},{name:"吴小夏",value:40,percent:.5}],iconMenu:[{name:"客户管理",icon:"icon-customer"},{name:"线索管理",icon:"icon-l-idea"},{name:"商机管理",icon:"icon-lendmoney"},{name:"联系人管理",icon:"icon-a-Usermanagement-outlined"},{name:"写新跟进",icon:"icon-pencil"},{name:"回款管理",icon:"icon-purchasereturn"},{name:"发票管理",icon:"icon-order1"},{name:"费用管理",icon:"icon-file-invoice-dollar-solid"},{name:"报销管理",icon:"icon-reimbursement-fill"},{name:"工作报告",icon:"icon-report"},{name:"工单管理",icon:"icon-a-reworkworkorder"},{name:"产品管理",icon:"icon-product"}],noticeList:[{title:"关于开展核实清理虚假备案专项工作的通知",postTime:"10-22 11:20:37"},{title:"关于开展核实清理虚假备案专项工作的通知",postTime:"10-22 11:20:37"},{title:"关于开展核实清理虚假备案专项工作的通知",postTime:"10-22 11:20:37"},{title:"关于开展核实清理虚假备案专项工作的通知",postTime:"10-22 11:20:37"},{title:"关于开展核实清理虚假备案专项工作的通知",postTime:"10-22 11:20:37"},{title:"关于开展核实清理虚假备案专项工作的通知",postTime:"10-22 11:20:37"},{title:"关于开展核实清理虚假备案专项工作的通知",postTime:"10-22 11:20:37"},{title:"关于开展核实清理虚假备案专项工作的通知",postTime:"10-22 11:20:37"},{title:"关于开展核实清理虚假备案专项工作的通知",postTime:"10-22 11:20:37"},{title:"关于开展核实清理虚假备案专项工作的通知",postTime:"10-22 11:20:37"},{title:"关于开展核实清理虚假备案专项工作的通知",postTime:"10-22 11:20:37"},{title:"关于开展核实清理虚假备案专项工作的通知",postTime:"10-22 11:20:37"}]}},mounted(){this.getReportData(),this.getCardLineChartData(),this.getCardBarChartData(),this.getAchiChartData(),this.getSaleChartData(),this.getFunnelChartData()},methods:{getReportData(){const t=new Promise((t=>{const a=[{title:"新增客户",data:500,percent:.159},{title:"新增线索",data:1200,percent:.159},{title:"新增商机",data:500,percent:-.159},{title:"新增订单",data:500,percent:-.159},{title:"新增联系人",data:500,percent:.159},{title:"跟进次数",data:1200,percent:.159},{title:"处理任务",data:500,percent:-.159},{title:"处理工单",data:500,percent:.159}];t({list:a})}));t.then((t=>{this.reportData=t.list}))},getCardLineChartData(){const t=new Promise((t=>{const a=[];for(let e=1;e<=12;e+=1)a.push({key:e,id:e,name:`${e}月金额`,data:12e4*Math.random()});t({list:a})}));t.then((t=>{this.drawCardLineChart(t.list.map((t=>t.data)))}))},drawCardLineChart(t){const a=r.S1(document.getElementById("card-line-chart")),e={grid:{top:0,right:0,left:0,bottom:0},xAxis:{show:!1,type:"category",data:Array(12).fill("").map(((t,a)=>`${a+1}月`))},yAxis:{show:!1,type:"value",name:"单位：元",axisLabel:{showMinLabel:!0,showMaxLabel:!0}},series:[{name:"月回款金额",data:t,type:"line",areaStyle:{color:"#ec8191"}}]};a.setOption(e),window.addEventListener("resize",(()=>{a.resize()}))},getCardBarChartData(){const t=new Promise((t=>{const a=[];for(let e=1;e<=12;e+=1)a.push({key:e,id:e,name:`${e}月订单`,data:1200*Math.random()});t({list:a})}));t.then((t=>{this.drawCardBarChart(t.list.map((t=>t.data)))}))},drawCardBarChart(t){const a=r.S1(document.getElementById("card-bar-chart")),e={grid:{top:0,right:0,left:0,bottom:0},xAxis:{show:!1,type:"category",data:Array(12).fill("").map(((t,a)=>`${a+1}月`))},yAxis:{show:!1,type:"value",name:"单位：元",axisLabel:{showMinLabel:!0,showMaxLabel:!0}},series:[{name:"月成交订单",data:t,type:"bar",itemStyle:{color:"#73c0ee"}}]};a.setOption(e),window.addEventListener("resize",(()=>{a.resize()}))},getAchiChartData(){const t=new Promise((t=>{const a=[],e=3e6*Math.random();for(let i=1;i<=12;i+=1)a.push({key:i,id:i,name:`${i}月业绩`,data:[e*(Math.random()*(.8-.5)+.5),e*(Math.random()*(1-.8)+.8)]});t({list:a})}));t.then((t=>{this.drawAchiChart(t.list.map((t=>t.data)))}))},drawAchiChart(t){const a=r.S1(document.getElementById("achievement-chart")),e={tooltip:{trigger:"item"},legend:{bottom:10},xAxis:{show:!0,type:"category",axisTick:{show:!1},data:Array(12).fill("").map(((t,a)=>`${a+1}月`))},yAxis:{show:!0,type:"value"},series:[{name:"目标金额",data:t.map((t=>t[0])),type:"bar",itemStyle:{color:"#86c8f1"}},{name:"成交金额",data:t.map((t=>t[1])),type:"bar",barGap:"0%",itemStyle:{color:"#a7d8a7"}}]};a.setOption(e),window.addEventListener("resize",(()=>{a.resize()}))},getSaleChartData(){const t=new Promise((t=>{const a=[],e=3e6*Math.random();for(let i=1;i<=12;i+=1)a.push({key:i,id:i,name:`${i}月销售`,data:[e*(Math.random()*(1-.8)+.8),e*(Math.random()*(.8-.5)+.5)]});t({list:a})}));t.then((t=>{this.drawSaleChart(t.list.map((t=>t.data)))}))},drawSaleChart(t){const a=r.S1(document.getElementById("sale-chart")),e={tooltip:{trigger:"item"},legend:{bottom:10},xAxis:{show:!0,type:"category",axisTick:{show:!1},data:Array(12).fill("").map(((t,a)=>`${a+1}月`))},yAxis:{show:!0,type:"value"},series:[{name:"预计销售金额",data:t.map((t=>t[0])),type:"bar",itemStyle:{color:"#ef949c"}},{name:"概率金额",data:t.map((t=>t[1])),type:"bar",barGap:"0%",itemStyle:{color:"#90aef3"}}]};a.setOption(e),window.addEventListener("resize",(()=>{a.resize()}))},getFunnelChartData(){const t=new Promise((t=>{const a=[{value:500,name:"初步洽谈"},{value:350,name:"深入沟通"},{value:250,name:"产品报价"},{value:150,name:"成交商机"},{value:120,name:"流失商机"}];t({list:a})}));t.then((t=>{this.drawFunnelChart(t.list)}))},drawFunnelChart(t){const a=r.S1(document.getElementById("funnel-chart")),e={tooltip:{trigger:"item"},color:["#7bd6d6","#f7cd73","#86c8f1","#a7d8a7","#f1959c"],series:[{type:"funnel",left:"10%",width:"80%",maxSize:"80%",minSize:"20%",label:{position:"inside",formatter:"{d}%",color:"#fff"},data:t},{type:"funnel",left:"10%",width:"80%",maxSize:"80%",minSize:"20%",label:{position:"right",formatter:"{b} {c}",color:"#666"},data:t}]};a.setOption(e),window.addEventListener("resize",(()=>{a.resize()}))},redirectTo(t){},dataSan(t){return(0,n.l)(t)}}},c=l,o=e(1001),d=(0,o.Z)(c,i,s,!1,null,"6aaf7f2f",null),p=d.exports},92332:function(t,a,e){function i(t){return null==t?"-":0===t?0:`${t}`.replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g,"$1,")}e.d(a,{l:function(){return i}})}}]);