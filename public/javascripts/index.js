
$(document).ready(function () {
    $(".quiz-box").mouseenter(function () {
        $(this).css({ "animation-name": "example", "background-image": "linear-gradient(#ff00cc,#333399" })
    }).mouseleave(function () {
        $(this).css({ "animation-name": "none", "background-image": "linear-gradient(rgb(111, 125, 206),rgb(170, 16, 137))" })
    })
});