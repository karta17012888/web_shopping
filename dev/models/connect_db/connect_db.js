const config = require('../../config/development_config');    // config 引入參數

const mysqlt = require("mysql");


var pool = mysqlt.createPool({

    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
    connectionLimit: config.mysql.connectionLimit,
});


module.exports = pool;
