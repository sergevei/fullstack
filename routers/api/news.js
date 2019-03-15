const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require("passport");

const Profile = require('../../models/Profile');

// @route   api/news/test
// @desc    Test page
// @access  Public 

router.get("/test" , (req , res)=>res.json({msg:"test news"}));

// @route   api/news/all
// @desc    Users news page
// @access  Public 

router.get("/all" , (req , res)=>{
    Profile.find()
        .then(profile => {
            if(profile){
                const allNews = [];
                profile.map(item => allNews.push(item.news));
                
                const onlyNews = [];

                allNews.map(items => items.map( item => onlyNews.push(item)));

                res.json(onlyNews);
            }else{
                res.status(404).json({error : "Profiles not found"});
            }
        })
});

// @route   api/news/like/:id
// @desc    Like Unlike news
// @access  Public

router.post('/like/:id',passport.authenticate("jwt",{session:false}),(req, res)=>{
    Profile.findOne({ user : req.user.id})
        .then( profile => {
            Profile.find()
                .then(profileNews => {
                    if(profileNews){
                        const allNews = [];
                        profileNews.map(item => allNews.push(item.news));

                        const onlyNews = [];
                        allNews.map(item => item.map(items => onlyNews.push(items)));

                        let newsLikes = 0;

                        allNews.map(items=> {
                            items.map(item => {
                                if(item._id == req.params.id){ 
                                    newsLikes = item._id;
                                    
                                    //Like Unlike methob
                                    let trueFalse = 0;
                                    let indexLikeUnlike = 0;
                                    
                                    const b=(profile.user).toString();

                                    item.likes.map(oneLike => {
                                        const a=(oneLike._id).toString();
                                        if(a===b){
                                            trueFalse = 1;
                                            indexLikeUnlike = item.likes.indexOf(oneLike);
                                        };
                                        console.log("index likes - "+oneLike._id+" test num "+ profile.user+ " ->  " +trueFalse );
                                    });
                                    if(trueFalse == 1){ 
                                        item.likes.splice(indexLikeUnlike, 1);
                                    }else{
                                        item.likes.unshift(profile.user);
                                    };
                                };
                            });
                        });
                        profileNews.map(elem => {
                            elem.news.map(single_id_news => {
                                //console.log(single_id_news._id + " user ->  "+elem.user);
                                if(newsLikes == single_id_news._id){
                                    console.log(elem.id+" likes ->" +single_id_news._id);
                                    profileNews.map(test => {
                                        if(test._id == elem.id) {
                                            test.save().then(res.json(test));
                                        }
                                    });
                                }
                            });
                        });
                    }else{
                        res.status(404).json({error : "Profiles not found"});
                    }
                }).catch();        
        }
    )
    .catch();
});


// @route   api/news/comments/:id
// @desc    Comments news
// @access  Public

router.post('/comments/:id',passport.authenticate("jwt",{session:false}),(req, res)=>{
    Profile.findOne({ user : req.user.id})
        .then( profile => {
            Profile.find()
                .then(profileNews => {
                    if(profileNews){
                        const allNews = [];
                        profileNews.map(item => allNews.push(item.news));

                        const onlyNews = [];
                        allNews.map(item => item.map(items => onlyNews.push(items)));

                        let newsLikes = 0;

                        allNews.map(items=> {
                            items.map(item => {
                                if(item._id == req.params.id){ 
                                    newsLikes = item._id;

                                    const newComment = {
                                        user:profile.user,
                                        text:req.body.textComment,
                                        name:req.body.inputName
                                    }

                                    item.comments.unshift(newComment);
                                };
                            });
                        });
                        profileNews.map(elem => {
                            elem.news.map(single_id_news => {
                                if(newsLikes == single_id_news._id){
                                    console.log(elem.id+" likes ->" +single_id_news._id);
                                    profileNews.map(test => {
                                        if(test._id == elem.id) {
                                            test.save().then(res.json(test));
                                        }
                                    });
                                }
                            });
                        });
                    }else{
                        res.status(404).json({error : "Profiles not found"});
                    }
                }).catch();        
        }
    )
    .catch();
});


module.exports = router;