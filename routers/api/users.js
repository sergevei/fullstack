const express = require('express');
const router = express.Router();
const keys = require('../../config/key');
const jwt = require('jsonwebtoken');
const passport = require("passport");

//Get User model
const User = require("../../models/User");

// @route   api/users/test
// @desc    Test page
// @access  Public 
router.get("/test" , (req , res)=>res.json({msg:"test users"}));



///Register
router.post("/register" , (req ,res) =>{
    User.findOne({ email : req.body.email })
        .then(user =>{
            if(user){
                return res.status(400).json({ email : "Email already exists" });
            }else{
                const newUser = new User({
                    name : req.body.name,
                    email : req.body.email,
                    password : req.body.password,
                    data : req.body.data
                });

                newUser
                    .save()
                    .then(
                        user => { res.json(user); }
                    )
                    .catch(
                        err => { console.log(err); }
                    )
            }
         }); 
});


//Login 
router.post("/login", (req,res) => {
    User.findOne({ email : req.body.email })
        .then(user => {
            if(!user){
                return res.status(404).json({ msg : "User not found"});
            }
            if(user.password === req.body.password ){
                //return res.json({ msg : "success"});

                //Login seccess
                const payload = { name : user.name , email : user.email , date : user.date ,id : user._id };
                console.log (payload);

                //JWT controls 
                jwt.sign(
                    payload,
                    keys.secretKey,
                    {expiresIn : 3600 },
                    (err,token)=>{
                        res.json({
                            success : "success",
                            token : "Bearer " + token
                        });
                    });

            }else {
                return res.json({ msg : "error"});
            }
        })
});


// @route   api/users/current
// @desc    return current user
// @access  Private 

router.get(
    '/current',
    passport.authenticate('jwt', { session : false }),
    (req,res)=>{
        res.json(req.user);
});


module.exports = router;