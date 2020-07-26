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
    },
    requests:[
        {
            userid:{type:String,required:true},
            bookid:{type:String, required:true},
            version:{type:String, required:true},
            description:{type:String},
            audiofile:{type:String}
        }
    ]
})

module.exports = mongo.model('Admin',adminSchema);