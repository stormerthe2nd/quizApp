const router = require("express").Router()
const quiz_model = require("../model/quiz_model")

router.get("/", async function (req, res) {
    userData = await quiz_model.find({ _id: req.session.userId })
    res.render("your_quiz", { accounts: userData[0].quiz, id: req.session.userId })
})

module.exports = router