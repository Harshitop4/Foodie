const express=require('express');
const User = require('../models/User');
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

const router=express.Router();
const jwtSecret=process.env.JWT_SECRET;

// To Get All the Users
router.get('/',async (req,res)=>{
    try {
        const newUser=await User.find({});
        res.send(newUser);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Signup
router.post('/',async (req,res)=>{
    try {
        const {body}=req;
        const cUser=await User.findOne({email:body.email})
        if(cUser) return res.status(400).send("User Already Exists. Try different email")

        // Hashing Password
        const salt=await bcrypt.genSalt(10);
        const hashPass=await bcrypt.hash(body.password,salt);

        const data={
            "name":body.name,
            "email":body.email,
            "password":hashPass,
            "location":body.location,
            "date":body.date
        }
        const newUser=new User(data);
        await newUser.save();
        res.send(newUser);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Login
router.post('/login',async (req,res)=>{
    try {
        const {body}=req;
        const data={
            "email":body.email,
            "password":body.password,
        }
        const cUser=await User.findOne({email:body.email});
        if(!cUser) return res.status(404).send("User Not Found")
        const isValid=await bcrypt.compare(body.password,cUser.password)
        if(!isValid) return res.status(400).send("Bad Credentials")
        
        const userdata={
            user:{
                id:cUser.id
            }
        }
        const authToken =jwt.sign(userdata,jwtSecret);
        res.send({cUser,authToken});
    } catch (err) {
        res.status(400).send(err);
    }
});





module.exports=router;