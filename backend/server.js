// TODO: DELETE DB IF ONE EXISTS
const { check, validationResult } = require("express-validator"); // check is the function used to validate and sanitize inputs
const morgan = require("morgan");
const colors = require("colors");
const dotenv = require("dotenv");
const express = require("express"); // import ExpressJS library
const app = express(); // create ExpressJS application
const path = require("path");
const bodyParser = require("body-parser"); // import middleware, will prase the request for the creation of the req.body object
const cors = require("cors"); // provides express middleware
const authRoutes = require("./routes/auth-routes"); // import authentication route, allows you to reuse logic from this file
const mySqlPool = require("./config/db-config");

dotenv.config();

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false })); // .urlencoded - parsing URL encoded data from the body, extended: false uses QueryString library
app.use(express.json());
app.use("/api/auth", authRoutes); // Whenever a request starts with this path, hand it off to this router or middleware.

app.use(cors());

// app.get("/", (req, res) => {
//   res.json({ succes: true });
// });

const port = process.env.PORT || 3001;
mySqlPool
  .query("SELECT 1")
  .then(() => {
    console.log("MySQL DB is connected".bgCyan.white);
    app.listen(port, () =>
      console.log(`This app is listening on port ${port}`.bgCyan.white)
    ); // Function to listen on the port
  })
  .catch((error) => {
    console.log(error);
  });
