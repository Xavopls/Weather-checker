var express = require('express');
var router = express.Router();
const controller = require('../controllers/weather.js');

// Sends the weather from a lat/lon
router.post('/get/latlong', controller.weather_from_coords);

// Sends the weather from an Address, also checks if address is valid.
router.post('/get/latlong/validate', controller.weather_from_coords_validate);


module.exports = router;
