var express = require('express');
var router = express.Router();
const quizModel = require("../model/quiz_model")

router.get('/', async function (req, res) {
    req.flash("indexMsg", `Welcome ${req.session.user ? req.session.user : ""}`)
    let quizData = []
    var quizs = await quizModel.find({})
    quizs.forEach(element => {
        let eachQuiz = []
        element.quiz.forEach((el) => { eachQuiz.push({ quizName: el.quizName, quizId: element._id, fetchingId: el.fetchingId }) })
        quizData.push.apply(quizData, eachQuiz);
    });
    quizData.sort(function () { return 0.5 - Math.random() });
    res.render('index', { indexMsg: req.flash("indexMsg"), title: 'Quiz App', accounts: quizData, user: req.session.user });
});

module.exports = router;
