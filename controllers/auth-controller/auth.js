const User = require('../../models/user')
const bcrypt = require('bcryptjs')
const getLogin = (req, res, next) => {
    let message = req.flash("error")
    if (message.length > 0) {
        message=message[0]
    } else {
        message= null
    }
    res.render("auth/login.pug", {pageTitle : "Login" , error: message})
}

const postLogin = (req,res, next) => {
    const email = req.body.email
    const enteredPassword = req.body.password
    User
    .findByEmail(email)
    .then(user => {
        if (!user) {
            req.flash("error" , "wrong email")
            return res.redirect("/login")
        }
        const userPassword = user.password
        bcrypt
        .compare(enteredPassword, userPassword)
        .then(doMatch => {
            if(doMatch) {
                req.session.isLoggedIn = true
                req.session.user = user
                res.redirect("/products")
            } else {
                req.flash("error", "wrong password")
                res.redirect("/login")
            }
        })

    })
    .catch(err => {
        console.log(err.message)
    })
}

const getSignUp = (req, res, next) => {
    let message = req.flash("error")
    if (message.length > 0) {
        message=message[0]
    } else {
        message= null
    }
    res.render("auth/signup.pug", {pageTitle: "SignUp", error: message})
}

const postSignUp = (req,res,next) => {
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    const cnfrmpassword = req.body.confirmpassword
    const cart = {items:[]}
    User.findByEmail(email).then(user => {
        if (user) {
            req.flash("error" , "Email already exists")
            res.redirect("/signup")
        } else {
            bcrypt.hash(password, 12)
            .then(enctyptedPassword => {
                const user1 = new User(name,email,enctyptedPassword, cart)
                user1.save()
                res.redirect("/login")
            })
            .catch(err => {
                console.log(err.message)
            })
        }
    }).catch(err=> {
        console.log(err)
    })
}

const postLogout = (req,res, next) => {
    req.session.destroy((err)=>{
        res.redirect("/")
    })
}


module.exports = {
    getLogin,
    postLogin,
    postLogout,
    getSignUp,
    postSignUp
}