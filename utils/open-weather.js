let weather = require('openweather-apis');

function initWeather(){
    weather.setLang(process.env.OPEN_WEATHER_LANGUAGE);
    weather.setUnits(process.env.OPEN_WEATHER_UNITS);
    weather.setAPPID(process.env.OPEN_WEATHER_API_KEY);
}

function getWeatherFromCoords(latitude, longitude) {
    initWeather();
    weather.setCoordinate(latitude, longitude);
    weather.getAllWeather(function(err, weatherObject){
        if(err){
            console.log(err);
        }
        return weatherObject;
    });
}

module.exports = {
    getWeatherFromCoords
};
