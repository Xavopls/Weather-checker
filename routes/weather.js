var express = require('express');
var router = express.Router();
const controller = require('../controllers/weather.js');

// Sends the weather from a lat/lon
router.get('/get/latlong', controller.weather_from_lat_lon);

// Sends the weather from an Address, also checks if address.js is valid.
router.get('/get/address', controller.weather_from_address);


module.exports = router;
