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

function validateAddress(address){

    // ToDo: CHECK IF THE ADDRESS IS ALREADY VALIDATED (mongodb)
    // IF IT IS
    // RETURN 2
    // IF ITS NOT
    googleMapsClient.geocode({address: address})
        .asPromise()
        .then((response) => {
            if(response.json.results.length){
                // ToDO: STORE THE ADDRESS INTO THE DB
                return 1;
            }
            return 0;
        })
        .catch((err) => {
            console.log(err);
        });
}

module.exports = {
    getCoordsFromAddress,
    getAddressFromCoords,
    validateAddress
};