$(document).ready(function () {
    $(".quiz-objects").mouseenter(function () {
        $(this).css({ "animation-name": "example", "background-color": "rgb(126, 43, 146)" })

    }).mouseleave(function () {
        $(this).css({ "animation-name": "none", "background-color": "firebrick" })
    })
});