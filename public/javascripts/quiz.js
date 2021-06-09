$(document).ready(function () {
    $("#submit").click(function (event) {
        event.preventDefault()
        var formData = {}
        $("form input").each(function () {
            var input = $(this);
            var name = input.attr("name")
            var checked = input.prop("checked")
            if (!checked) { }
            else formData[`${name}`] = input.val()
        })
        $.ajax({
            url: "/quiz",
            type: "POST",
            data: formData,
            async: false,
            success: function (res, textStatus, jqXHR) {
                $(`#success`).text(`you have chosen ${res.score.split("|")[0]} correct questions out of ${res.score.split("|")[1]}`)
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
            }
        });
    });
})