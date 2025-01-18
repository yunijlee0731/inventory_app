const db = require("../config/db-config");

exports.addItem = async (req, res) => {
  return res.status(422).send({
    success: false,
    message: "Password does not meet requirements",
  });
};
