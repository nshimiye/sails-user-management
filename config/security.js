/**
* @Author: mars
* @Date:   2016-12-06T14:36:23-05:00
* @Last modified by:   mars
* @Last modified time: 2016-12-06T14:38:41-05:00
*/
module.exports.security = {
    oauth : {
        version : '2.0',
        token : {
            length: 32,
            expiration: 3600
        }
    },
    admin: {
        email: {
            address: process.env.ADMIN_EMAIL,
            password: process.env.ADMIN_PASSWORD
        },

    },
    server: {
        url: 'http://localhost:1336'
    }
};
