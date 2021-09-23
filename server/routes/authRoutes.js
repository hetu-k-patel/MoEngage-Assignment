const express = require('express');
const registrationRoutes = express.Router();
const bcrypt = require('bcryptjs');

let User = require('../models/User');

registrationRoutes.route('/register').post(function (req, res) {
   let register = new User(req.body);
   register
      .save()
      .then((reg) => {
         res.sendStatus(200);
      })
      .catch((err) => {
         res.status(400).send('Failed to store to database' + err);
      });
});

// Login Router
registrationRoutes.route('/login').post(function (req, res) {
   User.findOne({ user_name: req.body.user_name }).then((user) => {
      console.log('User from login', user);
      if (!user) res.sendStatus(204);
      else {
         bcrypt
            .compare(req.body.password, user.password)
            .then((passwordMatch) =>
               passwordMatch ? res.sendStatus(200) : res.sendStatus(204)
            );
      }
   });
});

// Username validation Router
registrationRoutes.route('/validateUsername').post(function (req, res) {
   User.findOne({ user_name: req.body.user_name }).then((user) =>
      user ? res.sendStatus(204) : res.sendStatus(200)
   );
});

// Get allData
registrationRoutes.route('/allData').get(function (req, res) {
   User.find((err, data) =>
      err ? res.status(400).send('Error occured') : res.json(data)
   );
});

module.exports = registrationRoutes;
