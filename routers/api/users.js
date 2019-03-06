const express = require('express');
const router = express.Router();

//Get User model
const User = require("../../models/User");

// @route   api/users/test
// @desc    Test page
// @access  Public 
router.get("/test" , (req , res)=>res.json({msg:"test users"}));

// @route   api/users/test
// @desc    Regisration
// @access  Public 


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
                return res.json({ msg : "success"});
            }else {
                return res.json({ msg : "error"});
            }
        })
});

module.exports = router;