const router = require("express").Router()
const user = require('../model/login_model')
const quiz = require('../model/quiz_model')
const bcrypt = require("bcrypt")

router.get('/', function (req, res) {
    res.render('register', { flash: req.flash('msg') })
})

router.post('/', async function (req, res) {
    const { username, email, paswd, paswd2 } = req.body
    var exists = await user.find({ 'email': email })
    if (exists[0]) {
        req.flash("msg", "This Email Address is already in use, Login Instead")
        return res.redirect('/register')
    }
    if (paswd != paswd2) {
        req.flash("msg", "passwords do not match")
        return res.redirect('/register')
    }
    await new user({
        username: username,
        email: email,
        password: await bcrypt.hash(paswd, 12)
    }).save()
    var newMember = await user.find({ "email": email })
    await new quiz({
        _id: newMember[0]._id,
        email: email
    }).save()
    req.flash("msg", "Account Created")
    res.redirect('/register')
})

module.exports = router