const { compareSync } = require("bcrypt");


const handleErrors = (err) => {
   
    let errors = { email: '', password: '' };

     if(err && err.path=='password'){
        errors.password = err.errors[0];

    }
    

    else if(err && err.path == "email" )
    errors.email = err.errors[0];
  
    return errors;
    }
    
  
 


function validation(schema) {
    return async function (req, res, next) {
        try {
            await schema.validate(req.body);
            next();
        } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
        
        }
    };
}

module.exports = validation;