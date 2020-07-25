const mongo = require('mongoose')

const adminSchema = mongo.Schema({
    email:{
        type:String,
        required:true,
        minlength:1,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:8 
    },
    mobile:
    {
        type:String,
        required:true,
        minlength:10,
        maxlength:10
    }
})

module.exports = mongo.model('Admin',adminSchema);