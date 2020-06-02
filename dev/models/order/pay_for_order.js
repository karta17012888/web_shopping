const complete_order = require('./pay_for_order_/complete_order');
const connect_mail = require('../connect_mail/connect_mail');
const config = require('../../config/development_config');



module.exports = class order_models {


    pay_for_order( req, res, next ){
        
        req.on( 'data', function( data ){
            
            const order_inf = JSON.parse( data )
            
            
            const complete_to_order = new Promise( function( resolve, reject ){ 
                
                complete_order( order_inf.user_id, order_inf.order_id )
                    
                    .then( function( result ){  resolve( order_inf )  })
                    
                    .catch( function( err ){  reject( err )  })
                
            });

            
            const send_email_message = complete_to_order     
    
                .then( function( order_inf ){  
                    
                    console.log( order_inf )
                    
                    const mailOptions = {
                        
                        from: `"企鵝購物網" <${config.sender_mail.user}>`, 
                        to: order_inf.user_email,
                        subject: order_inf.user_name + '您好，您所購買的訂單已經完成。',  
                        html: `<p>Hi, ${order_inf.user_name} </p>` + `<br>` + `<br>` + `<span>感謝您訂購<b>企鵝購物網</b>的商品，歡迎下次再來！</span>`
                    }

                    
                    
                    connect_mail.sendMail(  mailOptions, function( err, info ){

                        if (err) {  return console.log(err)  }
                        
                        console.log('Message %s sent: %s', info.messageId, info.response);
                    
                    })
                    console.log( "send_email_message_3" )
                    var result = {

                        status: '訂單編號：' + order_inf.order_id + ' 付款已完成，謝謝您使用該服務！詳細的訂單資訊已寄送至 ' + order_inf.user_email
                    }

                    res.send( result )
                    
                })
                
                .catch( function( err ){  res.send( err )  }) 
            
        })
        
    }
}