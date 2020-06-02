const config = require('../../config/development_config');
const nodemailer = require('nodemailer');

module.exports = nodemailer.createTransport({
    
    service: 'gmail',
    auth: {
        user: config.sender_mail.user, 
        pass: config.sender_mail.password
    }
});
