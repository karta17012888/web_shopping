const pool = require('../../../connect_db/connect_db');
const new_time = require('../../../new_time/new_time');

module.exports = function( data ){
    

    return  new Promise( function( resolve, reject ){

        pool.getConnection( function ( err, connection ){         
                
            connection.query( ( `insert into shopping_cart.member( name,email,password,create_date ) values ( ?, ?, ?, ? )` ), [ data.name, data.email, data.password, new_time() ] ,function (err, result) {
                     
                connection.release();
                if (err){ reject( err ) } 
                            
                else{ resolve( "註冊成功" ) }
                        
            });
        });  
    })
}