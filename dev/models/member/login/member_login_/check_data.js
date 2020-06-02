const pool = require('../../../connect_db/connect_db');



module.exports = function( target_data ) {
        
    return  new Promise( function ( resolve, reject ){
    
        pool.getConnection( function ( err, connection ){         
            
            connection.query( `select * from shopping_cart.member where email = ? and password = ? ;`, [ target_data.account, target_data.password ], function (err, result) {
        
                connection.release();
                
                if (err){  reject({  status : "登入失敗",  err : err  })  }

                else if( result.length == 0  ){  reject({  status : "登入失敗",  err : "帳號或密碼錯誤"  })  }
                
                else{  resolve( result )  }
            
            });
        });
    });    
}


