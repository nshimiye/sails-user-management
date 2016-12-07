/**
* @Author: mars
* @Date:   2016-12-06T15:17:00-05:00
* @Last modified by:   mars
* @Last modified time: 2016-12-06T18:47:08-05:00
*/
'use strict';

/**
 * UsersController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 module.exports = {
 	register(req,res){
 		API(Registration.registerUser, req, res);
 	},
 	'verify/:email'(req, res){
 		API(Registration.verifyUser, req, res);
 	},
 	current(req,res){
 		API(Registration.currentUser, req, res);
 	}
 };
