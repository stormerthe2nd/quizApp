
$(document).ready(function () {
    $(window).keydown(function (event) {
        if (event.keyCode == 13) {
            event.preventDefault();
            return false;
        }
    });
    $(".changers").click(function () {
        if ($(this).html() != `<i class="fa fa-times"></i>`) {
            this.customs = { id: null, storeEl: null }
            this.customs.id = $(this).attr("for")
            this.customs.storeEl = $(`#${this.customs.id}`)[0].outerHTML
            $(`#${this.customs.id}`).replaceWith(`<input class="form-control form-control-sm" style="width:70%" id=${this.customs.id} name=${this.customs.id} type='text' placeholder="${$(this.customs.storeEl).text().trim()}" required='true'></input>`)
            inputInDisplay = true
            $(this).html(`<i class="fa fa-times"></i>`)
        } else {
            $(this).html(`<i class="fa fa-edit"></i>`)
            $(`#${this.customs.id}`).replaceWith(this.customs.storeEl)
            inputInDisplay = false
        }

    })
})