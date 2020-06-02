const pool = require('../../../connect_db/connect_db');


function test_email_form( email ){

    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const result = re.test(email);
    return result;

}  // 測試是否符合e_mail格式 



function test_email_same( email ){  

    return  new Promise( function ( resolve, reject ){
        
        pool.getConnection( function ( err, connection ){          
                    
            connection.query( ( `select * from shopping_cart.member where email = ?` ), [ email ] ,function (err, result) {
                
                connection.release();
                if(err){ reject( err ) };
                

                if( result.length >= 1 ){  reject( { err : "已有重複的Email 無法註冊" } )   }
        
                else{  resolve( { status: "可註冊" } )  }
            });
        });
    });
}   // 判斷 email 是否重複




function test_email( email ){


    return  new Promise( function ( resolve, reject ){

        if(  test_email_form( email ) === false ){  reject( { err : 'e_mail 不符合格式' } )  }

        else{

            test_email_same( email )
                
                .then( function(result){  resolve( result )  })
                
                .catch( function (err){  reject( err )  })
        }
    })
}




module.exports={

    test_email_form,  test_email_same,  test_email 

}