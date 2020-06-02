const pool = require('../../connect_db/connect_db');


module.exports = function( id ){
    

    return  new Promise( function( resolve, reject ){
        
        pool.getConnection( function ( err, connection ){         
                    
            connection.query( ( `SELECT * FROM shopping_cart.order where is_complete = 0 and customer_id = ? ` ), [ id ], function (err, result) {
                
                connection.release();
                if (err){  reject( err )  } 
                                
                else{  resolve( result )  }          
            })
        })
    })
}