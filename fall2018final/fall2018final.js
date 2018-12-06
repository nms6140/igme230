"use strict";
$(function(){
    $(".list").hide()
});

$(".top").click(function(){
    $(this).next(".list").slideToggle("slow");
})

let text = ("article0.txt");
$("radio").val(text);
$(h2).load(text);

    $("input[type=radio] [name= content-menu]").change(function(){
        text = $(this).val();
        $(h2).load(text);
    });
