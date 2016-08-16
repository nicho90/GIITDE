var colors = require('colors');
var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var pg = require('pg');

var app = express();
var httpPort = process.env.PORT || 5000;
var httpsPort = httpPort + 443;
var database_url = process.env.DATABASE_URL || 'postgres://Nicho@localhost:5432/giitde';


// Setup settings
app.use(bodyParser.json({
    limit: 52428800 // 50MB
}));
app.use(bodyParser.urlencoded({
    extended: false,
    limit: 52428800 // 50MB
}));

// Set folder for static files
app.use(express.static(__dirname + '/public'));


// Load dependencies
var trash_bins = require('./routes/trash_bins');
var measurements = require('./routes/measurements');

// Load Routes
app.use('/api', trash_bins);
app.use('/api', measurements);


// Start Webserver
var httpServer = http.createServer(app);
httpServer.listen(httpPort, function() {
    console.log(colors.blue("HTTP-Server is listening at port " + httpPort));
});
