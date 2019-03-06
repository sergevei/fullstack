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

router.post("/register" , (req ,res) =>{
    console.log("great");
    
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


module.exports = router;