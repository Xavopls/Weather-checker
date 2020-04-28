const axios = require('axios');


async function getWeatherFromCoords(lat, lon) {
    let weather = []
    await axios.get('https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&appid='+process.env.OPEN_WEATHER_API_KEY+'&units=metric')
        .then(function (response) {
            weather.push(response.data.main)
            weather.push(response.data.weather)
            return(weather);
        })
        .catch(error => {
            console.log(error);
        });

}

module.exports = {
    getWeatherFromCoords
};
