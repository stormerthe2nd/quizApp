
$(document).ready(function () {
    let i = 0
    const proper_nums = function () {
        let qn = document.getElementsByClassName("p-qns")
        for (i in Object.values(qn)) {
            let j = parseInt(i) + 1
            qn[i].innerHTML = `Question ${j}`
        }
    }
    $("#new-quiz-panel").click(() => {
        var select = []
        i++
        $("<div/>", { class: "qns", id: `new-div${i}` }).appendTo("#ultimate-form")
        $("<div/>", { class: "split-line" }).appendTo(`#new-div${i}`)
        $(`<button type="button" id="cancel-${i}" class="btn-close cancel" aria-label="Close"></button>
        `).appendTo(`#new-div${i}`)
        $("<p class='p-qns'></p>").appendTo(`#new-div${i}`)
        var elements = [
            $("<input/>", { class: "form-control", placeholder: "question", type: "text", name: `qn${i}`, required: "required" }),
        ]
        for (j of [1, 2, 3, 4]) {
            elements.push($("<input/>", { class: "form-control", placeholder: `option ${j}`, type: "text", name: `a${j}${i}`, required: "required" }))
            select.push($("<option/>", { value: `a${j}${i}`, text: `Option ${j}` }))
        }

        elements.push($("<select/>", { class: "form-select", "aria-label": "Default select example", name: `corr${i}`, id: `select-${i}` }))
        elements.forEach(element => {
            element.appendTo(`#new-div${i}`)
        });
        select.forEach(element => {
            element.appendTo(`#select-${i}`)
        })

        $(".cancel").on("click", function (event) {
            event.stopPropagation();
            event.stopImmediatePropagation();
            $(`#new-div${$(this).attr('id').split("-")[1]}`).remove()
            proper_nums()
        })
        proper_nums()
    })

})