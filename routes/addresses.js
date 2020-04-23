var express = require('express');
var router = express.Router();
const controller = require('../controllers/addresses.js');

/* GET users listing. */
router.get('/validate', controller.validate);

module.exports = router;
