require('dotenv').config()
const DB_URL = "mongodb+srv://project1:neverarrogant4$@firstcluster.lpuvi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require("express-session")
const mongoSession = require("connect-mongodb-session")(session)
const flash = require("connect-flash")

const mongoose = require("mongoose")
mongoose.connect(DB_URL, {
    useNewUrlParser: true, useUnifiedTopology: true,
    useCreateIndex: true, useFindAndModify: false
}).then(() => console.log("database connected " + DB_URL))
    .catch((err) => console.log(err));

const store = new mongoSession({ uri: DB_URL, collection: "Session" })

var indexRouter = require('./routes/index');
var quizRouter = require('./routes/quiz');
var registerRouter = require('./routes/register');
var loginRouter = require('./routes/login')
var logoutRouter = require('./routes/logout')
var createRouter = require('./routes/create_quiz')
var yoursRouter = require('./routes/your_quiz')
var editRouter = require('./routes/edit_quiz')


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: "$0jGsb,(^&alKJ4+",
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: { maxAge: 6000000 }
}))
app.use(flash())
app.use(function (req, res, next) {
    if (!req.session.user) {
        (req.path == "/" || req.path == "/register" || req.path == "/login") ? next() : res.redirect("/login")
    } else {
        (req.path == "/register" || req.path == "/login") ? res.redirect("/") : next()
    }
})

app.use('/', indexRouter);
app.use('/quiz', quizRouter)
app.use('/login', loginRouter)
app.use('/register', registerRouter)
app.use('/logout', logoutRouter)
app.use('/create_quiz', createRouter)
app.use('/your_quiz', yoursRouter)
app.use('/edit_quiz', editRouter)

module.exports = app;
