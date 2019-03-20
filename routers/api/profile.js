const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require("passport");

const Profile = require('../../models/Profile');
const User = require('../../models/User');

const validateProfileInput = require('../../validator/profile');
const validateNewsInput = require('../../validator/news');

// @route   api/profile/test
// @desc    Test page
// @access  Public 

router.get("/test" , (req , res)=>res.json({msg:"test profile"}));

// @route   api/profile/all
// @desc    Get profile by user_id
// @access  Public 

router.get("/all" , (req , res)=>{
    User.find()
        .then(profile => {
            if(!profile){
                res.json({error:"Profiles not found"});
            }else{
                res.json(profile);
            }
        })
        .catch(err => {res.json(err)});
});

// @route   api/profile/all-info
// @desc    Get profile by user_id
// @access  Public 
router.get("/all-info" , (req , res)=>{
    User.find()
        .then(user => {
            Profile.find()
                .then(profile => {
                    const userWithProfile = [];
                    let userProfileData;

                    user.map(
                        oneUser => {
                            profile.map(
                                oneProfile => {
                                    if((oneUser._id).toString() === (oneProfile.user).toString()){
                                        userProfileData = {
                                            name:           oneUser.name, 
                                            contactNumber:  oneProfile.contactNumber,
                                            aboutYourself:  oneProfile.aboutYourself,
                                            status:         oneProfile.status,
                                            numNews:        oneProfile.news.length,
                                            social:         oneProfile.social,
                                            id:             oneUser._id,
                                            email:          oneUser.email   
                                        }
                                        userWithProfile.push(userProfileData);
                                    }
                                }
                            )
                        }
                    )

                    let CheckProfile = false;
                    user.map(
                        oneUser => {
                            profile.map(
                                oneProfile => {
                                    if((oneUser._id).toString() === (oneProfile.user).toString()){
                                        CheckProfile = true;
                                    }
                                }
                            )
                            if(!CheckProfile){
                                userProfileData = {
                                    name:           oneUser.name, 
                                    id:             oneUser._id,
                                    email:          oneUser.email,
                                    profile:        "User hasn't profile yet."  
                                }
                                userWithProfile.push(userProfileData);
                            }
                            CheckProfile = false;
                        }
                    )
                    res.json(userWithProfile);
                })
                .catch(err => {res.json(err)})
        })
        .catch(err => {res.json(err)})
    })
// @route   api/profile/:id
// @desc    Get profile by user_id
// @access  Public 
router.get("/:id" , (req , res)=>{
    const userWithProfile = [];
    let userProfileData;

    User.findOne({ _id: req.params.id})
        .then(oneUser => {
            Profile.findOne({ user: req.params.id})
                .then(oneProfile => {
                    if(oneProfile){
                        userProfileData = {
                            name:           oneUser.name, 
                            contactNumber:  oneProfile.contactNumber,
                            aboutYourself:  oneProfile.aboutYourself,
                            status:         oneProfile.status,
                            numNews:        oneProfile.news.length,
                            social:         oneProfile.social,
                            id:             oneUser._id,
                            email:          oneUser.email   
                        }
                        userWithProfile.push(userProfileData);
                    }else{
                        userProfileData = {
                            name:           oneUser.name, 
                            id:             oneUser._id,
                            email:          oneUser.email,
                            profile:        "User hasn't profile yet."  
                        }
                        userWithProfile.push(userProfileData);
                    }
                    res.json(userWithProfile);
                })
                .catch(err => {res.json(err)})
        })
        .catch(err => {res.json(err)})
    })



// @route   api/profile/nickname/:nickname
// @desc    Get profile by handle
// @access  Public 

router.get("/nickname/:nickname" , (req , res)=>{
    const errors ={};
    //console.log(req.params.handle);
    Profile.findOne({ handle: req.params.nickname})
        .then(profile => {
            console.log(profile);
            if(!profile){
                errors.noprofile = " Profile not found";
                res.status(404).json(errors);
            }else{
                res.json(profile);
            }
        })
        .catch(err => res.json(err));
});

// @route   api/profile/user/:user_id
// @desc    Get profile by user_id
// @access  Public 

router.get("/user/:id" , (req , res)=>{
    const errors ={};
    User.findOne({ _id : req.params.id })
        .then(profile=>{
            console.log(profile);
            if(!profile){
                errors.noprofile = " Profile not found by id";
                res.status(404).json(errors);
            }else{
                res.json(profile);
            }
        })
        .catch(console.log("bad"));;
});

// @route   api/profile
// @desc    Get profile
// @access  Private 

router.get('/',passport.authenticate("jwt",{session:false}),(req, res)=>{

    const errors = {};

    Profile.findOne({ user: req.user.id })
        .then(profile =>{
            if(!profile){
                errors.noprofile = 'There is no profile for this user';
                return res.status(404).json(errors);
            }
            res.json(profile);
        })
        .catch(err => res.status(404).json({err}));
});

// @route   api/profile
// @desc    Create profile
// @access  Private 

router.post('/',passport.authenticate("jwt",{session:false}),(req, res)=>{

    //Validation
    const {errorsProfile, isValidProfile } = validateProfileInput(req.body);
    //console.log(errorsProfile, "  POST PROFILE " ,isValidProfile );

    //Check validation//
    if(!isValidProfile){
        return res.status(400).json(errorsProfile);
    };

    // Get profile fields
    const profileFields = {};

    //Profile
    profileFields.user  = req.user.id;
    if( req.body.handle ) profileFields.handle  = req.body.handle;

    if( req.body.aboutYourself ){
        profileFields.aboutYourself  = req.body.aboutYourself;
    }else{
        profileFields.aboutYourself  = "";
    }

    if( req.body.contactNumber != "") {
        profileFields.contactNumber  = req.body.contactNumber;   
    }else{
        profileFields.contactNumber ="";
    }

    if( req.body.status ){
        profileFields.status  = req.body.status;
    }else{
        profileFields.status  ="";
    }
    if( req.body.contactEmail ) {
        profileFields.contactEmail  = req.body.contactEmail;
    }else{
        profileFields.contactEmail  ="";
    }

    //Users socials
    profileFields.social = {};
    if( req.body.vk ) profileFields.social.vk = req.body.vk;
    if( req.body.facebook ) profileFields.social.facebook = req.body.facebook;
    if( req.body.instagram ) profileFields.social.instagram = req.body.instagram;
    if( req.body.github ) profileFields.social.github = req.body.github;
    if( req.body.display ) profileFields.social.display = req.body.display;

    Profile.findOne({user : req.user.id})
        .then(profile => {
            if(profile){
                //console.log("update");
                //Update user profile
                Profile.findOneAndUpdate(
                    { user : req.user.id },
                    { $set : profileFields },
                    { new : true }
                ).then(profile => res.json(profile));
            }else{
                //Create user profile
                //console.log("create");
                Profile.findOne({ handle : profileFields.handle })
                    .then( profile => {
                        if(profile){
                            errors.handle = "Already exists";
                            res.status(400).json(errors);
                        }

                        new Profile(profileFields).save().then(profile =>res.json(profile));
                    }) 
            }
        })
        .catch(err=>{
            res.json(err);
        });
});

// @route   api/news
// @desc    Add news
// @access  Private 

router.post('/news',passport.authenticate("jwt",{session:false}),(req, res)=>{
    //Validation
    const {errorsNews, isValidNews } = validateNewsInput(req.body); 
    //Check validation//
    if(!isValidNews){
        return res.status(400).json(errorsNews);
    }; 
    Profile.findOne({ user : req.user.id })
        .then(profile=>{
            //console.log(profile);
            if(!profile){
                res.json({noprofile:"errors"});
            }else{
                const newNews = {
                    author : req.body.author,
                    title : req.body.title,
                    img : req.body.img,
                    desc : req.body.desc,
                    allText : req.body.allText,
                    category : req.body.category
                };
                //res.json(newNews);
                profile.news.unshift(newNews);
                profile.save().then( newProfile => { res.json(newProfile)} );
            }
        })
        .catch(err=>res.json(err));    
});

// @route   api/news
// @desc    Delete news
// @access  Private 

router.post('/news/:id',passport.authenticate("jwt",{session:false}),(req, res)=>{
    Profile.findOne({ user : req.user.id })
        .then(profile=>{
            //console.log(profile);
            if(!profile){
                res.json({noprofile:"errors"});
            }else{
                //Find index
                const removeNewsIndex=profile.news.map(item => item.id).indexOf(req.params.id);
                profile.news.splice(removeNewsIndex, 1);

                profile.save().then( newProfile => { res.json(newProfile)} );
            }
        })
        .catch(err=>res.json(err));    
});

module.exports = router;