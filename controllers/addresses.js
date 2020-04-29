const address_utils = require('../utils/google-maps')
const asyncHandler = require('express-async-handler');
const Address = require('../models/address.js');

// Endpoint for ONLY Validating the address
validate = asyncHandler(async(req, res, next) => {
    const address = req.body.address;
    // Validate the address
    await address_utils.validateAddress(address.streetNumber+", "+address.street+","+
        address.postalCode+","+address.town+","+address.country, address)
        .then((validated) =>{
            if(validated  === 2)
                res.status(202).send('Already Validated address');

            if(validated  === 1) {
                // Store the address into the DB
                Address.create(address, async (err, address) => {
                    if (err) {
                        res.status(400).send('Error in storing address into DB:', err);
                    }

                    res.status(200).send('Valid Address');
                });
            }
            if(validated  === 0)
                res.status(201).send('Invalid Address');
        })
        .catch(err => res.status(400).send(err))

});

module.exports = {
    validate
};
