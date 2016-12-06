/**
* @Author: mars
* @Date:   2016-12-06T15:17:00-05:00
* @Last modified by:   mars
* @Last modified time: 2016-12-06T15:18:14-05:00
*/
'use strict';

/**
 * UsersController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	register: function(req,res){
			API(Registration.registerUser,req,res);
	},
	'verify/:email': function(req,res){
			API(Registration.verifyUser,req,res);
	},
	current: function(req,res){
					API(Registration.currentUser,req,res);
	}
};
