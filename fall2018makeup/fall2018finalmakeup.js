"use strict";

$(".menu").click(function(){
    $(this).next(".submenu").slideToggle("slow");
})

let text = ("story0.txt");
$("#story").load(text);


let clicks = 0;
$("#increment").click(function(){
    clicks++;
    console.log(clicks);
    $("#currentcount").html(clicks);
})
