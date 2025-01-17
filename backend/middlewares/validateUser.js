const {check, validationResult} = require('express-validator'); // check is the function used to validate and sanitize inputs
// const { login } = require('../controllers/auth-controller');


var loginValidate = [
    // Check Username
    check('username', 'Username Must Be an Email Address').trim().escape(),
    // Check Password
    check('password').isLength({ min: 8 }).withMessage('Password Must Be at Least 8 Characters').matches('[0-9]').withMessage('Password Must Contain a Number').matches('[A-Z]').withMessage('Password Must Contain an Uppercase Letter').trim().escape(), 
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        else {
            next(); 
        }
    }];


module.exports = loginValidate; 