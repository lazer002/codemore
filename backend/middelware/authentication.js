


const User = require('../model/signupschema');
const jwt = require("jsonwebtoken")

const Authentication =  (req,res,next)=>{
try{
    const token=  req.cookies.token;
console.log(token,'gggg');
if(!token){
    throw new Error ("user not found")
}
 jwt.verify(token,process.env.Secret_key,(err,decoded)=>{
    if(err) return res.json('token wrong')
    next()
})}
catch(err){
    res.status(401).send("unauthorized:no token provided")
    console.log(err)
}
}

module.exports=Authentication;

