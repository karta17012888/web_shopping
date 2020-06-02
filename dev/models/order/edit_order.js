const pull_edit_order_data = require('./edit_order_/pull_edit_order_data');
const pull_recede_number_product = require('../product/pull_recede_number_product');
const new_time = require('../new_time/new_time');


module.exports = class order_models {


    edit_order( req, res, next ){

        req.on( 'data', function( data ){

            const original_data = JSON.parse( data );  


            const pull_edit_order = new Promise( function( resolve, reject ){   //檢查訂購數是否超過庫存
                        

                async function pull_edit_order_for( data ){
    
                    for( var i=0; i < data.length ; i++ ){
                        
                        await pull_edit_order_data( data[i] )
                                                                                        
                            .then( function( result ){})
                            .catch( function( err ){  reject( err )  })
                    }

                    resolve( original_data )   // 迴圈結束後 傳遞 resolve
                }



                var edit_order_box=[]
    
                for( var i=0; i < original_data.order_list.length ; i++ ){
                    
                    edit_order_box.push( [] )
                    
                    edit_order_box[i].push( [] )
                    edit_order_box[i][0].push( original_data.order_list[i][0], original_data.order_list[i][1] )
                    edit_order_box[i].push( {} )
                    edit_order_box[i][1][ 'order_quantity' ] = original_data.order_list[i][2]
                    edit_order_box[i][1][ 'order_price' ] = original_data.order_list[i][2] * original_data.order_list[i][3]
                    edit_order_box[i][1][ 'update_date' ] = new_time()
                }

                pull_edit_order_for( edit_order_box )   // 執行異步 function
            
            })
            


    
            const pull_recede_product = new Promise( function( resolve, reject ){
    
                pull_edit_order
                        
                    .then( function( original_data ){
                        
                        async function recede_number_product( data ){
                            
                            for( var i=0 ; i < data.length ; i++ ){
                                
                                await  pull_recede_number_product( data[i] )
                                                                                                
                                    .then( function( result ){})
                                    .catch( function( err ){  res.send( err )  })
                            }

                            res.send( "編輯成功" )
                        }


                        var recede_box=[]

                        for( var i=0 ; i < original_data.order_list.length ; i++ ){
                            
                            recede_box.push( [] )
                            recede_box[i].push(  original_data.order_list[i][1], original_data.order_list[i][4] - original_data.order_list[i][2]  )
                        }

                        recede_number_product( recede_box )   
                    
                    })
                        
                    .catch( function( err ){  res.send( err ) })
            })

        })
    }






}
