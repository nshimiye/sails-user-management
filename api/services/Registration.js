/*jshint camelcase: false*/
/**
* source: https://github.com/nshimiye/OAUTH-Server-with-Sails-and-AngularJS/blob/master/OAUTH_README.md
* @Author: mars
* @Date:   2016-12-06T15:39:25-05:00
* @Last modified by:   mars
* @Last modified time: 2016-12-06T18:16:06-05:00
*/
'use strict';

var Promise = require('bluebird'),
    // promisify = Promise.promisify,
    mailer = require('nodemailer'),
    emailGeneratedCode,
    transporter;


transporter = mailer.createTransport({
    service: 'gmail',
    auth: {
        user: sails.config.security.admin.email.address,
        pass: sails.config.security.admin.email.password
    }
});

emailGeneratedCode = function (options) {
    let url = options.verifyURL,
        email = options.email;


    let message = 'Hello!';
    message += '<br/>';
    message += 'Please visit the verification link to complete the registration process.';
    message += '<br/><br/>';
    message += 'Account with ' + options.type + ' : ' + options.id;
    message += '<br/><br/>';
    message += '<a href="';
    message += url;
    message += '">Verification Link</a>';
    message += '<br/>';

    sails.log.debug(' ---------------------------------START----------------------------------------\n');
    sails.log.info(message);
    sails.log.debug('\n--------------------------------  END  --------------------------------------- ');

    transporter.sendMail({
        from: sails.config.security.admin.email.address,
        to: email,
        subject: 'UMS - The user management system',
        html: message
    }, function (err, info) {
        console.log('Email Response:', err, info);
    });

    sails.log.debug(' ---------------------------------START----------------------------------------\n');
    sails.log.info({ url });
    sails.log.debug('\n--------------------------------  END  --------------------------------------- ');

    return {
        ok: true, message: 'Please check your email for verification information'
    };
};

module.exports = {
    emailGeneratedCode,
    currentUser(data,context){
      return context.identity;
    },
    registerUser(data, context) {
        var date = new Date();
        return API.Model(Users).create({
            username: data.username,
            email: data.email,
            password: data.password,
            date_registered: date
        }).then(function (user) {
            context.id = user.username;
            context.type = 'Username';
            return Tokens.generateToken({
                user_id: user.id,
                client_id: Tokens.generateTokenString()
            });
        }).then(function (token) {
            return emailGeneratedCode({
                id: context.id,
                type: context.type,
                verifyURL: sails.config.security.server.url + '/users/verify/' + data.email + '?code=' + token.code,
                email: data.email
            });
        });

    },

    verifyUser(data /*, context */) {
        return Tokens.authenticate({
            code: data.code,
            type: 'verification',
            email: data.email
        }).then(function (info) {
            var date = new Date();
            if (!info) { return Promise.reject('Unauthorized'); }

            API.Model(Users).update(
                {
                    username: info.identity.username
                },
                {
                    date_verified: date
                }
            );

            return {
                verified: true,
                email: info.identity.email
            };
        });
    },

    registerClient: function (data, context) {
        return API.Model(Clients).create({
            client_id: Tokens.generateTokenString(),
            client_secret: Tokens.generateTokenString(),
            email: data.email
        }).then(function (client) {
            context.id = client.client_id;
            context.type = 'Client ID';

            return Tokens.generateToken({
                client_id: client.client_id
            });
        }).then(function (token) {
            return emailGeneratedCode({
                id: context.id,
                type: context.type,
                verifyURL: sails.config.security.server.url + '/clients/verify/' + data.email + '?code=' + token.code,
                email: data.email
            });
        });
    },

    verifyClient: function (data /*, context */ ) {
        return Tokens.authenticate({
            type: 'verification',
            code: data.code,
            email: data.email
        }).then(function (info) {
            var date = new Date();
            if (!info) { return Promise.reject('Unauthorized'); }

            API.Model(Clients).update(
                {
                    client_id: info.identity.client_id
                },
                {
                    date_verified: date
                }
            );

            return {
                verified: true,
                email: info.identity.email
            };
        });
    }
};
