"use strict";
$(function(){
    $(".projects").hide()
});

$(".top").click(function(){
    $(this).next("").slideToggle("slow");
})
