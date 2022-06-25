const router=require('express').Router();

const authController = require("../controller/authController");
const validation = require('../middleware/validate');
const userSchema = require('../schema/userSchema')

router.get('/signUp',authController.signUpGet)
router.post('/signUp',validation(userSchema),authController.signUpPost)
router.get('/login',authController.loginGet)
router.post('/login',authController.loginPost);
router.get('/logout',authController.logOut);

module.exports =router
// validation(userSchema)