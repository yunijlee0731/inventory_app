// all authentication related routes (login, signup) go through here
const express = require("express");
const inventoryController = require("../controllers/inventory-controller");
const path = require("path");
var router = express.Router(); // a router is a mini version of the express app.

// middleware : check valid syntactically username and password - trim, normalize, etc
// controller: query DB - make sure username exists, password matches
// sends response
router.post("/add-item", inventoryController.addItem);

router.delete("/delete-item", inventoryController.deleteItem);

router.get("/view-user-inventory", inventoryController.viewUserInventory);

router.get("/view-all-inventory", inventoryController.viewAllInventory);

router.get("/view-single-item", inventoryController.viewSingleItem);

router.put("/update-item", inventoryController.updateItem);

module.exports = router; // Export the router
