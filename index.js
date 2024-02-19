const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const data = require('./data');
const express = require('express');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set(helmet());
app.use('/data', data);

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
}


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
