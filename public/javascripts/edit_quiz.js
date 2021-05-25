
$(document).ready(function () {
    console.log("starting script")
    var storeTxt = null
    var storeEl = null
    var id = null
    $(".changers").click(function () {
        if ($(this).text() != "cancel") {
            storeTxt = $(this).text()
            id = $(this).attr("for")
            storeEl = $(`#${id}`)[0].outerHTML
            $(`#${id}`).replaceWith(`<input id=${id} name=${id} type='text' required='true'></input>`)
            $(this).text("cancel")
        } else {
            $(this).text(`${storeTxt}`)
            $(`#${id}`).replaceWith(storeEl)
        }

    })
})