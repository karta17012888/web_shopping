const pool = require('../../connect_db/connect_db');


module.exports = function( user_id, order_id ){
    
    return  new Promise( function( resolve, reject ){
        
        pool.getConnection( function ( err, connection ){
                    
            connection.query( ( `update shopping_cart.order set is_complete = 1 where is_complete = 0 and customer_id = ? and order_id = ? ;` ), [ user_id, order_id ], function (err, result) {
                
                connection.release();
                if (err){  reject( err )  } 
                                
                else{  resolve( result )  }          
            })
        })
        
    })
}