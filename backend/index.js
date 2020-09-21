const express = require ('express');
const morgan = require ('morgan');
const cors = require ('cors');
const mongoose = require('./database');
const app = express();

// Settings
app.set('port', process.env.Port || 3000);

// Middelwares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({origin: 'http://localhost:4200'}));

//Routes
app.use('/api/users',require('./routes/user.routes'));
app.use('/api/books',require('./routes/books.routes'));
app.use('/api/magazine', require('./routes/magazine.routes'));
app.use('/api/operations', require('./routes/operation.routes'))
// Starting the Server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
})