const mongo = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../db/models/userModel')

module.exports.userSignup = async (req,res)=>{
     console.log(req.body)
    if( (!req.body.email)||(!req.body.name)||(!req.body.password)||(!req.body.phone) ){
            res.status(400).send({ message:'Fill required details' })
            return
    } 
    await User.find({email:req.body.email},(err,result)=>{
    if(result.length!=0)
        {
                res.status(400).send({message:'Email already in use'})
                process.exit()
        }
    })    
    await User.find({phone:req.body.phone},(err,result)=>{
        if(result.length!=0)
            {
                res.status(400).send({message:'phone number already in use'})
                process.exit()
            }
    })

    var hashedPassword  = bcrypt.hashSync(req.body.password,8);

    var user_ = new User({
        email : req.body.email,
        password : hashedPassword,
        name : req.body.name,
        phone : req.body.phone,
        session : []
    })

    await user_.save()
    .then(
        data=>{
            var payload = { subject:data._id }
            var token = jwt.sign(payload,'sercetKey',{expiresIn:'7d'})
             User.findOne({_id:data._id},(err,user)=>{
                user.session.push(token)
                user.save();
            })
            res.status(200).send({token})
        }
    )
    .catch(
        err =>{
            res.status(500).send({
                message:err.message || 'error while creating new user'
            })
        }
    )
} 

module.exports.userSignin  = async ( req,res )=>{
        console.log(req.body)
        if( (!req.body.email)||(!req.body.password) ){
                res.status(400).send({ message:'fill required credentails' })
                return
        } 
        await  User.findOne({email:req.body.email},(err,user)=>{
            if(err){
                console.log(err); process.exit();
            }
            if(!user)
            {
                res.status(400).send({message:'invalid email'})
                process.exit();
            }
            else{
                if(bcrypt.compareSync(req.body.password,user.password)){
                    var payload = { subject:user._id }
                    var token = jwt.sign(payload,'sercetKey',{expiresIn:'7d'})

                    if(user.session.length==2){
                        user.session.pop()
                    }
                    user.session.unshift(token)
                    user.save();
                    res.status(200).send({token})
                }
                else{
                    res.status(400).send({message:'wrong password'})
                }
            }
        })   

}


