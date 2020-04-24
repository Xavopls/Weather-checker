const googleMapsClient = require('@google/maps').createClient({
    key: process.env.GOOGLE_API_KEY,
    Promise: Promise
});

function getCoordsFromAddress(address){
    googleMapsClient.geocode({address: address})
        .asPromise()
        .then((response) => {
            console.log(response.json.results);
        })
        .catch((err) => {
            console.log(err);
        });
}

function getAddressFromCoords(lat, long){
    googleMapsClient.reverseGeocode({latlng: [lat, long]})
        .asPromise()
        .then((response) => {
            console.log(response.json.results);
        })
        .catch((err) => {
            console.log(err);
        });

}
module.exports = {
    getCoordsFromAddress,
    getAddressFromCoords
};