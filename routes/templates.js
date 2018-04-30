var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/home', function(req, res, next) {
  res.send(`
  <!DOCTYPE html>
  <html>
  <head>
      <meta charset="utf-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <title>Page Title</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>
  <body>
      <div data-component="header" data-instance-id="abc123">
        <script id="abc123">
            var abc123 = {name: 'abc123'};
        </script>
      </div>
      <div data-component="header" data-instance-id="abc456">
        <script id="abc456">
            var abc456 = {name: 'abc456'};
        </script>
      </div>
      <div data-component="sidebar" data-instance-id="efg123">
        <script id="efg123">
            var efg123 = {name: 'efg123'};
        </script>
      </div>
  </body>
  </html>
  `);
});

module.exports = router;