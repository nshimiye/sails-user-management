/*jshint camelcase: false*/
/**
* @Author: mars
* @Date:   2016-12-06T15:01:15-05:00
* @Last modified by:   mars
* @Last modified time: 2016-12-06T16:43:40-05:00
*/
'use strict';

/**
 * Clients.js
 *
 * @description :: a client is an outside application that relies on this app for session management
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
 // var promisify = require('bluebird').promisify;
 var bcrypt = require('bcrypt');
 module.exports = {

     attributes: {

         name: {
             type: 'string'
         },

         organization: {
             type: 'string'
         },

         email: {
             type: 'email',
             required: true
         },

         client_id: {
             type: 'string',
             required: true,
             unique: true
         },

         client_secret: {
             type: 'string',
             required: true
         },

         trust_level: {
             type: 'string'
         },

         redirect_uri: {
             type: 'string',
             urlish: true
         },

         date_registered: {
             type: 'string'

         },
         date_verified: {
             type: 'string'
         },

         compareSecret: function(clientSecret) {
             return bcrypt.compareSync(clientSecret, this.client_secret);
         },

         toJSON: function () {
             var obj = this.toObject();
             delete obj.client_secret;

             return obj;
         }

     },

     beforeCreate: function (client, next) {
         if (client.hasOwnProperty('client_secret')) {
             client.clientSecret = bcrypt.hashSync(client.client_secret, bcrypt.genSaltSync(10));
             next(false, client);

         } else {
             next(null, client);
         }
     },

     beforeUpdate: function (client, next) {
         if (client.hasOwnProperty('client_secret')) {
             client.clientSecret = bcrypt.hashSync(client.client_secret, bcrypt.genSaltSync(10));
             next(false, client);
         } else {
             next(null, client);
         }
     },


     authenticate: function (clientId, clientSecret) {
         return API.Model(Clients).findOne({client_id: clientId}).then(function (client) {
             return (client && client.compareSecret(clientSecret) ) ? client : null;
         });
     }

 };
