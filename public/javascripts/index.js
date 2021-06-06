// TODO your quiz offcanvas does not animate
$(document).ready(function () {
    $("#your-quiz-offcanvas").click(function () {
        $(".quiz-container-offcanvas").empty()
        $.ajax({
            type: "GET",
            url: `/your_quiz/view_my_quiz/json/${id}`,
            beforeSend: function () {
                $(`.loading-wheel`).css({ "display": "block" })
            },
            success: function (data, status) {
                var your_quiz = data.your_quiz
                your_quiz.forEach(el => {
                    $(`
                    <div class="card text-dark bg-light mb-3 quiz-objects-offcanvas"
                        onclick="location.href='/quiz/${id}/${el.fetchingId}'">
                        <div class="card-body quiz-box">
                            <h5 class="card-title"></h5>
                            <p class="card-text"></p>
                        </div >
                        <div class="card-header" style="text-align: center;">
                            ${el.quizName}
                        </div>
                    </div >
                    `).appendTo(".quiz-container-offcanvas")
                })
            },
            complete: function () {
                $(`.loading-wheel`).css({ display: "none" })
            }
        });
    })
    $(".quiz-box").mouseenter(function () {
        $(this).css({ "animation-name": "example", "background-image": "linear-gradient(#ff00cc,#333399" })
    }).mouseleave(function () {
        $(this).css({ "animation-name": "none", "background-image": "linear-gradient(rgb(111, 125, 206),rgb(170, 16, 137))" })
    })
});