const router = require('express').Router()

router.get('/', function (req, res) {
    req.session.destroy()
    res.redirect('/')
})

module.exports = router