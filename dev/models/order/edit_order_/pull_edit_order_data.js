const pool = require('../../connect_db/connect_db');



module.exports = function( data ){

    return  new Promise( function( resolve, reject ){

        if( data[1].order_quantity > 0 ){

            pool.getConnection( function ( err, connection ){         
                    
                connection.query( ( `update shopping_cart.order set ? where order_id = ? and product_id = ? ;` ), [ data[1], data[0][0], data[0][1] ] ,function (err, result) {
                         
                    connection.release();
                    if (err){ reject( err ) } 
                                
                    else{ resolve( "訂單匯入資料庫成功" ) }
                            
                });
            });  
        }

        else{
            
            pool.getConnection( function ( err, connection ){          
                    
                connection.query( ( `delete from shopping_cart.order where order_id = ? and product_id = ?` ), [  data[0][0], data[0][1] ] ,function (err, result) {
                         
                    connection.release();
                    if (err){ reject( err ) } 
                                
                    else{ resolve( "刪除資料成功" ) }
                            
                });
            }); 
            

        }

    })

    


}

