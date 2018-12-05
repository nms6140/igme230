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
$("#content").load(content);

