const weather_utils = require('../utils/open-weather')
const address_utils = require('../utils/google-maps')

const weather_from_lat_lon = (req, res) => {
    const weather = weather_utils.getWeatherFromLatLon(20, 20)
    console.log(weather);
};

module.exports = {
    weather_from_lat_lon
};
