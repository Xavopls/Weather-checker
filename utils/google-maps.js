const googleMapsClient = require('@google/maps').createClient({
    key: process.env.GOOGLE_API_KEY,
    Promise: Promise
});
const Address = require('../models/address.js');


async function getCoordsFromAddress(address){
    return new Promise(async function(resolve, reject)  {
        await googleMapsClient.geocode({address: address.streetNumber+", "+address.street+", "+
                address.postalCode+", "+address.town+", "+address.country})
            .asPromise()
            .then((response) => {
                resolve([response.json.results[0].geometry.location.lat,response.json.results[0].geometry.location.lng]);
            })
            .catch((err) => {
                console.log(err);
            });
    });

}

async function validateAddress(address){
    // Check if it's validated

    if(await isValidated(address)){
        return 2;
    }
    //If it's not
    else{
        return googleMapsClient.geocode({address: address.streetNumber+", "+address.street+","+
                address.postalCode+","+address.town+","+address.country})
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
        if(_address){
            // Check if has been validated in 12h
            const diff_ms = Math.abs(_address.lastCheckAt - Date.now());
            console.log('DIFFFFFFFF', diff_ms);
            if (diff_ms > 12*60*60*1000){
                _address.lastCheckAt = Date.now();
                _address.save();
                return true;
            }
            else return false;
        }
        // Address non existent
        else{
            return false;
        }
    })
}
module.exports = {
    getCoordsFromAddress,
    validateAddress
};