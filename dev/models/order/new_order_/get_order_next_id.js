const pool = require('../../connect_db/connect_db');


module.exports = function(){
    
    return  new Promise( function ( resolve, reject ){

        pool.getConnection( function ( err, connection ){     
                    
            connection.query( ( `SELECT MAX(order_id) AS id FROM shopping_cart.order;` ),function (err, result) {

                connection.release();
                if (err){  reject( err )  } 
                                
                else{  
                    
                    if( result[0].id == null ){  resolve( [1] )  }     
                    
                    else{  resolve(  [ result[0].id + 1 ]   )   }
                
                }          
            })
        })
    })
}