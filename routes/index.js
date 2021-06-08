var express = require('express');
var router = express.Router();
const quizModel = require("../model/quiz_model")

const fetchDbMiddleware = async function (req, res, next) {
    let quizData = []
    var quizs = await quizModel.find({})
    quizs.forEach(element => {
        let eachQuiz = []
        element.quiz.forEach((el) => { eachQuiz.push({ quizName: el.quizName, quizId: element._id, fetchingId: el.fetchingId }) })
        quizData.push.apply(quizData, eachQuiz);
    });
    res.locals.quizData = quizData
    next()
}

router.get('/', fetchDbMiddleware, function (req, res) {
    var quizData = res.locals.quizData
    quizData.sort(function () { return 0.5 - Math.random() });
    res.locals.quizData = quizData
    res.render('index', { title: 'Quiz App', accounts: quizData, user: req.session.user, userId: req.session.userId, your_quiz: [] });
});

router.get("/search/:keyword", fetchDbMiddleware, function (req, res) {
    var quizData = res.locals.quizData
    var resultArr = []
    quizData.forEach(el => { el.quizName.includes(req.params.keyword) ? resultArr.push(el) : {}; })
    res.json(resultArr)
})

module.exports = router;
