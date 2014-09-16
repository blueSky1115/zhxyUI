//解决屏幕大小的问题，是主体块始终居中，
function layout(){
	
	//获得屏幕的宽度
	var sWidth=$(window).width();
    //获得屏幕的高度
    var sHeight=$(window).height();
	var margin=0;
	//判断是否大于1237，如果小于则不进行处理
	if(sWidth-1187>0){
		//左右两边的间隔同时缩小
		 margin=(sWidth-1187)/2+'px';
	}else{
		//如果达不到要求，则变成1px
	
		 margin=1+'px';
	}
	$('.comWidth').css({"margin-left":margin,"margin-right":margin});

    //调整footer的位置
    if($("#content").height()==500){
        if(sHeight-851>0){
            var marginTop=sHeight-851+"px";
            $("#footer").css("margin-top",marginTop);
        }
    }
    if($("#content").height()>500){
        $("#footer").css("margin-top",0);
    }
}


//当窗口拉动时，调整大小
$(window).resize(function(){
	layout();
});

var fontColor=["#9B9B9B","#F8931D","#FE765C","#6C5AEE","#5B9DF1","#BBF259","#5EF15A","#0486C4"]; //图标导航的颜色字体颜色的变化

//页面加载完成时
$(document).ready(function(){
	//调整布局
	layout();
	//隐藏弹框
	$(".more").hide();
	//图标导航栏点击事件
	$("#big_list>li").bind("click",function(){

		//获得下标
		var index=parseInt($(this).attr("data-index"));
		//将1-6的图标都熄灭
		if(index-7<0)darken();
		//替换图片
		var $img=$("li[data-index="+index+"]>img");
		var src=$img.attr("src");
		
		
		//1-6 时，点亮图标和字体的颜色
		if(src.indexOf("active")==-1){
			src=src.substring(0,src.indexOf("."));
			src=src+"_active.png";
			$img.attr("src",src);
		}
		//替换字体颜色
		$("li[data-index="+index+"]").css("color",fontColor[index]);	
		//如果data-index=7，显示更多的弹框
		if(index-7==0){
			$(".more").toggle("slow",function(){
				if($(".more").is(':hidden')){
					if(src.indexOf("active")!=-1){
						//改变图片和颜色
						src=src.substring(0,src.indexOf("_active"));
						src=src+".png";
						$img.attr("src",src);
						//替换字体颜色
						$("li[data-index="+index+"]").css("color",fontColor[0]);
					}
				}
			});
            return;
		}

        //向服务器发送请求,以教务处为例子
        createloading();
        layout();
        requestList(index);
	});



	//图标导航栏1-6的鼠标移入事件
	$("#big_list>li").bind("mouseover",function(){
		if($(this).attr("data-index")-7!=0){
			$(this).addClass("animated pulse");
		}
	});
	//图标导航栏的鼠标移出事件
	$("#big_list>li").bind("mouseout",function(){
		if($(this).attr("data-index")-7!=0){
			$(this).removeClass("animated pulse");
		}
	});


	//小图标的点击事件
	$(".small_icon_list>li").bind("click",function(event){
		alert("hello");
		event.stopPropagation();
	});


    //个人信息
    $(".nav_list li:nth-child(2)").bind("click", function (event) {
        darken();
        //阻止a标签的默认行为
        event.preventDefault();
        createloading();
        layout();
       //请求文件
        $("#content").load("../partials/personInfo.html",function(){
            layout();
            person();
            returnHome();
        });
    });

    //more按钮
    $(".title a").bind("click",function(event){
       event.preventDefault();

        var index=parseInt($(this).attr("data-index"));
        if(index!=null){
            createloading();
            layout();
            requestList(index);
        }
    });

    //列表链接到正文
    $(".list a").bind("click",function(event){
       event.preventDefault();

        var index=parseInt($(this).attr("data-index"));

        if(index!=null&&!isNaN(NaN)){

            createloading();
            layout();
            requestArticle(index);
        }
    });

    returnHome();

    //测试
    requestPush();

});

//返回首页
function returnHome(){
    //返回首页
    $(".home").bind("click",function(){
        window.location.reload();
    });
}

//让导航栏上的图标熄灭
function darken(){
	$("#big_list>li").each(function(index){
		//熄灭图标
        var $img=$(this).find("img");
	    var src=$img.attr("src");
	   	if(src==null)return;
	   	if(index>=6)return;
		if(src.indexOf("active")!=-1){
		//改变图片和颜色
			if(src.indexOf("active")!=-1){
			src=src.substring(0,src.indexOf("_active"));
			src=src+".png";
			$img.attr("src",src);
			//替换字体颜色
			$(this).css("color",fontColor[0]);
			}
		}		
	})
}
function lighten(index){
    //替换图片
    var $img=$("li[data-index="+index+"]>img");
    var src=$img.attr("src");


    //1-6 时，点亮图标和字体的颜色
    if(src.indexOf("active")==-1){
        src=src.substring(0,src.indexOf("."));
        src=src+"_active.png";
        $img.attr("src",src);
    }
    //替换字体颜色
    $("li[data-index="+index+"]").css("color",fontColor[index]);
}
//创建loading效果的函数
function createloading(){
   var html="<div id='load'><div class='loader'></div></div>";
   $("#content").html(html);
  //获得屏幕的宽度
  var sWidth=$(window).width();
   var left=(sWidth-56)/2+'px';
   $(".loader").css("left",left);
}


//导入本地的缓存，让页面显示相应的部门
function setTitle(){
    //导入本地的缓存
    var title=sessionStorage.getItem("title");
    $(".sec_nav").html("&gt;"+title);

    $(".nav_title").html(title);
}

//发送ajax请求，加载列表页面
function requestList(index){
    switch (index) {
        case 1:
        {
            sessionStorage.setItem("title", "教务处");
            $("#content").load("../partials/departmentList.html", function () {
                layout();
                departmentList();
                returnHome();
            });
        }
            break;
        case 2:
        {
            sessionStorage.setItem("title", "财务处");
            $("#content").load("../partials/departmentList.html", function () {
                layout();
                departmentList();
                returnHome();
            });

        }
            break;
        case 3:
        {
            sessionStorage.setItem("title", "人事处");
            $("#content").load("../partials/departmentList.html", function () {
                layout();
                departmentList();
                returnHome();
            });

        }
            break;
        case 4:
        {
            sessionStorage.setItem("title", "学工办");
            $("#content").load("../partials/departmentList.html", function () {
                layout();
                departmentList();
                returnHome();
            });

        }
            break;
        case 5:
        {
            sessionStorage.setItem("title", "资产管理");
            $("#content").load("../partials/departmentList.html", function () {
                layout();
                departmentList();
                returnHome();
            });

        }
            break;
        case 6:
        {
            sessionStorage.setItem("title", "移动OA");
            $("#content").load("../partials/departmentList.html", function () {
                layout();
                departmentList();
                returnHome();
            });
        }
            break;
    }
}
//发送ajax请求，加载正文页面
function requestArticle(index){


    switch (index) {
        case 1:
        {
            sessionStorage.setItem("title", "教务处");
            $("#content").load("../partials/departmentArticle.html",function(){
                layout();
                lighten(index);
                departmentArticle();
                returnHome();

            });
        }
            break;
        case 2:
        {
            sessionStorage.setItem("title", "财务处");
            $("#content").load("../partials/departmentArticle.html",function(){
                layout();
                lighten(index);
                departmentArticle();
                returnHome();

            });

        }
            break;
        case 3:
        {
            sessionStorage.setItem("title", "人事处");
            $("#content").load("../partials/departmentArticle.html",function(){
                layout();
                lighten(index);
                departmentArticle();
                returnHome();

            });

        }
            break;
        case 4:
        {
            sessionStorage.setItem("title", "学工办");
            $("#content").load("../partials/departmentArticle.html",function(){
                layout();
                lighten(index);
                departmentArticle();
                returnHome();

            });

        }
            break;
        case 5:
        {
            sessionStorage.setItem("title", "资产管理");
            $("#content").load("../partials/departmentArticle.html",function(){
                layout();
                lighten(index);
                departmentArticle();
                returnHome();

            });

        }
            break;
        case 6:
        {
            sessionStorage.setItem("title", "移动OA");
            $("#content").load("../partials/departmentArticle.html",function(){
                layout();
                lighten(index);
                departmentArticle();
                returnHome();

            });
        }
            break;
    }

}