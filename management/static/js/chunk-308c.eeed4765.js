(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-308c"],{"9GVP":function(t,e,a){"use strict";a.r(e);var n=a("gDS+"),s=a.n(n),r=a("zH15"),o=a.n(r),i=a("dNE1"),l=a.n(i),u={props:{reservationData:{type:Array,default:function(){return[]},required:!0,code:0},status:{type:Number}},data:function(){return{buttonName:"",oneButtonFlag:!1}},created:function(){4===this.status&&this.connect()},mounted:function(){this.$nextTick(function(){4===this.status?(this.buttonName="叫号",this.oneButtonFlag=!0):11===this.status?(this.buttonName="视频问诊",this.oneButtonFlag=!0):12===this.status?(this.buttonName="诊断和开药",this.oneButtonFlag=!0):13===this.status&&(this.buttonName="查看",this.oneButtonFlag=!1)})},methods:{handleClick:function(t,e){if(4===this.status)this.callPatient(t,e);else if(11===this.status){var a=s()(e);localStorage.setItem("userReservation",a),localStorage.setItem("userReservationUuId",e.uuId),this.$router.push({name:"DoctorClinic"})}else if(12===this.status){var n=s()(e);localStorage.setItem("userReservation",n),localStorage.setItem("userReservationUuId",e.uuId),this.$router.push({name:"ClinicResult"})}},callPatient:function(t,e){var a=s()(e),n={userReservationUuId:e.uuId,token:localStorage.getItem("token")};this.stompClient.send("/doc/pushClinicState",{},s()(n)),0===this.code?(localStorage.setItem("userReservation",a),localStorage.setItem("userReservationUuId",e.uuId),this.$router.push({name:"DoctorClinic"})):1===this.code&&(this.$store.state.errorTokenVisible=!0,this.$store.state.errorTokenMessage="叫号失败")},handleDelete:function(t,e){console.log(t,e)},connect:function(){var t=this,e=new o.a("https://localhost:8080/myWebSocket"),a={Authorization:localStorage.getItem("token")};this.stompClient=l.a.over(e),this.stompClient.connect(a,function(e){t.stompClient.subscribe("/topic/userReservation",function(e){var a=JSON.parse(e.body);t.code=a.code},{})},function(t){console.log("失败"),console.log(t)})}}},c=a("KHd+"),v=Object(c.a)(u,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.reservationData,stripe:""}},[a("el-table-column",{attrs:{prop:"patientName",label:"患者姓名",width:"180"}}),t._v(" "),a("el-table-column",{attrs:{prop:"patientSex",label:"性别",width:"180"}}),t._v(" "),a("el-table-column",{attrs:{prop:"patient.age",label:"年龄"}}),t._v(" "),a("el-table-column",{attrs:{prop:"departmentName",label:"预约科室"}}),t._v(" "),a("el-table-column",{attrs:{prop:"clinicDate",label:"预约日期"}}),t._v(" "),a("el-table-column",{attrs:{prop:"clinicTime",label:"预约时段"}}),t._v(" "),a("el-table-column",{attrs:{prop:"regNo",label:"就诊序号"}}),t._v(" "),a("el-table-column",{attrs:{prop:"statusDescription",label:"状态"}}),t._v(" "),a("el-table-column",{attrs:{label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[t.oneButtonFlag?a("el-button",{attrs:{size:"mini"},on:{click:function(a){t.handleClick(e.$index,e.row)}}},[t._v(t._s(t.buttonName))]):t._e(),t._v(" "),a("el-button",{attrs:{size:"mini"},on:{click:function(a){t.handleDelete(e.$index,e.row)}}},[t._v("查看")])]}}])})],1)],1)},[],!1,null,null,null);v.options.__file="reservationTable.vue";var d=v.exports,p=a("Ut8h"),m=a("JLmY"),h={components:{reservationTable:d},data:function(){return{value4:[""],activeName:"待就诊(今日)",input21:"",startScheduleTime:"",endScheduleTime:"",status:1,pageNumber:1,pageSize:10,total:1,patientName:"",reservationData:[]}},mounted:function(){this.$nextTick(function(){this.todayUserReservation(4)})},methods:{todayUserReservation:function(t){var e=this,a=m.a.getDay(0,"-");this.status=t,Object(p.c)(this.status,a,a,this.patientName,this.pageNumber,this.pageSize).then(function(t){if(200===t.data.returnCode){var a=t.data.returnData;e.total=a.total,e.reservationData=a.list}})},handleClick:function(t,e){"待就诊(今日)"===t.name?this.todayUserReservation(4):"就诊中"===t.name?this.todayUserReservation(11):"待诊断"===t.name?this.todayUserReservation(12):"待审核"===t.name&&this.todayUserReservation(13)}}},b=Object(c.a)(h,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-container",[a("el-header",{staticStyle:{"margin-top":"50px"}},[a("el-row",[a("el-col",{attrs:{xs:12,sm:12,md:12,lg:10,xl:6}},[a("div",{staticClass:"block"},[a("span",{staticStyle:{"margin-left":"20px","margin-right":"10px"}},[t._v("日期")]),t._v(" "),a("el-date-picker",{attrs:{type:"daterange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","value-format":"yyyy-MM-dd"},model:{value:t.value4,callback:function(e){t.value4=e},expression:"value4"}})],1)]),t._v(" "),a("el-col",{attrs:{xs:12,sm:12,md:12,lg:10,xl:6}},[a("el-input",{attrs:{clearable:"",placeholder:"请输入患者姓名","prefix-icon":"el-icon-search"},model:{value:t.input21,callback:function(e){t.input21=e},expression:"input21"}})],1)],1)],1),t._v(" "),a("el-main",{staticStyle:{padding:"50px","padding-top":"20px"}},[a("el-tabs",{attrs:{type:"card"},on:{"tab-click":t.handleClick},model:{value:t.activeName,callback:function(e){t.activeName=e},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:"待就诊(今日)",name:"待就诊(今日)"}},[a("reservation-table",{attrs:{"reservation-data":t.reservationData,status:4}})],1),t._v(" "),a("el-tab-pane",{attrs:{label:"待就诊(其他)",name:"待就诊(其他)",lazy:""}},[a("reservation-table",{attrs:{"reservation-data":t.reservationData}})],1),t._v(" "),a("el-tab-pane",{attrs:{label:"就诊中",name:"就诊中",lazy:""}},[a("reservation-table",{attrs:{"reservation-data":t.reservationData,status:11}})],1),t._v(" "),a("el-tab-pane",{attrs:{label:"待诊断",name:"待诊断",lazy:""}},[a("reservation-table",{attrs:{"reservation-data":t.reservationData,status:12}})],1),t._v(" "),a("el-tab-pane",{attrs:{label:"待审核",name:"待审核",lazy:""}},[a("reservation-table",{attrs:{"reservation-data":t.reservationData,status:13}})],1),t._v(" "),a("el-tab-pane",{attrs:{label:"已结束",name:"已结束",lazy:""}},[a("reservation-table",{attrs:{"reservation-data":t.reservationData}})],1),t._v(" "),a("el-tab-pane",{attrs:{label:"已取消",name:"已取消",lazy:""}},[a("reservation-table",{attrs:{"reservation-data":t.reservationData}})],1)],1)],1)],1)},[],!1,null,null,null);b.options.__file="index.vue";e.default=b.exports},JLmY:function(t,e,a){"use strict";e.a={getDay:function(t,e){var a=new Date,n=a.getTime(),s=864e5*t;a.setTime(parseInt(n+s));var r=a.getFullYear(),o=(a.getMonth()+1).toString();o.length<=1&&(o="0"+o);var i=a.getDate().toString();return i.length<=1&&(i="0"+i),r+e+o+e+i}}},Ut8h:function(t,e,a){"use strict";a.d(e,"c",function(){return s}),a.d(e,"a",function(){return r}),a.d(e,"b",function(){return o});var n=a("t3Un");function s(t,e,a,s,r,o){return Object(n.a)({url:"/docUserReservation/getUserReservationOfDoctor",method:"post",params:{status:t,startScheduleTime:e,endScheduleTime:a,patientName:s,pageNumber:r,pageSize:o}})}function r(t,e){return Object(n.a)({url:"/docUserReservation/beginOrFinishClinic",method:"post",params:{userReservationUuid:t,flag:e}})}function o(t){return Object(n.a)({url:"/docUserReservation/confirmDoctorReservation",method:"post",params:{userReservationUuid:t}})}}}]);