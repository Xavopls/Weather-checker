const weather_utils = require('../utils/open-weather')

const weather_from_lat_lon = (req, res) => {
    const weather = weather_utils.getWeatherFromLatLon()
    console.log(weather);
};

module.exports = {
    weather_from_lat_lon
};
