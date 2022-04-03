const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
     name:{
         type:String,
         required: [true, "Please enter your name"],
         maxlength:[50, "Name cannot exceed 50 characters"],
         minlength:[2, "Name should be at least 2 characters"],
     },
      email:{
        type:String,
        required: [true, "Please enter your email"],
        unique: true,
        validate:[validator.isEmail,"Please enter a valid email"]
    },
     password:{
        type:String,
        required: [true, "Please enter your password"],
        minlength:[6, "Password should be at least 6 characters"],
        select:false 
     },
    //  role: {
    //      type:String,
    //      default: "user"
    //  },

     createdAt:{
         type:Date,
         default: Date.now
     },
    
})

userSchema.pre("save", async function(next){

    if(!this.isModified("password")){
       next();
    }

    this.password = await bcrypt.hash(this.password, 10)
})

//JWT TOKEN

userSchema.methods.getJWTToken = function (){
     return jwt.sign({id:this._id}, process.env.JWT_SECRET,{
         expiresIn: process.env.JWT_EXPIRE
     })
}

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password)
}




module.exports = mongoose.model("User", userSchema);