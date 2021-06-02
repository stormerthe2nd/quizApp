$(document).ready(function () {
    console.log("hello world")
    const qns = $(".qns")
    var count = 1
    $("#panel").click(function () {
        count++
        newQns = qns.clone()
        newQns.attr("id", `qns${count}`)
        $(`<button class="remove">question ${count}</button>`).appendTo(".remove-box")
        $(".remove").click(function () {
            $(`#qns${Number($(this).text().slice(-1))}`).remove()
            $(this).remove()
            count = count - 1
        })// not good try to delete element from the list instead of id numbers
        newQns.find(".qn-num").text(`Question ${count}`)
        newQns.appendTo("#ultimate-form")
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