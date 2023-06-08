const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const USER = require('../models/userModel')
const asyncHandler = require('express-async-handler')



// desc register user
// POST /user/register
//route type PUBLIC
const register = asyncHandler(async (req,res)=>{
    const { name ,email, password } = req.body

    // check for missing values
    if(!name || !email || !password){
        throw new Error('All fields required')
    }
    
    // check if user exists
    const checkUser = await USER.findOne({email})
    if(checkUser){
        throw new Error('user already exists')
    }

    // hashing password
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password,salt)

    //create user
    const newUser =await USER.create({
        name,
        email,
        password: hashPassword
    }) 
    if(newUser){
        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            token: genrateToken(newUser._id)
        })
    }
})

// desc login user
// POST /user/login
//route type PUBLIC
const login = asyncHandler(async (req,res)=>{
    const { email, password } = req.body

    // check if email exists
    const findUser = await USER.findOne({email})

    if(findUser && (await bcrypt.compare(password, findUser.password))){
        res.json({
            _id: findUser._id,
            name: findUser.name,
            email: findUser.email,
            token: genrateToken(findUser._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }

})

// desc all user
// POST /user/all
//route type PROTECTED
const all = asyncHandler(async (req,res)=>{
    
   const allUser = await USER.find().select('-password -userType')
   res.json(allUser)

})





// generate token
const genrateToken =(id)=>{
    return jwt.sign({ id },process.env.JWT_SECRET,{
        expiresIn: '1d'
    })
}


module.exports = {register,login,all}

