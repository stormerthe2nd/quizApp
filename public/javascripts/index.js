
$(document).ready(function () {
    $(".quiz-box").mouseenter(function () {
        $(this).css({ "animation-name": "example", "background-color": "rgb(126, 43, 146)" })
    }).mouseleave(function () {
        $(this).css({ "animation-name": "none", "background-color": "blueviolet" })
    })
});