const get_product_quantity = require('../product/get_product_/get_product_quantity');
const get_product_price = require('../product/get_product_/get_product_price');
const change_for_order = require('../product/change_for_order');

const get_order_next_id = require('./new_order_/get_order_next_id');
const pull_order_data = require('./new_order_/pull_order_data');

const new_time = require('../new_time/new_time');



module.exports = class order_models {

    new_order( req, res, next ){

        req.on( 'data', function( data ){
        

            const order_data = JSON.parse( data );  
        
            const check_quantity_part = new Promise( function( resolve, reject ){   //檢查訂購數是否超過庫存
                
                const check_quantity_for = async function ( order ){

                    for( let i=0 ; i < order.length ; i++ ){
        
                        await get_product_quantity( order[i][0] )
                            
                            .then( function( result ){  
         
                                if(  result < order[i][1]  ){  reject( {  err: "訂購數超過庫存"  } )   }
                            })
                    }
                    resolve( order_data )
                }
            

                check_quantity_for(  order_data.order_list  )
            })
    

            
            const get_price_part = new Promise( function( resolve, reject ){ 

                check_quantity_part

                    .then( function( order_data ){  
                        

                        const get_price_for = async function ( order ){  

                            for( let i=0 ; i < order.order_list.length ; i++ ){
                
                                await  get_product_price( order.order_list[i][0] )
                                    
                                    .then( function( result ){  order.order_list[i].push( result )  })
                            }
                            
                            resolve( order )
                        }


                        get_price_for( order_data )
                    })

                    .catch( function( err ){  reject( err )  })
            })
    
    
            
            const make_order_list_part = new Promise( function( resolve, reject ){  //取得訂單的編號 並彙整成完整的訂購資料

                get_price_part
                    
                    .then( function( order_data ){  
                        

                        get_order_next_id()     //取得下一個訂單的編號 
                            
                            .then( function( order_id ){   

                                order_data[ 'order_id' ] = order_id[0];  var order_list_final = []
                
                                for( var i=0; i < order_data.order_list.length ; i++ ){
                    
                                    order_list_final.push( {} )
                                    
                                    order_list_final[i][ "order_id" ] = order_data.order_id
                                    order_list_final[i][ "customer_id" ] = order_data.member_id
                                    order_list_final[i][ "product_id" ] = order_data.order_list[i][0]
                                    order_list_final[i][ "order_quantity" ] = order_data.order_list[i][1]
                                    order_list_final[i][ "order_price" ] = order_data.order_list[i][1] * order_data.order_list[i][2]
                                    order_list_final[i][ "is_complete" ] = 0
                                    order_list_final[i][ "create_date" ] = new_time()
                                    order_list_final[i][ "update_date" ] = null
                                }
                    
                                resolve( order_list_final )
                            })
                        
                            .catch( function( err ){  reject( err )  })
                    })

                    .catch( function( err ){  reject( err )  })
            })
    
            
            const pull_data_part_1 = new Promise( function( resolve, reject ){
            
                make_order_list_part

                    .then( function( order_list ){  
                        
                        
                        const change_product_for = async function ( order ){

                            for( let i=0 ; i < order.length ; i++ ){
                
                                await  change_for_order( order[i] )
                                    
                                    .then( function( result ){})
                                    .catch( function( err ){  reject({  err:"訂購數超過庫存"   })  })
                            }
                        
                            resolve( order )
                        }
                
                        change_product_for( order_list )
                    })
                                        
                    .catch( function( err ){  reject( err )  })
            })
            
        
            
            const pull_data_part_2 = pull_data_part_1

                .then( function( order ){  
                    
                    
                    const pull_order_data_for = async function ( order ){

                        for( let i=0 ; i < order.length ; i++ ){
            
                            await pull_order_data( order[i] )
                                
                                .then( function( result ){})
                                .catch( function( err ){  res.send( err )  })
                        }
                        res.send( '訂單匯入資料庫成功' )
                    }
                
    
                    pull_order_data_for(  order  )
                })
                                    
                .catch( function( err ){  res.send( err )  })
        })
    }




}
