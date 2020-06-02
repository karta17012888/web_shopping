const pool = require('../../connect_db/connect_db');


module.exports =  function( product_id ){

    return  new Promise( function ( resolve, reject ){  

        pool.getConnection( function ( err, connection ){      
                
            connection.query( ( `SELECT name FROM shopping_cart.product WHERE id = ? ` ), product_id, function (err, result) {
                        
                connection.release();
                if (err){   reject( err )  } 
                                        
                else{  resolve( result[0].name )  }
                                    
            });
        });  
    
    });
    
}