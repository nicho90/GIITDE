var colors = require('colors');
var pg = require('pg');
var types = require('pg').types;
types.setTypeParser(1700, 'text', parseFloat);
var _ = require('underscore');
var database_url = require('../../server.js').database_url;
var Ajv = require('ajv');
var ajv = new Ajv();
var validate = ajv.compile(require('../../models/measurement'));


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
                var query = "SELECT * FROM Trash_Bins WHERE trash_bin_id=$1;";

                // Database query
                client.query(query, [
                    req.params.trash_bin_id
                ], function(err, result) {
                    done();

                    if (err) {
                        res.status(500).send(err);
                        console.error(colors.red(err));
                    } else {

                        // Check if Trash_Bin exists
                        if (result.rows.length === 0) {
                            res.status(404).send('Trash bin not found!');
                            console.error(colors.red('Trash bin not found!'));
                        } else {

                            var trash_bin = result.rows[0];
                            var measured_filling_height = trash_bin.filling_height - req.body.measured_distance;
                            if (measured_filling_height < 0) {
                                measured_filling_height = 0;
                            }

                            // Prepare Query
                            var query = "INSERT INTO Measurements (trash_bin_id, measured_distance, measured_filling_height) " +
                                "VALUES ($1, $2, $3) " +
                                "RETURNING " +
                                "measurement_id, " +
                                "created AS timestamp, " +
                                "measured_distance, " +
                                "'CENTIMETER' AS measured_distance_unit, " +
                                "measured_filling_height, " +
                                "'CENTIMETER' AS measured_filling_height_unit;";

                            // Database query
                            client.query(query, [
                                req.params.trash_bin_id,
                                req.body.measured_distance,
                                measured_filling_height
                            ], function(err, result) {
                                done();

                                if (err) {
                                    res.status(500).send(err);
                                    console.error(colors.red(err));
                                } else {

                                    // Send result
                                    res.status(201).send(result.rows[0]);
                                }
                            });
                        }
                    }
                });
            }
        });
    }
};
