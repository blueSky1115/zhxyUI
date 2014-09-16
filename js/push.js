/**
 * 用于处理推送消息的js模块
 * Created by zhangguixu on 2014/9/16.
 */


//定时器,十分钟刷新页面中的推送栏
setInterval(function(){
    requestPush();
},600000);

//请求推送内容
function requestPush(){
    //向服务器请求json数据，并且在回调函数中处理json数据

    $.getJSON("../json/news.json",function(json){
        var html="<li class='title blue'><span class='label' style='color:white'>推送消息</span><a href='#'><img src='image/more2.png'></a></li>";

        var result= eval(json);
        for(var i=0;i<result.length;i++){
            html+=createPushList(result[i].imgSrc,result[i].detail,result[i].date);
        }
        $("#push").html(html);
    });
}

//生成推送栏的列表
function createPushList(imgSrc,detail,date){
    var list="<li class='list'><a href=''><img class='list_logo' src='"+imgSrc+"'><span class='detail'>"+detail+"</span><span class='date'>"+date+"</span></a></li>";
    return list;
}