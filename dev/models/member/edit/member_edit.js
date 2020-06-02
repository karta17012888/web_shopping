const edit_data = require('./member_edit_/edit_data');
const new_time= require('../../new_time/new_time');



module.exports = class member_models {

    member_edit( req, res, next ){

        req.on( 'data', function( data ){
            const obj = JSON.parse( data );
                    
            const updata_data = { name: obj.name, password: obj.password, update_date: new_time() }
            
            edit_data( updata_data, obj.member_id )
                .then( function( result ){  res.send(  result  )  })
                            
                .catch( function (err){   res.send( err )  })   
        })
    }


}

