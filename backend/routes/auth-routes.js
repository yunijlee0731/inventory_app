// all authentication related routes (login, signup) go through here
const express = require("express");
const authController = require("../controllers/auth-controller");
const path = require("path");
const validateUser = require("../middlewares/validateUser");
var router = express.Router(); // a router is a mini version of the express app.

// middleware : check valid syntactically username and password - trim, normalize, etc
// controller: query DB - make sure username exists, password matches
// sends response
router.post("/login", validateUser, authController.checkLogin);

router.post("/signup", validateUser, authController.checkUserCreation);

module.exports = router; // Export the router
