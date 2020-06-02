const pool = require('../../../connect_db/connect_db');

module.exports = function( data, id ) {
        
    return  new Promise( function ( resolve, reject ){
    
        pool.getConnection( function ( err, connection ){         

            connection.query( `update shopping_cart.member set ? where id = ? `, [ data, id ], function (err, result) {
        
                connection.release();
                
                if (err){  reject({  status : "資料更新失敗",  err : err  })  };
                
                resolve( { status : "資料更新成功", data : result } );   
            });
        });
    });    
        
}


