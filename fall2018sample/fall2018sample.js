'use strict';
$(function(){
    $(".submenu").hide()

});

//onclick = $(function()){
                     //$(this).next(".submenu").slideToggle("slow")
                    // });
$(".menuitem").click(function(){
    $( this ).next(".submenu").slideToggle("slow")
});



let content = "content1.txt";
$("#choose-content").val(content);
$("#content").load(content);

$("#choose-content").change(function(){
    content = $(this).val();
    $("#content").load(content);
})
