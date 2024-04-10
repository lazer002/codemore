const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors')
app.use(cors({origin: 'http://localhost:3000',
credentials:true}))
dotenv.config({path: './config.env'})
const bodyparser = require('body-parser')
const router = require('./router/auth')
const cookie = require('cookie-parser');

const session = require('express-session');

require('./db/config')
app.use(express.json());
app.use(bodyparser.urlencoded({extended:true}))

app.use(session({

    secret: process.env.Secret_key,
    resave:false,
    saveUninitialized:false ,
    cookie:{
        maxAge:600000
    }
}));
// sessionStorage.setItem('jwtToken', jwtToken);


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



