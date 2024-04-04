const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors')
app.use(cors({origin: 'http://localhost:3000',
credentials:true}))
app.use(express.urlencoded({ extended: true }));
dotenv.config({path: './config.env'})
require('./db/config')
app.use(express.json());
const cookie = require('cookie-parser');
app.use(cookie())
app.use(require('./router/auth'))





app.use(cookieParse());
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



router.get('/', async (req, res) => {
    try {
        if (req.cookies.user_sid && req.session.user) {
            let data = await St.find().exec();
            res.render('index',{data})
        } else {
            res.redirect('/signin')
        }
    } catch (err) {
        console.log(err)
        res.redirect('/signin')
    }

   
})



router.post('/signup', (req, res) => {
    let user = new St({
        FullName: req.body.FullName,
        UserName: req.body.UserName,
        password: req.body.password,
        rol: req.body.rol
   })
    console.log(user);
    user.save().then((result) =>{
        console.log(result);
        res.redirect('/signin')
    }).catch((err) => {
        console.log(err);
    })
})
router.get('/signup', (req, res) => {
    res.render('signup')
})

router.get('/signin', (req, res) => {
    res.render('signin')
})
router.get('/user', (req, res) => {
    res.render('user')
})


router.post('/signin', async (req, res) => {
    let UserName = req.body.UserName,
        password = req.body.password,
    rol = req.body.rol
    try {
        var user = await St.findOne({ UserName: UserName })
            .exec()
        if (!user) {
            res.redirect('/signin')
        }
        user.comparePassword(password, (error, match) => {
      if ( !match) {
          return res.redirect('/signin');
         console.log("not");
      }
        })
         req.session.user=user
    
    console.log("login");
     
        if (rol === "Admin") {
            res.redirect('/')
        } else if (rol === "Student") {
            res.redirect('/user')
        } else {
            alert.notify({
                 title: 'Invalid role',
          message: 'Please select a valid role.',
            })
            return res.redirect('/signin')
        }
        
    } catch (err) {
        console.log(err);
    }
})

router.get('/data',async (req, res) => {
    try {
        let data = await St.find({});
        res.render('data', { data })
    } catch (err) {
        console.log(err);
    }
})

router.get('/delete/:id', async (req, res) => {
    try {
        let data = await St.findByIdAndRemove(req.params.id)
        res.redirect('../data')
    } catch (err) {
        console.log(err);
    }
})

router.get('/edit/:id', async (req, res) => {
    try {
        let data = await St.findById(req.params.id)
        res.render('edit',{data})
    } catch (err) {
        console.log(err);
    }
})

router.post('/edit/:id', async (req, res) => {
    let update = {
               FullName: req.body.FullName,
        UserName: req.body.UserName,
        password: req.body.password,
        role: req.body.role
        }
    try {
       

        let data = await St.findByIdAndUpdate(req.params.id, update);
res.redirect('../data')
    } catch (err) {
        console.log(err);
}

    
})
app.use('/',router)

const PORT = process.env.PORT;

app.listen(PORT)



