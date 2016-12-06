/**
* @Author: mars
* @Date:   2016-12-06T15:16:54-05:00
* @Last modified by:   mars
* @Last modified time: 2016-12-06T15:17:50-05:00
*/
'use strict';

/**
 * OAuthController
 *
 * @description :: Server-side logic for managing Oauths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	token: function(req,res){
			API(OAuth.sendToken,req,res);
	},

	'token-info': function(req,res){
			API(OAuth.tokenInfo,req,res);
	}
};
