/**
* @Author: mars
* @Date:   2016-12-06T15:22:12-05:00
* @Last modified by:   mars
* @Last modified time: 2016-12-06T15:27:01-05:00
*/
'use strict';

/**
 * make sure that the client request has valid authorization information
 */
module.exports = function (req, res, next) {
    OAuth.authenticator.authenticate('bearer', { session: false },
    (err, identity, authorization) => {
        if (!identity ) { return res.send(401); }

        req.identity = identity;
        req.authorization = authorization;

        next();
    })(req, res);
};
