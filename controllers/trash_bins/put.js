var colors = require('colors');
var pg = require('pg');
var types = require('pg').types;
types.setTypeParser(1700, 'text', parseFloat);
var _ = require('underscore');
var database_url = require('../../server.js').database_url;


// PUT
exports.request = function(req, res) {

    // Connect to database
    pg.connect(database_url, function(err, client, done) {
        if (err) {
            done();
            console.error(err);
        } else {

            // Prepare query
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

                        // Prepare query
                        var query = "UPDATE Trash_Bins SET " +
                            "updated = now(), " +
                            "description=$2, " +
                            "filling_height=$3, " +
                            "capacity=$4, " +
                            "coordinates='POINT(" + req.body.lng + " " + req.body.lat + ")' " +
                            "WHERE trash_bin_id=$1 " +
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
                            req.params.trash_bin_id,
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
                                    res.status(404).send('Trash bin not found!');
                                    console.error(colors.red('Trash bin not found!'));
                                } else {

                                    // Send Result
                                    res.status(200).send(result.rows[0]);
                                }
                            }
                        });

                    }
                }
            });
        }
    });
};
