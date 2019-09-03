var express = require('express');
var router = express.Router();
var validator = require('validator');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

/* POST Login */
router.post('/login', function(req, res, next) {
  if (!req.body.email || !req.body.password) {
    res.status(401).json({"message": `Requires both username and password.`});
    // console.log(JSON.stringify(req.body));
  } else {
    const email = req.body.email;
    const unhashedPassword = req.body.password;
    // Check valid email
    if (!validator.isEmail(email)) {
      res.status(400).json({"message": `Error creating new user - Invalid email.`});
    }

    //Get stored hash from db
    req.db('users').where({email: email}).select('password')
    .then((dbPassword) => {
      bcrypt.compare(unhashedPassword, dbPassword).then(pass => {
        if (pass) {
          //Return true with JWT
          //Get secret key from DB
          req.db('jwt_secret_key').select('secret_key')
          .then((secret_key) => {
            var token = jwt.sign({
              exp: "24h",
              data: {
                email: email
              }
            }, secret_key);
            res.status(200).json({"message": "Successful login", "access_token": token, "token_type": "Bearer"})
          }).catch(error => {
            res.status(500).json({"message": "Error connecting to server"});
          })
        } else {
          //Return false
          res.status(401).json({"message": "Incorrect username or password"});
        }
      })
    }).catch(error => {
      res.status(401).json({"message": "Incorrect username or password"});
    })
  }
});

module.exports = router;
