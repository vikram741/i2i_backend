const express = require('express')
const app = express()

const mongo = require('mongoose')
const bodyparser = require('body-parser')
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))
const User = require('./db/models/userModel')

const jwt = require('jsonwebtoken');

const dbconfig = require('./db/config/dbConfig');

mongo.connect(dbconfig.url,{useNewUrlParser: true,useUnifiedTopology: true})
.then(data=>{ console.log('connected to db') })
.catch(err=>{  console.log(err) });


app.get('/',(req,res)=>{
    res.send('yooooooo')
})

const auth = require('./routes/authRoute');
app.use('/api/auth',auth)


const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log('running on ',port)
})

