/**
* @Author: mars
* @Date:   2016-12-06T15:17:07-05:00
* @Last modified by:   mars
* @Last modified time: 2016-12-06T16:32:22-05:00
*/
'use strict';

/**
 * ClientsController
 *
 * @description :: Server-side logic for managing clients
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	register(req, res){
			API(Registration.registerClient, req, res);
	},
	'verify/:email'(req, res){
			API(Registration.verifyClient, req, res);
	}
};
