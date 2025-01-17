const mySql = require('mysql2/promise');
const mySqlPool = mySql.createPool({
    host: 'localhost',
    user: 'root',
    password: '0731f5gh',
    database: 'users_db'
});

module.exports = mySqlPool; 