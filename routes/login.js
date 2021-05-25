const router = require('express').Router()
const user = require('../model/login_model')
const bcrypt = require("bcrypt")

router.get('/', function (req, res) {
    res.render('login', { flash: req.flash('msg') })
})

router.post('/', async function (req, res) {
    const { email, paswd } = req.body
    var existingUser = await user.find({ "email": email })
    if (existingUser[0] && await bcrypt.compare(paswd, existingUser[0].password)) {
        req.session.userId = existingUser[0]._id
        req.session.user = existingUser[0].username
        req.flash("msg", "logged in")
        return res.redirect('/')
    }
    else if (!existingUser[0]) {
        req.flash('msg', 'User Does Not Exists')
        return res.redirect('/login')
    }
    else {
        req.flash('msg', 'Email or Password Incorrect')
        return res.redirect('/login')
    }
})

module.exports = router