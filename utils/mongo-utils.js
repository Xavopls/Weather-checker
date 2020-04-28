const mongoose = require('mongoose')

async function connectMongo() {
    // Connection to the mongodb database
    await mongoose.connect('mongodb://mongo:27017/node_api', {
        useNewUrlParser: true,
        dbName: 'weather-checker'
    })
        .then(() => console.log('MongoDB correctly connected'))
        .catch(err => console.log(err));
}

module.exports = {
    connectMongo
}