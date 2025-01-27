const HttpError= require('../models/errorModle')
const User= require('../models/userModel')
const bcrypt= require('bcryptjs')
const jwt= require('jsonwebtoken')
const fs= require('fs')
const path= require('path')
const {v4:uuid}= require('uuid')

const registerUser= async (req,res,next)=>{
    try {
        const {name,email,password,password2}=req.body;
        
        if(!name || !email || !password){
            return next(new HttpError("Fill in all the fields", 422))
        }
        const newEmail= email.toLowerCase()

        const emailExists= await User.findOne({email:newEmail})
        if(emailExists){
            return next(new HttpError("Email already Exists", 422))
        }
        if((password.trim()).length<8){
            return next(new HttpError("Password should be atleast 8 characters", 422))
        }
        if(password!= password2){
            return next(new HttpError("Password do not match", 422))
        }
        const salt= await bcrypt.genSalt(10)
        const hashPass= await bcrypt.hash(password,salt)
        const newUser= await User.create({name:name, email:newEmail, password:hashPass})
        res.status(201).json(`New User ${newUser.email} is registerd`)
    } catch (error) {
        return next(new HttpError("User registration failed", 422))
    }
}



const loginUser= async (req,res,next)=>{
    try {
        const {email,password}= req.body
        if(!email || !password){
            return next(new HttpError("Fill in all the details.", 422))
        }
        const newEmail= email.toLowerCase()
        const user= await User.findOne({email:newEmail})
        if(!user){
            return next(new HttpError("Invalid Credentials", 422))
        }
        const compare= await bcrypt.compare(password, user.password)
        if(!compare){
            return next(new HttpError('Incorrect Password', 422))
        }
        const {_id:id,name}=user;
        const token= jwt.sign({id,name}, process.env.JWT_SECRETKEY,{expiresIn:"1d"})
        res.status(200).json({token,id,name})
    } catch (error) {
        return next(new HttpError("Login Failed. Please check your credentials.", 422))
    }
}




const getUser= async (req,res,next)=>{
    try {
        const {id}= req.params
        const user= await User.findById(id).select('-password');
        if(!user){
            return next(new HttpError("User Not Found", 404))
        }
        res.status(200).json(user)
    } catch (error) {
        return next(new HttpError(error))
    }
}




const changeAvatar= async (req,res,next)=>{
    try {
        if(!req.files.avatar){
            return next(new HttpError("Please choose an image.", 422))
        }
        const user= await User.findById(req.user.id)
        if(user.avatar){
            fs.unlink(path.join(__dirname,'..','uploads',user.avatar),(err)=>{
                if(err){
                    return next(new HttpError(err))
                }
            })
        }
        console.log(req.files)
        const {avatar}=req.files
        if(avatar.size>500000){
            return next(new HttpError("Profile picture too big. Should be less than 500kB"), 422)
        }
        let fileName;
        fileName=avatar.name
        let splitted= fileName.split('.')
        let newFileName=splitted[0]+uuid()+'.'+splitted[splitted.length-1]
        avatar.mv(path.join(__dirname,'..','uploads', newFileName), async (err)=>{
            if(err){
                return next(new HttpError(err))
            }
            const updatedAvatar= await User.findByIdAndUpdate(req.user.id, {avatar:newFileName})
            if(!updatedAvatar){
                return next(new HttpError("Avatar couldn't be changed",422))
            }
            res.status(200).json(newFileName)
        })
    } catch (error) {
        return next(new HttpError(error))
    }
} 



const editUser= async (req,res,next)=>{
    try {
        const {name,email, currentPassword, newPassword, confirmPassword}= req.body
        if (!name || !email || !currentPassword || !newPassword || !confirmPassword){
            return next(new HttpError("Fill in all the details"), 422)
        }
        const user = await User.findById(req.user.id)
        if(!user){
            return next(new HttpError("User Not found"), 422)
        }
        const emailExists= await User.findOne({email:email})
        if(emailExists && (emailExists._id!=req.user.id)){
            return next(new HttpError("Email already exists", 422))
        }
        const compare= await bcrypt.compare(currentPassword,user.password)
        if(!compare){
            return next(new HttpError("Invalid current Password", 422))
        }
        if(newPassword!=confirmPassword){
            return next(new HttpError("Passwords do not match", 422))
        }
        const salt= await bcrypt.genSalt(10)
        const hashPass= await bcrypt.hash(newPassword,salt)
        const newInfo= await User.findByIdAndUpdate(req.user.id, {name, email, password:hashPass}, {new:true})
        res.status(200).json(newInfo)
    } catch (error) {
        return next(new HttpError(error))
    }
}




const getAuthors= async (req,res,next)=>{
    try {
        const authors= await User.find().select('-password')
        res.json(authors)
    } catch (error) {
        return next(new HttpError(error))
    }
}

module.exports={registerUser,loginUser,getUser,changeAvatar,editUser,getAuthors}
