
require('dotenv').config()
const express = require('express')
const app=express()
const jwt= require('jsonwebtoken')



app.use(express.json())

const posts=[
    {
        username:'kyle',
        tittle:'post 2',
    },

    {
        username:'Jane',
        tittle:'post 2',
    }
]

app.get("/",(req,res)=>{
    res.send(posts)
});
app.get("/posts",authenticateToken,(req,res)=>{
    res.json(posts.filter(post => post.username === req.user.name))
})

app.post('/login',(req,res)=>{
    //Authenication user
    const username= req.body.username;
    const user={name:username}
    const accessToken =generateAccessToken(user)
    const refreshToekn=jwt.sign(user)
    res.json({accessToken:accessToken})
});


function generateAccessToken(user){
   return jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{expiresIn:"15s"})
}