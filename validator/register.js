const Validator = require("validator");
const isEmpty =  require("./is-empty");

module.exports = function validateRegisterInput(data){
    let errors = {};

    console.log(data);

    if(!Validator.isLength(data.name, {min :2 , max : 20 })){
        errors.name = "Name must be between 2 and 30 characters";
    }
    
    if(!Validator.isLength(data.password, {min :7 , max : 100 })){
        errors.password =  "Password must be between 7 and 100 characters";
    }
    
    if(!Validator.isLength(data.email, {min :5 , max : 20 })){
        errors.email = "Name must be between 5 and 30 characters";
    }
    return {
        errors : errors,
        isValid : isEmpty(errors)
    };
};