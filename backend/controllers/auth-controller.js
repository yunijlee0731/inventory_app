// TODO: HASH THE PASSWORD

const db = require("../config/db-config");

exports.checkLogin = async (req, res) => {
  try {
    const [data] = await db.query("SELECT * FROM users WHERE username = ?", [
      req.body.username,
    ]); // using await to wait for the database query to complete
    if (data.length !== 0) {
      // username is found in database
      if (data[0].password === req.body.password) {
        // username and password match
        console.log("\tYJ: DEBUGGING user validated");
        return res.status(200).send({
          success: true,
          message: "Username and password match found",
          data,
        });
      } else {
        console.log("\tYJ: DEBUGGING Password is incorrect");
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
    console.log(
      "\t*************** YJ: ERROR in auth-controller.js in checkLogin function: PRINTING STACK TRACE*************"
    );
    console.error("Error:", error);
    if (!res.headersSent) {
      // Check if headers are already sent
      return res.status(500).send({
        success: false,
        message: "ERROR in auth-controller.js, in checkLogin function",
        error: error.message,
      });
    }
  }
};

exports.checkUserCreation = async (req, res) => {
  // try {
  //     // Hash the plain text password
  //     const hashedPassword = await bcrypt.hash(plainTextPassword, 10);

  //     // Store the hashed password in the database
  //     const query = `
  //         INSERT INTO users (first_name, last_name, username, password)
  //         VALUES (?, ?, ?, ?)
  //     `;
  //     const values = [firstName, lastName, username, hashedPassword];

  //     const [result] = await db.execute(query, values);

  //     console.log('User registered with ID:', result.insertId);
  // } catch (error) {
  //     console.error('Error registering user:', error);
  // }

  try {
    // console.log("HERE IS THE REQUEST");
    // console.log(req);
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
      return res.status(200).sned({
        success: true,
        message: "Account created succesfully!",
      });
      //   return res.status(200).send({
      //     success: true,
      //     message: "Account created succesfully",
      //     data,
      //   });
    } else {
      return res.status(404).send({
        // If no data, send 404 response
        success: false,
        message: "User already exists!",
      });
    }
  } catch (error) {
    console.log(
      "\t*************** YJ: ERROR in auth-controller.js in checkUserCreation function: PRINTING STACK TRACE*************"
    );
    console.error("Error:", error);
    if (!res.headersSent) {
      // Check if headers are already sent
      return res.status(500).send({
        success: false,
        message: "ERROR in auth-controller.js, in checkUserCreation function",
        error: error.message,
      });
    }
  }
};
