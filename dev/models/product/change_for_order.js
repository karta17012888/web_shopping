const pool = require('../connect_db/connect_db');


module.exports =  function( order_data ){

    return  new Promise( function ( resolve, reject ){  
        
        pool.getConnection( function ( err, connection ){      
              
            connection.query( ( `update shopping_cart.product set quantity = quantity - ?, update_date = ? WHERE id = ? ;` ), [ order_data.order_quantity, order_data.create_date, order_data.product_id ] , function (err, result) {
                        
                connection.release();
                if (err){   reject( err )  } 
                                        
                else{  resolve( "修改成功" )  }
                                    
            });
            
        });  
    
    });
    
}