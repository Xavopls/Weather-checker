const express = require('express');
require('dotenv').config()
const path = require('path');
const cors = require('cors');
const PORT = process.env.SV_PORT || 5000;
const bodyParser = require('body-parser');

const server = express();

// Server conf
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(express.json());
server.use(cors());
server
    .use(express.static(path.join(__dirname, 'public')))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/', (req, res) => res.render('pages/index'));


// Routes
server.use('/weather', require('./routes/weather'));
server.use('/address', require('./routes/addresses'));


// Server listening
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
