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

// @route   api/profile/handle/:handle
// @desc    Get profile by handle
// @access  Public 

router.get("/handle/:handle" , (req , res)=>{
    const errors ={};
    //console.log(req.params.handle);
    User.findOne({ handle: req.params.handle})
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
    if( req.body.aboutYourself ) profileFields.aboutYourself  = req.body.aboutYourself;
    if( req.body.contactNumber ) profileFields.contactNumber  = req.body.contactNumber;
    if( req.body.status ) profileFields.status  = req.body.status;
    if( req.body.contactEmail ) profileFields.contactEmail  = req.body.contactEmail;

    //Users socials
    profileFields.social = {};
    if( req.body.vk ) profileFields.social.vk = req.body.vk;
    if( req.body.facebook ) profileFields.social.facebook = req.body.facebook;
    if( req.body.instagram ) profileFields.social.instagram = req.body.instagram;
    if( req.body.github ) profileFields.social.github = req.body.github;

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