const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//User model

const UserSchema = new Schema({
    
    handle: {
        type: String,
        required: true,
        max: 30
    },
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        default : Date.now
    }
});

module.exports = User = mongoose.model("users",UserSchema);
