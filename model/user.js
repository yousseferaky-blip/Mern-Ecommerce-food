const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true,
        min : 3,
        max : 20,
    },
    lastName:{
        type:String,
        trim:true,
        min : 3,
        max : 20,
    },
    email:{
        type:String,
        require:true,
        trim:true,
        unique:true,     
    },
    password:{
        type:String,
        require:true,
    },
    confirmPassword:{
        type:String,
        require:true,
    },
    avatar:{
        type:String,
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
},{timestamps:true})

module.exports = mongoose.model("User",UserSchema)
