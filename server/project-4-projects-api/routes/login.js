var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

/* POST Login */
router.get('/', function(req, res, next) {
  if (!req.body.email || !req.body.password) {
    res.status(401).json({"message": `Requires both username and password.`});
  } else {
    const email = req.body.email;
    const unhashedPassword = req.body.password;

    //Get stored hash from db
    req.body('users').where({email: email}).select('password')
    .then((dbPassword) => {
      bcrypt.compare(unhashedPassword, dbPassword).then(pass => {
        if (pass) {
          //Return true with JWT
          //Get secret key from DB
          req.body('jwt_secret_key').select('secret_key')
          .then((secret_key) => {
            jwt.sign({
              exp: "24h",
              data: {
                email: email
              }
            }, secret_key);
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
