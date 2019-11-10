const userApi = require('./api/userApi');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/api/events',userApi);

app.listen(3000);

// eslint-disable-next-line no-console
console.log('success listen at port:3000');