
function departmentList(){

    //列表的链接
    $(".dm .list").on("click",function(){

        //发出请求
        $("#content").html("正在载入内容");
        $("#content").load("../partials/departmentArticle.html",function(){
            layout();
        });
    });
}


