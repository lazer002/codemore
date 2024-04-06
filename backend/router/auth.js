
let express = require('express');
const router = express.Router();
let User = require('../model/signupschema');
let News = require('../model/news');
const bcrypt = require("bcrypt")
const Authentication = require("../middelware/authentication")




router.post('/signup', async(req,res) => {
    console.log(req.body);
const {Username,Email,Password,Phone_number} = req.body
if(!Username||!Email||!Password||!Phone_number){
return res.status(422).json({error:"fill all fileds"})

}
try{
 const exuser = await User.findOne({Email:Email})
 if(exuser){
     res.status(422).json({error:"already a account"})
}else{
     res.status(200).json({message:"account created"})
}

const data =  new User({Username,Email,Password,Phone_number})
const datasave = data.save()
if(datasave){
    res.status(201).json("data registered")
}
}
catch(err){
    console.log(err)
}
})





// router.post('/signin',Authenticate, async(req, res) => {
//     const {Email,Password}=req.body;
//     if(!Email||!Password){
//     return res.status(422).json({error:"fill all fileds"})
    
//     }
//     try{
//      const userlogin = await User.findOne({Email:Email})
//       console.log(userlogin);
//      if(userlogin){
// const match = await bcrypt.compare(Password,userlogin.Password)

// const token=await userlogin.generateAuthtoken()
// console.log(token)

// res.cookie("jwtoken",token,{
//     expires:new Date(Date.now()+60000000),
//     httpOnly:true
// })
   
//     if(!match){
// res.json({error:"invalid credentials"})    }
// else{res.json({message:"signuup successfully"})}

//     }}
//     catch(err){
//     console.log(err)
// }
// })


router.post('/signin',async(req,res)=>{
 
  const{Email,Password}=req.body;
  if(!Email||!Password){
  
      return res.status(422).json({massage:'pls enter valid password and email'})
  }
  try{
       const user=await User.findOne({Email:Email});
      // console.log(user);
     
      if(user)
          {
        const isMatch=await bcrypt.compare(Password,user.Password);
          const token=await user.generateAuthtoken()
          // console.log(token);

          res.cookie("jwtoken",token,{
              expires:new Date(Date.now()+ 600000000000),
              httpOnly:true
          });
          
       if(!isMatch)
      {
          res.json({error:"invalid credentials"});
     }
     else{
      res.json({message:"login successful"});
     }
         }
         
         
  else{
          res.json({error:"invalid credentials"});
  }
}  catch(err){
      console.log(err);
  }
  });

























router.get("/userpanel",Authentication,(req,res)=>{
    res.send(req.rootUser)
})

router.get("/contect",Authentication,(req,res)=>{
    res.send(req.rootUser);
})
    
    
    

router.post("/contect",Authentication,async(req,res)=>{
    try{
const {Username,Email,Phone_number,subject,message}=req.body;
if(!Username||!Email||!Phone_number||!subject||!message){

    return res.status(422).json({error:"fill all plz"})
}
const contect = await User.findOne({_id:req.userID})
if(contect){
    const newmessage = await contect.addMessage(Username,Email,Phone_number,subject,message)

await contect.save()
res.status(201).json("message send")}
}catch(err){
    console.log(er)
}})




router.post("/news",Authentication,async(req,res)=>{
    try{
const {newsemail}=req.body;
if(newsemail){

    return res.status(422).json({error:"already message send"})
}
const contect = await News.findOne({newsemail:newsemail})
if(contect){
    res.status(422).json({error:"already message send"})
}else{
    res.status(200).json({message:"message send"})

}

const Mgs =  new News({newsemail})
const data = Mgs.save()
if(data){
    res.status(201).json("data registered")
}
}
catch(err){
    console.log(err)
}
})






module.exports = router