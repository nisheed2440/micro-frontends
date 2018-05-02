const express = require('express');
const router = express.Router();
const request = require('request');
const resolver = require('../utils/component-resolver');

router.get('/', (req, res, next) => {
  request.get(`${req.secure || 'http'}://${req.get('host')}/templates/home`, (err, response, body) => {
    if (err) {
      res.redirect('/404');
    }
    resolver(req, body).then((content) => {
      res.send(content);
    });
  });
});

module.exports = router;
