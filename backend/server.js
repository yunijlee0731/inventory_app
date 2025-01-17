const {check, validationResult} = require('express-validator'); // check is the function used to validate and sanitize inputs
const morgan = require('morgan'); 
const colors = require('colors');
const dotenv = require('dotenv');
const express = require('express'); // import ExpressJS library 
const app = express(); // create ExpressJS application
const path = require('path'); 
const bodyParser = require('body-parser'); // import middleware, will prase the request for the creation of the req.body object
const cors = require("cors"); // provides express middleware 
const authRoutes = require('./routes/auth-routes'); // import authentication route, allows you to reuse logic from this file  
const mySqlPool = require('./config/db-config');

// var corsOptions = { // cors middlware checks if the Oriign header matches the origin value in corsOptions. 
// 	origin: "http://localhost:3000/"
// };
dotenv.config(); 

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended: false})); // .urlencoded - parsing URL encoded data from the body, extended: false uses QueryString library 
app.use(express.json());
app.use('/api/auth', authRoutes); // Whenever a request starts with this path, hand it off to this router or middleware.
// app.use(cors(corsOptions));
app.use(cors());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/static/index.html'));
}); 

//******************* DATABASE *******************/
// The user should not forget to summon the sync() method in the server.js.
// const db = require("./app/models");
// db.sequelize.sync();

// db.sequelize.sync({force: true}).then(() => { // When you need to drop the existing tables and the database is required to be resynchronized, enter the force: true code like the below:
//     console.log("Drop and resync db.");

// });
//******************* DATABASE *******************/

const port = process.env.PORT || 3000; // Port we will listen on, in cloud services, this might be const port = process.env.PORT || 3000; 
mySqlPool.query("SELECT 1").then(() => {
    console.log("MySQL DB is connected".bgCyan.white);
    app.listen(port, () => console.log(`This app is listening on port ${port}`.bgCyan.white)); // Function to listen on the port
}).catch((error) => {
    console.log(error);
}); 
