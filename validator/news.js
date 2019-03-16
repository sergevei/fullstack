const Validator = require("validator");
const isEmpty =  require("./is-empty");

module.exports = function validateNewsInput(data){
    let errors = {};


    data.title = !isEmpty(data.title) ? data.title : "";
    data.img = !isEmpty(data.img) ? data.img : "";
    data.desc = !isEmpty(data.desc) ? data.desc : "";
    data.allText = !isEmpty(data.allText) ? data.allText : "";
    data.category = !isEmpty(data.category) ? data.category : "";


    //NEWS

    if(!Validator.isLength(data.title, {min :2 , max : 100 })){
        errors.title = "title must be between 2 and 100 characters";
    }
    if(!Validator.isLength(data.img, {min :2 , max : 300 })){
        errors.img = "imgUrl must be input";
    }
    if(!Validator.isLength(data.desc, {min :10 , max : 200 })){
        errors.desc = "desc must be between 10 and 50 characters";
    }
    if(!Validator.isLength(data.allText, {min :20 , max : 1000 })){
        errors.allText = "allText must be between 20 and 300 characters";
    }
    if(!Validator.isLength(data.category, {min :2 , max : 100 })){
        errors.category = "category must be choice";
    }
 
    return {
        errorsNews : errors,
        isValidNews : isEmpty(errors)
    };
};