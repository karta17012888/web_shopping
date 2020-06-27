const express = require('express');
const router = express.Router();


const Login = require('../../models/member/login/member_login');
const Register = require('../../models/member/register/member_register');
const Edit = require('../../models/member/edit/member_edit');
const Token_test = require('../../models/member/token_test/member_token_test');

login = new Login();
register = new Register();
edit = new Edit();
token_test = new Token_test();


router.post( '/login' , login.member_login );
router.post( '/login/new_page' , login.find_vuex_or_id );
router.post( '/register' , register.member_register );
router.post( '/edit' , edit.member_edit );
router.post( '/token' , token_test.token_test );


module.exports = router;