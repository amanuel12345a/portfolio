const express = require('express')
const app = express()
var nodemailer = require('nodemailer');
const cors = require('cors')
require("dotenv").config()
app.use(cors())
app.use(express.json())
const PORT = process.env.PORT || 3001
app.post('/',(req,res)=>{
    const {firstName,email,text} = req.body
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 465,
        secure: true,
        auth: {
               user: `${process.env.EMAIL}`,
               pass: `${process.env.PASSWORD}`
           }
       });
       const mailOptions = {
         from: email, // sender address
         to: process.env.EMAIL, // list of receivers
         subject: `their name ${firstName} email ${email}`, // Subject line
         text: text// plain text body
       };
       transporter.sendMail(mailOptions, function (err, info) {
          if(err)
        {
        res.send('try again')}
          else{
            res.send('email send successful')
          }
       });
       
})
app.listen(PORT,()=>{
    console.log("working")
})