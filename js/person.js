
function person() {
    $(".info_list li").bind("click", function () {
        /*处理列表,让每一项的颜色变回去*/
        $(".info_list li").each(function (index) {
            $(this).css("background-color", " #F1F1F1");
        })
        /*点中的变化颜色*/
        $(this).css("background-color", "#E6F3FB");

        //正文部分的文本标题
        $("#choice").html($(this).html());
    });
}


