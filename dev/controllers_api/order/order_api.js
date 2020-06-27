const express = require('express');
const router = express.Router();

const New_order = require('../../models/order/new_order');
const Member_order = require('../../models/order/member_order');
const Edit_order = require('../../models/order/edit_order');
const Pay_for_order = require('../../models/order/pay_for_order');
const Over_order = require('../../models/order/over_order');

new_order = new New_order()
member_order = new Member_order()
edit_order = new Edit_order()
pay_for_order = new Pay_for_order()
over_order = new Over_order()


router.post( '/member' , member_order.get_member_order_list );

router.post( '/add' , new_order.new_order );

router.post( '/edit' , edit_order.edit_order );

router.post( '/pay' , pay_for_order.pay_for_order );

router.post( '/over' , over_order.over_order );



module.exports = router;