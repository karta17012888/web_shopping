const check_data = require('./member_login_/check_data');
const make_token = require('./member_login_/make_token');

const get_member_data = require('./member_login_/get_member_data');


module.exports = class member_models {


    member_login( req, res, next ){

        req.on( 'data', function( data ){
        
            const obj = JSON.parse( data ); //console.log( obj )
            
            const check = new Promise( function( resolve, reject ){ 
                
                check_data( obj )
                    
                    .then( function( result ){  resolve( result )  })
                    .catch( function( err ){   reject( err )  })
            });
    
    
            const token = check
                .then( function( result ){    
    
                    var target_data = result
                                                        
                    make_token( target_data[0].id )
                            
                        .then( function( result ) {
                            
                            res.header( 'token', result ); 
                            res.send(
                                {
                                    status: "登入成功",  loginMember: "歡迎 " + target_data[0].name + " 的登入！",
                                    data: target_data
                                }
                            )
                        })        
                        .catch( function( err ){  res.send( err )  })
                })
                .catch( function( err ){  res.send( err )  })
        })
    }



    find_vuex_or_id( req, res, next ){

        req.on( 'data', function( data ){

            const obj = JSON.parse( data );  
            
            
            const get_data = new Promise( function( resolve, reject ){ 
                
                get_member_data( obj )
                    
                    .then( function( result ){  res.send( result )  })
                    .catch( function( err ){  res.send( err )  })
            });
        })
    }



}