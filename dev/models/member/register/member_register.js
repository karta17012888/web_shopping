const test_email = require('./member_register_/test_email_form');
const pull_member = require('./member_register_/pull_member_data');


module.exports = class member_models {


    member_register( req, res, next ){

        req.on( 'data', function( data ){

            const register_data = JSON.parse( data );   
        
            const check =  new Promise( function( resolve, reject ){ 
                
                test_email.test_email( register_data.email ) 
                    
                    .then( function( result ){  resolve( result )  })
                    .catch( function( err ){  reject( err )  })
            });
    
    
            const updata_new = check
                
                .then( function( result ){  
                                                        
                    pull_member( register_data )  
                        
                        .then( function( result ){ res.send( result )  })
                        .catch( function( err ){  res.send( err )  })
                })
                
                .catch( function( err ){  res.send( err )  })
        })
    }


}



