/**
* @Author: mars
* @Date:   2016-12-06T15:17:00-05:00
* @Last modified by:   mars
* @Last modified time: 2016-12-06T16:15:23-05:00
*/
'use strict';

/**
 * IndexController
 *
 * @description :: Entry point of the app => it holds a handler for the root route /
 */
module.exports = {
	index(req,res){
			res.send(200, { title: 'UMS', description: 'A User Management System' });
	}
};
