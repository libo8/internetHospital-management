(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-308c"],{"9GVP":function(t,e,a){"use strict";a.r(e);var n=a("gDS+"),s=a.n(n),r=a("zH15"),i=a.n(r),o=a("dNE1"),l=a.n(o),u={props:{reservationData:{type:Array,default:function(){return[]},required:!0,code:0},status:{type:Number,default:0}},data:function(){return{buttonName:"",oneButtonFlag:!1,code:0,message:"",clinicState:0}},created:function(){4===this.status&&this.connect()},mounted:function(){this.$nextTick(function(){4===this.status?(this.buttonName="叫号",this.oneButtonFlag=!0):11===this.status?(this.buttonName="视频问诊",this.oneButtonFlag=!0):12===this.status?(this.buttonName="诊断和开药",this.oneButtonFlag=!0):13!==this.status&&14!==this.status&&17!==this.status&&18!==this.status||(this.buttonName="查看",this.oneButtonFlag=!1)})},methods:{handleClick:function(t,e){if(4===this.status){var a=(new Date).getHours(),n=e.clinicTime,r=n.split("-")[0],i=n.split("-")[1],o=r.split(":")[0],l=i.split(":")[0];o<=a&&a<=l?this.callPatient(t,e):(this.$store.state.errorTokenVisible=!0,this.$store.state.errorTokenMessage="未到叫号时段")}else if(11===this.status){var u=s()(e);localStorage.setItem("userReservation",u),localStorage.setItem("userReservationUuId",e.uuId),this.$router.push({name:"DoctorClinic"})}else if(12===this.status){var c=s()(e);localStorage.setItem("userReservation",c),localStorage.setItem("userReservationUuId",e.uuId),this.$router.push({name:"ClinicResult"})}},callPatient:function(t,e){var a=s()(e),n=e.regNo,r={userReservationUuId:e.uuId,token:localStorage.getItem("token"),doctorCallRegNo:n};this.stompClient.send("/doc/pushClinicState",{},s()(r)),localStorage.setItem("userReservation",a),localStorage.setItem("userReservationUuId",e.uuId)},getDetail:function(t,e){this.$router.push({name:"ReservationDetail",query:{userReservationUuId:e.uuId}})},connect:function(){var t=this,e=new i.a("https://management.woniuyiliao.cn/api/myWebSocket"),a={Authorization:localStorage.getItem("token")};this.stompClient=l.a.over(e),this.stompClient.connect(a,function(e){t.stompClient.subscribe("/topic/userReservation",function(e){var a=JSON.parse(e.body);t.code=a.code,t.message=a.message,0===t.code&&null!=t.clinicState&&0===t.clinicState?t.$router.push({name:"DoctorClinic"}):1===t.code&&(t.$store.state.errorTokenVisible=!0,t.$store.state.errorTokenMessage=t.message)},{})},function(t){console.log("失败"),console.log(t)})}}},c=a("KHd+"),d=Object(c.a)(u,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.reservationData,stripe:""}},[a("el-table-column",{attrs:{prop:"patientName",label:"患者姓名",width:"120"}}),t._v(" "),a("el-table-column",{attrs:{prop:"patientSex",label:"性别",width:"80"}}),t._v(" "),a("el-table-column",{attrs:{prop:"patient.age",label:"年龄",width:"80"}}),t._v(" "),a("el-table-column",{attrs:{prop:"regNo",label:"就诊序号",width:"80"}}),t._v(" "),a("el-table-column",{attrs:{prop:"departmentName",label:"预约科室"}}),t._v(" "),a("el-table-column",{attrs:{prop:"clinicDate",label:"预约日期"}}),t._v(" "),a("el-table-column",{attrs:{prop:"clinicTime",label:"预约时段"}}),t._v(" "),a("el-table-column",{attrs:{prop:"statusDescription",label:"状态"}}),t._v(" "),a("el-table-column",{attrs:{label:"操作",width:"300"},scopedSlots:t._u([{key:"default",fn:function(e){return[t.oneButtonFlag?a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(a){t.handleClick(e.$index,e.row)}}},[t._v(t._s(t.buttonName))]):t._e(),t._v(" "),a("el-button",{attrs:{size:"mini"},on:{click:function(a){t.getDetail(e.$index,e.row)}}},[t._v("查看")]),t._v(" "),4===t.status?a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(a){t.forwardCall(e.$index,e.row)}}},[t._v("过号")]):t._e()]}}])})],1)],1)},[],!1,null,null,null);d.options.__file="reservationTable.vue";var m=d.exports,v=a("Ut8h"),p=a("JLmY"),h={components:{reservationTable:m},data:function(){return{date:[""],activeName:"待就诊(今日)",input21:"",startScheduleTime:"",endScheduleTime:"",status:1,pageNumber:1,pageSize:10,total:1,patientName:"",reservationData:[]}},computed:{startTime:function(){return this.date[0]},endTime:function(){return this.date[1]}},mounted:function(){this.$nextTick(function(){this.todayUserReservation(4,!0)})},methods:{todayUserReservation:function(t,e){var a=this,n=void 0,s=void 0,r=void 0;r=e?p.a.getDay(0,"-"):"",null!==this.date[0]&&null!==this.date[1]?(n=r,s=r):(n=this.startTime,s=this.endTime),this.status=t,Object(v.f)(this.status,n,s,this.patientName,this.pageNumber,this.pageSize).then(function(t){if(200===t.data.returnCode){var e=t.data.returnData;a.total=e.total,a.reservationData=e.list}})},handleClick:function(t,e){"待就诊(今日)"===t.name?this.todayUserReservation(4,!0):"待就诊(日期筛选)"===t.name?this.todayUserReservation(4,!1):"就诊中"===t.name?this.todayUserReservation(11,!1):"待诊断"===t.name?this.todayUserReservation(12,!1):"待审核"===t.name?this.todayUserReservation(13,!1):"已审核"===t.name?this.todayUserReservation(14,!1):"待评价"===t.name?this.todayUserReservation(17,!1):"已评价"===t.name&&this.todayUserReservation(18,!1)}}},b=Object(c.a)(h,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("el-container",[a("el-header",{staticStyle:{"margin-top":"50px"}},[a("el-row",[a("el-col",{attrs:{xs:12,sm:12,md:12,lg:10,xl:6}},[a("div",{staticClass:"block"},[a("span",{staticStyle:{"margin-left":"20px","margin-right":"10px"}},[t._v("日期")]),t._v(" "),a("el-date-picker",{attrs:{type:"daterange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","value-format":"yyyy-MM-dd"},model:{value:t.date,callback:function(e){t.date=e},expression:"date"}})],1)]),t._v(" "),a("el-col",{attrs:{xs:12,sm:12,md:12,lg:10,xl:6}},[a("el-input",{attrs:{clearable:"",placeholder:"请输入患者姓名","prefix-icon":"el-icon-search"},model:{value:t.input21,callback:function(e){t.input21=e},expression:"input21"}})],1)],1)],1),t._v(" "),a("el-main",{staticStyle:{padding:"50px","padding-top":"20px"}},[a("el-tabs",{attrs:{type:"card"},on:{"tab-click":t.handleClick},model:{value:t.activeName,callback:function(e){t.activeName=e},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:"待就诊(今日)",name:"待就诊(今日)"}},[a("reservation-table",{attrs:{"reservation-data":t.reservationData,status:4}})],1),t._v(" "),a("el-tab-pane",{attrs:{label:"待就诊(日期筛选)",name:"待就诊(日期筛选)",lazy:""}},[a("reservation-table",{attrs:{"reservation-data":t.reservationData}})],1),t._v(" "),a("el-tab-pane",{attrs:{label:"就诊中",name:"就诊中",lazy:""}},[a("reservation-table",{attrs:{"reservation-data":t.reservationData,status:11}})],1),t._v(" "),a("el-tab-pane",{attrs:{label:"待诊断",name:"待诊断",lazy:""}},[a("reservation-table",{attrs:{"reservation-data":t.reservationData,status:12}})],1),t._v(" "),a("el-tab-pane",{attrs:{label:"待审核",name:"待审核",lazy:""}},[a("reservation-table",{attrs:{"reservation-data":t.reservationData,status:13}})],1),t._v(" "),a("el-tab-pane",{attrs:{label:"已审核",name:"已审核",lazy:""}},[a("reservation-table",{attrs:{"reservation-data":t.reservationData}})],1),t._v(" "),a("el-tab-pane",{attrs:{label:"待评价",name:"待评价",lazy:""}},[a("reservation-table",{attrs:{"reservation-data":t.reservationData}})],1),t._v(" "),a("el-tab-pane",{attrs:{label:"已评价",name:"已评价",lazy:""}},[a("reservation-table",{attrs:{"reservation-data":t.reservationData}})],1)],1)],1)],1)],1)},[],!1,null,null,null);b.options.__file="index.vue";e.default=b.exports},JLmY:function(t,e,a){"use strict";e.a={getDay:function(t,e){var a=new Date,n=a.getTime(),s=864e5*t;a.setTime(parseInt(n+s));var r=a.getFullYear(),i=(a.getMonth()+1).toString();i.length<=1&&(i="0"+i);var o=a.getDate().toString();return o.length<=1&&(o="0"+o),r+e+i+e+o}}},Ut8h:function(t,e,a){"use strict";a.d(e,"f",function(){return s}),a.d(e,"b",function(){return r}),a.d(e,"c",function(){return i}),a.d(e,"d",function(){return o}),a.d(e,"e",function(){return l}),a.d(e,"a",function(){return u});var n=a("t3Un");function s(t,e,a,s,r,i){return Object(n.a)({url:"/docUserReservation/getUserReservationOfDoctor",method:"post",params:{status:t,startScheduleTime:e,endScheduleTime:a,patientName:s,pageNumber:r,pageSize:i}})}function r(t,e){return Object(n.a)({url:"/docUserReservation/beginOrFinishClinic",method:"post",params:{userReservationUuid:t,flag:e}})}function i(t){return Object(n.a)({url:"/docUserReservation/confirmDoctorReservation",method:"post",params:{userReservationUuid:t}})}function o(t){return Object(n.a)({url:"/userReservation/getAllDetailByUuId",method:"post",params:{userReservationUuId:t}})}function l(t,e,a){return Object(n.a)({url:"/managementUserReservation/getUserReservationByAuditStatus",method:"post",params:{auditStatus:t,pageNo:e,pageSize:a}})}function u(t,e,a){return Object(n.a)({url:"/managementUserReservation/auditUserReservation",method:"post",params:{userReservationUuId:t,auditStatus:e,examineFailReason:a}})}}}]);