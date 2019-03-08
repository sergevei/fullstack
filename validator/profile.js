const Validator = require("validator");
const isEmpty =  require("./is-empty");

module.exports = function validateProfileInput(data){
    let errors = {};

    data.handle = !isEmpty(data.handle) ? data.handle : "";
    //NEWS
    /*
    data.title = !isEmpty(data.title) ? data.title : "";
    data.img = !isEmpty(data.img) ? data.img : "";
    data.desc = !isEmpty(data.desc) ? data.desc : "";
    data.allText = !isEmpty(data.allText) ? data.allText : "";
    data.category = !isEmpty(data.category) ? data.category : "";
    */

    if(!Validator.isLength(data.handle, {min :2 , max : 40 })){
        errors.handle = "Handle must be between 2 and 40 characters";
    }
    //NEWS
    /*
    if(!Validator.isLength(data.title, {min :2 , max : 40 })){
        errors.title = "title must be between 2 and 40 characters";
    }
    if(!Validator.isLength(data.img, {min :2 , max : 100 })){
        errors.img = "imgUrl must be input";
    }
    if(!Validator.isLength(data.desc, {min :10 , max : 50 })){
        errors.desc = "desc must be between 10 and 50 characters";
    }
    if(!Validator.isLength(data.allText, {min :20 , max : 300 })){
        errors.allText = "allText must be between 20 and 300 characters";
    }
    if(!Validator.isLength(data.category, {min :2 , max : 100 })){
        errors.category = "category must be choice";
    }
    */
    return {
        errorsProfile : errors,
        isValidProfile : isEmpty(errors)
    };
};