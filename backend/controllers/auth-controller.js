// TODO: HASH THE PASSWORD
const db = require("../config/db-config");

exports.checkLogin = async (req, res) => {
  console.log("!!!!!!!!!!!Did we make it to the auth controller?");
  try {
    const [data] = await db.query("SELECT * FROM users WHERE username = ?", [
      req.body.username,
    ]); // using await to wait for the database query to complete
    if (data.length !== 0) {
      // username is found in database
      if (data[0].password === req.body.password) {
        // username and password match
        return res.status(200).send({
          success: true,
          username: req.body.username,
          id: data[0].id,
          message: "Username and password match found",
          data,
        });
      } else {
        return res.status(404).send({
          // If no data, send 404 response
          success: false,
          message: "Incorrect password",
        });
      }
    }

    if (!data || data.length === 0) {
      return res.status(404).send({
        // If no data, send 404 response
        success: false,
        message: "No users with the username is found",
      });
    }
  } catch (error) {
    if (!res.headersSent) {
      // Check if headers are already sent
      return res.status(500).send({
        success: false,
        message:
          "Backend ERROR in auth-controller.js, in checkLogin function, header already sent",
        error: error.message,
      });
    }
  }
};

exports.checkUserCreation = async (req, res) => {
  try {
    const [data] = await db.query("SELECT * FROM users WHERE username = ?", [
      req.body.username,
    ]); // using await to wait for the database query to complete
    if (data.length === 0) {
      // username is not found in the database. user can be created!
      const query = `
                INSERT INTO users (first_name, last_name, username, password)
                VALUES (?, ?, ?, ?)`;
      const values = [
        req.body.firstname,
        req.body.lastname,
        req.body.username,
        req.body.password,
      ];
      const [result] = await db.execute(query, values);
      console.log("User registered with ID:", result.insertId);
      return res.status(200).send({
        success: true,
        message: "Account created succesfully! Proceed to Login.",
        data,
      });
    } else {
      return res.status(404).send({
        // If no data, send 404 response
        success: false,
        message: "User already exists!",
      });
    }
  } catch (error) {
    console.error("Error:", error);
    // TODO: Delete these error messages, they are for development purposes
    if (!res.headersSent) {
      // Check if headers are already sent
      return res.status(500).send({
        success: false,
        message:
          "Backend error: in auth-controller.js, header has already been sent in checkUserCreation function",
        error: error.message,
      });
    } else {
      return res.status(500).send({
        success: false,
        message: "Backend error: unable to add to database",
        error: error.message,
      });
    }
  }
};
