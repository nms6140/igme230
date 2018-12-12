$(function(){
    $(".submenu").hide()

});

//onclick = $(function()){
                     //$(this).next(".submenu").slideToggle("slow")
                    // });
$(".menuitem").click(function(){
    $( this ).next(".submenu").slideToggle("slow")
});
