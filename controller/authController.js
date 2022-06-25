
const User = require('../models/User')
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");

// const duplicateEmail = (err) => {
//     let errors = { email: '', password: '' };
  
//     if (err.code === 11000) {
//       errors.email = 'that email is already registered';
//       return errors;
//     }
//   }
const duplicateEmail = (err) => {
    let errors = { email: '', password: '' };
  
    if (err.code === 11000) {
      errors.email = 'that email is already registered';
      return errors;
    }
  }

  const loginAuth = (err)=>{
    let errors ={email:'',password:''}
    if(err.message ==='incorrect email'){
        errors.email = 'Login failed'
    }
    else if(err.message==='incorrect password'){
        errors.password = 'login failed'
    }
    return errors
  }
  

const maxAge = 3*24*60*60
const createToken =(id)=>{
    return jwt.sign({id},'setu',{
        expiresIn:maxAge
    })
}
function signUpGet(req,res){
    res.render("signup")
}
async function signUpPost(req,res){
 

 try{
    const {email,password} =req.body
    // const userEmail = await User.findOne({email});
    // if (userEmail) return res.status(404).send("User already SignUp with this email");

    const hasedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        email,
        password: hasedPassword
    });
    

    await newUser.save();
    // const token =createToken(newUser._id)
    // res.cookie('jwt',token,{ httpOnly:true ,maxAge: maxAge*1000})

    res.json({user:newUser._id});

 }
 catch (err){

       const errors = duplicateEmail(err)
       res.status(400).json({ errors });

 }
}
function loginGet(req,res){
    res.render("login")

}
async function loginPost(req,res){
    const { email, password } = req.body;

    try {
      const user = await User.login(email, password);
      const token =createToken(user._id)
      res.cookie('jwt',token,{ httpOnly:true ,maxAge: maxAge*1000})
      res.status(200).json({ user: user._id });
    } catch (err) {
    const errors = loginAuth(err);
    res.status(400).json({ errors });
    console.log(err)
    }
}

function logOut(req,res){
    res.cookie('jwt','',{maxAge:1});
    res.redirect('/');

}

module.exports ={
    signUpGet, 
    signUpPost,
    loginGet,
    loginPost,
    logOut
}