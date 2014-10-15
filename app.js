'use strict';

var express = require('express');
var app = require('./config/express')();

// Routes
require('./server/router')(app);

// Errorhandlers
require('./config/errorHandler')(app);

app.listen(5000, function () { console.log('server listening on port', 5000); });