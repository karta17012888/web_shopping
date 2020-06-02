const jwt = require('jsonwebtoken');
const config = require('../../../../config/development_config');


module.exports = function( id ) {             // 輸入id 後產生回傳token
    
    return  new Promise( function ( resolve, reject ){
        
        const token = jwt.sign({ 
                        
            algorithm: 'HS256',
            exp: Math.floor( Date.now() / 1000 ) + ( 60 * 60 * 24 ),   // token 24個小時後過期
            data: id

        }, config.secret)

        resolve( token )  
    });

}