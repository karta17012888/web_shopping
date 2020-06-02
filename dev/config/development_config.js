require('dotenv').config()      // 模組'dotenv'作用: 引入 .nev 的參數 可以保護敏感資料不被人看見
                                // 外部可引用此檔案 來獲得參數                   
module.exports = {
    
    mysql: {
        
        host: process.env.HOST,                // 用 process.nev 來呼叫 .nev 內的參數
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE,
        connectionLimit: process.env.CONNECTIONLIMIT
    },

    secret: process.env.MY_SECRET,               // 這裡的參數 是簽署金鑰 不能外洩

    sender_mail: {

        user: process.env.SERVER_MAIL_ACCOUNT,
        password: process.env.SERVER_MAIL_PASSWORD,

    }

}