const router = require("express").Router()
const quiz_model = require("../model/quiz_model")

router.get("/view_my_quiz/json/:id", async function (req, res, next) {
    if (req.params.id != req.session.userId) {
        return res.redirect('/login')
    }
    userData = await quiz_model.find({ _id: req.session.userId })
    res.json({ your_quiz: userData[0].quiz })
})

module.exports = router