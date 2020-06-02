const path = require('path')
const express = require('express');
const app = express(); 
const router = express.Router();



router.use( "/", express.static( path.resolve( __dirname, './dist' ) ) );  


router.get( "/", function( req, res ){

    res.sendFile( path.join( __dirname + '/views/index_2.html') )
})

router.get( "/register", function( req, res ){

    res.sendFile( path.join( __dirname + '/views/index_2.html') )
})


router.get( "/home", function( req, res ){

    res.sendFile( path.join( __dirname + '/views/index_2.html') )
})

router.get( "/login", function( req, res ){

    res.sendFile( path.join( __dirname + '/views/index_2.html') )
})


router.get( "/home/:mode_1", function( req, res ){

    res.sendFile( path.join( __dirname + '/views/index_2.html') )
})



app.use( "/", router );  // 讓 router.use 代替所有 app.use 工作

var port = 7894 ;
app.listen( port, ( ) => {

    console.log( `App server linstening on port -> http://localhost:${port}` );
} )








router.use(function(req, res, next) {  // 只要使用 router 就會先執行此函式

    console.log( "type: " + req.method, ", url: " + req.url );  // 輸出記錄訊息至終端機
    console.log( 'Time: ', Date.now() );

    next();  // 繼續路由處理
});




const member_api = require('./dev/controllers_api/member/member_api')
const product_api = require('./dev/controllers_api/product/product_api')
const order_api = require('./dev/controllers_api/order/order_api')


router.use( "/member", member_api );
router.use( "/product", product_api );
router.use( "/order", order_api );