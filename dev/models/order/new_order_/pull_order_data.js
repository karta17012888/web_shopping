const pool = require('../../connect_db/connect_db');



module.exports = function( order ){
    
    return  new Promise( function ( resolve, reject ){

        pool.getConnection( function ( err, connection ){     
                    
            connection.query( ( `insert into shopping_cart.order set ? ` ), [ order ] ,function (err, result) {

                connection.release()
                if (err){ reject( err ) } 
                
                resolve( "ok" )
            })
        })
    })
}

