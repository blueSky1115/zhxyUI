
$(document).ready(function() {
		render();

    //打开页面时，
    $('#name,#password').blur(function(){
        if($(this).val()==""){
                alert("输入不能为空");
        }

    });

    //表单验证
    $("#loginForm").submit(function(e){
        if($("#name").val()==""||$("#password").val()==""){
            e.preventDefault();
            alert("输入不能为空");
        }

    });

});
function render(){
	//js渲染，做一点自适应
		var sHeight=$(document).height();  // 浏览器窗口高度
	
		var sWidth=$(document).width();    // 浏览器窗口宽度

		/*画布渲染背景，颜色渐变*/
		var canvas=$("#canvas").get(0);  //jquery对象转dom对象，操作canva的api
		//画布大小覆盖整一个页面
		
		canvas.width=sWidth;
		
		canvas.height=sHeight;
		var context=canvas.getContext('2d');
		var gradient1=context.createLinearGradient(0,0,Math.floor(sWidth/2),0); //创建线性渐变
		var gradient2=context.createLinearGradient(Math.floor(sWidth/2),0,sWidth,0);
		gradient1.addColorStop(0,'#0387C5');  //蓝色渐变
		gradient1.addColorStop(1,'#1FFAFC');  //浅
		gradient2.addColorStop(1,'#0387C5');  //蓝色渐变
		gradient2.addColorStop(0,'#1FFAFC');  //浅
		context.fillStyle=gradient1;
		context.beginPath();
		context.fillRect(0,0,Math.floor(sWidth/2),sHeight);
		context.closePath();

		context.beginPath();
		context.fillStyle=gradient2;
		context.fillRect(Math.floor(sWidth/2),0,sWidth,sHeight);
		context.closePath();

		
		//js渲染登录框部分的位置，让它居中
		var $content=$('#content');
		var left=(sWidth-$content.width())/2;
		var top=(sHeight-$content.height())/2+100;
		$content.css({"top":top,"left":left});

		//js渲染 logo 图片，让它居于登录框的上面
		var $logo=$('#logo');
		var ileft=(sWidth-$logo.width())/2;
		var itop=top-$logo.height()-10;
		$logo.css({"top":itop,"left":ileft});
}
//窗口改变大小时触发事件
$(window).resize(function(){
	render();
});