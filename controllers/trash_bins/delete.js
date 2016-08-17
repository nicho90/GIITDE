var colors = require('colors');
var pg = require('pg');
var types = require('pg').types;
types.setTypeParser(1700, 'text', parseFloat);
var _ = require('underscore');
var database_url = require('../../server.js').database_url;


// DELETE
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
                        var query = "DELETE FROM Trash_Bins WHERE trash_bin_id=$1;";

                        // Database query
                        client.query(query, [
                            req.params.trash_bin_id
                        ], function(err, result) {
                            done();

                            if (err) {
                                res.status(500).send(err);
                                console.error(colors.red(err));
                            } else {

                                // Send Result
                                res.status(204).send();
                            }
                        });
                    }
                }
            });
        }
    });
};
