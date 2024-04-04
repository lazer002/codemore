const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors')
app.use(cors({origin: 'http://localhost:3000',
credentials:true}))
const router = require('./router/auth')
dotenv.config({path: './config.env'})
require('./db/config')
const cookie = require('cookie-parser');
const session = require('cookie-session');
app.use(cookie())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cookie());
app.use(session({

    key: 'user_sid',
    secret: "my key",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expire: 60000,
    }
}));



app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie("user_sid")
    }
    next();
});

var sessionChecker = (req, res, next) => {
    if (req.cookie.user_sid && req.session.user) {
        res.redirect('/index')
    } else {
        next();
    }
}


app.use('/',router)

const PORT = process.env.PORT;

app.listen(PORT,()=>{
    console.log('running on 8484');
})



