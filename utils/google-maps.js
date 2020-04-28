const googleMapsClient = require('@google/maps').createClient({
    key: process.env.GOOGLE_API_KEY,
    Promise: Promise
});
const Address = require('../models/address.js');


async function getCoordsFromAddress(address){
    return new Promise(async function(resolve, reject)  {
        await googleMapsClient.geocode({address: address})
            .asPromise()
            .then((response) => {
                resolve([response.json.results[0].geometry.location.lat,response.json.results[0].geometry.location.lng]);
            })
            .catch((err) => {
                console.log(err);
            });
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

async function validateAddress(query_address, address){
    // Check if it's validated
    if(await isValidated(address)){
        return 2;
    }
    //If it's not
    else{
        return googleMapsClient.geocode({address: query_address})
        .asPromise()
        .then((response) => {
            if(response.json.results.length){
                // Valid address
                return 1;
            }
            else{
                // Invalid Address
                return 0;
            }
        })
        .catch((err) => {
            console.log(err);
        });
    }
}

function isValidated(address){
    return Address.findOne({
        street: address.street,
        streetNumber: address.streetNumber,
        postalCode: address.postalCode,
    },function (err, _address) {
        if (_address) return true;
        else return false;
    })
}
module.exports = {
    getCoordsFromAddress,
    getAddressFromCoords,
    validateAddress
};