var express = require('express');
var router = express.Router();
var validator = require('validator');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

/* POST Register */
router.post('/register', function(req, res, next) {
  if (!req.body.email || !req.body.password) {
    res.status(400).json({"message": `Error creating new user - Expects: email and password.`});
    console.log("Error on request body:", JSON.stringify(req.body));
  } else {
    const email = req.body.email;
    const unhashedPassword = req.body.password;

    // Check valid email
    if (!validator.isEmail(email)) {
      res.status(400).json({"message": `Error creating new user - Invalid email.`});
    }

    // Hash password
    bcrypt.hash(unhashedPassword, 15, function(err, hash) {
      req.db('users').insert({email: email, password: hash})
      .then(_ => {
          res.status(200).json({"message": "Account successfully created."});
      }).catch(err => {
          res.status(400).json({"message": "That email is already in use."+err})
      })
    })
  }
});

module.exports = router;
