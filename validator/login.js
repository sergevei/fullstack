const Validator = require("validator");
const isEmpty =  require("./is-empty");

module.exports = function validateLoginInput(data){
    let errors = {};

    if(!Validator.isLength(data.email, {min :5 , max : 20 })){
        errors.email = "Email must be between 2 and 30 characters";
    }
    if(!Validator.isLength(data.password, {min :7 , max : 100 })){
        errors.password = "Password must be between 7 and 100 characters";
    }
    return {
        errorsLogin : errors,
        isValidLogin : isEmpty(errors)
    };
};