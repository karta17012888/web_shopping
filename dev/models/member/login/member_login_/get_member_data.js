const pool = require('../../../connect_db/connect_db');



module.exports = function( target_data ) {     // 用 sess.id 找回 mmember的資料
        
    return  new Promise( function ( resolve, reject ){
        
        
        pool.getConnection( function ( err, connection ){         
            
            connection.query( `select * from shopping_cart.member where id = ? ;`, [ target_data.id ], function (err, result) {
        
                connection.release();
                
                if( err ){  reject(  err  )  }

                else{  resolve(  result  )  }
                
            });
        });
        
    });    
}


