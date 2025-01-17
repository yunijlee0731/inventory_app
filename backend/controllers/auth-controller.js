const db = require("../config/db-config");

exports.checkLogin = async (req, res) => {
    try {
        const [data] = await db.query('SELECT * FROM users WHERE username = ?', [req.body.username]); // using await to wait for the database query to complete
        if(data.length !== 0) { // username is found in database 
            if (data[0].password === req.body.password) { // username and password match 
                console.log("\tYJ: DEBUGGING user validated"); 
                return res.status(200).send({
                    success: true,
                    message: "Username and password match found",
                    data,
                });
            }
            else {
                console.log("\tYJ: DEBUGGING Password is incorrect");
                return res.status(404).send({ // If no data, send 404 response
                    success: false,
                    message: "Incorrect password"
                });
            }
        }

        if (!data || data.length === 0) {
            return res.status(404).send({ // If no data, send 404 response
                success: false,
                message: "No users with the username is found"
            });
        }

        console.log(data); // If data is found, send 200 response        
    } catch (error) {
        console.log("\t*************** YJ: ERROR in auth-controller.js: PRINTING STACK TRACE*************"); 
        console.error("Error:", error);
        if (!res.headersSent) { // Check if headers are already sent
            return res.status(500).send({
                success: false,
                message: "*************** YJ: ERROR in auth-controller.js, in function checkLogin*************",
                error: error.message
            });
        }
    }
};
