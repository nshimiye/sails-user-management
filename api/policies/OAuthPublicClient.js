/**
* @Author: mars
* @Date:   2016-12-06T15:26:47-05:00
* @Last modified by:   mars
* @Last modified time: 2016-12-06T15:45:48-05:00
*/
'use strict';

/**
 * @TODO explain what this module is doing
 */
module.exports = function (req, res, next) {
    OAuth.authenticator.authenticate(
        ['oauth2-public-client'],
        { session: false })(req, res, next);
};
