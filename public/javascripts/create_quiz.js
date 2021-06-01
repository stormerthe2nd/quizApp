$(document).ready(function () {
    $("#panel").click(function () {
        $(".create-body").clone().appendTo("body")
    })
})

// $(document).ready(function () {
//     let i = 0
//     var log = console.log
//     $("#new-quiz-panel").click(() => {
//         var select = []
//         i++
//         $("<div/>", { class: "qns", id: `new-div${i}` }).appendTo("#ultimate-form")
//         var elements = [
//             $("<label/>", { for: `qn${i}`, text: "Question" }),
//             $("<input/>", { type: "text", name: `qn${i}`, required: "required" }),
//         ]
//         for (j of [1, 2, 3, 4]) {
//             elements.push($("<label/>", { for: `a${j}${i}`, text: `Option ${j}` }))
//             elements.push($("<input/>", { type: "text", name: `a${j}${i}`, required: "required" }))
//             select.push($("<option/>", { value: `a${j}${i}`, text: `Option ${j}` }))
//         }
//         elements.push($("<label/>", { for: `corr${i}`, text: `select the correct option` }))
//         elements.push($("<select/>", { name: `corr${i}`, id: `select-${i}` }))
//         elements.forEach(element => {
//             element.appendTo(`#new-div${i}`)
//         });
//         select.forEach(element => {
//             element.appendTo(`#select-${i}`)
//         })

//     })
// })