const User = require("../models/userModel")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')



exports.signup = asyncHandler ( async (req,res) => {
    const {name, email, password} = req.body
    if(!name || !email || !password){
        res.status(400)
        throw new Error('Please add all fielsq')
    }
    const userExist = await User.findOne({email})
    if(userExist){
        res.status(400)
        throw new Error('User already exists')
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const user = await User.create({
        name,
        email,
        password : hashedPassword
    })
    if(user){
        res.status(201).json({
            _id : user._id,
            name : user.name,
            email : user.email,
            token : this.generateToken(user._id)
        })
    }else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})


exports.login = asyncHandler ( async (req,res) => {
    const {email, password} = req.body
    const user = await User.findOne({email})
    if(email && await bcrypt.compare(password, user.password)){
        res.status(200).json({
            _id : user._id,
            name : user.name,
            email : user.email,
            token : this.generateToken(user._id)
        })
    }else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

exports.getMe = asyncHandler ( async (req,res) => {
    const {_id, name, email} = await User.findById(req.user.id)
    res.status(200).json({
        id : _id,
        name,
        email
    })
})

exports.generateToken = (id) => {
    return jwt.sign({id}, process.env.TOKEN_SECRET, {expiresIn : '999 days'})
}