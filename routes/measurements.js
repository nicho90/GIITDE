var express = require('express');
var router = express.Router();

// var list = require('../controllers/measurements/list');
// var post = require('../controllers/measurements/post');
// var get = require('../controllers/measurements/get');
// var put = require('../controllers/measurements/put');
// var del = require('../controllers/measurements/delete');
// var delete_all = require('../controllers/measurements/delete_all');

var get_latest_measurement = require('../controllers/measurements/get_latest_measurement');


// LIST
// router.get('/trash_bins/:trash_bin_id/measurements', list.request);

// POST
// router.post('/trash_bins/:trash_bin_id/measurements', post.request);

// DELETE ALL
// router.post('/trash_bins/:trash_bin_id/measurements', delete.request);

// GET
// router.get('/trash_bins/:trash_bin_id/measurements/measurement_id', get.request);

// PUT
// router.get('/trash_bins/:trash_bin_id/measurements/measurement_id', put.request);

// DELETE
// router.get('/trash_bins/:trash_bin_id/measurements/measurement_id', del.request);


// GET LASTEST MEASUREMENT
router.get('/trash_bins/:trash_bin_id/latest_measurement', get_latest_measurement.request);


module.exports = router;
