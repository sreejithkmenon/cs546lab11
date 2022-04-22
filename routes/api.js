const express = require('express');
const router = express.Router();
const xss = require('xss');

router.get('/', function (request, response) {
    response.render('home', {});
});

module.exports = router;