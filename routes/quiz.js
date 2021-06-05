var router = require("express").Router()
var quizModel = require("../model/quiz_model")


router.post("/", async function (req, res) {
    var givenQns = Object.keys(req.body)
    var counter = 0
    var quiz = router.quiz
    for (i of givenQns) {
        quiz[i].corr == req.body[i] ? counter++ : {}
    }
    let score = `${counter}|${quiz.length}`
    res.redirect(`/quiz/${router.quizId}/${router.fetchingId}/${score}`)
})

router.get('/:quizId/:fetchingId/:score', function (req, res) {
    let score = req.params.score.split("|")
    res.render("quiz_completed", { score: score[0], outOf: score[1] })
})


router.get('/:quizId/:fetchingId', async function (req, res) {
    const { fetchingId, quizId } = req.params
    router.quizId = quizId
    router.fetchingId = fetchingId
    let quizData = await quizModel.find({ _id: quizId })
    let quiz = null
    quizData[0].quiz.forEach(el => {
        if (el.fetchingId == fetchingId) {
            quiz = el
            router.quiz = quiz.quiz
        }
    });
    res.render('quiz', { quiz: quiz, creator: (req.session.userId == quizId) ? req.session.user : null, quizId: quizId, fetchingId: fetchingId })
})

module.exports = router