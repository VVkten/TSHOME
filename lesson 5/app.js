'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const restify = require('express-restify-mongoose');

const app = express();
const router = express.Router();

const DOGS_SCHEMA = require('./schemas/dogs.schema');

const APP_DB_NAME = process.env.MONGODB_URI || 'mongodb://localhost/dogs';
const APP_PORT = process.env.PORT || 5005;

app.use(bodyParser.json());
app.use(methodOverride());
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
});

mongoose.connect(APP_DB_NAME);

const Dog = mongoose.model('dogs', new mongoose.Schema(DOGS_SCHEMA))

restify.serve(router, Dog);

app.use(router);

app.listen(APP_PORT, () => {
  console.log('Express server listening on port ' + APP_PORT)
});
