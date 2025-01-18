const db = require("../config/db-config");

exports.addItem = async (req, res) => {
  console.log("!!!!!!!!!!!Did we make it to the inventory controller?");
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
  console.log("WHY NOT");
  try {
    // Extract userId from query parameters
    //   const userId = Number(req.query.userId);

    // SQL query to fetch items for the user
    console.log("!!!!!!!!!!!!!!!!!!!!!!HEREE");
    const query = `SELECT * FROM items`;

    const [result] = await db.execute(query);

    if (result.length > 0) {
      // Items found for the user
      console.log(result);
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
