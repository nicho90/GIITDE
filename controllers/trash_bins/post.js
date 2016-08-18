var colors = require('colors');
var pg = require('pg');
var types = require('pg').types;
types.setTypeParser(1700, 'text', parseFloat);
var _ = require('underscore');
var database_url = require('../../server').database_url;
var Ajv = require('ajv');
var ajv = new Ajv();
var validate = ajv.compile(require('../../models/trash_bin'));


// POST
exports.request = function(req, res) {

    // Validate input
    if (!validate(req.body)) {

        console.error(colors.red('Validation error:', validate.errors[0].message));
        res.status(405).send(validate.errors);

    } else {

        // Connect to database
        pg.connect(database_url, function(err, client, done) {
            if (err) {
                done();
                console.error(err);
            } else {

                // Prepare Query
                var query = "INSERT INTO Trash_Bins (description, filling_height, capacity, coordinates) " +
                    "VALUES ($1, $2, $3, 'POINT(" + req.body.lng + " " + req.body.lat + ")') " +
                    "RETURNING " +
                    "trash_bin_id, " +
                    "created, " +
                    "updated, " +
                    "description, " +
                    "filling_height, " +
                    "'CENTIMETER' AS filling_height_unit, " +
                    "capacity, " +
                    "'LITER' AS capacity_unit, " +
                    "ST_X(coordinates::geometry) AS lng, " +
                    "ST_Y(coordinates::geometry) AS lat;";

                // Database query
                client.query(query, [
                    req.body.description,
                    req.body.filling_height,
                    req.body.capacity
                ], function(err, result) {
                    done();

                    if (err) {
                        res.status(500).send(err);
                        console.error(colors.red(err));
                    } else {

                        // Check if Trash_Bin exists
                        if (result.rows.length === 0) {
                            res.status(404).send('Trash not created!');
                            console.error(colors.red('Trash bin not created!'));
                        } else {

                            // Send Result
                            res.status(201).send(result.rows[0]);
                        }
                    }

                });
            }
        });
    }
};
