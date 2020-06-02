const express = require('express');
const router = express.Router();

const Get_product = require('../../models/product/get_product');


get_product  = new Get_product()



router.get( '/' , get_product.product_all );

router.get( '/warm' , get_product.warm_test );


module.exports = router;

