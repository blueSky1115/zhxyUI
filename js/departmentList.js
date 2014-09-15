
function departmentList(){

    //列表的链接
    $(".dm .list").on("click",function(){

        //发出请求
        createloading();
        layout();
        $("#content").load("../partials/departmentArticle.html",function(){
            layout();
            departmentArticle();
            returnHome();
        });
    });

    setTitle();


}


