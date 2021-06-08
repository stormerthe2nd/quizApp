$(document).ready(function () {
    $("#submit").click(function (event) {
        event.preventDefault()
        $(".modal-body").empty()
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
                $(`
                <div class="alert alert-success" style="text-align:center;" role="alert">
                    you have chosen ${res.score.split("|")[0]} correct questions out of ${res.score.split("|")[1]}
                </div>
                `).appendTo(".modal-body")
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
            }
        });
    });
})