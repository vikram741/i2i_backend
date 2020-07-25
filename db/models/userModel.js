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
    mobile:
    {
        type:String,
        required:true,
        minlength:10,
        maxlength:10
    },
    age:
    {
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true,
        minlength:8 
    },
    uploaded: [
        {
            bookid:{type:String, required:true},
            version:{type:String, required:true},
            description:{type:String},
            audiofile:{type:String}
        }
    ]
})

module.exports = mongo.model('User',userSchema);