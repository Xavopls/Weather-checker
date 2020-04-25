const address_utils = require('../utils/google-maps')
const asyncHandler = require('express-async-handler');

// Endpoint for ONLY Validating the address
validate = asyncHandler(async(req, res, next) => {
    const address = req.params.address;
    const validated = await address_utils.validateAddress(address.streetNumber+", "+address.street+","+
        address.postalCode+","+address.town+","+address.country, function (err){
        if(err)
            res.status(400).send('Error:', err);

        if(validated  === 2)
            res.status(202).send('Already Validated address');

        if(validated  === 1)
            res.status(200).send('Valid Address');

        if(validated  === 0)
            res.status(201).send('Invalid Address');
    });

});

module.exports = {
    validate
};
