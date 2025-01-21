const db = require("../config/db-config");

exports.addItem = async (req, res) => {
  try {
    const query = `
                INSERT INTO items (user_id, item_name, description, quantity)
                VALUES (?, ?, ?, ?)`;
    const values = [
      Number(req.body.userId),
      req.body.itemName,
      req.body.itemDes,
      Number(req.body.quantity),
    ];

    const [result] = await db.execute(query, values);
    return res.status(200).send({
      success: true,
      message: "Item succesfully added to your inventory!",
      result,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(422).send({
      success: false,
      message: "Item was not able to be added to your inventory",
    });
  }
};

exports.viewUserInventory = async (req, res) => {
  try {
    // Extract userId from query parameters
    const userId = Number(req.query.userId);

    // SQL query to fetch items for the user
    const query = `
                    SELECT * FROM items
                    WHERE user_id = ?`;

    const [result] = await db.execute(query, [userId]);

    if (result.length > 0) {
      // Items found for the user
      //   console.log(result);
      return res.status(200).send({
        success: true,
        message: "Items successfully retrieved!",
        result,
      });
    } else {
      // No items found for the user
      return res.status(404).send({
        success: false,
        message: "No items found for the given user ID.",
      });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({
      success: false,
      message: "Error retrieving items.",
    });
  }
};

exports.viewAllInventory = async (req, res) => {
  try {
    // Extract userId from query parameters
    //   const userId = Number(req.query.userId);

    // SQL query to fetch items for the user
    const query = `SELECT * FROM items`;

    const [result] = await db.execute(query);

    if (result.length > 0) {
      // Items found for the user
      return res.status(200).send({
        success: true,
        message: "Items successfully retrieved!",
        result,
      });
    } else {
      // No items found for the user
      console.log("Here");
      return res.status(404).send({
        success: false,
        message: "No items were found.",
      });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({
      success: false,
      message: "Error retrieving items.",
    });
  }
};

exports.deleteItem = async (req, res) => {
  const itemID = req.body.itemID;
  console.log("Inventory controller.js, deleting itemID: ", itemID);
  try {
    const query = `DELETE FROM items WHERE id = ?`;
    const values = [Number(itemID)]; // Use prepared statement to prevent SQL injection

    const result = await db.execute(query, values);
    // console.log("Inventory controller.js - what is the result: ", result);

    if (result.affectedRows === 0) {
      return res.status(404).send({
        success: false,
        message: "No item found with the specified ID",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Item deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting item:", error);
    return res.status(500).send({
      success: false,
      message: "An error occurred while deleting the item",
    });
  }
};

exports.updateItem = async (req, res) => {
  try {
    const query = `
        UPDATE items
        SET user_id = ?, item_name = ?, description = ?, quantity = ?
        WHERE id = ?;
      `;
    const values = [
      req.body.userID,
      req.body.itemName,
      req.body.description,
      Number(req.body.quantity),
      Number(req.body.id),
    ];

    const [result] = await db.execute(query, values);

    if (result.affectedRows === 0) {
      return res.status(404).send({
        success: false,
        message: "Item not found or no changes made.",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Item updated successfully!",
      result,
    });
  } catch (error) {
    console.error("Error updating item:", error.message);
    return res.status(500).send({
      success: false,
      message: "An error occurred while updating the item.",
    });
  }
};

exports.viewSingleItem = async (req, res) => {
  try {
    // Extract userId from query parameters
    const itemID = Number(req.query.itemID);

    // SQL query to fetch items for the user
    const query = `
                      SELECT * FROM items
                      WHERE id = ?`;

    const [result] = await db.execute(query, [itemID]);

    if (result.length > 0) {
      // Items found for the user
      //   console.log(result);
      return res.status(200).send({
        success: true,
        message: "Items successfully retrieved!",
        result,
      });
    } else {
      // No items found for the user
      return res.status(404).send({
        success: false,
        message: "No items found for the given user ID.",
      });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({
      success: false,
      message: "Error retrieving items.",
    });
  }
};
