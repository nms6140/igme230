"use strict";

$(".menu").click(function(){
    $(this).next(".submenu").slideToggle("slow");
})

let text = ("story0.txt");
$("#story").load(text);


