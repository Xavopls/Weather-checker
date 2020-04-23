const mongoose = require('mongoose');

// Schema
const AddressSchema = new mongoose.Schema({
    street: {
        type: String,
    },
    street_number: {
        type: String,
    },
    town: {
        type: String,
    },
    postal_code: {
        type: String,
    },
    country: {
        type: String
    }
});

// Model
const Address = mongoose.model('Address', AddressSchema);
module.exports = Address;
