const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Profile model
const profileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    handle: {
        type: String,
        required: true,
        max: 30
    },
    aboutYourself: {
        type: String
    },
    contactNumber: {
        type: String
    },
    status:{
        type: String
    },
    contactEmail: {
        type: String
    },
    news: [{
        title: {
            type:String,
            required: true
        },
        img:{
            type: String,
            required: true
        },
        desc:{
            type: String,
            required: true
        },
        allText:{
            type: String,
            required: true
        },
        category:{
            type: String,
            required: true
        }
    }],
    social: {
        vk:{
            type: String
        },
        facebook:{
            type: String
        },
        instagram:{
            type: String
        },
        github:{
            type: String
        }
    }
});

module.exports = Profile = mongoose.model('profile' , profileSchema);