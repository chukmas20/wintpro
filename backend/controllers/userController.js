const User = require("../models/userModel")
const asyncHandler = require("express-async-handler");
const sendToken = require("../utils/jwtToken");

exports.registerUser = asyncHandler(async(req,res)=>{


     const {name, email, password} = req.body;

     const user = await User.create({
         name, email,password,
     })

     sendToken(user,201,res);

})


// Login User
exports.loginUser = asyncHandler(async(req, res) => {
    const {email, password} = req.body

    if(!email || !password){
       return  res.status(400).json({
           success: false,
           message:"Please enter your email and password"
       })
    }

    const user = await User.findOne({email}).select("+password")
    if(!user){
       return  res.status(400).json({
           success: false,
           message:"User does not exist"
       })
    }
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
       return  res.status(401).json({
           success: false,
           message:"Invalid email or password"
       })
    }
  
    sendToken(user, 200, res);
})

// Logout
exports.logout = asyncHandler(async(req, res) =>{
   
   res.cookie("token", null, {
       expires: new Date(Date.now()),
       httpOnly:true
   })
   res.status(200).json({
       success:true,
       message:"Logged out successfully"
   })
})

// GET USER DETAIL
exports.getUserDetails = asyncHandler(async(req, res,next)=>{
    const user = await User.findById(req.user.id)

    res.status(200).json({
        success: true,
        user
    })
})

// Update USER Profile
exports.updateProfile = asyncHandler(async(req, res)=>{
    const newUserData={
        name:req.body.name,
        email:req.body.email
    }


    const user = await User.findByIdAndUpdate(req.user.id, newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })

    res.status(200).json({
        success:true,
    })  
})

exports.getSingleUser = asyncHandler(async(req, res)=>{
    const user = await User.findById(req.params.id);
    if(!user){
        return res.json({
            success:false,
            message:`User does not exist with id: ${req.params.id}`
        })
    }
    res.status(200).json({
       success:true,
       user
   })
})