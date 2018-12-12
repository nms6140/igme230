$(function(){
    $(".submenu").hide()

});

//onclick = $(function()){
                     //$(this).next(".submenu").slideToggle("slow")
                    // });
$("menubox").click(function(){
    $( this ).next(".submenu").slideToggle("slow")
});
