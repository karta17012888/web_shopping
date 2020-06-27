const pool = require('../connect_db/connect_db');

module.exports = class product_models {

    product_all( req, res, next ){

        pool.getConnection( function ( err, connection ){         
                
            connection.query( ( `SELECT * FROM shopping_cart.product;` ),function (err, result) {
                
                connection.release();
                if (err){  res.send( err )  } 
                                
                else{  res.send( result )  }          
            })
        })         
    }
}

