
require('@base/basic/rem.min.js')
require('../css/index.css');
require('../../../common/wb/sensorsdata.js') // 加入神策
require('../../../common/wb/wb-plugin.min.js');
var reword1 = require('../img/reward1.png');
var reword2 = require('../img/reward2.png');
var get1 = require('../img/get.png');
var get2 = require('../img/geted.png');
var alert1 = require('../img/successalert.png');
var alert2 = require('../img/failalert.png');
var beforeImg = require('../img/beforeimg.png');
var afterImg = require('../img/afterimg.png');
var confirm = require('../img/confirm.png');
var channelActivity = "../../../../web/webApi/channelActivity/info";
var receiveAward ='../../../../web/webApi/channelActivity/receiveAward';
var dataId = wb.args['id'];
var myticket = wb.ticket    
var state ={
    0:{
        reword:reword1,
        get:get1
    },
    1:{
        reword:reword2,
        get:get2
    }
}
var msg_title = "新用户礼包";
//获取用户的基本状态
// require('../../../common/test/ticket-csrf.js'); //本地
// var channelActivity = "http://123.56.91.6/web/webApi/channelActivity/info",//本地
// receiveAward ='http://123.56.91.6/web/webApi/channelActivity/receiveAward';
// var ticket = new cTicket("62418950"); //本地
// var myticket = window.ticket    //wb.ticket  window.ticket 本地

$('#app').removeClass('none');
var app = new Vue({
    el: '#app',
    data: {
        imgUrl:'',
        isalert: false,
        isGet:false,
        title:'',
        showState:state['1'],
        alertImg:alert1,
        closePage:false,
        time:'',
        confirm:confirm
    },
    methods: {
        cancel: function () {
            this.isalert = false;
            if(this.closePage){
                wb.dismissWebview();
                return false;
            }
           
        },
        get: function () {
            var that = this;
            // that.isalert = true;
            // that.isGet = false; 
            // that.alertImg = alert2;
            // that.showState=state['1'];
            // return false;
            // this.isGet
            if(this.isGet){
                $.ajax({
                    type: "post",
                    url: receiveAward,
                    async: true,
                    data: {
                        id: dataId,
                        type: 3002,
                        plateType: 4,
                        ticket: myticket, //本地：window.ticket
                        __cf: window.__cf,
                        __nsr: wb.__nsr
                    },
                    dataType: "json",
                    success: function (res) {
                        //手动添加埋点
                        wb.trackClick("newuser_gift_lenovo"); 
                        if (res.code == 0) {
                            that.isalert = true;
                            if(res.data.status != 0){               
                                that.alertImg = alert2;
                            } else{
                                that.isGet = false; 
                                that.alertImg = alert1;
                                that.showState=state['1'];
                            }

                        }
                    },
                    error: function (jqXHQ) {
                    }
                });
            }
        }
    },
    mounted: function () {
        // this.isalert = true;
        var that = this;
        $.ajax({
            type: "post",
            url: channelActivity,
            async: true,
            data: {
                id: dataId,
                type: 3002,
                plateType: 4,
                ticket: myticket, //本地：window.ticket
                __cf: window.__cf,
                __nsr: wb.__nsr
            },
            dataType: "json",
            success: function (res) {
                if (res.code == 0) {
                    var title = res.data.info.channelName +'新用户礼包';
                    document.title =title;
                    that.title =title;
                    msg_title =  title;
                    that.imgUrl = res.data.info.imgUrl;
                    // 可以领取礼包
                    if(res.data.status == 0 || res.data.status == -1 || res.data.status == -2){
                        that.isGet = true;
                        that.showState=state['0'];
                    }
                    // 活动未开始
                    if(res.data.status == -3){
                        that.isalert = true;
                        that.closePage = true;
                        that.alertImg = beforeImg;
                    }
                    // 活动已结束
                    if(res.data.status == -4){
                        that.isalert = true;
                        that.closePage = true;
                        that.alertImg = afterImg;
                    }
                    // that.showState= state['0'];
                   var startTime = wb.timeFormat(res.data.info.startTime,'YYYY年MM月DD日hh:mm');
                //    alert(startTime);
                   var endTime = wb.timeFormat(res.data.info.endTime,'YYYY年MM月DD日hh:mm')
                   that.time = startTime +"至"+ endTime;
                  
                    // that.alertImg = alert2;
                }
            },
            error: function (jqXHQ) {
            }
        });
        
    }
})