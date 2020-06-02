const get_product_name = require('../product/get_product_/get_product_name');
const get_member_order_list = require('./member_order_/get_member_order_list');

module.exports = class order_models {


    get_member_order_list( req, res, next ){
        
        req.on( 'data', function( data ){
            
            const obj = JSON.parse( data );  //console.log( obj );
            
            
            const order_list = new Promise( function( resolve, reject ){ 
                
                get_member_order_list( obj.id )
                    
                    .then( function( result ){  resolve( result )  })
                    
                    .catch( function( err ){  reject( err )  })
            });


            const product_name = order_list          
    
                .then( function( order ){  
                    

                    const get_product_name_for =  async function( id, order ){

                        var product_box = {}
            
                        for( let i=0 ; i < id.length ; i++ ) {
                        
                            await get_product_name( id[i] )
                
                                .then( function( result ){  product_box[ id[i] ] = result  })
                                
                                .catch( function( err ){  res.send( err )  })
                        }

                        for( let j=0 ; j < order.length ; j++ ){

                            order[j][ "product_name" ] = product_box[ order[j]["product_id"] ]
                        }

                        res.send( order )
                    }


                    var product_id=[]
                    
                    for( var i=0 ; i < order.length ; i++ ){       // 將購物車的產品id 裝入 arry 

                        if(  product_id.includes( order[i].product_id ) == false ){

                            product_id.push( order[i].product_id )  
                        }
                    }
                    
            
                    get_product_name_for(  product_id, order  )
                    
                })
                
                .catch( function( err ){  res.send( err )  }) 

        })
    }
}