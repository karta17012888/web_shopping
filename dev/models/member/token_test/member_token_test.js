const jwt = require('jsonwebtoken');
const config = require('../../../config/development_config');


module.exports = class token_test_models {

    token_test( req, res, next ){

        req.on( 'data', function( data ){
            
            const obj = JSON.parse( data );  const token = obj.token;
            
            if( token ){   
    
                jwt.verify( token, config.secret, function ( err, decoded ){
                    
                    if( err ){ 
                        
                        if( err.message == "jwt expired" ){  res.send(  { status : "token_err", err : "time_out" } )  }
     
                        else{ res.send( { status : "token_err", err : err } )  }       
                    }
                    
                    else{  res.send(  { status : "token_pass" ,  id : decoded.data }  )  }
                })
            }
    
            else{ res.send( { status : "token_err", err : "請輸入token" } )  }
        })
    }
}

        /*
        verification_token( obj.token )
                
            .then( function( result ){  res.send( result )  })
            .catch( function( err ){  res.send( err )  })
        */