const pool = require('../connect_db/connect_db');



module.exports =  function( data ){

    return  new Promise( function ( resolve, reject ){  

        pool.getConnection( function ( err, connection ){      
                
            connection.query( ( `update shopping_cart.product set quantity = quantity + ? WHERE id = ? ` ), [ data[1], data[0]  ], function (err, result) {
                        
                connection.release();
                if (err){   reject( err )  } 
                                        
                else{  resolve( "反還產品成功" )  }
                     
            })
        })
    })
}

