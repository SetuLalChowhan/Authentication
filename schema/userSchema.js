const {string, number, array, object} = require("yup");

function EmailLengthValid(email) {
    if (!email) return false;

    const parts = email.split("@");
    const local = parts[0];
    return local.length <= 64;
}

const userDetails={
 email: string()
.email(" should be a valid email address")
.max(100, "Email must be at most 100 characters")
.required("Email must be required")
.test("is valid email length", "The part before @ of the email can be maximum 64 characters", (email) =>
    EmailLengthValid(email)
),
password: string()
.min(8, "Password must be at least 8 characters")
.max(50, "Password must be at most 60 characters")
.required("Password must not be empty"),

}



const registerSchema = object().shape({
    
    email: userDetails.email,
    password: userDetails.password,
});



module.exports = registerSchema;