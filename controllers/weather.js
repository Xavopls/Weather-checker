const weather_utils = require('../utils/open-weather')
const address_utils = require('../utils/google-maps')
const asyncHandler = require('express-async-handler');
const Address = require('../models/address')
const axios = require('axios');

weather_from_coords_validate = asyncHandler(async(req, res, next) => {
    const address = req.body.address;
    // Validate the address
    await address_utils.validateAddress(address.streetNumber+", "+address.street+","+
        address.postalCode+","+address.town+","+address.country, address)
        .then((validated) => {
            if (validated > 0){
                if(validated  === 1) {
                    // Store the address into the DB
                    Address.create(address, async (err, address) => {
                        if (err) {
                            res.status(400).send('Error in storing address into DB:', err);
                        }
                    });
                }
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
                                res.status(200).send(weather);
                            })
                            .catch(error => {
                                res.status(400).send('Error:',error);
                            })
                    })
                    .catch((error) => {
                        res.status(400).send('Error:',error);
                    })
            }
            else{
                res.status(400).send('Error: Invalid address');
            }

        })


});

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

module.exports = {
    weather_from_coords,
    weather_from_coords_validate
};
