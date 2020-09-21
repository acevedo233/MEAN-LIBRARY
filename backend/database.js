const mongoose = require('mongoose');

const URI = 'mongodb://localhost/mean-final';

mongoose.connect(URI)
    .then( db => console.log('DB is connected'))
    .catch(err => console.error)

module.exports = mongoose;