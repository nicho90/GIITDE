var colors = require('colors');
var pg = require('pg');
var types = require('pg').types;
types.setTypeParser(1700, 'text', parseFloat);
var _ = require('underscore');
var database_url = require('../../server.js').database_url;


// GET
exports.request = function(req, res) {

    // Connect to database
    pg.connect(database_url, function(err, client, done) {
        if (err) {
            done();
            console.error(err);
        } else {

            // Prepare Query
            var query = "SELECT " +
                "trash_bin_id, " +
                "created, " +
                "updated, " +
                "description, " +
                "filling_height, " +
                "'CENTIMETER' AS filling_height_unit, " +
                "capacity, " +
                "'LITER' AS capacity_unit, " +
                "ST_X(coordinates::geometry) AS lng, " +
                "ST_Y(coordinates::geometry) AS lat " +
                "FROM Trash_Bins WHERE trash_bin_id=$1;";

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

                        // Check for latest measurements
                        if (req.query.latest_measurement && req.query.latest_measurement === 'true') {

                            // Prepare query
                            var query = "SELECT " +
                                "created AS timestamp, " +
                                "measured_distance, " +
                                "'CENTIMETER' AS measured_distance_unit, " +
                                "measured_filling_height, " +
                                "'CENTIMETER' AS measured_filling_height_unit " +
                                "FROM MEASUREMENTS " +
                                "WHERE trash_bin_id=$1 ORDER BY created DESC LIMIT 1";

                            // Database query
                            client.query(query, [
                                trash_bin.trash_bin_id
                            ], function(err, result) {
                                done();

                                if (err) {
                                    callback(err);
                                } else {

                                    // Check if Measurement exists
                                    if (result.rows.length === 0) {
                                        _.extend(trash_bin, {
                                            timestamp: null,
                                            measured_distance: null,
                                            measured_distance_unit: null,
                                            measured_filling_height: null,
                                            measured_filling_height_unit: null
                                        });
                                    } else {
                                        _.extend(trash_bin, result.rows[0]);
                                    }
                                }

                                // Send Result
                                res.status(200).send(trash_bin);
                            });
                        } else {
                            // Send Result
                            res.status(200).send(trash_bin);
                        }
                    }
                }
            });
        }
    });
};
