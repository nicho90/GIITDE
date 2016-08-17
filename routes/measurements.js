var express = require('express');
var router = express.Router();

var list = require('../controllers/measurements/list');
var post = require('../controllers/measurements/post');
// var get = require('../controllers/measurements/get');
// var put = require('../controllers/measurements/put');
// var del = require('../controllers/measurements/delete');
var delete_all = require('../controllers/measurements/delete_all');


// LIST
router.get('/trash_bins/:trash_bin_id/measurements', list.request);

// POST
router.post('/trash_bins/:trash_bin_id/measurements', post.request);

// DELETE ALL
router.delete('/trash_bins/:trash_bin_id/measurements', delete_all.request);

// GET (not implemented)
// router.get('/trash_bins/:trash_bin_id/measurements/measurement_id', get.request);

// PUT (not implemented)
// router.put('/trash_bins/:trash_bin_id/measurements/measurement_id', put.request);

// DELETE (not implemented)
// router.delete('/trash_bins/:trash_bin_id/measurements/measurement_id', del.request);


module.exports = router;
