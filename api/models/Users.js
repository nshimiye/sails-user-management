/*jshint camelcase: false*/
/**
* @Author: mars
* @Date:   2016-12-06T15:01:26-05:00
* @Last modified by:   mars
* @Last modified time: 2016-12-06T16:56:59-05:00
*/
'use strict';

/**
 * Users.js
 *
 * @description :: a user is the owner of content saved by the system
 *                they can allow external applications to access their data by generating tokens for them(exteral application)
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
 // var promisify = require('bluebird').promisify;
  var bcrypt = require('bcrypt');
 module.exports = {

     attributes: {

         username: {
             type: 'string',
             unique: true,
             required: true
         },

         email: {
             type: 'email',
             unique: true,
             required: true
         },

         password: {
             type: 'string',
             required: true,
             columnName: 'encrypted_password',
             minLength: 8
         },

         first_name: {
             type: 'string'
         },

         last_name: {
             type: 'string'
         },

         location: {
             type: 'string'
         },

         date_registered: {
             type: 'date'
         },

         date_verified: {
             type : 'date'
         },

         comparePassword: function(password) {
             return bcrypt.compareSync(password, this.password);
         },

         toJSON: function() {

             var obj = this.toObject();
             delete obj.password;

             return obj;
         }

     },

     beforeCreate: function(user, next) {
         if (user.hasOwnProperty('password')) {
             user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
             next(false, user);

         } else {
             next(null, user);
         }
     },


     beforeUpdate: function(user, next) {
         if (user.hasOwnProperty('password')) {
             user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
             next(false, user);
         } else {
             next(null, user);
         }
     },

     authenticate: function (username, password) {
         return API.Model(Users).findOne({username: username}).then(function(user){
             return (user && user.date_verified && user.comparePassword(password))? user : null;
         });
     }

/*
     // validation types
     types: {

       isEmail: function(value) {
         // For all creates/updates of `User` records that specify a value for an attribute
         // which declares itself `type: 'password'`, that value must:
         // • be a string
         // • be at least 6 characters long
         // • contain at least one number
         // • contain at least one letter
         return _.isString(value) && value.length >= 6 && value.match(/[a-z]/i) && value.match(/[0-9]/);
       },

       password: function(value) {
         // For all creates/updates of `User` records that specify a value for an attribute
         // which declares itself `type: 'password'`, that value must:
         // • be a string
         // • be at least 6 characters long
         // • contain at least one number
         // • contain at least one letter
         return _.isString(value) && value.length >= 6 && value.match(/[a-z]/i) && value.match(/[0-9]/);
       }

     }
*/

 };
