const db = require("../config/db-config");

exports.addItem = async (req, res) => {
  console.log("!!!!!!!!!!!Did we make it to the inventory controller?");
  //   console.log(req.body.userId);
  //   console.log(`Type of value: ${typeof req.body.userId}`);
  //   console.log(req.body.itemName);
  //   console.log(`Type of value: ${typeof req.body.itemName}`);
  //   console.log(req.body.itemDes);
  //   console.log(`Type of value: ${typeof req.body.itemDes}`);
  //   console.log(req.body.quantity);
  //   console.log(`Type of value: ${typeof req.body.quantity}`);
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
    console.log(values[0]);
    console.log(`Type of value: ${typeof values[0]}`);
    console.log(values[1]);
    console.log(`Type of value: ${typeof values[1]}`);
    console.log(values[2]);
    console.log(`Type of value: ${typeof values[2]}`);
    console.log(values[3]);
    console.log(`Type of value: ${typeof values[3]}`);

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
