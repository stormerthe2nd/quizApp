const router = require("express").Router()
const acc = require("../model/login_model")
const quiz = require("../model/quiz_model")
const uniqid = require('uniqid');

router.get("/", function (req, res) {
    res.render("create_quiz", {})
})

router.post("/", async function (req, res) {
    var email = await acc.find({ _id: req.session.userId })
    email = email[0]
    console.log("req.body-->", req.body)
    var quizData = {
        quizName: req.body.quizName,
        quiz: null,
        fetchingId: uniqid()
    }
    Object.keys(req.body).forEach((el) => {
        if (el.startsWith("corr")) {
            req.body[el] = req.body[req.body[el]]
        }
    })
    var rawList = Object.values(req.body)
    var preparedList = []
    for (var i = 1; i < rawList.length; i = i + 6) {
        preparedList.push({
            qn: rawList[i],
            a1: rawList[i + 1],
            a2: rawList[i + 2],
            a3: rawList[i + 3],
            a4: rawList[i + 4],
            corr: rawList[i + 5],
        })
    }
    quizData.quiz = preparedList
    console.log("quizData -->", quizData)
    await quiz.findOneAndUpdate({ email: email.email },
        {
            $addToSet: { quiz: quizData }
        },
        function (err) {
            if (err) return res.status(500).redirect('/')
            return res.redirect("/create_quiz")
        })
})

module.exports = router