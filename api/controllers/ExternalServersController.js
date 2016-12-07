/**
* @Author: mars
* @Date:   2016-12-06T15:17:00-05:00
* @Last modified by:   mars
* @Last modified time: 2016-12-06T19:08:57-05:00
*/
'use strict';

/**
 * ExternalServersController
 * @TODO
 * @description :: wrapper around UsersController
 * 							it is in charge of fetching user info from external server (example google, twitter, linkedin)
 * 							then register the user automatically, without asking them for any extra information.
 * 							- username = email
 * 							- email = email
 * 							- password = <randomly generated>
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	// @TODO add index handler that creates external server login link (clientID)
	// @TODO add logic in the register to fetch all required information
	register(req, res){
		// @TODO fetch token
		// @TODO fetch user info
		// @TODO save all fetched info in the userHistory of the "externalService" object
		// @NOTE externalService is different from externalServer
		// - externalServer is an oauth2 server used by UMS to signup a user
		// - externalService is a integrated service, by the existing user
		// => externalServer always has an externalService associated with it
		API(ExternalServerRegistration.registerUser, req, res);
	},
	'verify/:email'(req, res){
		// @TODO remove
		API(ExternalServerRegistration.verifyUser, req, res);
	},
	current(req,res){
		// @TODO remove
		API(ExternalServerRegistration.currentUser, req, res);
	}
};
