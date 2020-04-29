const mongoose = require('mongoose');

// Schema
const AddressSchema = new mongoose.Schema({
    street: {
        type: String,
    },
    streetNumber: {
        type: String,
    },
    town: {
        type: String,
    },
    postalCode: {
        type: String,
    },
    country: {
        type: String
    },
    lastCheckAt: {
        type: Date,
        default: Date.now()
    }
});

// Model
const Address = mongoose.model('Address', AddressSchema);
module.exports = Address;
