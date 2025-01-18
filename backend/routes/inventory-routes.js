// all authentication related routes (login, signup) go through here
const express = require("express");
const inventoryController = require("../controllers/inventory-controller");
const path = require("path");
var router = express.Router(); // a router is a mini version of the express app.

// middleware : check valid syntactically username and password - trim, normalize, etc
// controller: query DB - make sure username exists, password matches
// sends response
router.post("/add-item", inventoryController.addItem);

router.get("/view-user-inventory", inventoryController.viewUserInventory);

router.get("/view-all-inventory", inventoryController.viewAllInventory);

// router.get("/view-all-inventory", inventoryController.viewAllInventory);
// router.get("/view-all-inventory", (req, res) => {
//   console.log("DOES IT EVEN?!?");
// });

module.exports = router; // Export the router
