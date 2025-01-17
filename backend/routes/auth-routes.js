// all authentication related routes (login, signup) go through here 
const express = require('express');
const authController = require('../controllers/auth-controller'); 
const path = require('path'); 
const validateUser = require('../middlewares/validateUser'); 
var router = express.Router(); // a router is a mini version of the express app. 
// const authController = require('../controllers/auth-controller'); // Import controller functions
// const { validateSignup, validateLogin } = require('../middlewares/validation'); // Import validation middleware

// Signup Route
// router.post('/signup', validateSignup, authController.signup);

// TODO: change file path when you create proper front end 
router.get('/login', (req, res) => {
    // res.sendFile(path.join(__dirname, '../../frontend_test/static/login.html'));
    console.log("NEW called get");
    res.json({"success": true});
});

// router.post('/login', validateLogin, authController.login);
// middleware : check valid syntactically username and password - trim, normalize, etc 
// controller: query DB - make sure username exists, password matches 
    // sends response 
router.post('/login', validateUser, authController.checkLogin);

// TODO: create get for sign up 
router.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend_test/static/signup.html'));    
});
// TODO: create post for sign up
    // middleware : check valid syntactically username and password - trim, normalize, etc - you could still use validateLogin.js 
    // controller: query DB - make sure user doesn't exist
        // sends response 
router.post('/signup', validateUser, authController.checkUserCreation);

module.exports = router; // Export the router
