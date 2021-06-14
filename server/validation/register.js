import Validator from 'validator'
import isEmpty from 'is-empty'

module.exports = function validateRegisterInput(data) {
    let errors = {}

    //Converting empty fields into an empty string for the purpose of using validator.

    data.name = !isEmpty(data.name) ? data.name: "";
    data.email = !isEmpty(data.email) ? data.email: "";
    data.password = !isEmpty(data.password) ? data.password: "";
    data.password2 = !isEmpty(data.password2) ? data.password2: "";


//Name Check

if(Validator.isEmpty(data.name)) {
    errors.name = "Name Field is required"
}

//Email Check 

if(Validator.isEmpty(data.email)){
    errors.email = "Email Field is required"
}else if(!Validator.isEmail(data.email)){
    errors.email = "Email Format is invalid"
}
//Password Check
if(Validator.isEmpty(data.password)){
    errors.password = "Password Field is required"
}

if(Validator.isEmpty(data.password2)){
    errors.password2 = "Confirm Password Field is required";
}
//Password Lenght Check
if(!Validator.isLength(data.password, {min:6, max:20})) {
    errors.password= "Password must between 6 to 20 characters long."

}
//Password Equality Check
if(!(Validator.equals(data.password, data.password2))) {
    errors.password2 = "Password donot match";
}

return {
    errors,
    isValid: isEmpty(errors)
}

}
