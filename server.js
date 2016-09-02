var program = require('commander');
var colors = require('colors');
var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var pg = require('pg');

var app = express();
var httpPort = process.env.PORT || 5000;
var httpsPort = httpPort + 443;
var database_url = process.env.DATABASE_URL || 'postgres://Nicho@localhost:5432/giitde';
exports.database_url = database_url;
var mode = process.env.MODE || 'simple';

program
    .version('1.0.0')
    .option('-d, --db_user [username]', 'Enter the PostgreSQL-User, which is needed to start REST-API', 'username')
    .option('-m, --mode [mode]', 'Define the mode', 'mode')
    .parse(process.argv);

if (program.db_user !== "username") {
    database_url = 'postgres://' + program.db_user + '@localhost:5432/giitde';
}
if (program.mode !== "mode") {
    mode = program.mode;
}

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


// Check for REST-API
if (mode.toLowerCase() === "api") {
    console.log(colors.blue(new Date() + " Mode: Webserver & REST-API"));

    // Load dependencies
    var trash_bins = require('./routes/trash_bins');
    var measurements = require('./routes/measurements');

    // Load Routes
    app.use('/api', trash_bins);
    app.use('/api', measurements);

} else {
    console.log(colors.blue(new Date() + " Mode: Simple webserver"));
}

// Start Webserver
var httpServer = http.createServer(app);
httpServer.listen(httpPort, function() {
    console.log(colors.blue(new Date() + " HTTP-Server is listening at port " + httpPort));
});
