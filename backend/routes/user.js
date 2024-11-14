const express = require('express');
const session = require('express-session');
const passport = require('passport');

require('./auth');

const userRouter = express.Router();

userRouter.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
userRouter.use(passport.initialize());
userRouter.use(passport.session());

function isLoggedIn(req,res,next){
    req.user ? next() : res.sendStatus(401);
}

userRouter.get("/login",(req,res)=>{
    res.send('<a href="/auth/google">Autheticate</a>');
})
userRouter.get("/protected",isLoggedIn,(req,res)=>{
    //
})

userRouter.get("/failure",(req,res)=>{
   //
})


userRouter.get("/auth/google",
    passport.authenticate('google', {scope:['email','profile']}))

userRouter.get("/google/callback",
    passport.authenticate('google',{
        successRedirect:'/protected',
        failureRedirect:'/failure'
    })
)

module.exports = {
    userRouter,
}