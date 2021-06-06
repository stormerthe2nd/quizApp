const router = require("express").Router()
const quizModel = require("../model/quiz_model")

const extractQuiz = async function (req, res, next) {
    const { quizId, fetchingId } = req.params
    var allQuiz = await quizModel.findOne({ _id: quizId })
    var quiz = null
    allQuiz.quiz.forEach(element => {
        if (element.fetchingId === fetchingId) {
            quiz = element
        }
    });
    res.locals.allQuiz = allQuiz
    res.locals.quizId = quizId
    res.locals.fetchingId = fetchingId
    res.locals.quiz = quiz // particular quiz
    res.locals.location = allQuiz.quiz.indexOf(quiz)
    next()
}

router.get("/:quizId/:fetchingId", extractQuiz, async function (req, res) {
    res.render("edit_quiz", { quiz: res.locals.quiz, quizId: res.locals.quizId, flash: req.flash("invalidCorr") })
})

router.post("/:quizId/:fetchingId", extractQuiz, async function (req, res) {
    const { quizId, fetchingId, allQuiz } = res.locals
    var invalidCorr = false
    var quiz = res.locals.quiz.quiz
    res.locals.quiz.quizName = req.body.quizName || res.locals.quiz.quizName
    delete req.body.quizName   // to proper req.body
    var keys = Object.keys(req.body)
    for (var i of keys) {
        try {
            quiz[i.slice(2)][i.slice(0, 2)] = req.body[i]
        } catch (TypeError) {
            quiz[i.slice(4)][i.slice(0, 4)] = req.body[i]
        }
    }
    quiz.forEach(el => {
        el = Object.values(el)
        if (new Set(el).size == el.length) {
            invalidCorr = true
        }
    })
    if (invalidCorr) {
        req.flash("invalidCorr", "Correct Option is Supposed to be 1 of the 4 given Options")
        return res.redirect(`/edit_quiz/${quizId}/${fetchingId}`)
    }
    var model = await quizModel.findOne({ _id: quizId })
    model.quiz = allQuiz.quiz
    await model.save()
    req.flash("")
    res.redirect(`/edit_quiz/${quizId}/${fetchingId}`)
})

router.post("/:quizId/:fetchingId/delete", extractQuiz, async function (req, res) {
    const { fetchingId, quizId } = res.locals
    var model = await quizModel.findOne({ _id: quizId })
    var delIndex = null
    model.quiz.forEach(el => {
        el.fetchingId == fetchingId ? delIndex = model.quiz.indexOf(el) : {}
    })
    model.quiz.splice(delIndex, 1)
    await model.save()
    res.redirect("/")
})

router.post("/:quizId/:fetchingId/delete/:index", extractQuiz, async function (req, res) {
    try {
        const { fetchingId, quizId, allQuiz, location } = res.locals
        var model = await quizModel.findOne({ _id: quizId })
        allQuiz.quiz[location].quiz.splice(Number(req.params.index), 1)
        model.quiz = allQuiz.quiz
        await model.save()
        res.redirect(`/edit_quiz/${quizId}/${fetchingId}`)
    } catch (err) {
        res.send(`${err}`)
    }
})



module.exports = router