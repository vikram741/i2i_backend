const mongo = require('mongoose')

const userSchema = mongo.Schema({
    email:{
        type:String,
        required:true,
        minlength:1,
        trim:true,
        unique:true
    },
    name:{
        type:String,
        required:true,
        minlength:3
    },
    phone:
    {
        type:String,
        required:true,
        minlength:10,
        maxlength:10
    },
    password:{
        type:String,
        required:true,
        minlength:8 
    },
    session:[]
})

module.exports = mongo.model('User',userSchema);