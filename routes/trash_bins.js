var express = require('express');
var router = express.Router();

var list = require('../controllers/trash_bins/list');
//var post = require('../controllers/trash_bins/post');
var get = require('../controllers/trash_bins/get');
//var put = require('../controllers/trash_bins/put');
//var del = require('../controllers/trash_bins/delete');


// LIST
router.get('/trash_bins', list.request);

// POST
//router.post('/trash_bins', post.request);

// GET
router.get('/trash_bins/:trash_bin_id', get.request);

// PUT
//router.get('/trash_bins/:trash_bin_id', put.request);

// DELETE
//router.get('/trash_bins/:trash_bin_id', del.request);


module.exports = router;
