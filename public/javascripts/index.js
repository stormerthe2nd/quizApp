document.onreadystatechange = function () {
    var state = document.readyState
    if (state == 'interactive') {
        document.getElementById('contents').style.visibility = "hidden";
    } else if (state == 'complete') {
        setTimeout(function () {
            document.getElementById('interactive');
            document.getElementById('load').style.visibility = "hidden";
            document.getElementById('contents').style.visibility = "visible";
        }, 1000);
    }
}

$(document).ready(function () {
    function getOS() {
        var userAgent = window.navigator.userAgent,
            platform = window.navigator.platform,
            macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
            windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
            iosPlatforms = ['iPhone', 'iPad', 'iPod'],
            os = null;

        if (macosPlatforms.indexOf(platform) !== -1) {
            os = 'Mac OS';
        } else if (iosPlatforms.indexOf(platform) !== -1) {
            os = 'iOS';
        } else if (windowsPlatforms.indexOf(platform) !== -1) {
            os = 'Windows';
        } else if (/Android/.test(userAgent)) {
            os = 'Android';
        } else if (!os && /Linux/.test(platform)) {
            os = 'Linux';
        }

        return os;
    }
    if (getOS() == "Android" || getOS() == "iOS") {
        $("h2").addClass("notransition")
        $("#usr").addClass("notransition")
    } else {
        $("h2").addClass("glow")
        $("#usr").addClass("glow")
    }
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
                if (your_quiz.length < 1) {
                    $(`.loading-wheel`).css({ "display": "none" })
                    return $(`<div class="alert alert-info" style="margin-top:2em;text-align:center;" role="alert">
                    seems like you have'nt created any quiz yet, head over to <a href="/create_quiz" class="alert-link">create</a> to create one
                    </div>`).appendTo(".quiz-container-offcanvas")
                }
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

    $("#search-btn").click(function () {
        var keyword = $("#search-inp").val()
        if (!keyword) {
            $(`.loading-wheel-r`).css({ "display": "none" })
            return $(`<div class="alert alert-warning" style="text-align:center;" role="alert">
            please provide a query to search
            </div>`).appendTo(".quiz-container-offcanvas-r")
        }

        $.ajax({
            type: "GET",
            url: `/search/${keyword}`,
            beforeSend: function () {
                $(`.loading-wheel-r`).css({ "display": "block" })
                $(".quiz-container-offcanvas-r").empty()
            },
            success: function (resultArr) {
                if (resultArr.length < 1) {
                    $(`.loading-wheel-r`).css({ "display": "none" })
                    return $(`<div class="alert alert-info" style="text-align:center;" role="alert">
                    cannot find the quiz you're looking for
                    </div>`).appendTo(".quiz-container-offcanvas-r")
                }
                $("#offcanvasBottomLabel").text(`Showing results of '${keyword}'`)
                resultArr.forEach(el => {
                    $(`
                    <div class="card text-dark bg-light mb-3 quiz-objects-offcanvas "
                        style="float:left;"
                        onclick="location.href='/quiz/${el.quizId}/${el.fetchingId}'">
                        <div class="card-body quiz-box">
                            <h5 class="card-title"></h5>
                            <p class="card-text"></p>
                            </div >
                            <div class="card-header" style="text-align: center;">
                            ${el.quizName}
                            </div>
                            </div >
                            `).appendTo(".quiz-container-offcanvas-r")
                })
            },
            complete: function () {
                $(`.loading-wheel-r`).css({ "display": "none" })
            }
        })
    })
    $(".quiz-box").mouseenter(function () {
        $(this).css({ "animation-name": "example", "background-image": "linear-gradient(to bottom, rgb(57, 124, 141),rgb(109, 1, 136))" })
    }).mouseleave(function () {
        $(this).css({ "animation-name": "none", "background-image": "url(https://source.unsplash.com/300x300/?nature)" })
    })
});