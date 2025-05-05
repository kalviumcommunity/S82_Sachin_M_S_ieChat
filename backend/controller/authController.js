const User = require("../models/UserSchema")
const { generateToken } = require("../middleware/genToken")
const bcrypt = require("bcrypt")


module.exports.Signup = async (req,res,next)=>{
    try{
        const {email,password,username} = req.body
        if(!email || !password||!username)return res.status(400).json({message:"Give all the details"})
        const existingUser = await User.findOne({email})
        
        if(existingUser)return res.status(200).json({message:"User already exist"})

        const user = await User.create({username,email,password})
        const token = generateToken(user._id)

        res.cookie("token", token, {
            httpOnly: true,                             
            secure: false,
            sameSite: "Strict",                         
            maxAge: 1000 * 60 * 60 * 24,               
          });
        res.status(201).json({message:"User Signed in Successfully",success:true,user})

    }
    catch(err){
        console.error(err)

    }
}

module.exports.Login = async (req,res,next)=>{
    try{
        const {email,password} = req.body
        if(!email||!password){
            return res.status(400).json({message:"All fields are required"})
        }
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"User is not registerd"})
        }
        const auth = await bcrypt.compare(password,user.password)

        if(!auth){
            return res.status(400).json({message:"Incorrect Email or Password"})
        }
        const token = generateToken(user._id)
        res.cookie("token",token,{
            withCredentials:true,
            httpOnly:false
        })
        return res.status(201).json({message:"User Logged In Successfully",success:true})

    }
    catch(err){
        console.error(err)
    }

}

module.exports.Logout = async(req,res)=>{
    res.clearCookie("token",{
        httpOnly:true,
    })
    res.json({message:"Logged out"})
}

module.exports.Profile = async (req,res)=>{
    try{
        const user = await User.findById(req.userId).select("-password")
        if(!user)return res.status(404).json({message:"User Not Found"})
        return res.json(user)
    }catch(err){
        res.status(500).json({message:"Server Error"})
    }
}