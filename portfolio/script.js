"use strict";

$(function(){
    $(".submenu").hide()

});

$(".menuitem").click(function(){
    $( this ).next(".submenu").slideToggle("slow")
});
