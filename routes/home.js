const express = require('express');
const router = express.Router();
const request = require('request');
const resolver = require('../utils/component-resolver');

router.get('/', function (req, res, next) {
  request.get(`${req.secure || 'http'}://${req.get('host')}/templates/home`, function (err, response, body) {
    if (err) {
      res.redirect('/404');
    }
    res.send(resolver(req, body));
  });
});

module.exports = router;
