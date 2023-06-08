const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: String,
    userType:{
        type: String,
        enum: ['user','admin'],
        default: 'user'
    }
    
})

module.exports = mongoose.model('USER',userSchema)




