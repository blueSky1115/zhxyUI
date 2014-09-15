
function departmentArticle(){
    $(".small_left").on("click",function(event){
        event.preventDefault();
        createloading();
        layout();
        $("#content").load("../partials/departmentList.html",function(){
            layout();
            departmentList();
            returnHome();
        });
    });

   //导入本地的缓存
    setTitle();
}