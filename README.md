<!--
@Author: mars
@Date:   2016-12-06T14:16:02-05:00
@Last modified by:   mars
@Last modified time: 2016-12-06T17:58:34-05:00
-->
# sails-user-management
Signup with external services -  sailsjs app

# Scenario
User wants to manage multiple services in one place.

# End goal
Signup with Gmail, then use the email as a username.

# Step by step

* Create a new app
```
sails new sails-user-management --no-frontend
```

* Install authentication and authorization dependancies
```sh
# use bcrypt instead of bcrypt-nodejs
# we will install sails-mongo sails-mysql later
npm install nodemailer oauth2orize passport passport-http-bearer passport-oauth2-public-client rand-token bluebird bcrypt --save
```

* Configure security settings
```javascript
// create a new file => config/security.js
// here we add credentials for the email sending system (nodemailer)
```
[nodemailer resource](https://github.com/nodemailer/nodemailer)

* Initialize passport
```javascript
// config/http.js

middleware: {
  order: [

    ...
    'passportInit',
    'passportSession',
    ...

  ]
},

...
passportInit: require('passport').initialize(),
passportSession: require('passport').session(),
...

```

* Configure [policy settings](https://github.com/nshimiye/sails-user-management/blob/master/config/policies.js#L29)
```javascript
// create a new file => config/policies.js

```

* Configure [CORS settings](https://github.com/nshimiye/sails-user-management/blob/master/config/cors.js#L38)
```javascript
// create a new file => config/cors.js
...
allRoutes: true,
headers: 'content-type,authorization'
...

```

* configure database settings
```sh
# config/connections.js
# config/models.js
# i am using local-disk for testing purposes
```

* Create required models
```sh
sails generate model clients
sails generate model tokens
sails generate model users
```

* Create and add logic to web facing controllers
```sh
sails generate controller OAuth
sails generate controller users
sails generate controller clients
```

* Logic for OAuthValidateAccessToken policy
```javascript
// api/policies/OAuthValidateAccessToken.js
module.exports = function (req, res, next) {
    OAuth.authenticator.authenticate('bearer', { session: false },
    (err, identity, authorization) => {
        if (!identity ) { return res.send(401); }

        req.identity = identity;
        req.authorization = authorization;

        next();
    })(req, res);
};
```

* Logic for OAuthPublicClient policy
```javascript
// api/policies/OAuthValidateAccessToken.js
module.exports = function (req, res, next) {
    OAuth.authenticator.authenticate(
        ['oauth2-public-client'],
        { session: false })(req, res, next);
};
```

<!-- SERVICES -->

* Create [API service](https://github.com/nshimiye/sails-user-management/blob/master/api/services/API.js#L122)
```javascript
// api/services/API.js
// @TODO what does API service do
```


* Create [OAuth service](https://github.com/nshimiye/sails-user-management/blob/master/api/services/OAuth.js#L120)
```javascript
// api/services/OAuth.js
// @TODO what does OAuth service do
```

* Create [Registration service](https://github.com/nshimiye/sails-user-management/blob/master/api/services/Registration.js#L63)
```javascript
// api/services/Registration.js
// @TODO what does Registration service do
```

# Resource
[Oauth server tutorial](https://github.com/nshimiye/OAUTH-Server-with-Sails-and-AngularJS/blob/master/OAUTH_README.md)
