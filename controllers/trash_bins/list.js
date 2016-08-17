var colors = require('colors');
var async = require('async');
var pg = require('pg');
var types = require('pg').types;
types.setTypeParser(1700, 'text', parseFloat);
var _ = require('underscore');
var database_url = require('../../server.js').database_url;


// LIST
exports.request = function(req, res) {

    // Connect to database
    pg.connect(database_url, function(err, client, done) {
        if (err) {
            done();
            console.error(err);
        } else {

            // Prepare Query
            var query;

            // Check for parameters
            if (req.query.lat && req.query.lng) {
                query = "SELECT " +
                    "trash_bin_id, " +
                    "created, " +
                    "updated, " +
                    "description, " +
                    "filling_height, " +
                    "'CENTIMETER' AS filling_height_unit," +
                    "capacity," +
                    "'LITER' AS capacity_unit," +
                    "ST_X(coordinates::geometry) AS lng, " +
                    "ST_Y(coordinates::geometry) AS lat, " +
                    "ST_Distance(coordinates, ST_GeographyFromText('POINT(" + req.query.lng + " " + req.query.lat + ")')) AS distance, " +
                    "'METER' AS distance_unit " +
                    "FROM Trash_Bins ORDER BY distance ASC;";
            } else {
                query = "SELECT " +
                    "trash_bin_id, " +
                    "created, " +
                    "updated, " +
                    "description, " +
                    "filling_height, " +
                    "'CENTIMETER' AS filling_height_unit," +
                    "capacity," +
                    "'LITER' AS capacity_unit," +
                    "ST_X(coordinates::geometry) AS lng, " +
                    "ST_Y(coordinates::geometry) AS lat " +
                    "FROM Trash_Bins ORDER BY trash_bin_id ASC;";
            }

            // Database query
            client.query(query, function(err, result) {
                done();

                if (err) {
                    res.status(500).send(err);
                    console.error(colors.red(err));
                } else {

                    var trash_bins = result.rows;

                    // Check for latest measurements
                    if (req.query.latest_measurement && req.query.latest_measurement === 'true') {

                        async.forEachOf(trash_bins, function(trash_bin, key, callback) {

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
                                            _.extend(trash_bins[key], {
                                                timestamp: null,
                                                measured_distance: null,
                                                measured_distance_unit: null,
                                                measured_filling_height: null,
                                                measured_filling_height_unit: null
                                            });
                                        } else {
                                            _.extend(trash_bins[key], result.rows[0]);
                                        }
                                        callback();
                                    }
                                });
                            },
                            function(err) {
                                // if any of the file processing produced an error, err would equal that error
                                if (err) {
                                    res.status(500).send(err);
                                    console.error(colors.red(err));
                                } else {

                                    // Send Result
                                    res.status(200).send(trash_bins);
                                }
                            });

                    } else {
                        // Send Result
                        res.status(200).send(trash_bins);
                    }

                }
            });
        }
    });
};
