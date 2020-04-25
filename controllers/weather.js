const weather_utils = require('../utils/open-weather')
const address_utils = require('../utils/google-maps')
const asyncHandler = require('express-async-handler');

weather_from_coords = asyncHandler(async(req, res, next) => {
    const address = req.params.address;

    const coords = address_utils.getCoordsFromAddress(address.streetNumber+", "+address.street+","+
        address.postalCode+","+address.town+","+address.country);
    if(coords){
        const weather = weather_utils.getWeatherFromCoords(coords[0],coords[1]);
        res.status(200).send(weather);
    }

    else
        res.status(400).send('Error: Invalid address');


    console.log(weather);
});

weather_from_coords_validate = asyncHandler(async(req, res, next) => {
    const address = req.params.address;

    //ToDO
    // address_utils.validateAddress(address)

    const coords = address_utils.getCoordsFromAddress(address.streetNumber+", "+address.street+","+
        address.postalCode+","+address.town+","+address.country);
    if(coords){
        const weather = weather_utils.getWeatherFromCoords(coords[0],coords[1]);
        res.status(200).send(weather);
    }

    else
        res.status(400).send('Error: Invalid address');


    console.log(weather);
});

module.exports = {
    weather_from_coords,
    weather_from_coords_validate
};
