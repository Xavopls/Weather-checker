var express = require('express');
var router = express.Router();
const controller = require('../controllers/addresses.js');

/* GET users listing. */
router.post('/validate', controller.validate);

module.exports = router;
