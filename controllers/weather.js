const weather_utils = require('../utils/open-weather')
const address_utils = require('../utils/google-maps')
const asyncHandler = require('express-async-handler');
const axios = require('axios');

weather_from_coords = asyncHandler(async(req, res, next) => {
    const address = req.body.address;
    // Get the coordinates from the address sent
    address_utils.getCoordsFromAddress(address.streetNumber+", "+address.street+", "+
        address.postalCode+", "+address.town+", "+address.country)
        .then(async function (coords) {
            // Get the weather from the coordinates processed
            await axios.get('https://api.openweathermap.org/data/2.5/weather?lat='+coords[0]+'&lon='+coords[1]+
                '&appid='+process.env.OPEN_WEATHER_API_KEY+'&units=metric')
                .then(function (response) {
                    // Send the response
                    const weather = [response.data.main,response.data.weather[0]];
                    console.log('weather', weather)
                    res.status(200).send(weather);
                })
                .catch(error => {
                    res.status(400).send('Error:',error);
                })
        })
        .catch((error) => {
            res.status(400).send('Error:',error);
        })

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
