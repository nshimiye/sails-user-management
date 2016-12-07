/**
* source: https://scotch.io/tutorials/easy-node-authentication-google
* @Author: mars
* @Date:   2016-12-06T18:30:09-05:00
* @Last modified by:   mars
* @Last modified time: 2016-12-06T18:38:19-05:00
*/

// config/externalServers.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'      : 'your-secret-clientID-here', // your App ID
        'clientSecret'  : 'your-client-secret-here', // your App Secret
        'callbackURL'   : 'http://localhost:8080/oauth/facebook/callback'
    },

    'twitterAuth' : {
        'consumerKey'       : 'your-consumer-key-here',
        'consumerSecret'    : 'your-client-secret-here',
        'callbackURL'       : 'http://localhost:8080/oauth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'      : 'your-secret-clientID-here',
        'clientSecret'  : 'your-client-secret-here',
        'callbackURL'   : 'http://localhost:8080/oauth/google/callback'
    }

};
